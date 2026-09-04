import { $, toast, md } from './utils.js';
import { icons } from './icons.js';
import { addToCart } from './cart.js';

// Shared "view item" modal used by any page that shows a grid of product
// cards (menu page, home page featured menu). Cards must carry a
// `data-index` attribute matching their position in the `products` array
// passed to setupProductModal, and a `data-order-link` or `data-add-to-cart`
// attribute on any in-card control that should NOT open the modal.
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
            <div class="flex items-center gap-3">
              <div class="flex items-center gap-2">
                <button id="product-modal-qty-minus" class="w-8 h-8 rounded-full bg-linen flex items-center justify-center text-bark hover:bg-sage/20 transition-colors" aria-label="Decrease quantity">${icons.minus}</button>
                <span id="product-modal-qty" class="text-sm w-4 text-center">1</span>
                <button id="product-modal-qty-plus" class="w-8 h-8 rounded-full bg-linen flex items-center justify-center text-bark hover:bg-sage/20 transition-colors" aria-label="Increase quantity">${icons.plus}</button>
              </div>
              <button id="product-modal-add" class="bg-sage text-cream text-sm px-4 py-1.5 rounded-full hover:bg-forest transition-colors duration-200">Add to Cart</button>
            </div>
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

  let current = null;
  let qty = 1;

  const renderQty = () => {
    $('#product-modal-qty').textContent = qty;
  };

  const open = (p) => {
    current = p;
    qty = 1;
    renderQty();
    $('#product-modal-image').innerHTML = p.imageUrl
      ? `<img src="${p.imageUrl}" alt="${p.name}" class="w-full h-full object-cover">`
      : '';
    $('#product-modal-category').textContent = p.category || '';
    $('#product-modal-name').textContent = p.name;
    $('#product-modal-description').innerHTML = md(p.description);
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
    if (e.target.closest('[data-order-link], [data-add-to-cart]')) return;
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

  $('#product-modal-qty-plus').addEventListener('click', () => {
    qty += 1;
    renderQty();
  });
  $('#product-modal-qty-minus').addEventListener('click', () => {
    qty = Math.max(1, qty - 1);
    renderQty();
  });
  $('#product-modal-add').addEventListener('click', () => {
    if (!current) return;
    addToCart(current, qty);
    toast(`Added ${qty} × ${current.name} to cart`);
    close();
  });
}
