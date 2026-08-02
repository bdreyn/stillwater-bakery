import{r as o,a as i,$ as n,P as t,i as d,b as r}from"./utils-CX3gqYKq.js";const s=[`<svg class="w-8 h-8 text-sage" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
    <path stroke-linecap="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
  </svg>`,`<svg class="w-8 h-8 text-sage" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
    <path stroke-linecap="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
  </svg>`,`<svg class="w-8 h-8 text-sage" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
    <path stroke-linecap="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
  </svg>`];function l(a,e){return`
    <div class="fade-in">
      <div class="w-16 h-16 bg-sage/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
        ${s[e]||s[0]}
      </div>
      <h3 data-cms="about.values.${e}.title" class="font-semibold text-bark mb-2">${a.title}</h3>
      <p data-cms="about.values.${e}.description" class="text-bark-50 text-sm">${a.description}</p>
    </div>
  `}function c(){o("About"),i();const a=n("#content");a&&(a.innerHTML=`
    <!-- Hero -->
    <section class="bg-linen/50">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 py-16 md:py-24 text-center fade-in">
        <h1 data-cms="about.hero.heading" class="text-3xl md:text-5xl font-light text-bark leading-tight">
          ${t.about.heroHeading}
        </h1>
      </div>
    </section>

    <!-- Story -->
    <section class="max-w-3xl mx-auto px-4 sm:px-6 py-16 fade-in">
      <div class="grid md:grid-cols-5 gap-10 items-start">
        <div class="md:col-span-2">
          <div class="aspect-[3/4] bg-linen rounded-2xl overflow-hidden">
            ${`<img src="${t.about.storyImage}" alt="" class="w-full h-full object-cover">`}
          </div>
        </div>
        <div class="md:col-span-3 space-y-5 text-bark-50 leading-relaxed">
          <p data-cms="about.story.p1">${t.about.storyP1}</p>
          <p data-cms="about.story.p2">${t.about.storyP2}</p>
          <p data-cms="about.story.p3">${t.about.storyP3}</p>
        </div>
      </div>
    </section>

    <!-- Values -->
    <section class="bg-linen/30 fade-in">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <div class="grid md:grid-cols-3 gap-8 text-center">
          ${t.about.values.map(l).join("")}
        </div>
      </div>
    </section>
  `,d(),r())}document.addEventListener("DOMContentLoaded",c);
