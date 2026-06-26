<script setup>
import imgHelvetia from "@/assets/hotels/helvetia.jpg";
import imgVecchietti from "@/assets/hotels/vecchietti.jpg";
import imgOrologio from "@/assets/hotels/orologio.webp";
import imgSantaMaria from "@/assets/hotels/santamarianovella.jpg";
import imgGaribaldi from "@/assets/hotels/garibaldiblu.jpg";
import imgRosso23 from "@/assets/hotels/rosso23.avif";

const hotels = [
  {
    name: "HELVETIA & BRISTOL 5*",
    address: "Via de' Pescioni 2, 50123 Firenze",
    description:
      "One of Florence's most storied addresses, Helvetia & Bristol blends old-world elegance with contemporary comfort. Tucked away just steps from Via de' Tornabuoni and the city's iconic landmarks, it offers the perfect setting to immerse yourself in the beauty and atmosphere of Florence while enjoying impeccable hospitality.",
    actionHtml: `PLEASE CLICK AT THIS LINK: <a href="https://eu-west-1.protection.sophos.com?d=starhotels.com&u=aHR0cHM6Ly9yZXNlcnZhdGlvbnMuc3RhcmhvdGVscy5jb20vaGVsdmV0aWEtYW5kLWJyaXN0b2wtZmxvcmVuY2UvYm9vay9kYXRlcy1vZi1zdGF5P2lkZW50aWZpZXI9U1lXRURESU5HJmRhdGVpbj0wNC8yMS8yMDI3JmRhdGVvdXQ9MDQvMjUvMjAyNyZhZHVsdHM9Mg==&p=m&i=NjVjNGVhNzg3NThkMjYzMWU1N2QxY2M1&t=Mm8rRjExb1VBOVlvUm5Nd3RVM21wRjVVM2tRZHdLYktHSnhCOXJ3TWZDQT0=&h=5bba5a31571f475eb96a29aa67363a56&s=AVNPUEhUT0NFTkNSWVBUSVagUmXm3PZucUMTdv_KdKIcKhhkZ1rDeYC2pqtHluVa0A" class="underline font-medium text-black">E&M Wedding in Florence</a> to access our preferential rates`,
    image: imgHelvetia,
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Helvetia+%26+Bristol+Firenze",
  },
  {
    name: "PALAZZO VECCHIETTI 5*",
    address: "Via degli Strozzi, 4 50123 Firenze",
    description:
      "We love Palazzo Vecchietti for its quiet elegance and residential feel. Tucked away in the heart of Florence, it offers a unique blend of history, comfort, and privacy, making it an ideal retreat after a day spent exploring the city.",
    actionHtml: `Please write to: <a href="mailto:info@palazzovecchietti.com" class="underline text-black">info@palazzovecchietti.com</a> and mention the promo code <strong class="font-bold text-black">Emmet & Marissa</strong> to access the preferential rates.`,
    image: imgVecchietti,
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Palazzo+Vecchietti+Firenze",
  },
  {
    name: "HOTEL L'OROLOGIO FIRENZE 4*S",
    address: "Piazza Santa Maria Novella, 24, 50123 Florence, Italy",
    description:
      "An elegant boutique hotel overlooking Piazza Santa Maria Novella, Hotel L'Orologio combines refined design, exceptional comfort, and a prime location in the heart of Florence, just steps away from the city's main attractions.",
    actionHtml: `Email: <a href="mailto:reservations@hotelorologioflorence.it" class="underline text-black">reservations@hotelorologioflorence.it</a><br>Or directly on their website: https://www.whythebesthotels.com.<br>Please provide this promocode to access preferential rates: <strong class="font-bold text-black">Emmet & Marissa</strong>.<br>The promotional code is valid for stays between 22 April and 24 April 2027.`,
    image: imgOrologio,
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Hotel+L%27Orologio+Firenze",
  },
  {
    name: "HOTEL SANTA MARIA NOVELLA 4*S",
    address: "Piazza Santa Maria Novella, 1, 50123 Florence, Italy",
    description:
      "Set directly on the historic Piazza Santa Maria Novella, this charming hotel offers timeless Florentine elegance, spacious accommodations, and beautiful views of one of Florence's most iconic squares.",
    actionHtml: `Email: <a href="mailto:reservations@hotelsantamarianovella.it" class="underline text-black">reservations@hotelsantamarianovella.it</a><br>Or directly on their website: https://www.whythebesthotels.com.<br>Please provide this promocode to access preferential rates: <strong class="font-bold text-black">Emmet & Marissa</strong>.<br>The promotional code is valid for stays between 22 April and 24 April 2027.`,
    image: imgSantaMaria,
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Hotel+Santa+Maria+Novella+Firenze",
  },
  {
    name: "HOTEL GARIBALDI BLU 4*",
    address: "Piazza Santa Maria Novella, 21, 50123 Florence, Italy",
    description:
      "A stylish contemporary hotel blending modern design with Renaissance-inspired details, Hotel Garibaldi Blu offers a sophisticated stay in a central and vibrant location.",
    actionHtml: `Email: <a href="mailto:booking@hotelgaribaldiblu.com" class="underline text-black">booking@hotelgaribaldiblu.com</a><br>Or directly on their website: https://www.whythebesthotels.com.<br>Please provide this promocode to access preferential rates: <strong class="font-bold text-black">Emmet & Marissa</strong>.<br>The promotional code is valid for stays between 22 April and 24 April 2027.`,
    image: imgGaribaldi,
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Hotel+Garibaldi+Blu+Firenze",
  },
  {
    name: "HOTEL ROSSO 23 4*",
    address: "Piazza Santa Maria Novella, 21, 50123 Florence, Italy",
    description:
      "With its contemporary interiors and welcoming atmosphere, Hotel Rosso 23 provides comfortable accommodations in the heart of Florence, directly facing Piazza Santa Maria Novella.",
    actionHtml: `Email: <a href="mailto:info@rosso23.com" class="underline text-black">info@rosso23.com</a><br>Or directly on their website: https://www.whythebesthotels.com.<br>Please provide this promocode to access preferential rates: <strong class="font-bold text-black">Emmet & Marissa</strong>.<br>The promotional code is valid for stays between 22 April and 24 April 2027.`,
    image: imgRosso23,
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Hotel+Rosso+23+Firenze",
  },
];
</script>

<template>
  <section id="accommodation" class="py-32 bg-primary px-4 overflow-hidden">
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-16" data-aos="fade-up">
        <h2 class="text-6xl text-[#3D3D3D] m-4">Your Stay</h2>
        <div class="w-12 h-[1px] bg-accent mx-auto mt-6"></div>
      </div>

      <div
        class="max-w-2xl mx-auto text-center space-y-8 text-[#3D3D3D]/80 font-light leading-relaxed mb-24"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <p>
          To make your stay as comfortable and enjoyable as possible, we have
          carefully selected a collection of hotels and residences for our
          guests. Preferred rates have been arranged at each property, subject
          to availability. We encourage you to make your reservations at your
          earliest convenience.
        </p>
      </div>

      <div class="space-y-24">
        <div
          v-for="(hotel, index) in hotels"
          :key="hotel.name"
          class="flex flex-col md:flex-row gap-12 items-center"
          :class="{ 'md:flex-row-reverse': index % 2 !== 0 }"
        >
          <div
            class="w-full md:w-1/2 aspect-[4/3] bg-gray-200 overflow-hidden shadow-xl group"
            data-aos="fade-up"
          >
            <img
              :src="hotel.image"
              :alt="hotel.name"
              class="w-full h-full object-cover transform group-hover:scale-105 transition-all duration-700"
            />
          </div>
          <div
            class="w-full md:w-1/2 space-y-6 flex flex-col justify-center"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div>
              <h3 class="text-2xl font-title text-[#3D3D3D] mb-2">
                {{ hotel.name }}
              </h3>
              <p
                class="text-xs tracking-wider font-menu text-gray-500 uppercase"
              >
                ADDRESS:
                <a
                  :href="hotel.mapUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="underline underline-offset-4 decoration-gray-300 hover:text-black hover:decoration-black transition-all duration-300 inline-flex items-center gap-1"
                >
                  {{ hotel.address }}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-3 w-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </a>
              </p>
            </div>
            <p class="text-sm font-light text-gray-600 leading-relaxed">
              {{ hotel.description }}
            </p>
            <div
              class="text-sm font-light text-gray-600 leading-relaxed"
              v-html="hotel.actionHtml"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Scoped styles if needed */
</style>
