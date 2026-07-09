import { renderNav, renderFooter } from '../js/router.js';
import { $, initFadeIn, initBackToTop } from '../js/utils.js';
import { icons } from '../js/icons.js';
import { upcomingEvents, pastEvents } from '../js/data.js';

function renderEventCard(e, past = false) {
  const muted = past ? 'opacity-50' : '';
  const border = past ? 'border-bark-30' : 'border-sage';
  return `
    <div class="bg-white rounded-xl p-6 border-l-4 ${border} ${muted} fade-in">
      <h3 class="font-semibold text-bark">${e.title}</h3>
      <div class="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm">
        <span class="text-forest">${icons.clock} ${e.date || ''}${e.time ? ' · ' + e.time : ''}</span>
        <span class="text-bark-50">${icons.mapPin} ${e.venue || ''}${e.city ? ', ' + e.city : ''}</span>
      </div>
      <p class="text-bark-50 text-sm mt-3">${e.description || ''}</p>
    </div>
  `;
}

function init() {
  renderNav('Events');
  renderFooter();

  const main = $('#content');
  if (!main) return;

  const upcoming = upcomingEvents();
  const past = pastEvents();

  main.innerHTML = `
    <section class="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      <div class="text-center mb-10 fade-in">
        <h1 class="text-3xl md:text-5xl font-light text-bark">Find Stillwater Bakery Near You</h1>
        <p class="text-bark-50 mt-3 max-w-lg mx-auto">We pop up at local markets, farms, and community events across Texas. Check back often — we're always somewhere new.</p>
      </div>

      ${upcoming.length ? `
        <h2 class="text-xl font-light text-bark mb-4 fade-in">Upcoming Events</h2>
        <div class="space-y-4 fade-in-stagger mb-12">
          ${upcoming.map(e => renderEventCard(e, false)).join('')}
        </div>
      ` : `
        <p class="text-bark-50 text-center py-8 fade-in">No upcoming events right now — check back soon!</p>
      `}

      ${past.length ? `
        <h2 class="text-xl font-light text-bark-50 mb-4 mt-12 fade-in">Past Events</h2>
        <div class="space-y-4 fade-in-stagger">
          ${past.map(e => renderEventCard(e, true)).join('')}
        </div>
      ` : ''}
    </section>
  `;

  initFadeIn();
  initBackToTop();
}

document.addEventListener('DOMContentLoaded', init);
