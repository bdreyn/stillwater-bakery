// Cart persisted in localStorage so it survives navigating between pages.
// Items are keyed by dish name (unique across the menu).

const KEY = 'stillwater_cart_v1';

function read() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
}

function write(items) {
  localStorage.setItem(KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent('cart:change', { detail: items }));
}

export function getCart() {
  return read();
}

export function addToCart(item, qty = 1) {
  const items = read();
  const existing = items.find((i) => i.name === item.name);
  if (existing) existing.qty += qty;
  else items.push({ name: item.name, price: item.price ?? null, qty });
  write(items);
}

export function updateQty(name, qty) {
  let items = read();
  if (qty <= 0) {
    items = items.filter((i) => i.name !== name);
  } else {
    const existing = items.find((i) => i.name === name);
    if (existing) existing.qty = qty;
  }
  write(items);
}

export function removeFromCart(name) {
  write(read().filter((i) => i.name !== name));
}

export function clearCart() {
  write([]);
}

export function getCount() {
  return read().reduce((sum, i) => sum + i.qty, 0);
}

export function getSubtotal() {
  return read().reduce((sum, i) => sum + (i.price || 0) * i.qty, 0);
}

// Plain-text summary dropped into the order form's details textarea.
export function formatOrderText() {
  return read().map((i) => `${i.qty}x ${i.name}`).join('\n');
}

// Fires on every mutation, in this tab (cart:change) and other tabs (storage).
export function onCartChange(callback) {
  window.addEventListener('cart:change', () => callback(read()));
  window.addEventListener('storage', (e) => {
    if (e.key === KEY) callback(read());
  });
}
