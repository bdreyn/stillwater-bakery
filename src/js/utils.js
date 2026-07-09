// ---------------------------------------------------------------------------
// DOM helpers
// ---------------------------------------------------------------------------
export const $ = (sel, root = document) => root.querySelector(sel);
export const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

// ---------------------------------------------------------------------------
// Scroll-triggered fade-in
// ---------------------------------------------------------------------------
export function initFadeIn() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  $$('.fade-in').forEach(el => observer.observe(el));
}

// ---------------------------------------------------------------------------
// Toast notifications
// ---------------------------------------------------------------------------
export function toast(message, type = 'success') {
  const bg = type === 'success' ? 'bg-sage' : type === 'error' ? 'bg-red-500' : 'bg-forest';
  const el = document.createElement('div');
  el.className = `toast ${bg}`;
  el.textContent = message;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 3200);
}

// ---------------------------------------------------------------------------
// Back to top button
// ---------------------------------------------------------------------------
export function initBackToTop() {
  const btn = document.createElement('button');
  btn.className = 'fixed bottom-6 left-6 w-12 h-12 bg-forest text-cream rounded-full shadow-lg flex items-center justify-center opacity-0 pointer-events-none transition-opacity duration-300 hover:bg-sage z-40';
  btn.setAttribute('aria-label', 'Back to top');
  btn.innerHTML = `<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7"/></svg>`;
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  document.body.appendChild(btn);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      btn.classList.remove('opacity-0', 'pointer-events-none');
      btn.classList.add('opacity-100');
    } else {
      btn.classList.add('opacity-0', 'pointer-events-none');
      btn.classList.remove('opacity-100');
    }
  });
}

// ---------------------------------------------------------------------------
// Announcement bar
// ---------------------------------------------------------------------------
export function renderAnnouncement() {
  if (sessionStorage.getItem('sw_announce_dismissed')) return '';
  return `
    <div id="announce" class="bg-sage text-cream text-center text-sm py-2.5 px-4 relative">
      <span>🌸 Now taking orders for Spring — slots are limited!</span>
      <button onclick="document.getElementById('announce').remove(); sessionStorage.setItem('sw_announce_dismissed','1')"
        class="absolute right-4 top-1/2 -translate-y-1/2 text-cream/70 hover:text-cream text-lg leading-none" aria-label="Dismiss">&times;</button>
    </div>
  `;
}
