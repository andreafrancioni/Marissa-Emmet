<template>
  <section
    id="welcome"
    class="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16"
  >
    <!-- Hero Video Background -->
    <div class="absolute inset-0 w-full h-full z-0">
      <video autoplay loop muted playsinline class="w-full h-full object-cover">
        <source src="../assets/15470637_3840_2160_60fps.mp4" type="video/mp4" />
      </video>
      <div class="absolute inset-0 bg-[#F1F1EB]/65"></div>
    </div>

    <!-- Main Content centered over Video -->
    <div
      class="relative z-10 text-center max-w-4xl mx-auto px-4 animate-fade-in-up"
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
          FLORENCE, ITALY
        </p>
      </div>
    </div>
  </section>

  <!-- Content below Hero -->
  <section class="bg-[#F1F1EB] py-16 px-4">
    <div class="max-w-2xl mx-auto text-center space-y-6 animate-fade-in-up">
      <p
        class="text-xs md:text-sm tracking-[0.1em] font-sans text-gray-500 uppercase"
      >
        Dear Friends,
      </p>
      <p
        class="text-lg md:text-xl font-serif leading-relaxed text-[#3D3D3D]/80"
      >
        We are delighted to share with you the program for our celebration
        weekend this August in Florence, Italy. <br class="hidden md:block" />
        Please note that we are arranging all transfers to and from the
        celebration venues <br class="hidden md:block" />
        (Welcome Dinner, Wedding Party, and Brunch).
      </p>
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
