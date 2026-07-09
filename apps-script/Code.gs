/**
 * Stillwater Bakery — Apps Script Backend
 * ============================================================================
 * A tiny server piece that receives order and inquiry form submissions from
 * the static site, logs them to a Google Sheet, and emails the bakery.
 * Deploy it as a Web App from a Google Sheet. See SETUP.md.
 *
 * Script Properties required (Project Settings → Script Properties):
 *   OWNER_EMAIL — where new-order / inquiry notifications are sent
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

function doGet() {
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
