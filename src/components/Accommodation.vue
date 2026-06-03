<script setup>
const hotels = [
  {
    name: 'BORGO EGNAZIA',
    location: 'Savelletri di Fasano',
    description: 'A luxurious Apulian village, where the main event will take place.',
    image: 'https://placehold.co/600x800?text=Borgo+Egnazia'
  },
  {
    name: 'OSTUNI A MARE',
    location: 'Rosa Marina',
    description: 'Modern beach resort close to the Adriatic coast and activities.',
    image: 'https://placehold.co/600x800?text=Ostuni+a+Mare'
  },
  {
    name: 'MASSERIA LE CARRUBE',
    location: 'Ostuni',
    description: 'A charming, authentic farmhouse boutique hotel for brunch.',
    image: 'https://placehold.co/600x800?text=Masseria+le+Carrube'
  }
];
</script>

<template>
  <section id="accommodation" class="py-32 bg-[#F1F1EB] px-4 overflow-hidden">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-24">
        <h3 class="text-xs tracking-[0.4em] font-sans text-gray-500 uppercase mb-4">Where to Stay</h3>
        <h2 class="text-5xl font-serif text-[#3D3D3D]">Recommended Accommodation</h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div v-for="hotel in hotels" :key="hotel.name" class="group space-y-6">
          <div class="aspect-[4/5] bg-gray-200 overflow-hidden shadow-xl grayscale-10 group-hover:grayscale-0 transition-all duration-500">
             <img :src="hotel.image" :alt="hotel.name" class="w-full h-full object-cover transform group-hover:scale-105 transition-all duration-700" />
          </div>
          <div class="space-y-2">
            <h3 class="text-xl font-serif text-[#3D3D3D]">{{ hotel.name }}</h3>
            <p class="text-[10px] tracking-widest font-sans text-gray-500 uppercase">{{ hotel.location }}</p>
            <p class="text-sm font-light text-gray-600 leading-relaxed">{{ hotel.description }}</p>
          </div>
          <a href="#" class="inline-block text-[10px] tracking-widest font-sans uppercase border-b border-[#3D3D3D]/30 pb-1 hover:border-[#3D3D3D] transition-colors">
            Book Online
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.grayscale-10 {
  filter: grayscale(10%);
}
</style>
