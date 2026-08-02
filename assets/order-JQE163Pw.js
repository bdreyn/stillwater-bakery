import{r as c,a as m,$ as a,P as o,i as u,b,t as s}from"./utils-CX3gqYKq.js";import{s as f}from"./api-1QFzz9sZ.js";const p="/";function x(){c("How to Order"),m();const l=a("#content");if(!l)return;l.innerHTML=`
    <section class="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      <div class="text-center mb-12 fade-in">
        <h1 data-cms="order.hero.heading" class="text-3xl md:text-5xl font-light text-bark">${o.order.heroHeading}</h1>
        <p data-cms="order.intro" class="text-bark-50 mt-3">${o.order.intro}</p>
      </div>

      <!-- Steps Timeline -->
      <div class="max-w-xl mx-auto mb-16 fade-in">
        <div class="relative pl-12">
          <!-- Vertical line -->
          <div class="absolute left-[18px] top-2 bottom-2 w-[2px] bg-sage/30"></div>

          ${o.order.steps.map((t,r)=>`
            <div class="relative mb-8 last:mb-0">
              <div class="absolute -left-12 w-9 h-9 bg-sage text-cream rounded-full flex items-center justify-center font-semibold text-sm">${r+1}</div>
              <h3 data-cms="order.steps.${r}.title" class="font-semibold text-forest">${t.title}</h3>
              <p data-cms="order.steps.${r}.description" class="text-bark-50 text-sm mt-1">${t.description}</p>
            </div>
          `).join("")}
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
            <a href="${p}" class="inline-block mt-6 text-forest font-medium text-sm hover:underline">
              Back to Home
            </a>
          </div>
        </div>

        <!-- Notice -->
        <div data-cms="order.notice" class="mt-6 bg-cream border border-linen rounded-xl p-4 text-bark-50 text-sm fade-in">
          ${o.order.notice}
        </div>
      </div>
    </section>
  `,u(),b();const i=a("#date");if(i){const t=new Date;t.setDate(t.getDate()+3),i.min=t.toISOString().split("T")[0]}const e=a("#order-form");e.addEventListener("submit",async t=>{t.preventDefault();const r=a("#submit-btn");r.disabled=!0,r.textContent="Submitting...";const d={name:e.name.value.trim(),email:e.email.value.trim(),phone:e.phone.value.trim(),delivery:e.delivery.value,details:e.details.value.trim(),preferredDate:e.preferredDate.value};try{await f(d),e.classList.add("hidden"),a("#order-success").classList.remove("hidden"),s("Order submitted!")}catch(n){s(n.message||"Something went wrong. Please try again.","error"),r.disabled=!1,r.textContent="Submit Order"}})}document.addEventListener("DOMContentLoaded",x);
