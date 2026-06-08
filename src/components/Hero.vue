<template>
  <section class="relative bg-[#F1F1EB] pt-24 overflow-hidden">
    <!-- Hero Banner Image -->
    <div class="w-full h-80 md:h-[500px] overflow-hidden">
      <img
        src="../assets/hero-banner.png"
        alt="Lemon and Olive Pattern"
        class="w-full h-full object-cover"
      />
    </div>

    <!-- Main Content below Banner -->
    <div
      class="relative z-10 text-center max-w-4xl mx-auto px-4 py-16 animate-fade-in-up"
    >
      <div class="flex items-center justify-center md:space-x-12 mb-4">
        <!-- Decorative Diamond Icons -->
        <span
          class="hidden md:block w-3 h-3 rotate-45 bg-[#3D3D3D]/60 rounded-sm"
        ></span>

        <div class="flex flex-col items-center">
          <h2
            class="handwriting text-7xl md:text-9xl text-[#3D3D3D] mb-4 transform -rotate-1"
          >
            Emmet & Marissa
          </h2>
        </div>

        <span
          class="hidden md:block w-3 h-3 rotate-45 bg-[#3D3D3D]/60 rounded-sm"
        ></span>
      </div>

      <div class="space-y-4 my-8">
        <p
          class="text-sm md:text-lg tracking-[0.3em] font-sans uppercase text-[#3D3D3D]"
        >
          JUNE 18–20, 2027
        </p>
        <p
          class="text-sm md:text-lg tracking-[0.3em] font-sans uppercase text-[#3D3D3D]/70"
        >
          VENICE, ITALY
        </p>
      </div>

      <div class="max-w-2xl mx-auto mt-16 space-y-6">
        <p
          class="text-xs md:text-sm tracking-[0.1em] font-sans text-gray-500 uppercase"
        >
          Dear Friends,
        </p>
        <p
          class="text-lg md:text-xl font-serif leading-relaxed text-[#3D3D3D]/80"
        >
          We are delighted to share with you the program for our celebration
          weekend this June in Venice, Italy. <br class="hidden md:block" />
          Please note that we are arranging all transfers to and from the
          celebration venues <br class="hidden md:block" />
          (Welcome Dinner, Wedding Party, and Brunch).
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 1.5s ease-out;
}

.transform {
  will-change: transform;
}
</style>
