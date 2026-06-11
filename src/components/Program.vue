<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import programImage from "../assets/program-tile.png";

const days = [
  {
    day: 1,
    date: "FRIDAY, JUNE 18TH",
    events: [
      {
        time: "7:00 PM",
        description:
          "Transfers from the selected hotels to the Welcome Dinner venue.",
      },
      {
        time: "7:30 PM",
        description: "Welcome cocktail & Dinner",
      },
      {
        time: "12:00 AM",
        description:
          "End of the evening and return transfers to the selected hotels",
      },
    ],
    image: programImage,
  },
  {
    day: 2,
    date: "SATURDAY, JUNE 19TH",
    events: [
      {
        time: "Morning",
        description:
          "Dedicated to curated experiences to discover the beauty of Florence.",
      },
      {
        time: "1:30 PM",
        description: "Lunch at the beach club.",
      },
      {
        time: "7:00 PM",
        description: "Main Celebration and Party at our favorite Masseria.",
      },
    ],
    image: programImage,
  },
  {
    day: 3,
    date: "SUNDAY, JUNE 20TH",
    events: [
      {
        time: "11:00 AM",
        description: "Farewell Brunch and last dips in the sea.",
      },
    ],
    image: programImage,
  },
];

const programSection = ref(null);
const sunProgress = ref(0);

const handleScroll = () => {
  if (!programSection.value) return;

  const rect = programSection.value.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  // Progress starts when section top is at 80% scroll depth and ends at 20%
  const sectionHeight = rect.height;
  const scrollOffset = windowHeight * 0.5; // Target middle of screen

  const currentPos = -rect.top + scrollOffset;
  let progress = (currentPos / sectionHeight) * 100;

  // Clamp progress between 0 and 100
  sunProgress.value = Math.max(0, Math.min(100, progress));
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  handleScroll();
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <section
    id="program"
    ref="programSection"
    class="py-24 px-4 bg-[#F1F1EB] overflow-hidden"
  >
    <div class="max-w-6xl mx-auto">
      <!-- Main Title -->
      <div class="text-center mb-32">
        <h2 class="text-6xl md:text-8xl handwriting text-[#3D3D3D]">
          Weekend Program
        </h2>
      </div>

      <div class="relative">
        <!-- Central Timeline Line -->
        <div
          class="absolute left-1/2 top-0 bottom-0 w-px bg-[#3D3D3D]/10 -translate-x-1/2 hidden md:block"
        >
          <!-- Moving Sun Element Container -->
          <div class="absolute top-0 bottom-0 left-0 w-full">
            <!-- The Sun itself, absolutely positioned based on progress -->
            <div
              class="absolute left-1/2 -ml-4 z-30 flex items-center justify-center bg-[#F1F1EB] w-8 h-8 rounded-full"
              :style="{ top: `${sunProgress}%` }"
            >
              <span class="text-2xl leading-none">☀️</span>
            </div>
          </div>
        </div>

        <div class="space-y-32">
          <div
            v-for="(day, index) in days"
            :key="index"
            class="flex flex-col md:flex-row items-center gap-12 md:gap-24 relative"
            :class="index % 2 === 0 ? '' : 'md:flex-row-reverse'"
          >
            <!-- Content Column -->
            <div
              class="w-full md:w-1/2 flex flex-col"
              :class="
                index % 2 === 0
                  ? 'md:items-end md:text-right'
                  : 'md:items-start md:text-left'
              "
            >
              <div class="max-w-md w-full">
                <h3
                  class="text-6xl text-center handwriting text-[#3D3D3D] mb-4"
                  :class="index % 2 === 0 ? 'md:text-right' : 'md:text-left'"
                >
                  Day {{ day.day }}
                </h3>
                <h4
                  class="text-2xl text-center font-serif tracking-widest text-[#3D3D3D] mb-8"
                  :class="index % 2 === 0 ? 'md:text-right' : 'md:text-left'"
                >
                  {{ day.date }}
                </h4>

                <ul class="space-y-6">
                  <li
                    v-for="(event, eIndex) in day.events"
                    :key="eIndex"
                    class="text-gray-600"
                  >
                    <span
                      class="block text-sm font-sans tracking-wide text-gray-400 mb-1 uppercase"
                      >{{ event.time }}</span
                    >
                    <p class="text-lg font-light leading-relaxed">
                      {{ event.description }}
                    </p>
                  </li>
                </ul>
              </div>
            </div>

            <!-- Spacer for Timeline Line -->
            <div class="hidden md:block w-px h-full"></div>

            <!-- Image Column -->
            <div class="w-full md:w-1/2">
              <div
                class="aspect-square relative overflow-hidden shadow-sm group"
              >
                <img
                  :src="day.image"
                  :alt="'Day ' + day.day"
                  class="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                />
                <!-- Decorative border or overlay if needed -->
                <div
                  class="absolute inset-4 border border-white/20 pointer-events-none"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>
