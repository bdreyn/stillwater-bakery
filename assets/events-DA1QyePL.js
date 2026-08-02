import{r,a as c,$ as d,u as l,p as m,P as n,i as p,b as x,c as i}from"./utils-CX3gqYKq.js";function o(t,e=!1){return`
    <div class="bg-white rounded-xl p-6 border-l-4 ${e?"border-bark-30":"border-sage"} ${e?"opacity-50":""} fade-in">
      <h3 class="font-semibold text-bark">${t.title}</h3>
      <div class="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm">
        <span class="text-forest">${i.clock} ${t.date||""}${t.time?" · "+t.time:""}</span>
        <span class="text-bark-50">${i.mapPin} ${t.venue||""}${t.city?", "+t.city:""}</span>
      </div>
      <p class="text-bark-50 text-sm mt-3">${t.description||""}</p>
    </div>
  `}function b(){r("Events"),c();const t=d("#content");if(!t)return;const e=l(),a=m();t.innerHTML=`
    <section class="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      <div class="text-center mb-10 fade-in">
        <h1 data-cms="events.hero.heading" class="text-3xl md:text-5xl font-light text-bark">${n.events.heroHeading}</h1>
        <p data-cms="events.hero.subtext" class="text-bark-50 mt-3 max-w-lg mx-auto">${n.events.heroSubtext}</p>
      </div>

      ${e.length?`
        <h2 class="text-xl font-light text-bark mb-4 fade-in">Upcoming Events</h2>
        <div class="space-y-4 fade-in-stagger mb-12">
          ${e.map(s=>o(s,!1)).join("")}
        </div>
      `:`
        <p class="text-bark-50 text-center py-8 fade-in">No upcoming events right now — check back soon!</p>
      `}

      ${a.length?`
        <h2 class="text-xl font-light text-bark-50 mb-4 mt-12 fade-in">Past Events</h2>
        <div class="space-y-4 fade-in-stagger">
          ${a.map(s=>o(s,!0)).join("")}
        </div>
      `:""}
    </section>
  `,p(),x()}document.addEventListener("DOMContentLoaded",b);
