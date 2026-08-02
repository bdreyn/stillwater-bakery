import { icons } from './icons.js';
import { toast } from './utils.js';
import { getCart, getCount, getSubtotal, updateQty, removeFromCart, onCartChange, addToCart } from './cart.js';

const BASE = import.meta.env.BASE_URL || '/';

function renderDrawer() {
  if (document.getElementById('cart-drawer')) return;

  const wrap = document.createElement('div');
  wrap.innerHTML = `
    <div id="cart-drawer-backdrop" class="hidden fixed inset-0 bg-bark/60 z-50"></div>
    <aside id="cart-drawer" class="fixed top-0 right-0 h-full w-full sm:w-96 bg-white z-50 translate-x-full transition-transform duration-300 shadow-xl flex flex-col">
      <div class="flex items-center justify-between p-5 border-b border-linen">
        <h3 class="font-semibold text-bark text-lg">Your Cart</h3>
        <button id="cart-drawer-close" class="text-bark hover:text-forest transition-colors" aria-label="Close cart">${icons.close}</button>
      </div>
      <div id="cart-items" class="flex-1 overflow-y-auto p-5 space-y-5"></div>
      <div class="p-5 border-t border-linen">
        <div class="flex items-center justify-between mb-4">
          <span class="text-bark-50 text-sm">Subtotal</span>
          <span id="cart-subtotal" class="text-forest font-semibold"></span>
        </div>
        <a href="${BASE}order.html" id="cart-checkout" class="block w-full text-center bg-sage text-cream font-medium py-3 rounded-full hover:bg-forest transition-all duration-200">
          Continue to Order Form
        </a>
      </div>
    </aside>
  `;
  document.body.append(...wrap.childNodes);
}

function renderItems() {
  const items = getCart();
  const list = document.getElementById('cart-items');
  const checkout = document.getElementById('cart-checkout');
  if (!list) return;

  if (!items.length) {
    list.innerHTML = `
      <div class="text-center py-12">
        <p class="text-bark-50 text-sm">Your cart is empty.</p>
        <a href="${BASE}menu.html" class="inline-block mt-3 text-forest font-medium text-sm hover:underline">Browse the menu</a>
      </div>
    `;
    if (checkout) checkout.classList.add('pointer-events-none', 'opacity-40');
  } else {
    list.innerHTML = items.map((i) => `
      <div class="flex gap-3" data-name="${i.name}">
        <div class="flex-1">
          <p class="text-sm font-medium text-bark">${i.name}</p>
          ${i.price != null ? `<p class="text-xs text-bark-50">$${Number(i.price).toFixed(2)} each</p>` : ''}
          <div class="flex items-center gap-2 mt-2">
            <button class="cart-qty-minus w-7 h-7 rounded-full bg-linen flex items-center justify-center text-bark hover:bg-sage/20 transition-colors" aria-label="Decrease quantity">${icons.minus}</button>
            <span class="text-sm w-5 text-center">${i.qty}</span>
            <button class="cart-qty-plus w-7 h-7 rounded-full bg-linen flex items-center justify-center text-bark hover:bg-sage/20 transition-colors" aria-label="Increase quantity">${icons.plus}</button>
          </div>
        </div>
        <button class="cart-remove text-bark-30 hover:text-red-500 transition-colors" aria-label="Remove ${i.name}">${icons.trash}</button>
      </div>
    `).join('');
    if (checkout) checkout.classList.remove('pointer-events-none', 'opacity-40');
  }

  const subtotalEl = document.getElementById('cart-subtotal');
  if (subtotalEl) subtotalEl.textContent = `$${getSubtotal().toFixed(2)}`;
}

function renderBadges() {
  const count = getCount();
  document.querySelectorAll('.cart-badge').forEach((el) => {
    el.textContent = count;
    el.classList.toggle('hidden', count === 0);
  });
}

function openDrawer() {
  document.getElementById('cart-drawer-backdrop').classList.remove('hidden');
  document.getElementById('cart-drawer').classList.remove('translate-x-full');
  document.body.classList.add('overflow-hidden');
}

function closeDrawer() {
  document.getElementById('cart-drawer-backdrop').classList.add('hidden');
  document.getElementById('cart-drawer').classList.add('translate-x-full');
  document.body.classList.remove('overflow-hidden');
}

export function cartButtonHtml(extraClass = '') {
  return `
    <button class="cart-toggle relative text-bark hover:text-forest transition-colors ${extraClass}" aria-label="Open cart">
      ${icons.cart}
      <span class="cart-badge hidden absolute -top-1.5 -right-1.5 bg-sage text-cream text-[10px] font-semibold w-4 h-4 rounded-full flex items-center justify-center">0</span>
    </button>
  `;
}

// Wires "Add to Cart" buttons (marked with data-add-to-cart + data-index)
// within a product grid to the shared cart. Used by product cards on the
// menu page and homepage — separate from the click-to-view modal, which
// ignores these buttons via the same data-add-to-cart attribute.
export function wireAddToCart(gridSelector, products) {
  const grid = document.querySelector(gridSelector);
  if (!grid) return;

  grid.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-add-to-cart]');
    if (!btn) return;
    const p = products[Number(btn.dataset.index)];
    if (!p) return;
    addToCart(p, 1);
    toast(`Added ${p.name} to cart`);
  });
}

let initialized = false;

export function initCartUI() {
  renderDrawer();
  renderItems();
  renderBadges();

  document.querySelectorAll('.cart-toggle').forEach((btn) => {
    btn.addEventListener('click', openDrawer);
  });

  if (initialized) return;
  initialized = true;

  document.getElementById('cart-drawer-close').addEventListener('click', closeDrawer);
  document.getElementById('cart-drawer-backdrop').addEventListener('click', closeDrawer);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDrawer();
  });

  document.getElementById('cart-items').addEventListener('click', (e) => {
    const row = e.target.closest('[data-name]');
    if (!row) return;
    const name = row.dataset.name;
    const items = getCart();
    const item = items.find((i) => i.name === name);
    if (!item) return;

    if (e.target.closest('.cart-qty-plus')) updateQty(name, item.qty + 1);
    else if (e.target.closest('.cart-qty-minus')) updateQty(name, item.qty - 1);
    else if (e.target.closest('.cart-remove')) removeFromCart(name);
  });

  onCartChange(() => {
    renderItems();
    renderBadges();
  });
}
