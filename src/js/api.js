// ---------------------------------------------------------------------------
// Order / inquiry submission
// ---------------------------------------------------------------------------
// The site is static (GitHub Pages), so form submissions are POSTed to a small
// Google Apps Script Web App that logs the order and emails the bakery.
// See apps-script/SETUP.md for how to deploy it and get the URL below.
// ---------------------------------------------------------------------------

const API_URL = import.meta.env.VITE_APPS_SCRIPT_URL || '';

export function submitOrder(orderData) {
  if (!API_URL) {
    return Promise.reject(
      new Error('VITE_APPS_SCRIPT_URL is not configured. See apps-script/SETUP.md.')
    );
  }

  // text/plain avoids a CORS preflight against the Apps Script endpoint.
  return fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain' },
    body: JSON.stringify({ action: 'submitOrder', ...orderData }),
    redirect: 'follow',
  })
    .then((res) => res.json())
    .then((data) => {
      if (!data.success) throw new Error(data.error || 'Request failed');
      return data;
    });
}
