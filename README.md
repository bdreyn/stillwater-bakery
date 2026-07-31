# Stillwater Bakery

A fast, lightweight website for a Texas cottage bakery — vanilla JavaScript,
Tailwind CSS, and Vite, hosted free on GitHub Pages. No frameworks, no
database. Content is edited in the browser through a Git-based CMS; orders
and inquiries are delivered through a Google Apps Script Web App.

## Setup

```bash
git clone https://github.com/YOUR_USERNAME/stillwater-bakery.git
cd stillwater-bakery
npm install
cp .env.example .env
# Set VITE_APPS_SCRIPT_URL to your Apps Script /exec URL — see apps-script/SETUP.md
npm run dev
```

## Editing content

Menu, events, gallery photos, and contact details live as JSON files under
`content/`. Edit them at `/admin` (Sveltia CMS, logs in with GitHub) or by
hand — either way, a commit to `main` triggers a rebuild.

The CMS needs a one-time OAuth relay set up before login works at `/admin`;
see `public/admin/config.yml` for the relay URL to configure.

## Deploying

1. **Settings → Pages → Source → GitHub Actions**.
2. **Settings → Secrets → Actions**, add `VITE_APPS_SCRIPT_URL`.
3. Push to `main` — it auto-deploys.

Using a custom domain? Change `base` in `vite.config.js` from
`'/stillwater-bakery/'` to `'/'`.

## Security

- `.env` is gitignored — never committed.
- Form-delivery config (`OWNER_EMAIL`, Instagram tokens) lives in Apps Script
  Script Properties, not in source.
- No payment data touches this app — orders are arranged directly with the
  bakery after the form is submitted.

## License

Proprietary. All rights reserved.
