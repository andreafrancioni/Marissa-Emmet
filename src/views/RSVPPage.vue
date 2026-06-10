<script setup>
import { onMounted, onUnmounted } from "vue";
import RSVP from "../components/RSVP.vue";

const setThemeColor = (color) => {
  let meta = document.querySelector('meta[name="theme-color"]');
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('name', 'theme-color');
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', color);
  document.documentElement.style.backgroundColor = color;
  document.body.style.backgroundColor = color;
};

onMounted(() => {
  setThemeColor("#FEF6FA");
});

onUnmounted(() => {
  setThemeColor("#F1F1EB");
});
</script>

<template>
  <div class="pt-16">
    <RSVP />
  </div>
</template>
