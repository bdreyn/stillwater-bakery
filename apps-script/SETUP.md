# Apps Script Web App — Setup Guide

This is the small server piece that receives order and inquiry form
submissions from the site. It logs each one to a Google Sheet and emails the
bakery. It runs entirely inside Google's infrastructure for free.

You only need this if you want form submissions delivered. Everything else on
the site (menu, events, gallery, content) is static and lives in
`src/js/data.js` — no spreadsheet required.

## Step 1 — Create the Google Sheet

1. Create a new Google Sheet (name it anything, e.g. "Stillwater Bakery Orders").
2. Rename the first tab to **`Orders`**.
3. Add these column headers in row 1:

   | id | createdAt | name | email | phone | details | preferredDate | delivery |
   |----|-----------|------|-------|-------|---------|---------------|----------|

## Step 2 — Open the script editor

1. In that Sheet, click **Extensions → Apps Script**.
2. A new tab opens with a code editor.

## Step 3 — Paste the code

1. Delete the placeholder `function myFunction() {}`.
2. Open [`Code.gs`](Code.gs) from this repo, copy its entire contents, and
   paste them into the Apps Script editor.
3. Click the 💾 **Save** icon. Name the project e.g. "Stillwater Bakery API".

## Step 4 — Add the Script Property

1. In the Apps Script editor, click ⚙️ **Project Settings** (left sidebar).
2. Scroll to **Script Properties → Add script property**.
3. Add one property:

   | Property | Value |
   |---|---|
   | `OWNER_EMAIL` | The email address where new-order alerts should go |

4. Click **Save script properties**.

## Step 5 — Deploy as a Web App

1. Click **Deploy → New deployment** (top-right).
2. Click the gear ⚙️ next to "Select type" and choose **Web app**.
3. Fill in:
   - **Description**: Stillwater Bakery API
   - **Execute as**: **Me** (`your@email.com`)
   - **Who has access**: **Anyone**
4. Click **Deploy**.
5. The first time, Google asks you to **Authorize access**. Walk through the
   prompts (you may see an "app isn't verified" warning — click
   **Advanced → Go to project (unsafe)** since it's your own script).
6. Copy the **Web app URL** ending in `/exec` — that's your
   `VITE_APPS_SCRIPT_URL` value (set it as a GitHub Actions secret).

## Step 6 — Verify

Open the `/exec` URL in your browser. You should see:

```json
{"ok":true,"service":"stillwater-bakery-api"}
```

If you see that, the deployment worked.

## Updating the code later

1. Paste the new code into the Apps Script editor and save.
2. **Deploy → Manage deployments**, click the ✏️ pencil next to your
   deployment, change **Version** to **New version**, then **Deploy**.
3. **The URL stays the same** — no env-var changes needed.

## Troubleshooting

**"Authorization required" errors when submitting:**
Make sure the deployment is set to **Who has access: Anyone**, not "Anyone with
Google account".

**Emails aren't arriving:**
Check the `OWNER_EMAIL` script property is set correctly, and look at the
script's **Executions** log in the Apps Script left sidebar.

---

## Optional — Live Instagram feed on the homepage

The homepage's "Follow Along" section can show your real recent photos
instead of empty placeholder tiles. This uses Meta's Instagram Graph API,
which only works with an Instagram **Business** or **Creator** account
linked to a Facebook Page (a personal account won't work).

### Step 1 — Link Instagram to a Facebook Page

1. Make sure your Instagram account is set to **Business** or **Creator**
   (Instagram app → Settings → Account type).
2. Link it to a Facebook Page you control (Instagram app → Settings →
   Linked accounts → Facebook).

### Step 2 — Create a Facebook Developer app

1. Go to [developers.facebook.com/apps](https://developers.facebook.com/apps)
   and create a new app (type: **Business**).
2. Add the **Instagram Graph API** product to the app.
3. Note your app's **App ID** and **App Secret** (App Settings → Basic).

### Step 3 — Get a long-lived access token and your Instagram User ID

1. Open [Graph API Explorer](https://developers.facebook.com/tools/explorer/),
   select your app, and generate a **User Access Token** with the
   `instagram_basic` and `pages_show_list` permissions.
2. Call `GET /me/accounts` to find your Page, then
   `GET /{page-id}?fields=instagram_business_account` to get your
   **Instagram Business Account ID** — that's `IG_USER_ID`.
3. Exchange the short-lived token for a long-lived one:
   `GET /oauth/access_token?grant_type=fb_exchange_token&client_id={app-id}&client_secret={app-secret}&fb_exchange_token={short-lived-token}`
   The `access_token` in the response is your `IG_ACCESS_TOKEN` (valid ~60 days).

### Step 4 — Add the Script Properties

Back in the Apps Script editor (⚙️ **Project Settings → Script Properties**),
add:

| Property | Value |
|---|---|
| `IG_USER_ID` | Instagram Business Account ID from Step 3 |
| `IG_ACCESS_TOKEN` | Long-lived access token from Step 3 |
| `IG_APP_ID` | App ID from Step 2 |
| `IG_APP_SECRET` | App Secret from Step 2 |

### Step 5 — Keep the token from expiring

The long-lived token lasts about 60 days. In the Apps Script editor, select
**`installInstagramRefreshTrigger`** from the function dropdown at the top
and click **Run** once — this sets up an automatic refresh every 45 days so
you never have to redo Step 3. You'll need to re-deploy (see "Updating the
code later" above) after pasting in the updated `Code.gs` for this function
to exist.

### Step 6 — Verify

Open `{your /exec URL}?action=instagramFeed` in a browser. You should see
`{"success":true,"items":[...]}` with your recent photos. If you see
`{"success":false,"error":"..."}`, the message tells you what's missing.

If this isn't configured, the homepage silently keeps showing the placeholder
tiles — nothing breaks.
