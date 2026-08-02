import { renderNav, renderFooter } from '../js/router.js';
import { $, initFadeIn, initBackToTop, renderAnnouncement } from '../js/utils.js';
import { icons } from '../js/icons.js';
import { SITE, PAGES, upcomingEvents, featuredMenu } from '../js/data.js';
import { fetchInstagramFeed } from '../js/instagram.js';

const BASE = import.meta.env.BASE_URL || '/';

function renderMenuCard(item) {
  return `
    <div class="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 fade-in">
      <div class="aspect-[4/3] bg-linen overflow-hidden">
        ${item.imageUrl ? `<img src="${item.imageUrl}" alt="${item.name}" class="w-full h-full object-cover hover:scale-105 transition-transform duration-500" loading="lazy">` : ''}
      </div>
      <div class="p-5">
        <span class="text-xs text-sage font-medium uppercase tracking-wide">${item.category}</span>
        <h3 class="font-semibold text-bark mt-1">${item.name}</h3>
        <p class="text-bark-50 text-sm mt-1.5 line-clamp-2">${item.description || ''}</p>
      </div>
    </div>
  `;
}

function renderEventPreview(e) {
  return `
    <div class="bg-white rounded-xl p-5 border-l-4 border-sage fade-in">
      <h4 class="font-semibold text-bark">${e.title}</h4>
      <p class="text-forest text-sm mt-1">${icons.clock} ${e.date}${e.time ? ' · ' + e.time : ''}</p>
      <p class="text-bark-50 text-sm mt-1">${icons.mapPin} ${e.venue || ''}${e.city ? ', ' + e.city : ''}</p>
    </div>
  `;
}

function init() {
  renderNav('Home');
  renderFooter();

  const main = $('#content');
  if (!main) return;

  const upcoming = upcomingEvents().slice(0, 3);

  main.innerHTML = `
    ${renderAnnouncement()}

    <!-- Hero -->
    <section data-cms="home.hero" class="relative overflow-hidden fade-in"${PAGES.home.heroImage ? ` style="background-image:url('${PAGES.home.heroImage}');background-size:cover;background-position:center;"` : ''}>
      ${PAGES.home.heroImage ? '<div class="absolute inset-0 bg-cream/80"></div>' : ''}
      <div class="relative max-w-4xl mx-auto px-4 sm:px-6 py-20 md:py-32 text-center">
        <h1 data-cms="home.hero.heading" class="text-4xl md:text-6xl font-light text-bark tracking-tight leading-tight">
          ${PAGES.home.heroHeading}
        </h1>
        <p data-cms="home.hero.subtext" class="text-bark-50 text-lg mt-6 max-w-xl mx-auto leading-relaxed">
          ${PAGES.home.heroSubtext}
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center mt-10">
          <a href="${BASE}menu.html" class="bg-sage text-cream font-medium px-8 py-3 rounded-full hover:bg-forest transition-all duration-200 hover:scale-[1.02]">
            See the Menu
          </a>
          <a href="${BASE}order.html" class="border-2 border-forest text-forest font-medium px-8 py-3 rounded-full hover:bg-forest hover:text-cream transition-all duration-200">
            Place an Order
          </a>
        </div>
      </div>
    </section>

    <!-- Current Menu (text only) -->
    <section class="max-w-5xl mx-auto px-4 sm:px-6 py-16 fade-in">
      <div class="text-center mb-12">
        <h2 data-cms="home.menu.heading" class="text-2xl md:text-3xl font-light text-bark">${PAGES.home.menuHeading}</h2>
        <p data-cms="home.menu.intro" class="text-bark-50 mt-3 max-w-lg mx-auto">${PAGES.home.menuIntro}</p>
      </div>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 fade-in-stagger">
        ${featuredMenu().map(renderMenuCard).join('')}
      </div>
      <div class="text-center mt-12">
        <a href="${BASE}order.html" class="inline-block bg-sage text-cream font-medium px-8 py-3 rounded-full hover:bg-forest transition-all duration-200 hover:scale-[1.02]">
          Order From This Menu ${icons.arrowRight}
        </a>
      </div>
    </section>

    <!-- About Snippet -->
    <section class="max-w-6xl mx-auto px-4 sm:px-6 py-16 fade-in">
      <div class="grid md:grid-cols-2 gap-10 items-center">
        <div class="aspect-square bg-linen rounded-2xl overflow-hidden">
          ${PAGES.home.aboutImage
            ? `<img src="${PAGES.home.aboutImage}" alt="" class="w-full h-full object-cover">`
            : ''}
        </div>
        <div class="border-l-4 border-sage pl-6">
          <p data-cms="home.about.text" class="text-bark-50 leading-relaxed">
            ${PAGES.home.aboutText}
          </p>
          <a href="${BASE}about.html" class="inline-block mt-4 text-forest font-medium text-sm hover:underline">
            Meet the Baker ${icons.arrowRight}
          </a>
        </div>
      </div>
    </section>

    <!-- Upcoming Events -->
    <section class="bg-linen/50 fade-in">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <h2 data-cms="home.events.heading" class="text-2xl md:text-3xl font-light text-bark mb-8">${PAGES.home.eventsHeading}</h2>
        <div id="upcoming-events">
          ${upcoming.length
            ? `<div class="grid md:grid-cols-3 gap-4 fade-in-stagger">${upcoming.map(renderEventPreview).join('')}</div>`
            : `<p class="text-bark-50 text-sm">No upcoming events — check back soon!</p>`}
        </div>
        <div class="mt-6">
          <a href="${BASE}events.html" class="text-forest text-sm font-medium hover:underline">
            See all events ${icons.arrowRight}
          </a>
        </div>
      </div>
    </section>

    <!-- Instagram Teaser -->
    <section class="max-w-6xl mx-auto px-4 sm:px-6 py-16 text-center fade-in">
      <h2 class="text-2xl font-light text-bark mb-8">Follow Along <span class="text-sage">${SITE.instagram}</span></h2>
      <div id="instagram-feed" class="grid grid-cols-2 md:grid-cols-4 gap-3">
        ${Array.from({ length: 4 }, () => '<div class="aspect-square bg-linen rounded-xl"></div>').join('')}
      </div>
      <a href="${SITE.instagramUrl}" target="_blank" rel="noopener" class="inline-flex items-center gap-2 text-sage font-medium text-sm mt-6 hover:text-forest transition-colors">
        ${icons.instagram} Follow on Instagram
      </a>
    </section>
  `;

  initFadeIn();
  initBackToTop();
  loadInstagramFeed();
}

// Progressively swaps the placeholder tiles for real photos. Leaves the
// placeholders in place if Instagram isn't configured or the fetch fails.
async function loadInstagramFeed() {
  const container = $('#instagram-feed');
  if (!container) return;

  const items = await fetchInstagramFeed(4);
  if (!items.length) return;

  container.innerHTML = items.map(item => `
    <a href="${item.permalink}" target="_blank" rel="noopener" class="group relative aspect-square overflow-hidden rounded-xl bg-linen block">
      <img src="${item.mediaUrl}" alt="${(item.caption || 'Instagram photo').slice(0, 100)}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy">
    </a>
  `).join('');
}

document.addEventListener('DOMContentLoaded', init);
