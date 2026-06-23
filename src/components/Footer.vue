<script setup>
import logoImage from "../assets/solo_logo.png";
</script>

<template>
  <footer
    id="contact"
    class="py-32 px-4 bg-primary border-t border-[#3D3D3D]/10"
  >
    <div
      class="max-w-7xl mx-auto flex flex-col items-center gap-12"
      data-aos="fade-up"
    >
      <img
        :src="logoImage"
        alt="Emmet & Marissa"
        class="h-48 md:h-60 object-contain"
      />

      <div class="flex flex-col md:flex-row items-center gap-12 text-center">
        <div class="space-y-4">
          <p
            class="text-[10px] tracking-widest font-menu uppercase font-bold text-gray-500"
          >
            Contact
          </p>
          <a
            href="mailto:emmetmarissa@affresco.it"
            class="text-lg font-title hover:text-gray-500 transition-colors"
            >emmetmarissa@affresco.it</a
          >
        </div>

        <div class="w-12 h-px bg-text/30 hidden md:block"></div>

        <div class="space-y-4">
          <p
            class="text-[10px] tracking-widest font-menu uppercase font-bold text-gray-500"
          >
            April 22nd to 24th 2027
          </p>
          <p class="text-xs tracking-[0.2em] font-menu text-gray-400 uppercase">
            Florence Italy
          </p>
        </div>
      </div>

      <div class="pt-24 flex flex-col items-center gap-4">
        <p
          class="text-[8px] tracking-[0.4em] text-center font-menu text-gray-400 uppercase"
        >
          COPYRIGHT © 2026 BURRO AGENCY — ALL RIGHTS RESERVED.
        </p>
      </div>
    </div>
  </footer>
</template>
