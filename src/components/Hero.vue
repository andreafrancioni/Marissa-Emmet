<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const weddingDate = new Date("2027-06-18T00:00:00");
const days = ref(0);
const hours = ref(0);
const minutes = ref(0);
const seconds = ref(0);
let timer = null;

const calculateTimeLeft = () => {
  const difference = weddingDate.getTime() - new Date().getTime();

  if (difference > 0) {
    days.value = Math.floor(difference / (1000 * 60 * 60 * 24));
    hours.value = Math.floor((difference / (1000 * 60 * 60)) % 24);
    minutes.value = Math.floor((difference / 1000 / 60) % 60);
    seconds.value = Math.floor((difference / 1000) % 60);
  }
};

onMounted(() => {
  calculateTimeLeft();
  timer = setInterval(calculateTimeLeft, 1000);
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
});
</script>

<template>
  <section
    id="welcome"
    class="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16"
  >
    <!-- Hero Video Background -->
    <div class="absolute inset-0 w-full h-full z-0">
      <video autoplay loop muted playsinline class="w-full h-full object-cover">
        <source src="../assets/villa-mangiacane.mp4" type="video/mp4" />
      </video>
      <div class="absolute inset-0 bg-primary/65"></div>
    </div>

    <!-- Main Content centered over Video -->
    <div
      class="relative z-10 text-center max-w-4xl mx-auto px-4 animate-fade-in-up"
    >
      <div class="flex items-center justify-center mb-4">
        <img
          src="../assets/testo.png"
          alt="Emmet & Marissa"
          class="hero-image w-full max-w-xl md:max-w-3xl h-auto"
        />
      </div>

      <!-- Countdown -->
      <div class="flex justify-center items-center gap-4 md:gap-8 mt-12">
        <div class="flex flex-col items-center">
          <span class="text-3xl md:text-5xl font-title text-[#3D3D3D]">{{
            days
          }}</span>
          <span
            class="text-xs tracking-[0.2em] font-menu uppercase text-[#3D3D3D]/70 mt-2"
            >Days</span
          >
        </div>
        <div class="text-2xl md:text-4xl font-title text-[#3D3D3D]/50 mb-6">
          :
        </div>
        <div class="flex flex-col items-center">
          <span class="text-3xl md:text-5xl font-title text-[#3D3D3D]">{{
            hours
          }}</span>
          <span
            class="text-xs tracking-[0.2em] font-menu uppercase text-[#3D3D3D]/70 mt-2"
            >Hours</span
          >
        </div>
        <div class="text-2xl md:text-4xl font-title text-[#3D3D3D]/50 mb-6">
          :
        </div>
        <div class="flex flex-col items-center">
          <span class="text-3xl md:text-5xl font-title text-[#3D3D3D]">{{
            minutes
          }}</span>
          <span
            class="text-xs tracking-[0.2em] font-menu uppercase text-[#3D3D3D]/70 mt-2"
            >Mins</span
          >
        </div>
        <div class="text-2xl md:text-4xl font-title text-[#3D3D3D]/50 mb-6">
          :
        </div>
        <div class="flex flex-col items-center">
          <span class="text-3xl md:text-5xl font-title text-[#3D3D3D]">{{
            seconds
          }}</span>
          <span
            class="text-xs tracking-[0.2em] font-menu uppercase text-[#3D3D3D]/70 mt-2"
            >Secs</span
          >
        </div>
      </div>
    </div>
  </section>

  <!-- Content below Hero -->
  <section class="bg-primary py-16 px-4">
    <div class="max-w-2xl mx-auto text-center space-y-6" data-aos="fade-up">
      <p
        class="text-md md:text-2xl tracking-[0.5em] font-menu text-gray-500 uppercase"
      >
        Benvenuti!
      </p>
      <p
        class="text-lg md:text-xl font-title leading-relaxed text-[#3D3D3D]/80"
      >
        Thank you for being part of this special chapter in our lives and for
        traveling to celebrate our Marriage with us. We are so excited to
        welcome you to Florence, a city that holds a special place in our
        hearts. Having you here means the world to us. We look forward to
        creating unforgettable memories together as we begin this next chapter
        in our lives. Thank you for being part of our story and for joining us
        in Florence to share in this unforgettable weekend.<br /><br />Con
        Amore,<br />Marissa & Emmet
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

.hero-image {
  filter: brightness(0) invert(0);
}
</style>
