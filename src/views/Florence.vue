<script setup>
import skylineImage from "../assets/Skyline firenze.PNG";
const sections = [
  {
    title: "Food, Drinks & Local Favorites",
    items: [
      {
        name: "JJ Cathedral Irish Pub",
        description:
          "One of our favorite casual spots in Florence, located just steps from the Duomo. Grab a drink on the balcony and enjoy a unique view of the Cathedral of Santa Maria del Fiore—one of the city's most iconic landmarks.",
        link: "https://www.google.com/maps/search/?api=1&query=JJ+Cathedral+Irish+Pub+Florence",
      },
      {
        name: "Michael Collins Irish Pub",
        description:
          "A great place for a pint of Guinness, cocktails, or a relaxed evening with friends. Conveniently located near Piazza della Signoria, the historic political heart of Florence since the 14th century.",
        link: "https://www.google.com/maps/search/?api=1&query=Michael+Collins+Irish+Pub+Florence",
      },
      {
        name: "Caffè Gilli",
        description:
          "One of Florence's oldest and most historic cafés, established in 1733. Perfect for an espresso, aperitivo, pastries, or a light meal while enjoying the atmosphere of Piazza della Repubblica.",
        link: "https://caffegilli.com/",
      },
      {
        name: "Regina Bistecca",
        description:
          "If you'd like to try the famous Florentine steak (Bistecca alla Fiorentina), this is one of our favorite places in the city center. They also offer a wonderful selection of classic Tuscan dishes.",
        link: "https://www.reginabistecca.com/",
      },
      {
        name: "All'Antico Vinaio",
        description:
          "Arguably Florence's most famous sandwich shop. Expect a line, but it's worth it for their legendary schiacciata sandwiches.",
        link: "https://www.allanticovinaio.com/",
      },
      {
        name: "La Ménagère",
        description:
          "A beautiful café, restaurant, flower shop, and design space all in one. Perfect for breakfast, brunch, coffee, or evening cocktails.",
        link: "https://lamenagere.it/",
      },
      {
        name: "Gelateria dei Neri",
        description:
          "One of the best gelato shops in Florence and a local favorite. Don't leave the city without trying a scoop (or three!).",
        link: "https://www.google.com/maps/search/?api=1&query=Gelateria+dei+Neri+Florence",
      },
      {
        name: "Vivoli",
        description:
          "A historic Florentine gelateria known for traditional flavors and authentic Italian desserts.",
        link: "http://www.vivoli.it/",
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
        link: "https://www.google.com/maps/search/?api=1&query=Piazzale+Michelangelo+Florence",
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
        link: "https://duomo.firenze.it/",
      },
      {
        name: "Galleria dell'Accademia",
        description:
          "Home to Michelangelo's masterpiece, David. Seeing it in person is an unforgettable experience.",
        link: "https://www.galleriaaccademiafirenze.it/",
      },
      {
        name: "Uffizi Gallery",
        description:
          "One of the world's greatest art museums, featuring masterpieces by Botticelli, Leonardo da Vinci, Michelangelo, Raphael, and Caravaggio.",
        link: "https://www.uffizi.it/",
      },
      {
        name: "Ponte Vecchio",
        description:
          "Florence's famous medieval bridge lined with jewelry shops, spanning the Arno River.",
        link: "https://www.google.com/maps/search/?api=1&query=Ponte+Vecchio+Florence",
      },
      {
        name: "Piazza della Signoria",
        description:
          "The historic heart of Florence, surrounded by stunning architecture and outdoor sculptures.",
        link: "https://www.google.com/maps/search/?api=1&query=Piazza+della+Signoria+Florence",
      },
      {
        name: "Boboli Gardens",
        description:
          "Beautiful Renaissance gardens located behind Palazzo Pitti, perfect for an afternoon stroll.",
        link: "https://www.uffizi.it/giardino-di-boboli",
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
      },
      {
        name: "Siena",
        description:
          "A stunning medieval city famous for its shell-shaped Piazza del Campo, magnificent cathedral, and rich history. Siena is one of Tuscany's most beautiful and well-preserved towns.",
        link: "https://www.google.com/maps/search/?api=1&query=Siena+Tuscany",
      },
      {
        name: "San Gimignano",
        description:
          "A picturesque medieval hill town in Tuscany, famous for its surviving tower houses and beautiful surrounding landscapes.",
        link: "https://www.google.com/maps/search/?api=1&query=San+Gimignano+Tuscany",
      },
      {
        name: "Montepulciano",
        description:
          "A hilltop town renowned for its elegant Renaissance architecture and world-famous Vino Nobile di Montepulciano wine.",
        link: "https://www.google.com/maps/search/?api=1&query=Montepulciano+Tuscany",
      },
      {
        name: "Montalcino",
        description:
          "Home of the celebrated Brunello di Montalcino wine, this charming village offers incredible scenery, excellent restaurants, and unforgettable wine tastings.",
        link: "https://www.google.com/maps/search/?api=1&query=Montalcino+Tuscany",
      },
      {
        name: "Chianti Region",
        description:
          "Rolling vineyards, olive groves, winding country roads, and countless wineries make the Chianti countryside one of the most iconic destinations in Tuscany.",
        link: "https://www.google.com/maps/search/?api=1&query=Chianti+Region+Tuscany",
      },
    ],
  },
];
</script>

<template>
  <section id="florence" class="py-24 px-4 bg-primary">
    <div class="max-w-5xl mx-auto">
      <div class="text-center mb-16" data-aos="fade-up">
        <h2 class="text-6xl text-[#3D3D3D] m-4">
          Our Favorite Places
        </h2>
        <img :src="skylineImage" alt="Florence Skyline" class="mx-auto mt-6 object-contain max-h-24" />
      </div>

      <div
        class="max-w-2xl mx-auto text-center space-y-8 text-[#3D3D3D]/80 font-light leading-relaxed mb-24"
        data-aos="fade-up" data-aos-delay="200"
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
            class="text-3xl font-title italic text-center text-[#3D3D3D] mb-4"
            data-aos="fade-up"
          >
            {{ section.title }}
          </h3>

          <div v-if="section.intro" class="max-w-2xl mx-auto text-center mb-10" data-aos="fade-up">
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
              data-aos="fade-up"
              :data-aos-delay="(pIndex % 2) * 200"
            >
              <h4 class="text-xl font-title">
                <a v-if="place.link" :href="place.link" target="_blank" rel="noopener noreferrer" class="text-[#3D3D3D] hover:text-accent transition-colors underline decoration-1 underline-offset-4">
                  {{ place.name }}
                </a>
                <span v-else class="text-[#3D3D3D]">
                  {{ place.name }}
                </span>
              </h4>
              <p class="italic text-[#3D3D3D]/80 font-light leading-relaxed">
                {{ place.description }}
              </p>
            </div>
          </div>
        </div>

        <div class="text-center max-w-3xl mx-auto mt-20" data-aos="fade-up">
          <h3
            class="text-3xl font-title italic text-center text-[#3D3D3D] mb-4"
          >
            Need Help Planning?
          </h3>
          <p class="text-lg font-title text-[#3D3D3D] mb-6">
            If you would like assistance arranging private visit, wine tastings,
            transportation, cooking classes, or bespoke experiences throughout
            Florence and Tuscany, our concierge team would be pleased to assist.
            Please contact them at: <a href="mailto:emmetmarissa@affresco.it" class="underline">emmetmarissa@affresco.it</a>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
