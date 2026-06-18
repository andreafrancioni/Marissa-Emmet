<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import programImage from "../assets/program-tile.png";

const days = [
  {
    day: 1,
    date: "THURSDAY, APRIL 22, 2027",
    events: [
      {
        title: "Welcome to Florence",
        time: "9:00 PM – Midnight",
        location:
          "Palazzo Gondi\nPiazza San Firenze 1–2\n50122 Florence, Italy",
        description:
          "Join us for an evening at the magnificent Palazzo Gondi as we welcome family and friends to Florence and begin our wedding celebrations together.",
      },
    ],
    image: programImage,
  },
  {
    day: 2,
    date: "FRIDAY, APRIL 23, 2027",
    events: [
      {
        title: "Religious Ceremony",
        time: "4:00 PM",
        location:
          "Chiesa dei Santi Michele e Gaetano\nPiazza degli Antinori, 1\n50123 Florence, Italy",
        description:
          "We are honored to celebrate our marriage at the beautiful Church of Saints Michael and Gaetano, one of Florence's most treasured Baroque churches.\n\nFollowing the ceremony, guests are invited to continue the celebrations at Villa Mangiacane in the heart of the Tuscan countryside.\n\nTransportation will be provided from the church to Villa Mangiacane and, at the conclusion of the evening, from Villa Mangiacane back to guests' accommodations.",
      },
      {
        title: "Wedding Reception & After-Party",
        time: "From 6:00 PM onwards",
        location: "Villa Mangiacane",
        description:
          "Cocktails, dinner, dancing, and festivities will follow at Villa Mangiacane.",
      },
    ],
    image: programImage,
  },
  {
    day: 3,
    date: "SATURDAY, APRIL 24, 2027",
    events: [
      {
        title: "Farewell Brunch",
        time: "11:30 AM - 2:30 PM",
        location:
          "Villa Mangiacane\nVia Faltignano,4\n50026 San Casciano in Val di Pesa, Italy",
        description:
          "Before we part ways, please join us for a fun and relaxed poolside brunch as we celebrate one final time together.\n\n* To ensure a seamless experience, complimentary transportation will be provided to and from the event venues. Detailed transfer schedules will be shared with guests closer to the wedding date.*",
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
        <h2 class="text-6xl md:text-8xl text-[#3D3D3D]">
          Schedule of Events
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
              :class="index % 2 === 0 ? 'md:items-end md:text-right' : 'md:items-start md:text-left'"
            >
              <div class="max-w-md w-full">
                <h3
                  class="text-6xl text-center text-[#3D3D3D] mb-4"
                  :class="index % 2 === 0 ? 'md:text-right' : 'md:text-left'"
                >
                  Day {{ day.day }}
                </h3>
                <h4
                  class="text-2xl text-center font-title tracking-widest text-[#3D3D3D] mb-12"
                  :class="index % 2 === 0 ? 'md:text-right' : 'md:text-left'"
                >
                  {{ day.date }}
                </h4>

                <ul class="space-y-10">
                  <li
                    v-for="(event, eIndex) in day.events"
                    :key="eIndex"
                    class="text-gray-600"
                  >
                    <h5
                      v-if="event.title"
                      class="text-xl font-title text-[#3D3D3D] mb-2"
                      :class="index % 2 === 0 ? 'md:text-right' : 'md:text-left'"
                    >
                      {{ event.title }}
                    </h5>
                    <span
                      class="block text-xs font-menu tracking-widest text-gray-500 mb-4 uppercase"
                      :class="index % 2 === 0 ? 'md:text-right' : 'md:text-left'"
                      >{{ event.time }}</span
                    >
                    <div
                      v-if="event.location"
                      class="mb-4 text-sm font-menu text-gray-500 whitespace-pre-line"
                      :class="index % 2 === 0 ? 'md:text-right' : 'md:text-left'"
                    >
                      <span
                        class="font-semibold block uppercase tracking-widest mb-1 text-[10px]"
                        >Location</span
                      >
                      {{ event.location }}
                    </div>
                    <p
                      class="text-base font-light leading-relaxed whitespace-pre-line"
                      :class="index % 2 === 0 ? 'md:text-right' : 'md:text-left'"
                    >
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

<style scoped></style>
