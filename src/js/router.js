import { icons } from './icons.js';
import { SITE } from './data.js';

const BASE = import.meta.env.BASE_URL || '/';

const NAV_LINKS = [
  { label: 'Home', href: `${BASE}` },
  { label: 'Menu', href: `${BASE}menu.html` },
  { label: 'About', href: `${BASE}about.html` },
  { label: 'How to Order', href: `${BASE}order.html` },
  { label: 'Events', href: `${BASE}events.html` },
  { label: 'Gallery', href: `${BASE}gallery.html` },
  { label: 'Contact', href: `${BASE}contact.html` },
];

export function renderNav(currentPage) {
  const nav = document.getElementById('nav');
  if (!nav) return;

  nav.innerHTML = `
    <div class="sticky top-0 z-50 bg-cream/90 backdrop-blur-md border-b border-linen">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-20">
        <a href="${BASE}" class="flex items-center text-xl font-semibold text-bark tracking-tight" data-cms="site.logo">
          ${SITE.logo
            ? `<img src="${SITE.logo}" alt="Stillwater Bakery" class="h-12 w-auto">`
            : 'Stillwater Bakery'}
        </a>

        <!-- Desktop nav -->
        <div class="hidden md:flex items-center gap-6">
          ${NAV_LINKS.map(l => `
            <a href="${l.href}" class="text-sm ${l.label === currentPage ? 'text-forest border-b-2 border-sage pb-0.5' : 'text-bark-50 hover:text-forest transition-colors'}">${l.label}</a>
          `).join('')}
          <a href="${BASE}order.html" class="ml-2 bg-sage text-cream text-sm font-medium px-5 py-2 rounded-full hover:bg-forest transition-colors duration-200 hover:scale-[1.02]">Place an Order</a>
        </div>

        <!-- Mobile hamburger -->
        <button id="nav-toggle" class="md:hidden text-bark p-2" aria-label="Open menu">
          ${icons.menu}
        </button>
      </div>

      <!-- Mobile drawer -->
      <div id="nav-drawer" class="hidden md:hidden bg-cream border-t border-linen">
        <div class="px-4 py-4 space-y-2">
          ${NAV_LINKS.map(l => `
            <a href="${l.href}" class="block py-2.5 px-3 rounded-lg text-sm ${l.label === currentPage ? 'bg-sage/10 text-forest font-medium' : 'text-bark-50 hover:bg-linen/50'}">${l.label}</a>
          `).join('')}
          <a href="${BASE}order.html" class="block mt-3 bg-sage text-cream text-center text-sm font-medium px-5 py-3 rounded-full hover:bg-forest transition-colors">Place an Order</a>
        </div>
      </div>
    </div>
  `;

  // Toggle mobile menu
  const toggle = document.getElementById('nav-toggle');
  const drawer = document.getElementById('nav-drawer');
  if (toggle && drawer) {
    toggle.addEventListener('click', () => {
      const open = !drawer.classList.contains('hidden');
      drawer.classList.toggle('hidden');
      toggle.innerHTML = open ? icons.menu : icons.close;
    });
  }
}

export function renderFooter() {
  const footer = document.getElementById('footer');
  if (!footer) return;

  footer.innerHTML = `
    <div class="bg-bark text-cream/90">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div class="grid md:grid-cols-3 gap-8">
          <!-- Brand -->
          <div>
            <h3 class="text-lg font-semibold text-cream mb-2">
              ${SITE.logo
                ? `<img src="${SITE.logo}" alt="Stillwater Bakery" class="h-12 w-auto">`
                : 'Stillwater Bakery'}
            </h3>
            <p data-cms="footer.tagline" class="text-cream/60 text-sm leading-relaxed">${SITE.tagline}</p>
          </div>

          <!-- Links -->
          <div>
            <h4 class="text-sm font-medium text-cream mb-3">Pages</h4>
            <div class="space-y-2">
              ${NAV_LINKS.map(l => `<a href="${l.href}" class="block text-sm text-cream/60 hover:text-sage transition-colors">${l.label}</a>`).join('')}
            </div>
          </div>

          <!-- Social -->
          <div>
            <h4 class="text-sm font-medium text-cream mb-3">Follow Along</h4>
            <div class="flex gap-4">
              <a href="${SITE.instagramUrl}" target="_blank" rel="noopener" class="text-cream/60 hover:text-sage transition-colors" aria-label="Instagram">${icons.instagram}</a>
              <a href="${SITE.facebookUrl}" target="_blank" rel="noopener" class="text-cream/60 hover:text-sage transition-colors" aria-label="Facebook">${icons.facebook}</a>
            </div>
            <p class="text-cream/40 text-xs mt-6">${SITE.location}</p>
          </div>
        </div>

        <div class="border-t border-cream/10 mt-10 pt-6 text-center text-xs text-cream/40">
          &copy; ${new Date().getFullYear()} Stillwater Bakery. All rights reserved.
        </div>
      </div>
    </div>
  `;
}
