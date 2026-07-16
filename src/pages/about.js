import { renderNav, renderFooter } from '../js/router.js';
import { $, initFadeIn, initBackToTop } from '../js/utils.js';

function init() {
  renderNav('About');
  renderFooter();

  const main = $('#content');
  if (!main) return;

  main.innerHTML = `
    <!-- Hero -->
    <section class="bg-linen/50">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 py-16 md:py-24 text-center fade-in">
        <h1 data-cms="about.hero.heading" class="text-3xl md:text-5xl font-light text-bark leading-tight">
          Hi, I'm the Baker —<br>and I've been at this since I could reach the counter.
        </h1>
      </div>
    </section>

    <!-- Story -->
    <section class="max-w-3xl mx-auto px-4 sm:px-6 py-16 fade-in">
      <div class="grid md:grid-cols-5 gap-10 items-start">
        <div class="md:col-span-2">
          <div class="aspect-[3/4] bg-linen rounded-2xl"></div>
        </div>
        <div class="md:col-span-3 space-y-5 text-bark-50 leading-relaxed">
          <p data-cms="about.story.p1">
            It started the way most good things do — with a craving and a cast-iron skillet.
            Growing up in East Texas, I learned early that the best food comes from patient hands
            and honest ingredients. My grandmother's kitchen smelled like butter and brown sugar
            year-round, and somewhere between her pecan pie and my first sourdough starter,
            I knew this was what I was meant to do.
          </p>
          <p data-cms="about.story.p2">
            Stillwater Bakery is my love letter to that tradition. Every loaf is slow-fermented.
            Every pie crust is hand-rolled. I source as much as I can from local farms and
            producers, because food just tastes better when you know where it came from.
          </p>
          <p data-cms="about.story.p3">
            As a licensed Texas cottage baker, I bake in small batches from my home kitchen —
            which means everything you get is made with the same care I'd put into baking
            for my own family. Because honestly, that's exactly what you are.
          </p>
        </div>
      </div>
    </section>

    <!-- Values -->
    <section class="bg-linen/30 fade-in">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <div class="grid md:grid-cols-3 gap-8 text-center">
          <div class="fade-in">
            <div class="w-16 h-16 bg-sage/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-sage" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h3 data-cms="about.values.0.title" class="font-semibold text-bark mb-2">Made to Order</h3>
            <p data-cms="about.values.0.description" class="text-bark-50 text-sm">Nothing sits on a shelf. Every item is baked fresh when you order it.</p>
          </div>
          <div class="fade-in">
            <div class="w-16 h-16 bg-sage/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-sage" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h3 data-cms="about.values.1.title" class="font-semibold text-bark mb-2">Local Ingredients</h3>
            <p data-cms="about.values.1.description" class="text-bark-50 text-sm">Sourced from East Texas farms and producers whenever possible.</p>
          </div>
          <div class="fade-in">
            <div class="w-16 h-16 bg-sage/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-sage" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
            </div>
            <h3 data-cms="about.values.2.title" class="font-semibold text-bark mb-2">Small Batches</h3>
            <p data-cms="about.values.2.description" class="text-bark-50 text-sm">Quality over quantity, always. Every item gets my full attention.</p>
          </div>
        </div>
      </div>
    </section>
  `;

  initFadeIn();
  initBackToTop();
}

document.addEventListener('DOMContentLoaded', init);
