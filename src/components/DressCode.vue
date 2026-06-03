<script setup>
const codes = [
  {
    event: 'WELCOME DINNER',
    title: 'Summer Party Chic',
    description: 'Light, airy colors. Linen fabrics and sundresses.',
    image: 'https://placehold.co/400x600?text=Summer+Party+Chic'
  },
  {
    event: 'WEDDING PARTY',
    title: 'Black Tie',
    description: 'Tuxedos and floor-length gowns for an elegant night.',
    image: 'https://placehold.co/400x600?text=Black+Tie'
  },
  {
    event: 'BRUNCH',
    title: 'Resort Casual',
    description: 'Relaxed attire for a final Mediterranean meal.',
    image: 'https://placehold.co/400x600?text=Resort+Casual'
  }
];
</script>

<template>
  <section id="dresscode" class="py-32 px-4 bg-[#F1F1EB]">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-24">
        <h3 class="text-xs tracking-[0.4em] font-sans text-gray-500 uppercase mb-4">The Attire</h3>
        <h2 class="text-5xl font-serif text-[#3D3D3D]">Dress Code</h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-24">
        <div v-for="code in codes" :key="code.event" class="flex flex-col items-center text-center space-y-8">
          <div class="w-full aspect-[2/3] bg-gray-200 overflow-hidden shadow-xl grayscale-20 hover:grayscale-0 transition-all duration-500 group">
             <img :src="code.image" :alt="code.title" class="w-full h-full object-cover transform group-hover:scale-105 transition-all duration-700" />
          </div>
          
          <div class="space-y-4">
             <p class="text-xs tracking-[0.2em] font-sans text-gray-400 uppercase font-bold">{{ code.event }}</p>
             <h3 class="text-3xl font-serif text-[#3D3D3D]">{{ code.title }}</h3>
             <p class="text-sm font-light text-gray-600 leading-relaxed max-w-[250px] mx-auto italic">{{ code.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.grayscale-20 {
  filter: grayscale(20%);
}
</style>
