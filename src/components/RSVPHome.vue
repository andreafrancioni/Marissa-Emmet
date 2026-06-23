<script setup>
import { useRouter } from "vue-router";
import stickersImg from "@/assets/stickers.png";

const router = useRouter();

const goToRSVP = () => {
  router.push("/rsvp");
};
</script>

<template>
  <section
    id="rsvp"
    class="relative py-24 bg-primary overflow-hidden flex flex-col items-center justify-center text-center"
  >
    <!-- Decorative Background Optional -->

    <div
      class="relative z-10 max-w-2xl px-6 flex flex-col items-center"
      data-aos="fade-up"
    >
      <p
        class="text-xl md:text-2xl font-title italic text-[#3D3B39] leading-relaxed mb-6"
      >
        We can't wait to welcome you to Florence and
        <br class="hidden md:block" />
        share this unforgettable <br class="hidden md:block" />
        celebration with you.
      </p>

      <p class="text-xl md:text-2xl font-title italic text-[#3D3B39] mb-6">
        Thank you for being part of it !
      </p>

      <p class="text-xl md:text-2xl font-title italic text-[#3D3B39] mb-6">
        With love !
      </p>

      <h2 class="text-5xl md:text-7xl text-[#3D3B39] mb-16">
        Emmet and Marissa
      </h2>

      <p class="text-lg md:text-xl font-menu text-[#3D3B39] mb-6">
        Click here to provide your participation details.
      </p>

      <button
        @click="goToRSVP"
        class="border border-[#3D3B39] px-8 py-3 text-sm tracking-[0.2em] uppercase hover:bg-text hover:text-white transition-colors duration-300"
      >
        RSVP
      </button>
    </div>
  </section>
</template>

<style scoped>
/* Based on the image and general styles from RSVP.vue */
</style>
