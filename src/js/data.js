// ---------------------------------------------------------------------------
// Stillwater Bakery — Site Content (loader)
// ---------------------------------------------------------------------------
// The actual content lives as JSON files under /content, managed through the
// Sveltia CMS at /admin (edit in the browser, no code required). This module
// just loads those files at build time and exposes them to the pages.
//
//   content/menu/*.json      → one file per menu item
//   content/events/*.json    → one file per event
//   content/gallery.json     → { items: [{ imageUrl, caption }] }
//   content/settings/site.json → contact / social details
//
// To edit content, use /admin. To edit by hand, change the JSON files directly.
// ---------------------------------------------------------------------------

import galleryData from '../../content/gallery.json';
import siteData from '../../content/settings/site.json';

// Vite bundles every matching JSON file; `eager` inlines them at build time.
const menuFiles = import.meta.glob('../../content/menu/*.json', { eager: true, import: 'default' });
const eventFiles = import.meta.glob('../../content/events/*.json', { eager: true, import: 'default' });

const byOrder = (a, b) => (a.order ?? 999) - (b.order ?? 999);

export const MENU = Object.values(menuFiles).sort(byOrder);
export const EVENTS = Object.values(eventFiles).sort(byOrder);
export const GALLERY = galleryData.items || [];
export const SITE = siteData;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

// Menu grouped by category, preserving the order categories first appear.
export function menuByCategory(items = MENU) {
  const groups = new Map();
  items.forEach((item) => {
    const cat = item.category || 'Other';
    if (!groups.has(cat)) groups.set(cat, []);
    groups.get(cat).push(item);
  });
  return [...groups.entries()].map(([category, dishes]) => ({ category, dishes }));
}

export const upcomingEvents = (items = EVENTS) => items.filter((e) => !e.past);
export const pastEvents = (items = EVENTS) => items.filter((e) => e.past);
