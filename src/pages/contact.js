import { renderNav, renderFooter } from '../js/router.js';
import { $, initFadeIn, initBackToTop, toast } from '../js/utils.js';
import { icons } from '../js/icons.js';
import { submitOrder } from '../js/api.js';
import { SITE, PAGES } from '../js/data.js';

function init() {
  renderNav('Contact');
  renderFooter();

  const main = $('#content');
  if (!main) return;

  main.innerHTML = `
    <section class="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      <div class="text-center mb-12 fade-in">
        <h1 data-cms="contact.hero.heading" class="text-3xl md:text-5xl font-light text-bark">${PAGES.contact.heroHeading}</h1>
        <p data-cms="contact.intro" class="text-bark-50 mt-3">${PAGES.contact.intro}</p>
      </div>

      <div class="grid md:grid-cols-2 gap-10">
        <!-- Contact Info -->
        <div class="space-y-8 fade-in">
          <div class="flex items-start gap-4">
            <span class="text-sage mt-0.5">${icons.mail}</span>
            <div>
              <h3 class="font-medium text-bark text-sm">Email</h3>
              <p class="text-bark-50 text-sm">${SITE.email}</p>
            </div>
          </div>

          <div class="flex items-start gap-4">
            <span class="text-sage mt-0.5">${icons.instagram}</span>
            <div>
              <h3 class="font-medium text-bark text-sm">Instagram</h3>
              <p class="text-bark-50 text-sm">${SITE.instagram}</p>
            </div>
          </div>

          <div class="flex items-start gap-4">
            <span class="text-sage mt-0.5">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"/><circle cx="12" cy="10" r="3"/></svg>
            </span>
            <div>
              <h3 class="font-medium text-bark text-sm">Location</h3>
              <p class="text-bark-50 text-sm">${SITE.location}</p>
            </div>
          </div>

          <!-- Map placeholder -->
          <div class="bg-linen rounded-xl aspect-video flex items-center justify-center">
            <p class="text-bark-50 text-sm">Map coming soon</p>
          </div>
        </div>

        <!-- Contact Form -->
        <div class="fade-in">
          <form id="contact-form" class="bg-white rounded-2xl shadow-sm p-6 space-y-4">
            <div>
              <label for="c-name" class="block text-sm font-medium text-bark mb-1">Name *</label>
              <input type="text" id="c-name" name="name" required
                class="w-full bg-cream border border-linen rounded-lg px-4 py-3 text-bark placeholder:text-bark-30 focus:outline-none focus:ring-2 focus:ring-sage/50"
                placeholder="Your name">
            </div>

            <div>
              <label for="c-email" class="block text-sm font-medium text-bark mb-1">Email *</label>
              <input type="email" id="c-email" name="email" required
                class="w-full bg-cream border border-linen rounded-lg px-4 py-3 text-bark placeholder:text-bark-30 focus:outline-none focus:ring-2 focus:ring-sage/50"
                placeholder="you@example.com">
            </div>

            <div>
              <label for="c-message" class="block text-sm font-medium text-bark mb-1">Message *</label>
              <textarea id="c-message" name="message" rows="5" required
                class="w-full bg-cream border border-linen rounded-lg px-4 py-3 text-bark placeholder:text-bark-30 focus:outline-none focus:ring-2 focus:ring-sage/50 resize-none"
                placeholder="What's on your mind?"></textarea>
            </div>

            <button type="submit" id="contact-btn"
              class="w-full bg-sage text-cream font-medium py-3 rounded-full hover:bg-forest transition-all duration-200 hover:scale-[1.02]">
              Send Message
            </button>
          </form>

          <div id="contact-success" class="hidden bg-white rounded-2xl shadow-sm p-8 text-center">
            <div class="w-16 h-16 bg-sage/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-sage" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" d="M5 13l4 4L19 7"/></svg>
            </div>
            <h3 class="text-lg font-semibold text-bark">Message sent!</h3>
            <p class="text-bark-50 text-sm mt-2">Thanks for reaching out. We'll get back to you soon.</p>
          </div>
        </div>
      </div>
    </section>
  `;

  initFadeIn();
  initBackToTop();

  const form = $('#contact-form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = $('#contact-btn');
    btn.disabled = true;
    btn.textContent = 'Sending...';

    try {
      await submitOrder({
        name: form.name.value.trim(),
        email: form.email.value.trim(),
        details: '[Contact Form Message] ' + form.message.value.trim(),
        phone: '',
        delivery: 'inquiry',
      });
      form.classList.add('hidden');
      $('#contact-success').classList.remove('hidden');
      toast('Message sent!');
    } catch (err) {
      toast(err.message || 'Failed to send. Please try again.', 'error');
      btn.disabled = false;
      btn.textContent = 'Send Message';
    }
  });
}

document.addEventListener('DOMContentLoaded', init);
