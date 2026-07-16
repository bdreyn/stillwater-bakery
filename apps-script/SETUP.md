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
