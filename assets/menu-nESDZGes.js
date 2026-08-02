import{r as g,a as u,$ as l,P as n,M as o,i as x,b as h,e as d}from"./utils-CX3gqYKq.js";const c="/";function b(e){return`
    <div class="product-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 fade-in" data-category="${e.category}">
      <div class="aspect-[4/3] bg-linen overflow-hidden">
        ${e.imageUrl?`<img src="${e.imageUrl}" alt="${e.name}" class="w-full h-full object-cover hover:scale-105 transition-transform duration-500" loading="lazy">`:""}
      </div>
      <div class="p-5">
        <span class="text-xs text-sage font-medium uppercase tracking-wide">${e.category}</span>
        <h3 class="font-semibold text-bark mt-1">${e.name}</h3>
        <p class="text-bark-50 text-sm mt-1.5 line-clamp-2">${e.description||""}</p>
        <div class="flex items-center justify-between mt-4">
          ${e.price!=null?`<span class="text-forest font-medium">$${Number(e.price).toFixed(2)}</span>`:"<span></span>"}
          <a href="${c}order.html" class="bg-sage text-cream text-sm px-4 py-1.5 rounded-full hover:bg-forest transition-colors duration-200">Order This</a>
        </div>
      </div>
    </div>
  `}function p(e){const m=["All",...new Set(e.map(a=>a.category).filter(Boolean))],r=l("#filter-bar");r&&(r.innerHTML=m.map(a=>`
    <button data-filter="${a}" class="filter-btn px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${a==="All"?"bg-sage text-cream":"bg-linen text-forest hover:bg-sage/20"}">
      ${a}
    </button>
  `).join(""),r.addEventListener("click",a=>{const i=a.target.closest(".filter-btn");if(!i)return;const s=i.dataset.filter;d(".filter-btn",r).forEach(t=>{t.className=t.className.replace(/bg-sage text-cream|bg-linen text-forest hover:bg-sage\/20/g,""),t.classList.add(t.dataset.filter===s?"bg-sage":"bg-linen",t.dataset.filter===s?"text-cream":"text-forest"),t.dataset.filter!==s&&t.classList.add("hover:bg-sage/20")}),d(".product-card").forEach(t=>{const f=s==="All"||t.dataset.category===s;t.style.display=f?"":"none"})}))}function v(){g("Menu"),u();const e=l("#content");e&&(e.innerHTML=`
    <section class="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      <div class="text-center mb-10 fade-in">
        <h1 data-cms="menu.hero.heading" class="text-3xl md:text-5xl font-light text-bark">${n.menu.heroHeading}</h1>
        <p data-cms="menu.hero.subtext" class="text-bark-50 mt-3 max-w-lg mx-auto">${n.menu.heroSubtext}</p>
      </div>

      <div id="filter-bar" class="flex flex-wrap justify-center gap-2 mb-8 fade-in"></div>
      <div id="product-grid" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 fade-in-stagger">
        ${o.map(b).join("")}
      </div>
    </section>

    <!-- Mobile sticky CTA -->
    <div class="md:hidden fixed bottom-4 left-4 right-4 z-40">
      <a href="${c}order.html" class="block bg-sage text-cream text-center font-medium py-3 rounded-full shadow-lg hover:bg-forest transition-colors">
        Ready to order?
      </a>
    </div>
  `,p(o),x(),h())}document.addEventListener("DOMContentLoaded",v);
