<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import Navigation from "./components/Navigation.vue";
import Footer from "./components/Footer.vue";

const route = useRoute();
const isSaveTheDate = computed(() => route.path === "/savethedate");
const isRSVP = computed(() => route.path === "/rsvp");
</script>

<template>
  <div
    class="relative bg-primary text-[#3D3D3D] selection:bg-accent selection:text-white min-h-screen flex flex-col"
  >
    <Navigation v-if="!isSaveTheDate" />
    <main class="flex-grow">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <Footer v-if="!isSaveTheDate" />
  </div>
</template>

<style>
/* Smooth scrolling for anchor links */
html {
  scroll-behavior: smooth;
}

/* Base styles for selecting elements */
::selection {
  background-color: #e5c352;
  color: #ffffff;
}

/* Global transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
