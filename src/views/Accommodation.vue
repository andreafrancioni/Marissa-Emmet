<script setup>
const hotels = [
  {
    name: "HELVETIA & BRISTOL 5*",
    address: "Via de' Pescioni 2, 50123 Firenze",
    description:
      "One of Florence's most storied addresses, Helvetia & Bristol blends old-world elegance with contemporary comfort. Tucked away just steps from Via de' Tornabuoni and the city's iconic landmarks, it offers the perfect setting to immerse yourself in the beauty and atmosphere of Florence while enjoying impeccable hospitality.",
    actionHtml: `PLEASE CLICK AT THIS LINK: <a href="#" class="underline font-medium text-black">E&M Wedding in Florence</a> to access our preferential rates`,
    image: "https://placehold.co/800x600?text=Helvetia+%26+Bristol",
  },
  {
    name: "PALAZZO VECCHIETTI 5*",
    address: "Via degli Strozzi, 4 50123 Firenze",
    description:
      "We love Palazzo Vecchietti for its quiet elegance and residential feel. Tucked away in the heart of Florence, it offers a unique blend of history, comfort, and privacy, making it an ideal retreat after a day spent exploring the city.",
    actionHtml: `Please write to: <a href="mailto:info@palazzovecchietti.com" class="underline text-black">info@palazzovecchietti.com</a> and mention the promo code <strong>Marissa & Emmet</strong> to access the preferential rates.`,
    image: "https://placehold.co/800x600?text=Palazzo+Vecchietti",
  },
  {
    name: "HOTEL L'OROLOGIO FIRENZE 4*S",
    address: "Piazza Santa Maria Novella, 24, 50123 Florence, Italy",
    description:
      "An elegant boutique hotel overlooking Piazza Santa Maria Novella, Hotel L'Orologio combines refined design, exceptional comfort, and a prime location in the heart of Florence, just steps away from the city's main attractions.",
    actionHtml: `Email: <a href="mailto:reservations@hotelorologioflorence.it" class="underline text-black">reservations@hotelorologioflorence.it</a><br>Or directly on their website.<br>Please provide this promocode to access preferential rates: <strong>Marissa&Emmet</strong>.<br>**The promotional code is valid for stays between 22 April and 24 April 2027.**`,
    image: "https://placehold.co/800x600?text=Hotel+LOrologio",
  },
  {
    name: "HOTEL SANTA MARIA NOVELLA 4*S",
    address: "Piazza Santa Maria Novella, 1, 50123 Florence, Italy",
    description:
      "Set directly on the historic Piazza Santa Maria Novella, this charming hotel offers timeless Florentine elegance, spacious accommodations, and beautiful views of one of Florence's most iconic squares.",
    actionHtml: `Email: <a href="mailto:reservations@hotelsantamarianovella.it" class="underline text-black">reservations@hotelsantamarianovella.it</a><br>Or directly on their website.<br>Please provide this promocode to access preferential rates: <strong>Marissa&Emmet</strong>.<br>**The promotional code is valid for stays between 22 April and 24 April 2027.**`,
    image: "https://placehold.co/800x600?text=Hotel+Santa+Maria+Novella",
  },
  {
    name: "HOTEL GARIBALDI BLU 4*",
    address: "Piazza Santa Maria Novella, 21, 50123 Florence, Italy",
    description:
      "A stylish contemporary hotel blending modern design with Renaissance-inspired details, Hotel Garibaldi Blu offers a sophisticated stay in a central and vibrant location.",
    actionHtml: `Email: <a href="mailto:booking@hotelgaribaldiblu.com" class="underline text-black">booking@hotelgaribaldiblu.com</a><br>Or directly on their website.<br>Please provide this promocode to access preferential rates: <strong>Marissa&Emmet</strong>.<br>**The promotional code is valid for stays between 22 April and 24 April 2027.**`,
    image: "https://placehold.co/800x600?text=Hotel+Garibaldi+Blu",
  },
  {
    name: "HOTEL ROSSO 23 4*",
    address: "Piazza Santa Maria Novella, 21, 50123 Florence, Italy",
    description:
      "With its contemporary interiors and welcoming atmosphere, Hotel Rosso 23 provides comfortable accommodations in the heart of Florence, directly facing Piazza Santa Maria Novella.",
    actionHtml: `Email: <a href="mailto:info@rosso23.com" class="underline text-black">info@rosso23.com</a><br>Or directly on their website.<br>Please provide this promocode to access preferential rates: <strong>Marissa&Emmet</strong>.<br>**The promotional code is valid for stays between 22 April and 24 April 2027.**`,
    image: "https://placehold.co/800x600?text=Hotel+Rosso+23",
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
        data-aos="fade-up" data-aos-delay="200"
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
          <div class="w-full md:w-1/2 space-y-6 flex flex-col justify-center" data-aos="fade-up" data-aos-delay="200">
            <div>
              <h3 class="text-2xl font-title text-[#3D3D3D] mb-2">
                {{ hotel.name }}
              </h3>
              <p
                class="text-xs tracking-wider font-menu text-gray-500 uppercase"
              >
                ADDRESS: {{ hotel.address }}
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
