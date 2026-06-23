<script setup>
import { computed, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import Navigation from "./components/Navigation.vue";
import Footer from "./components/Footer.vue";
import AOS from "aos";
import "aos/dist/aos.css";

const route = useRoute();
const isSaveTheDate = computed(() => route.path === "/savethedate");
const isRSVP = computed(() => route.path === "/rsvp");

onMounted(() => {
  AOS.init({
    duration: 800,
    easing: "ease-out-cubic",
    once: true,
    offset: 50,
  });
});

watch(
  () => route.path,
  () => {
    setTimeout(() => {
      AOS.refresh();
    }, 600); // give time for transition to finish
  }
);
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
