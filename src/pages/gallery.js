import { renderNav, renderFooter } from '../js/router.js';
import { $, initFadeIn, initBackToTop } from '../js/utils.js';
import { icons } from '../js/icons.js';
import { GALLERY, SITE, PAGES } from '../js/data.js';

const ASPECTS = ['aspect-square', 'aspect-[3/4]', 'aspect-[4/3]', 'aspect-square', 'aspect-[4/3]', 'aspect-[3/4]'];

function renderGalleryItem(item, index) {
  const aspect = ASPECTS[index % ASPECTS.length];
  return `
    <div class="group relative overflow-hidden rounded-xl ${aspect} bg-linen fade-in cursor-pointer">
      ${item.imageUrl ? `<img src="${item.imageUrl}" alt="${item.caption || 'Bakery photo'}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy">` : ''}
      <div class="absolute inset-0 bg-sage/0 group-hover:bg-sage/20 transition-colors duration-300"></div>
      ${item.caption ? `<div class="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-bark/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"><p class="text-cream text-sm">${item.caption}</p></div>` : ''}
    </div>
  `;
}

function galleryTiles() {
  if (GALLERY.length > 0) {
    return GALLERY.map(renderGalleryItem).join('');
  }
  // Fall back to empty placeholder tiles when no photos are configured.
  return Array.from({ length: 9 }, (_, i) =>
    renderGalleryItem({ imageUrl: null, caption: null }, i)
  ).join('');
}

function init() {
  renderNav('Gallery');
  renderFooter();

  const main = $('#content');
  if (!main) return;

  main.innerHTML = `
    <section class="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      <div class="text-center mb-10 fade-in">
        <h1 data-cms="gallery.hero.heading" class="text-3xl md:text-5xl font-light text-bark">${PAGES.gallery.heroHeading}</h1>
      </div>

      <div id="gallery-grid" class="grid grid-cols-2 md:grid-cols-3 gap-3 fade-in-stagger">
        ${galleryTiles()}
      </div>

      <div class="text-center mt-10 fade-in">
        <a href="${SITE.instagramUrl}" target="_blank" rel="noopener" class="inline-flex items-center gap-2 text-sage font-medium hover:text-forest transition-colors">
          ${icons.instagram} Follow us on Instagram → ${SITE.instagram}
        </a>
      </div>
    </section>
  `;

  initFadeIn();
  initBackToTop();
}

document.addEventListener('DOMContentLoaded', init);
