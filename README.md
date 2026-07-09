# Stillwater Bakery

A fast, lightweight website for a Texas cottage bakery.
**Zero frameworks** — vanilla JavaScript, Tailwind CSS, and Vite.
Hosted free on **GitHub Pages**. Content is edited in the browser through a
Git-based CMS; orders and inquiries come in through the contact/order form.

---

## Architecture

```
                       ┌──────────────────────┐
     edit in browser   │  Sveltia CMS (/admin)│ ─commit─▶ content/*.json  (in this repo)
   ──────────────────▶ └──────────────────────┘                 │
                                                                 │ read at build
                       ┌──────────────────────┐ ◀───────────────┘
                       │  Vanilla JS + Vite   │
                       │  (GitHub Pages)      │
                       │                      │        ┌─────────────────────────┐
                       │  order / contact form│ ─POST─▶│  Apps Script Web App    │ ─▶ Sheet + Email
                       └──────────────────────┘        └─────────────────────────┘
```

No React. No build-time frameworks. No runtime overhead. No database. Each page
is a standalone HTML file with shared JS modules. Site content lives as plain
JSON files in `content/`, edited either by hand or through the **Sveltia CMS**
at `/admin`, which commits changes straight to the repo. The only server piece
is a small Google Apps Script that emails the bakery when someone submits the
form.

The site loads fast on any device, including a phone at a farmers market with
spotty signal.

---

## Tech Stack

| Layer | Tool | Cost |
|---|---|---|
| Frontend | Vanilla JS + Tailwind CSS + Vite | Free |
| Hosting | GitHub Pages | Free |
| Content | JSON files in `content/`, edited via Sveltia CMS | Free |
| Form delivery | Google Apps Script Web App | Free |
| Custom domain | Optional | ~$12/yr |

---

## Project Structure

```
stillwater-bakery/
├── .github/workflows/deploy.yml    # Auto-deploy on push to main
├── apps-script/
│   ├── Code.gs                     # Backend: receives form submissions, emails bakery
│   └── SETUP.md                    # Step-by-step deploy guide
├── content/                        # ← ALL site content (edited via /admin or by hand)
│   ├── menu/*.json                 # one file per menu item
│   ├── events/*.json               # one file per event
│   ├── gallery.json                # gallery photos
│   └── settings/site.json          # contact / social details
├── public/
│   ├── admin/                      # Sveltia CMS (index.html + config.yml)
│   └── images/uploads/             # photos uploaded through the CMS
├── src/
│   ├── css/
│   │   └── main.css                # Tailwind directives + custom styles
│   ├── js/
│   │   ├── data.js                 # Thin loader: reads content/*.json for the pages
│   │   ├── api.js                  # Order/inquiry form submission
│   │   ├── icons.js                # Shared inline SVG icons
│   │   ├── router.js               # Shared nav + footer
│   │   └── utils.js                # DOM helpers, toast, fade-in
│   └── pages/
│       ├── home.js                 # Home page + current-menu section
│       ├── menu.js                 # Menu with category filter
│       ├── about.js                # About page
│       ├── order.js                # Order form
│       ├── events.js               # Events listing
│       ├── gallery.js              # Image gallery
│       └── contact.js              # Contact / inquiry form
├── index.html  menu.html  about.html  order.html
├── events.html  gallery.html  contact.html
├── .env.example
├── .gitignore
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

## Editing site content

Everything shown on the site — menu, events, gallery photos, and contact
details — lives as JSON files in **`content/`**. There are two ways to edit it:

1. **In the browser (recommended):** go to `/admin` and log in with GitHub.
   Edit the menu, events, gallery, or contact details in a friendly form; each
   save commits to `main` and the site rebuilds automatically (~1 minute).
2. **By hand:** edit the JSON files under `content/` directly and commit.

Either way, `src/js/data.js` loads those files at build time, so the home-page
"This Week's Menu" section and the full Menu page always stay in sync.

### One-time CMS setup (GitHub OAuth)

The CMS is served statically from GitHub Pages, so it needs a tiny OAuth relay
to complete the GitHub login (Pages can't hold the client secret). This is a
one-time, free setup:

1. **Register a GitHub OAuth App**
   (GitHub → Settings → Developer settings → OAuth Apps → New).
   - *Authorization callback URL:* the URL of the auth relay from the next step
     (e.g. `https://stillwater-cms-auth.<you>.workers.dev/callback`).
   - Note the **Client ID** and **Client Secret**.
2. **Deploy the auth relay** — the maintained
   [`sveltia-cms-auth`](https://github.com/sveltia/sveltia-cms-auth) Cloudflare
   Worker (free tier). Set its `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET`
   secrets to the values from step 1.
3. **Point the CMS at the relay:** in
   [`public/admin/config.yml`](public/admin/config.yml), set `backend.base_url`
   to your Worker's URL.

After that, anyone you've given push access to the repo can edit content at
`/admin`. No further setup — editing uses each editor's own GitHub account.

> Prefer to review each change first? Set `publish_mode: editorial_workflow`
> in `config.yml` and edits open a pull request instead of committing directly.

---

## Setup

### 1. Clone and install

```bash
git clone https://github.com/YOUR_USERNAME/stillwater-bakery.git
cd stillwater-bakery
npm install
```

### 2. Deploy the Apps Script Web App (for the form)

Follow [`apps-script/SETUP.md`](apps-script/SETUP.md). You'll set one Script
Property, `OWNER_EMAIL`, and get a deployment URL.

### 3. Configure environment

```bash
cp .env.example .env
# Set VITE_APPS_SCRIPT_URL to your Apps Script /exec URL
```

### 4. Run locally

```bash
npm run dev
```

---

## Deploying to GitHub Pages

1. Push to GitHub.
2. **Settings → Pages → Source → GitHub Actions**.
3. **Settings → Secrets → Actions**, add `VITE_APPS_SCRIPT_URL`.
4. Every push to `main` auto-deploys.

> Using a custom domain? Change `base` in `vite.config.js` from
> `'/stillwater-bakery/'` to `'/'`.

---

## Security (Public Repo)

- `.env` is gitignored — never committed.
- `OWNER_EMAIL` lives in Apps Script Properties, not in source.
- No payment data ever touches this app — orders are arranged directly with
  the bakery after the form is submitted.

---

## License

Proprietary. All rights reserved.
