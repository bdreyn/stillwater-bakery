import { renderNav, renderFooter } from '../js/router.js';
import { $, initFadeIn, initBackToTop, toast } from '../js/utils.js';
import { submitOrder } from '../js/api.js';

function init() {
  renderNav('How to Order');
  renderFooter();

  const main = $('#content');
  if (!main) return;

  main.innerHTML = `
    <section class="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      <div class="text-center mb-12 fade-in">
        <h1 class="text-3xl md:text-5xl font-light text-bark">How to Order</h1>
        <p class="text-bark-50 mt-3">Four simple steps from craving to kitchen table.</p>
      </div>

      <!-- Steps Timeline -->
      <div class="max-w-xl mx-auto mb-16 fade-in">
        <div class="relative pl-12">
          <!-- Vertical line -->
          <div class="absolute left-[18px] top-2 bottom-2 w-[2px] bg-sage/30"></div>

          ${[
            { num: '1', title: 'Browse Our Menu', desc: 'Pick your favorites from our breads, pies, cookies, and seasonal specials.' },
            { num: '2', title: 'Submit Your Order', desc: 'Fill out the form below with what you’d like and when you need it.' },
            { num: '3', title: 'Receive Confirmation', desc: 'We’ll email you within 24 hours to confirm your order and total.' },
            { num: '4', title: 'Pick Up or Get Delivery', desc: 'Collect your freshly baked goodies or we’ll arrange local delivery.' },
          ].map(step => `
            <div class="relative mb-8 last:mb-0">
              <div class="absolute -left-12 w-9 h-9 bg-sage text-cream rounded-full flex items-center justify-center font-semibold text-sm">${step.num}</div>
              <h3 class="font-semibold text-forest">${step.title}</h3>
              <p class="text-bark-50 text-sm mt-1">${step.desc}</p>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Order Form -->
      <div class="max-w-xl mx-auto fade-in">
        <div class="bg-white rounded-2xl shadow-sm p-6 md:p-8">
          <h2 class="text-xl font-light text-bark mb-6">Place Your Order</h2>

          <form id="order-form" class="space-y-4">
            <div>
              <label for="name" class="block text-sm font-medium text-bark mb-1">Name *</label>
              <input type="text" id="name" name="name" required
                class="w-full bg-cream border border-linen rounded-lg px-4 py-3 text-bark placeholder:text-bark-30 focus:outline-none focus:ring-2 focus:ring-sage/50"
                placeholder="Your full name">
            </div>

            <div>
              <label for="email" class="block text-sm font-medium text-bark mb-1">Email *</label>
              <input type="email" id="email" name="email" required
                class="w-full bg-cream border border-linen rounded-lg px-4 py-3 text-bark placeholder:text-bark-30 focus:outline-none focus:ring-2 focus:ring-sage/50"
                placeholder="you@example.com">
            </div>

            <div>
              <label for="phone" class="block text-sm font-medium text-bark mb-1">Phone</label>
              <input type="tel" id="phone" name="phone"
                class="w-full bg-cream border border-linen rounded-lg px-4 py-3 text-bark placeholder:text-bark-30 focus:outline-none focus:ring-2 focus:ring-sage/50"
                placeholder="(555) 123-4567">
            </div>

            <div>
              <label for="delivery" class="block text-sm font-medium text-bark mb-1">Pickup or Delivery</label>
              <select id="delivery" name="delivery"
                class="w-full bg-cream border border-linen rounded-lg px-4 py-3 text-bark focus:outline-none focus:ring-2 focus:ring-sage/50">
                <option value="pickup">Pickup</option>
                <option value="delivery">Local Delivery</option>
              </select>
            </div>

            <div>
              <label for="details" class="block text-sm font-medium text-bark mb-1">What would you like to order? *</label>
              <textarea id="details" name="details" rows="4" required
                class="w-full bg-cream border border-linen rounded-lg px-4 py-3 text-bark placeholder:text-bark-30 focus:outline-none focus:ring-2 focus:ring-sage/50 resize-none"
                placeholder="e.g. 1 Sourdough Loaf, 1 dozen Chocolate Chip Cookies, 1 Pecan Pie"></textarea>
            </div>

            <div>
              <label for="date" class="block text-sm font-medium text-bark mb-1">Preferred Date</label>
              <input type="date" id="date" name="preferredDate"
                class="w-full bg-cream border border-linen rounded-lg px-4 py-3 text-bark focus:outline-none focus:ring-2 focus:ring-sage/50">
            </div>

            <button type="submit" id="submit-btn"
              class="w-full bg-sage text-cream font-medium py-3 rounded-full hover:bg-forest transition-all duration-200 hover:scale-[1.02] mt-2">
              Submit Order
            </button>
          </form>

          <!-- Success state (hidden by default) -->
          <div id="order-success" class="hidden text-center py-8">
            <div class="w-16 h-16 bg-sage/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-sage" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" d="M5 13l4 4L19 7"/></svg>
            </div>
            <h3 class="text-lg font-semibold text-bark">Thank you!</h3>
            <p class="text-bark-50 text-sm mt-2">We'll confirm your order within 24 hours. Check your email for details.</p>
          </div>
        </div>

        <!-- Notice -->
        <div class="mt-6 bg-cream border border-linen rounded-xl p-4 text-bark-50 text-sm fade-in">
          All orders require <strong class="text-bark">48–72 hours notice</strong>.
          We'll confirm availability and your total by email, then collect
          payment (cash or Venmo) at pickup or delivery.
        </div>
      </div>
    </section>
  `;

  initFadeIn();
  initBackToTop();

  // Set min date to 3 days from now
  const dateInput = $('#date');
  if (dateInput) {
    const min = new Date();
    min.setDate(min.getDate() + 3);
    dateInput.min = min.toISOString().split('T')[0];
  }

  // Form submission
  const form = $('#order-form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = $('#submit-btn');
    btn.disabled = true;
    btn.textContent = 'Submitting...';

    const data = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      phone: form.phone.value.trim(),
      delivery: form.delivery.value,
      details: form.details.value.trim(),
      preferredDate: form.preferredDate.value,
    };

    try {
      await submitOrder(data);
      form.classList.add('hidden');
      $('#order-success').classList.remove('hidden');
      toast('Order submitted!');
    } catch (err) {
      toast(err.message || 'Something went wrong. Please try again.', 'error');
      btn.disabled = false;
      btn.textContent = 'Submit Order';
    }
  });
}

document.addEventListener('DOMContentLoaded', init);
