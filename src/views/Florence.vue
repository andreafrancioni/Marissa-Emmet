<script setup>
const sections = [
  {
    title: "Food, Drinks & Local Favorites",
    items: [
      {
        name: "JJ Cathedral Irish Pub",
        description:
          "One of our favorite casual spots in Florence, located just steps from the Duomo. Grab a drink on the balcony and enjoy a unique view of the Cathedral of Santa Maria del Fiore—one of the city's most iconic landmarks.",
      },
      {
        name: "Michael Collins Irish Pub",
        description:
          "A great place for a pint of Guinness, cocktails, or a relaxed evening with friends. Conveniently located near Piazza della Signoria, the historic political heart of Florence since the 14th century.",
      },
      {
        name: "Caffè Gilli",
        description:
          "One of Florence's oldest and most historic cafés, established in 1733. Perfect for an espresso, aperitivo, pastries, or a light meal while enjoying the atmosphere of Piazza della Repubblica.",
      },
      {
        name: "Regina Bistecca",
        description:
          "If you'd like to try the famous Florentine steak (Bistecca alla Fiorentina), this is one of our favorite places in the city center. They also offer a wonderful selection of classic Tuscan dishes.",
      },
      {
        name: "All'Antico Vinaio",
        description:
          "Arguably Florence's most famous sandwich shop. Expect a line, but it's worth it for their legendary schiacciata sandwiches.",
      },
      {
        name: "La Ménagère",
        description:
          "A beautiful café, restaurant, flower shop, and design space all in one. Perfect for breakfast, brunch, coffee, or evening cocktails.",
      },
      {
        name: "Gelateria dei Neri",
        description:
          "One of the best gelato shops in Florence and a local favorite. Don't leave the city without trying a scoop (or three!).",
      },
      {
        name: "Vivoli",
        description:
          "A historic Florentine gelateria known for traditional flavors and authentic Italian desserts.",
      },
    ],
  },
  {
    title: "Must-See Views",
    items: [
      {
        name: "Piazzale Michelangelo",
        description:
          "Without question, the best panoramic view of Florence. Visit at sunset to watch the city glow as day turns into evening. Bring a bottle of wine, grab a snack from one of the kiosks, and enjoy the view.",
      },
    ],
  },
  {
    title: "Things to See",
    items: [
      {
        name: "The Duomo",
        description:
          "Florence's iconic cathedral dominates the city's skyline. Climb to the top for spectacular views over the city.",
      },
      {
        name: "Galleria dell'Accademia",
        description:
          "Home to Michelangelo's masterpiece, David. Seeing it in person is an unforgettable experience.",
      },
      {
        name: "Uffizi Gallery",
        description:
          "One of the world's greatest art museums, featuring masterpieces by Botticelli, Leonardo da Vinci, Michelangelo, Raphael, and Caravaggio.",
      },
      {
        name: "Ponte Vecchio",
        description:
          "Florence's famous medieval bridge lined with jewelry shops, spanning the Arno River.",
      },
      {
        name: "Piazza della Signoria",
        description:
          "The historic heart of Florence, surrounded by stunning architecture and outdoor sculptures.",
      },
      {
        name: "Boboli Gardens",
        description:
          "Beautiful Renaissance gardens located behind Palazzo Pitti, perfect for an afternoon stroll.",
      },
    ],
  },
  {
    title: "Beyond Florence",
    intro:
      "If you have extra time, Tuscany offers some of the most beautiful landscapes, vineyards, and historic towns in Italy.",
    items: [
      {
        name: "Poggio Amorelli Winery",
        description:
          "One of our favorite wineries in Tuscany. Family-owned and operated, Poggio Amorelli offers exceptional wines, beautiful vineyard views, and authentic Tuscan hospitality.",
        link: "https://famigliamazzarrini.it/en/the-winery/",
        linkText: "famigliamazzarrini.it/en/the-winery/",
      },
      {
        name: "Siena",
        description:
          "A stunning medieval city famous for its shell-shaped Piazza del Campo, magnificent cathedral, and rich history. Siena is one of Tuscany's most beautiful and well-preserved towns.",
      },
      {
        name: "San Gimignano",
        description:
          "A picturesque medieval hill town in Tuscany, famous for its surviving tower houses and beautiful surrounding landscapes.",
      },
      {
        name: "Montepulciano",
        description:
          "A hilltop town renowned for its elegant Renaissance architecture and world-famous Vino Nobile di Montepulciano wine.",
      },
      {
        name: "Montalcino",
        description:
          "Home of the celebrated Brunello di Montalcino wine, this charming village offers incredible scenery, excellent restaurants, and unforgettable wine tastings.",
      },
      {
        name: "Chianti Region",
        description:
          "Rolling vineyards, olive groves, winding country roads, and countless wineries make the Chianti countryside one of the most iconic destinations in Tuscany.",
      },
    ],
  },
];
</script>

<template>
  <section id="florence" class="py-24 px-4 bg-[#F1F1EB]">
    <div class="max-w-5xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="text-6xl handwriting text-[#3D3D3D] m-4">
          Our Favorite Places
        </h2>
        <div class="w-12 h-[1px] bg-[#D5C6DC] mx-auto mt-6"></div>
      </div>

      <div
        class="max-w-2xl mx-auto text-center space-y-8 text-[#3D3D3D]/80 font-light leading-relaxed mb-24"
      >
        <p>
          Florence is one of the most beautiful cities in the world, filled with
          incredible history, food, art, and unforgettable views. Here are some
          of our favorite spots that we hope you'll enjoy during your stay!
        </p>
      </div>

      <div class="space-y-24">
        <div v-for="(section, sIndex) in sections" :key="sIndex">
          <h3
            class="text-3xl font-serif italic text-center text-[#3D3D3D] mb-4"
          >
            {{ section.title }}
          </h3>

          <div v-if="section.intro" class="max-w-2xl mx-auto text-center mb-10">
            <p class="italic text-[#3D3D3D]/80 font-light leading-relaxed">
              {{ section.intro }}
            </p>
          </div>
          <div v-else class="mb-12"></div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
            <div
              v-for="(place, pIndex) in section.items"
              :key="pIndex"
              class="space-y-3 text-center md:text-left"
            >
              <h4 class="text-xl font-serif text-[#3D3D3D]">
                {{ place.name }}
              </h4>
              <p class="italic text-[#3D3D3D]/80 font-light leading-relaxed">
                {{ place.description }}
              </p>
              <div v-if="place.link" class="pt-2">
                <span
                  class="text-xs font-sans tracking-widest text-gray-400 uppercase block mb-1"
                  >For more information, visit:</span
                >
                <a
                  :href="place.link"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-sm text-[#3D3D3D] underline hover:text-gray-500 transition-colors"
                >
                  {{ place.linkText }}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div class="text-center max-w-3xl mx-auto mt-20">
          <h3
            class="text-3xl font-serif italic text-center text-[#3D3D3D] mb-4"
          >
            Need Help Planning?
          </h3>
          <p class="text-lg font-serif text-[#3D3D3D] mb-6">
            If you would like assistance arranging private visit, wine tastings,
            transportation, cooking classes, or bespoke experiences throughout
            Florence and Tuscany, our concierge team would be pleased to assist.
            Please contact them at: emmetmarissa@affresco.it
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
