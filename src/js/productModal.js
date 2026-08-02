import { $ } from './utils.js';
import { icons } from './icons.js';

const BASE = import.meta.env.BASE_URL || '/';

// Shared "view item" modal used by any page that shows a grid of product
// cards (menu page, home page featured menu). Cards must carry a
// `data-index` attribute matching their position in the `products` array
// passed to setupProductModal, and a `data-order-link` attribute on any
// in-card link that should NOT open the modal (e.g. the Order This button).
export function renderProductModal() {
  return `
    <div id="product-modal" class="hidden fixed inset-0 z-50 items-center justify-center p-4">
      <div id="product-modal-backdrop" class="absolute inset-0 bg-bark/60"></div>
      <div class="relative bg-white rounded-2xl overflow-hidden shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <button id="product-modal-close" class="absolute top-3 right-3 z-10 bg-white/90 rounded-full p-1.5 text-bark hover:text-forest transition-colors" aria-label="Close">
          ${icons.close}
        </button>
        <div id="product-modal-image" class="aspect-[4/3] bg-linen overflow-hidden"></div>
        <div class="p-6">
          <span id="product-modal-category" class="text-xs text-sage font-medium uppercase tracking-wide"></span>
          <h3 id="product-modal-name" class="text-xl font-semibold text-bark mt-1"></h3>
          <p id="product-modal-description" class="text-bark-50 text-sm mt-3 leading-relaxed"></p>
          <div class="flex items-center justify-between mt-6">
            <span id="product-modal-price" class="text-forest font-medium"></span>
            <a href="${BASE}order.html" class="bg-sage text-cream text-sm px-4 py-1.5 rounded-full hover:bg-forest transition-colors duration-200">Order This</a>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function setupProductModal(products, gridSelector) {
  const modal = $('#product-modal');
  const grid = $(gridSelector);
  if (!modal || !grid) return;

  const open = (p) => {
    $('#product-modal-image').innerHTML = p.imageUrl
      ? `<img src="${p.imageUrl}" alt="${p.name}" class="w-full h-full object-cover">`
      : '';
    $('#product-modal-category').textContent = p.category || '';
    $('#product-modal-name').textContent = p.name;
    $('#product-modal-description').textContent = p.description || '';
    $('#product-modal-price').textContent = p.price != null ? `$${Number(p.price).toFixed(2)}` : '';
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.classList.add('overflow-hidden');
  };

  const close = () => {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.classList.remove('overflow-hidden');
  };

  grid.addEventListener('click', (e) => {
    if (e.target.closest('[data-order-link]')) return;
    const card = e.target.closest('[data-index]');
    if (!card) return;
    const p = products[Number(card.dataset.index)];
    if (p) open(p);
  });

  $('#product-modal-backdrop').addEventListener('click', close);
  $('#product-modal-close').addEventListener('click', close);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
}
