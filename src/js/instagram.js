// ---------------------------------------------------------------------------
// Instagram feed (live)
// ---------------------------------------------------------------------------
// Fetches recent photos through the Apps Script backend, which proxies the
// Instagram Graph API so the access token never reaches the browser. Returns
// [] if unconfigured or on any failure — callers should keep their existing
// placeholder UI in that case.
// ---------------------------------------------------------------------------

const API_URL = import.meta.env.VITE_APPS_SCRIPT_URL || '';

export async function fetchInstagramFeed(limit = 4) {
  if (!API_URL) return [];
  try {
    const res = await fetch(`${API_URL}?action=instagramFeed&limit=${limit}`);
    const data = await res.json();
    return data.success ? data.items : [];
  } catch {
    return [];
  }
}
