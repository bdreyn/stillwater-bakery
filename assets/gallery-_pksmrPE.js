import{r as o,a as s,$ as l,P as c,S as e,c as d,i as g,b as p,G as r}from"./utils-CX3gqYKq.js";const n=["aspect-square","aspect-[3/4]","aspect-[4/3]","aspect-square","aspect-[4/3]","aspect-[3/4]"];function i(t,a){return`
    <div class="group relative overflow-hidden rounded-xl ${n[a%n.length]} bg-linen fade-in cursor-pointer">
      ${t.imageUrl?`<img src="${t.imageUrl}" alt="${t.caption||"Bakery photo"}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy">`:""}
      <div class="absolute inset-0 bg-sage/0 group-hover:bg-sage/20 transition-colors duration-300"></div>
      ${t.caption?`<div class="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-bark/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"><p class="text-cream text-sm">${t.caption}</p></div>`:""}
    </div>
  `}function m(){return r.length>0?r.map(i).join(""):Array.from({length:9},(t,a)=>i({imageUrl:null,caption:null},a)).join("")}function u(){o("Gallery"),s();const t=l("#content");t&&(t.innerHTML=`
    <section class="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      <div class="text-center mb-10 fade-in">
        <h1 data-cms="gallery.hero.heading" class="text-3xl md:text-5xl font-light text-bark">${c.gallery.heroHeading}</h1>
      </div>

      <div id="gallery-grid" class="grid grid-cols-2 md:grid-cols-3 gap-3 fade-in-stagger">
        ${m()}
      </div>

      <div class="text-center mt-10 fade-in">
        <a href="${e.instagramUrl}" target="_blank" rel="noopener" class="inline-flex items-center gap-2 text-sage font-medium hover:text-forest transition-colors">
          ${d.instagram} Follow us on Instagram → ${e.instagram}
        </a>
      </div>
    </section>
  `,g(),p())}document.addEventListener("DOMContentLoaded",u);
