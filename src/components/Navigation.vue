<script setup>
import { ref } from "vue";

const navLeft = [
  // { name: "WELCOME", href: "#welcome" },
  // { name: "DAY BY DAY", href: "#program" },
  // { name: "RSVP", href: "#rsvp" },
  // { name: "CONTACT", href: "#contact" },
];

const navRight = [
  // { name: "ACCOMMODATION", href: "#accommodation" },
  // { name: "ACTIVITIES", href: "#activities" },
  // { name: "DRESS CODE", href: "#dresscode" },
  // { name: "AT A GLANCE", href: "#glance" },
];

const isMenuOpen = ref(false);
</script>

<template>
  <nav
    class="fixed top-0 left-0 w-full z-50 bg-[#F1F1EB]/80 backdrop-blur-sm border-b border-[#3D3D3D]/10"
  >
    <div class="max-w-7xl mx-auto px-4 h-24 flex items-center justify-between">
      <!-- Desktop Nav Left -->
      <div class="hidden lg:flex items-center justify-end space-x-8 flex-1">
        <a
          v-for="link in navLeft"
          :key="link.name"
          :href="link.href"
          class="text-[10px] tracking-[0.2em] font-sans hover:text-gray-500 transition-colors uppercase"
        >
          {{ link.name }}
        </a>
      </div>

      <!-- Center Logo -->
      <div class="mx-4">
        <a href="#" class="flex flex-col items-center">
          <h1 class="text-4xl md:text-5xl text-[#3D3D3D]">Emmet & Marissa</h1>
        </a>
      </div>

      <!-- Desktop Nav Right -->
      <div
        class="hidden lg:flex items-center justify-start space-x-8 flex-1 justify-end"
      >
        <a
          v-for="link in navRight"
          :key="link.name"
          :href="link.href"
          class="text-[10px] tracking-[0.2em] font-sans hover:text-gray-500 transition-colors uppercase"
        >
          {{ link.name }}
        </a>
      </div>

      <!-- Mobile Button -->
      <button
        @click="isMenuOpen = !isMenuOpen"
        class="lg:hidden p-2 text-[#3D3D3D]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </div>

    <!-- Mobile Menu Overlay (Offcanvas) -->
    <Teleport to="body">
      <transition name="slide">
        <div
          v-if="isMenuOpen"
          class="fixed inset-0 bg-[#F1F1EB] z-[9999] flex flex-col items-center justify-center min-h-screen w-screen overflow-y-auto py-20"
        >
          <!-- Close Button -->
          <button
            @click="isMenuOpen = false"
            class="absolute top-8 right-8 p-4 text-[#3D3D3D] transition-transform hover:rotate-90 duration-300 z-[10000]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <!-- Menu Logo/Title -->
          <div class="mb-12 shrink-0">
            <a
              href="#"
              @click="isMenuOpen = false"
              class="flex flex-col items-center"
            >
              <span
                class="handwriting text-5xl text-[#3D3D3D] leading-none transform -rotate-1"
                >Emmet & Marissa</span
              >
            </a>
          </div>

          <!-- Links -->
          <div class="flex flex-col items-center space-y-6 overflow-y-auto">
            <a
              v-for="link in [...navLeft, ...navRight]"
              :key="link.name"
              :href="link.href"
              @click="isMenuOpen = false"
              class="text-xl md:text-2xl tracking-[0.3em] font-sans uppercase hover:text-gray-500 transition-colors py-2"
            >
              {{ link.name }}
            </a>
          </div>

          <!-- Decorative Element -->
          <div class="mt-12 opacity-30 shrink-0">
            <span
              class="block w-3 h-3 rotate-45 bg-[#3D3D3D] rounded-sm"
            ></span>
          </div>
        </div>
      </transition>
    </Teleport>
  </nav>
</template>

<style scoped>
.whitespace-nowrap {
  white-space: nowrap;
}

/* Slide Transition */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
</style>
