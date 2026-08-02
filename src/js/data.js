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
import announcementData from '../../content/settings/announcement.json';

import homePage from '../../content/pages/home.json';
import aboutPage from '../../content/pages/about.json';
import orderPage from '../../content/pages/order.json';
import menuPage from '../../content/pages/menu.json';
import eventsPage from '../../content/pages/events.json';
import galleryPage from '../../content/pages/gallery.json';
import contactPage from '../../content/pages/contact.json';

// Vite bundles every matching JSON file; `eager` inlines them at build time.
const menuFiles = import.meta.glob('../../content/menu/*.json', { eager: true, import: 'default' });
const eventFiles = import.meta.glob('../../content/events/*.json', { eager: true, import: 'default' });

const byOrder = (a, b) => (a.order ?? 999) - (b.order ?? 999);
const byDate = (a, b) => new Date(a.date) - new Date(b.date);

export const MENU = Object.values(menuFiles).sort(byOrder);
export const EVENTS = Object.values(eventFiles).sort(byDate);
export const GALLERY = galleryData.items || [];
export const SITE = siteData;
export const ANNOUNCEMENT = announcementData;

export const PAGES = {
  home: homePage,
  about: aboutPage,
  order: orderPage,
  menu: menuPage,
  events: eventsPage,
  gallery: galleryPage,
  contact: contactPage,
};

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

// An event is "past" once its date is before today — no manual flag needed.
function isPastEvent(e) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(e.date) < today;
}

// Soonest first; EVENTS is already date-sorted ascending.
export const upcomingEvents = (items = EVENTS) => items.filter((e) => !isPastEvent(e));
// Most recently past first.
export const pastEvents = (items = EVENTS) => items.filter(isPastEvent).reverse();

// Items shown in the home page's "This Week's Menu" section. Unset `featured`
// defaults to shown, so existing items don't disappear when the field is added.
export const featuredMenu = (items = MENU) => items.filter((m) => m.featured !== false);
