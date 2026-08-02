import{r as l,a as d,$ as i,u as c,P as t,c as n,S as o,d as m,m as x,f as g,i as u,b as h}from"./utils-CX3gqYKq.js";const p="https://script.google.com/macros/s/AKfycbwZFowE3fDo--n0Dy5fVZTp1LGQaejLV6FIxAWo-pzMrsMdFPDSTLQWIlWcgUMDPWdogg/exec";async function f(e=4){try{const s=await(await fetch(`${p}?action=instagramFeed&limit=${e}`)).json();return s.success?s.items:[]}catch{return[]}}const r="/";function v(e){return`
    <div class="fade-in">
      <h4 class="text-bark font-medium">${e.name}</h4>
      <p class="text-bark-50 text-sm mt-0.5 leading-relaxed">${e.description||""}</p>
    </div>
  `}function b(e){return`
    <div class="fade-in">
      <h3 class="text-sm font-semibold uppercase tracking-wide text-sage mb-4">${e.category}</h3>
      <div class="space-y-5">
        ${e.dishes.map(v).join("")}
      </div>
    </div>
  `}function $(e){return`
    <div class="bg-white rounded-xl p-5 border-l-4 border-sage fade-in">
      <h4 class="font-semibold text-bark">${e.title}</h4>
      <p class="text-forest text-sm mt-1">${n.clock} ${e.date}${e.time?" · "+e.time:""}</p>
      <p class="text-bark-50 text-sm mt-1">${n.mapPin} ${e.venue||""}${e.city?", "+e.city:""}</p>
    </div>
  `}function k(){l("Home"),d();const e=i("#content");if(!e)return;const a=c().slice(0,3);e.innerHTML=`
    ${m()}

    <!-- Hero -->
    <section data-cms="home.hero" class="relative overflow-hidden fade-in"${` style="background-image:url('${t.home.heroImage}');background-size:cover;background-position:center;"`}>
      <div class="absolute inset-0 bg-cream/80"></div>
      <div class="relative max-w-4xl mx-auto px-4 sm:px-6 py-20 md:py-32 text-center">
        <h1 data-cms="home.hero.heading" class="text-4xl md:text-6xl font-light text-bark tracking-tight leading-tight">
          ${t.home.heroHeading}
        </h1>
        <p data-cms="home.hero.subtext" class="text-bark-50 text-lg mt-6 max-w-xl mx-auto leading-relaxed">
          ${t.home.heroSubtext}
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center mt-10">
          <a href="${r}menu.html" class="bg-sage text-cream font-medium px-8 py-3 rounded-full hover:bg-forest transition-all duration-200 hover:scale-[1.02]">
            See the Menu
          </a>
          <a href="${r}order.html" class="border-2 border-forest text-forest font-medium px-8 py-3 rounded-full hover:bg-forest hover:text-cream transition-all duration-200">
            Place an Order
          </a>
        </div>
      </div>
    </section>

    <!-- Current Menu (text only) -->
    <section class="max-w-5xl mx-auto px-4 sm:px-6 py-16 fade-in">
      <div class="text-center mb-12">
        <h2 data-cms="home.menu.heading" class="text-2xl md:text-3xl font-light text-bark">${t.home.menuHeading}</h2>
        <p data-cms="home.menu.intro" class="text-bark-50 mt-3 max-w-lg mx-auto">${t.home.menuIntro}</p>
      </div>
      <div class="grid md:grid-cols-2 gap-x-12 gap-y-10 fade-in-stagger">
        ${x(g()).map(b).join("")}
      </div>
      <div class="text-center mt-12">
        <a href="${r}order.html" class="inline-block bg-sage text-cream font-medium px-8 py-3 rounded-full hover:bg-forest transition-all duration-200 hover:scale-[1.02]">
          Order From This Menu ${n.arrowRight}
        </a>
      </div>
    </section>

    <!-- About Snippet -->
    <section class="max-w-6xl mx-auto px-4 sm:px-6 py-16 fade-in">
      <div class="grid md:grid-cols-2 gap-10 items-center">
        <div class="aspect-square bg-linen rounded-2xl overflow-hidden">
          ${`<img src="${t.home.aboutImage}" alt="" class="w-full h-full object-cover">`}
        </div>
        <div class="border-l-4 border-sage pl-6">
          <p data-cms="home.about.text" class="text-bark-50 leading-relaxed">
            ${t.home.aboutText}
          </p>
          <a href="${r}about.html" class="inline-block mt-4 text-forest font-medium text-sm hover:underline">
            Meet the Baker ${n.arrowRight}
          </a>
        </div>
      </div>
    </section>

    <!-- Upcoming Events -->
    <section class="bg-linen/50 fade-in">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <h2 data-cms="home.events.heading" class="text-2xl md:text-3xl font-light text-bark mb-8">${t.home.eventsHeading}</h2>
        <div id="upcoming-events">
          ${a.length?`<div class="grid md:grid-cols-3 gap-4 fade-in-stagger">${a.map($).join("")}</div>`:'<p class="text-bark-50 text-sm">No upcoming events — check back soon!</p>'}
        </div>
        <div class="mt-6">
          <a href="${r}events.html" class="text-forest text-sm font-medium hover:underline">
            See all events ${n.arrowRight}
          </a>
        </div>
      </div>
    </section>

    <!-- Instagram Teaser -->
    <section class="max-w-6xl mx-auto px-4 sm:px-6 py-16 text-center fade-in">
      <h2 class="text-2xl font-light text-bark mb-8">Follow Along <span class="text-sage">${o.instagram}</span></h2>
      <div id="instagram-feed" class="grid grid-cols-2 md:grid-cols-4 gap-3">
        ${Array.from({length:4},()=>'<div class="aspect-square bg-linen rounded-xl"></div>').join("")}
      </div>
      <a href="${o.instagramUrl}" target="_blank" rel="noopener" class="inline-flex items-center gap-2 text-sage font-medium text-sm mt-6 hover:text-forest transition-colors">
        ${n.instagram} Follow on Instagram
      </a>
    </section>
  `,u(),h(),w()}async function w(){const e=i("#instagram-feed");if(!e)return;const a=await f(4);a.length&&(e.innerHTML=a.map(s=>`
    <a href="${s.permalink}" target="_blank" rel="noopener" class="group relative aspect-square overflow-hidden rounded-xl bg-linen block">
      <img src="${s.mediaUrl}" alt="${(s.caption||"Instagram photo").slice(0,100)}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy">
    </a>
  `).join(""))}document.addEventListener("DOMContentLoaded",k);
