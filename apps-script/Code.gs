/**
 * Stillwater Bakery — Apps Script Backend
 * ============================================================================
 * A tiny server piece that receives order and inquiry form submissions from
 * the static site, logs them to a Google Sheet, and emails the bakery. It
 * also proxies the Instagram Graph API so the site can show real photos
 * without ever exposing the access token to the browser.
 * Deploy it as a Web App from a Google Sheet. See SETUP.md.
 *
 * Script Properties required (Project Settings → Script Properties):
 *   OWNER_EMAIL — where new-order / inquiry notifications are sent
 *
 * Script Properties for the Instagram feed (optional — see SETUP.md):
 *   IG_USER_ID     — Instagram Business/Creator account ID
 *   IG_ACCESS_TOKEN — long-lived Graph API access token
 *   IG_APP_ID       — Facebook Developer app ID (for token refresh)
 *   IG_APP_SECRET   — Facebook Developer app secret (for token refresh)
 * ============================================================================
 */

const ORDERS_SHEET = 'Orders';

// ---------------------------------------------------------------------------
// HTTP entrypoints
// ---------------------------------------------------------------------------

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents || '{}');
    if (body.action === 'submitOrder') {
      return jsonResponse(submitOrder(body));
    }
    return jsonResponse({ success: false, error: 'Unknown action' });
  } catch (err) {
    return jsonResponse({ success: false, error: String(err) });
  }
}

function doGet(e) {
  const action = e && e.parameter && e.parameter.action;

  if (action === 'instagramFeed') {
    const limit = (e.parameter.limit && parseInt(e.parameter.limit, 10)) || 4;
    return jsonResponse(getInstagramFeed(limit));
  }

  // Lets you sanity-check the deployment URL in a browser.
  return jsonResponse({ ok: true, service: 'stillwater-bakery-api' });
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}

// ---------------------------------------------------------------------------
// Order / inquiry submissions
// ---------------------------------------------------------------------------

function submitOrder(body) {
  // Basic validation
  if (!body.name || !body.email || !body.details) {
    return { success: false, error: 'Missing required fields.' };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
    return { success: false, error: 'Invalid email address.' };
  }

  const sheet = SpreadsheetApp.getActive().getSheetByName(ORDERS_SHEET);
  const id = Utilities.getUuid();
  const createdAt = new Date().toISOString();

  if (sheet) {
    sheet.appendRow([
      id,
      createdAt,
      body.name,
      body.email,
      body.phone || '',
      body.details,
      body.preferredDate || '',
      body.delivery || 'pickup',
    ]);
  }

  // Notify the bakery
  const ownerEmail = PropertiesService.getScriptProperties().getProperty('OWNER_EMAIL');
  if (ownerEmail) {
    MailApp.sendEmail({
      to: ownerEmail,
      subject: 'New Stillwater Bakery message — ' + body.name,
      body:
        'A new order / inquiry has been submitted.\n\n' +
        'Name: ' + body.name + '\n' +
        'Email: ' + body.email + '\n' +
        'Phone: ' + (body.phone || '—') + '\n' +
        'Preferred date: ' + (body.preferredDate || '—') + '\n' +
        'Delivery: ' + (body.delivery || 'pickup') + '\n\n' +
        'Details:\n' + body.details,
    });
  }

  // Acknowledge the customer (non-fatal if it fails)
  try {
    MailApp.sendEmail({
      to: body.email,
      subject: 'We received your message — Stillwater Bakery',
      body:
        'Hi ' + body.name + ',\n\n' +
        'Thanks for reaching out! We will be in touch within 24 hours to ' +
        'confirm details and arrange pickup or delivery.\n\n' +
        '— Stillwater Bakery',
    });
  } catch (e) {
    // Customer email failure is non-fatal; the bakery still has the message.
  }

  return { success: true, orderId: id };
}

// ---------------------------------------------------------------------------
// Instagram feed (Graph API)
// ---------------------------------------------------------------------------
// Requires the IG_USER_ID and IG_ACCESS_TOKEN script properties (see
// SETUP.md for how to get them from Meta's developer portal). Results are
// cached for an hour so a busy homepage doesn't hammer the Graph API or
// burn through its rate limit.

const IG_CACHE_KEY = 'ig_feed_v1';
const IG_CACHE_SECONDS = 3600; // 1 hour

function getInstagramFeed(limit) {
  const props = PropertiesService.getScriptProperties();
  const userId = props.getProperty('IG_USER_ID');
  const token = props.getProperty('IG_ACCESS_TOKEN');

  if (!userId || !token) {
    return { success: false, error: 'Instagram is not configured. Set IG_USER_ID and IG_ACCESS_TOKEN script properties.' };
  }

  const cache = CacheService.getScriptCache();
  const cached = cache.get(IG_CACHE_KEY);
  if (cached) {
    return { success: true, items: JSON.parse(cached).slice(0, limit) };
  }

  try {
    const url = 'https://graph.facebook.com/v19.0/' + userId + '/media' +
      '?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp' +
      '&limit=25&access_token=' + encodeURIComponent(token);

    const res = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
    const data = JSON.parse(res.getContentText());

    if (data.error) {
      return { success: false, error: data.error.message || 'Instagram API error' };
    }

    const items = (data.data || [])
      .filter(function (m) { return m.media_type === 'IMAGE' || m.media_type === 'CAROUSEL_ALBUM'; })
      .map(function (m) {
        return {
          mediaUrl: m.media_type === 'CAROUSEL_ALBUM' ? (m.thumbnail_url || m.media_url) : m.media_url,
          permalink: m.permalink,
          caption: m.caption || '',
        };
      });

    cache.put(IG_CACHE_KEY, JSON.stringify(items), IG_CACHE_SECONDS);
    return { success: true, items: items.slice(0, limit) };
  } catch (err) {
    return { success: false, error: String(err) };
  }
}

// ---------------------------------------------------------------------------
// Instagram long-lived token refresh
// ---------------------------------------------------------------------------
// Long-lived tokens last ~60 days. Run installInstagramRefreshTrigger() ONCE
// from the Apps Script editor (pick it in the function dropdown, click Run)
// to schedule an automatic refresh every 45 days so the feed never breaks.
// Requires the IG_APP_ID and IG_APP_SECRET script properties.

function refreshInstagramToken() {
  const props = PropertiesService.getScriptProperties();
  const appId = props.getProperty('IG_APP_ID');
  const appSecret = props.getProperty('IG_APP_SECRET');
  const token = props.getProperty('IG_ACCESS_TOKEN');

  if (!appId || !appSecret || !token) return;

  const url = 'https://graph.facebook.com/v19.0/oauth/access_token' +
    '?grant_type=fb_exchange_token' +
    '&client_id=' + encodeURIComponent(appId) +
    '&client_secret=' + encodeURIComponent(appSecret) +
    '&fb_exchange_token=' + encodeURIComponent(token);

  const res = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
  const data = JSON.parse(res.getContentText());

  if (data.access_token) {
    props.setProperty('IG_ACCESS_TOKEN', data.access_token);
  }
}

function installInstagramRefreshTrigger() {
  // Remove any existing refresh triggers first so re-running this doesn't
  // create duplicates.
  ScriptApp.getProjectTriggers().forEach(function (t) {
    if (t.getHandlerFunction() === 'refreshInstagramToken') {
      ScriptApp.deleteTrigger(t);
    }
  });
  ScriptApp.newTrigger('refreshInstagramToken')
    .timeBased()
    .everyDays(45)
    .create();
}
