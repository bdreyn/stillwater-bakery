import { renderNav, renderFooter } from '../js/router.js';
import { $, $$, initFadeIn, initBackToTop } from '../js/utils.js';
import { MENU } from '../js/data.js';

const BASE = import.meta.env.BASE_URL || '/';

function renderProductCard(p) {
  return `
    <div class="product-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 fade-in" data-category="${p.category}">
      <div class="aspect-[4/3] bg-linen overflow-hidden">
        ${p.imageUrl ? `<img src="${p.imageUrl}" alt="${p.name}" class="w-full h-full object-cover hover:scale-105 transition-transform duration-500" loading="lazy">` : ''}
      </div>
      <div class="p-5">
        <span class="text-xs text-sage font-medium uppercase tracking-wide">${p.category}</span>
        <h3 class="font-semibold text-bark mt-1">${p.name}</h3>
        <p class="text-bark-50 text-sm mt-1.5 line-clamp-2">${p.description || ''}</p>
        <div class="flex items-center justify-between mt-4">
          ${p.price != null ? `<span class="text-forest font-medium">$${Number(p.price).toFixed(2)}</span>` : '<span></span>'}
          <a href="${BASE}order.html" class="bg-sage text-cream text-sm px-4 py-1.5 rounded-full hover:bg-forest transition-colors duration-200">Order This</a>
        </div>
      </div>
    </div>
  `;
}

function setupFilters(products) {
  const categories = ['All', ...new Set(products.map(p => p.category).filter(Boolean))];
  const filterBar = $('#filter-bar');
  if (!filterBar) return;

  filterBar.innerHTML = categories.map(cat => `
    <button data-filter="${cat}" class="filter-btn px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${cat === 'All' ? 'bg-sage text-cream' : 'bg-linen text-forest hover:bg-sage/20'}">
      ${cat}
    </button>
  `).join('');

  filterBar.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    const filter = btn.dataset.filter;

    // Update active button
    $$('.filter-btn', filterBar).forEach(b => {
      b.className = b.className.replace(/bg-sage text-cream|bg-linen text-forest hover:bg-sage\/20/g, '');
      b.classList.add(b.dataset.filter === filter ? 'bg-sage' : 'bg-linen', b.dataset.filter === filter ? 'text-cream' : 'text-forest');
      if (b.dataset.filter !== filter) b.classList.add('hover:bg-sage/20');
    });

    // Filter cards
    $$('.product-card').forEach(card => {
      const show = filter === 'All' || card.dataset.category === filter;
      card.style.display = show ? '' : 'none';
    });
  });
}

function init() {
  renderNav('Menu');
  renderFooter();

  const main = $('#content');
  if (!main) return;

  main.innerHTML = `
    <section class="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      <div class="text-center mb-10 fade-in">
        <h1 class="text-3xl md:text-5xl font-light text-bark">Our Menu</h1>
        <p class="text-bark-50 mt-3 max-w-lg mx-auto">Everything made to order, from scratch, with seasonal ingredients.</p>
      </div>

      <div id="filter-bar" class="flex flex-wrap justify-center gap-2 mb-8 fade-in"></div>
      <div id="product-grid" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 fade-in-stagger">
        ${MENU.map(renderProductCard).join('')}
      </div>
    </section>

    <!-- Mobile sticky CTA -->
    <div class="md:hidden fixed bottom-4 left-4 right-4 z-40">
      <a href="${BASE}order.html" class="block bg-sage text-cream text-center font-medium py-3 rounded-full shadow-lg hover:bg-forest transition-colors">
        Ready to order?
      </a>
    </div>
  `;

  setupFilters(MENU);
  initFadeIn();
  initBackToTop();
}

document.addEventListener('DOMContentLoaded', init);
