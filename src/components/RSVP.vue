<script setup>
import { ref, reactive } from "vue";
import stickersImg from "@/assets/stickers.png";

const SCRIPT_URL = import.meta.env.VITE_SCRIPT_URL;

const currentStep = ref(1);
const isSubmitting = ref(false);
const isSuccess = ref(false);
const errorMessage = ref("");

const form = reactive({
  // Step 1: Contact Info
  title: "",
  fullName: "",
  email: "",
  phone: "",
  // Guest
  guestTitle: "",
  guestName: "",
  // Step 2: Attendance
  attending: "",
  // Step 3: Shipping
  shippingName: "",
  shippingAddress: "",
  shippingCity: "",
  shippingZip: "",
  shippingCountry: "",
  shippingNotes: "",
  // Step 4: Travel & Accommodation
  arrivalDate: "",
  departureDate: "",
  hotel: "",
  // Step 5: Events
  events: {
    welcomeEvening: { status: "", guests: 1 },
    weddingDay: { status: "", guests: 1 },
    farewellBrunch: { status: "", guests: 1 },
  },
  // Step 6: Dietary
  dietary: {
    allergies: "",
    preferences: "",
  },
});

const nextStep = () => {
  if (validateStep()) {
    if (
      (currentStep.value === 2 && form.attending === "no") ||
      currentStep.value === 6
    ) {
      submitForm();
      return;
    }
    currentStep.value++;
    window.scrollTo({
      top: document.getElementById("rsvp").offsetTop,
      behavior: "smooth",
    });
  }
};

const prevStep = () => {
  currentStep.value--;
  window.scrollTo({
    top: document.getElementById("rsvp").offsetTop,
    behavior: "smooth",
  });
};

const validateStep = () => {
  if (currentStep.value === 1) {
    if (!form.fullName || !form.email || !form.phone) {
      errorMessage.value = "Please fill in all required fields.";
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      errorMessage.value = "Please enter a valid email address.";
      return false;
    }
  }
  if (currentStep.value === 2) {
    if (!form.attending) {
      errorMessage.value = "Please let us know if you will be attending.";
      return false;
    }
  }
  if (currentStep.value === 3) {
    if (
      !form.shippingName ||
      !form.shippingAddress ||
      !form.shippingCity ||
      !form.shippingZip ||
      !form.shippingCountry
    ) {
      errorMessage.value = "Please fill in all required delivery fields.";
      return false;
    }
  }
  if (currentStep.value === 4) {
    if (!form.arrivalDate || !form.departureDate || !form.hotel) {
      errorMessage.value = "Please fill in all required travel fields.";
      return false;
    }
  }
  if (currentStep.value === 5) {
    if (form.events.weddingDay.status === "") {
      errorMessage.value =
        "Please let us know if you will attend the Wedding Day.";
      return false;
    }
  }
  if (currentStep.value === 6) {
    if (!form.dietary.allergies) {
      errorMessage.value =
        "Please fill in the food allergies field (write 'None' if applicable).";
      return false;
    }
  }
  errorMessage.value = "";
  return true;
};

const submitForm = async () => {
  if (form.attending === "yes" && form.events.weddingDay.status === "") {
    errorMessage.value =
      "Please let us know if you will attend the Wedding Day.";
    return;
  }
  if (form.attending === "yes" && !form.dietary.allergies) {
    errorMessage.value = "Please fill in the food allergies field.";
    return;
  }

  isSubmitting.value = true;
  errorMessage.value = "";

  try {
    const response = await fetch(SCRIPT_URL, {
      method: "POST",
      mode: "no-cors", // Needed for Google Apps Script
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    isSuccess.value = true;
  } catch (error) {
    console.error("Submission error:", error);
    // Even with no-cors, if it doesn't throw, we assume success or handle failure
    // Google Apps Script usually returns an opaque response with no-cors
    isSuccess.value = true;
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <section
    id="rsvp"
    class="relative min-h-screen py-24 bg-[#FEF6FA] overflow-hidden flex items-center justify-center"
  >
    <div class="relative z-10 w-full max-w-2xl px-6">
      <div
        class="bg-white/40 backdrop-blur-sm p-8 md:p-12 border border-black/5 shadow-sm rounded-sm"
      >
        <!-- Header -->
        <div class="text-center mb-12 relative">
          <!-- Decorative Stickers -->
          <div
            class="absolute opacity-[0.15] pointer-events-none"
            :style="{
              backgroundImage: `url(${stickersImg})`,
              backgroundPosition: '-170px -680px',
              width: '90px',
              height: '230px',
              bottom: '-40px',
              right: '-20px',
            }"
          ></div>

          <h3
            class="text-[10px] tracking-[0.4em] font-sans text-gray-500 uppercase mb-4 relative z-10"
          >
            Confirm Attendance
          </h3>
          <h2
            class="text-4xl md:text-6xl handwriting text-[#3D3B39] leading-tight relative z-10"
          >
            Emmet & Marissa<br />Wedding
          </h2>
          <div
            class="w-12 h-[1px] bg-[#D5C6DC] mx-auto mt-6 relative z-10"
          ></div>
        </div>

        <!-- Success Message -->
        <div
          v-if="isSuccess"
          class="text-center py-12 animate-in fade-in duration-700"
        >
          <h3 class="text-2xl font-serif text-[#3D3B39] mb-4">Grazie Mille!</h3>
          <p class="text-lg text-gray-600 font-light italic">
            Your response has been recorded. We look forward to celebrating with
            you!
          </p>
          <div class="mt-8">
            <svg
              class="w-16 h-16 text-[#D5C6DC] mx-auto opacity-50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
        </div>

        <!-- Form Steps -->
        <div v-else>
          <!-- Step Indicators -->
          <div class="flex justify-center mb-12 space-x-4 md:space-x-8">
            <div v-for="step in 6" :key="step" class="relative">
              <div
                :class="[
                  'w-2 h-2 rounded-full transition-all duration-500',
                  currentStep >= step
                    ? 'bg-[#bda1c9] scale-125'
                    : 'bg-gray-300',
                ]"
              ></div>
              <div
                v-if="step < 6"
                class="absolute top-1/2 left-full w-4 md:w-8 h-[1px] -translate-y-1/2"
                :class="currentStep > step ? 'bg-[#bda1c9]' : 'bg-gray-200'"
              ></div>
            </div>
          </div>

          <form @submit.prevent="submitForm" class="space-y-8">
            <!-- Step 1: Contact Information & Additional Guest -->
            <div
              v-if="currentStep === 1"
              class="space-y-6 animate-in fade-in duration-500"
            >
              <div class="space-y-4">
                <h4
                  class="text-xs font-serif text-[#3D3B39] uppercase tracking-widest border-b border-black/5 pb-2"
                >
                  Contact Information
                </h4>
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div class="space-y-2">
                    <label
                      class="block text-[9px] tracking-widest uppercase text-gray-400 font-sans"
                      >Title</label
                    >
                    <input
                      v-model="form.title"
                      type="text"
                      placeholder="Mr / Mrs"
                      class="w-full bg-transparent border-b border-gray-200 py-2 focus:outline-none focus:border-[#bda1c9] transition-colors placeholder:text-gray-200 font-light italic"
                    />
                  </div>
                  <div class="md:col-span-3 space-y-2">
                    <label
                      class="block text-[9px] tracking-widest uppercase text-gray-400 font-sans"
                      >Full Name *</label
                    >
                    <input
                      v-model="form.fullName"
                      type="text"
                      required
                      class="w-full bg-transparent border-b border-gray-200 py-2 focus:outline-none focus:border-[#bda1c9] transition-colors font-light italic"
                    />
                  </div>
                </div>
                <div class="space-y-2">
                  <label
                    class="block text-[9px] tracking-widest uppercase text-gray-400 font-sans"
                    >Email *</label
                  >
                  <input
                    v-model="form.email"
                    type="email"
                    required
                    class="w-full bg-transparent border-b border-gray-200 py-2 focus:outline-none focus:border-[#bda1c9] transition-colors font-light italic"
                  />
                </div>
                <div class="space-y-2">
                  <label
                    class="block text-[9px] tracking-widest uppercase text-gray-400 font-sans"
                    >Mobile Number *</label
                  >
                  <input
                    v-model="form.phone"
                    type="tel"
                    required
                    placeholder="+00 000 0000000"
                    class="w-full bg-transparent border-b border-gray-200 py-2 focus:outline-none focus:border-[#bda1c9] transition-colors font-light italic"
                  />
                </div>
              </div>

              <div class="space-y-4 pt-4">
                <h4
                  class="text-xs font-serif text-[#3D3B39] uppercase tracking-widest border-b border-black/5 pb-2"
                >
                  Additional Guest
                </h4>
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div class="space-y-2">
                    <label
                      class="block text-[9px] tracking-widest uppercase text-gray-400 font-sans"
                      >Title</label
                    >
                    <input
                      v-model="form.guestTitle"
                      type="text"
                      placeholder="Mr / Mrs"
                      class="w-full bg-transparent border-b border-gray-200 py-2 focus:outline-none focus:border-[#bda1c9] transition-colors placeholder:text-gray-200 font-light italic"
                    />
                  </div>
                  <div class="md:col-span-3 space-y-2">
                    <label
                      class="block text-[9px] tracking-widest uppercase text-gray-400 font-sans"
                      >Full Name (Guest 2)</label
                    >
                    <input
                      v-model="form.guestName"
                      type="text"
                      class="w-full bg-transparent border-b border-gray-200 py-2 focus:outline-none focus:border-[#bda1c9] transition-colors font-light italic"
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- Step 2: Attendance -->
            <div
              v-if="currentStep === 2"
              class="space-y-8 animate-in fade-in duration-500"
            >
              <div class="text-center space-y-6">
                <h4
                  class="text-sm font-serif text-[#3D3B39] uppercase tracking-[0.2em]"
                >
                  Will you join us?
                </h4>
                <div
                  class="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-12"
                >
                  <label
                    class="flex items-center space-x-3 cursor-pointer group"
                  >
                    <div class="relative flex items-center justify-center">
                      <input
                        type="radio"
                        value="yes"
                        v-model="form.attending"
                        class="peer h-5 w-5 appearance-none border border-gray-300 rounded-full checked:border-[#bda1c9] checked:border-[6px] transition-all"
                      />
                    </div>
                    <span
                      class="text-base text-gray-600 font-light italic group-hover:text-[#3D3B39] transition-colors"
                      >Yes, I'll be there</span
                    >
                  </label>
                  <label
                    class="flex items-center space-x-3 cursor-pointer group"
                  >
                    <div class="relative flex items-center justify-center">
                      <input
                        type="radio"
                        value="no"
                        v-model="form.attending"
                        class="peer h-5 w-5 appearance-none border border-gray-300 rounded-full checked:border-[#bda1c9] checked:border-[6px] transition-all"
                      />
                    </div>
                    <span
                      class="text-base text-gray-600 font-light italic group-hover:text-[#3D3B39] transition-colors"
                      >Regretfully decline</span
                    >
                  </label>
                </div>

                <p
                  class="text-xs md:text-sm text-gray-500 font-light italic max-w-md mx-auto pt-6"
                >
                  While we adore your little ones, we kindly invite you to enjoy
                  our wedding celebrations as an adults-only occasion.
                </p>
              </div>
            </div>

            <!-- Step 3: Shipping Address -->
            <div
              v-if="currentStep === 3"
              class="space-y-6 animate-in fade-in duration-500"
            >
              <div class="space-y-4">
                <h4
                  class="text-xs font-serif text-[#3D3B39] uppercase tracking-widest border-b border-black/5 pb-2"
                >
                  Shipping Address for Invitation
                </h4>
                <p class="text-[10px] text-gray-400 italic font-sans mb-4">
                  For the delivery of your formal invitation suite
                </p>

                <div class="space-y-2">
                  <label
                    class="block text-[9px] tracking-widest uppercase text-gray-400 font-sans"
                    >Name *</label
                  >
                  <input
                    v-model="form.shippingName"
                    type="text"
                    required
                    class="w-full bg-transparent border-b border-gray-200 py-2 focus:outline-none focus:border-[#bda1c9] transition-colors font-light italic"
                  />
                </div>
                <div class="space-y-2">
                  <label
                    class="block text-[9px] tracking-widest uppercase text-gray-400 font-sans"
                    >Street Address *</label
                  >
                  <input
                    v-model="form.shippingAddress"
                    type="text"
                    required
                    class="w-full bg-transparent border-b border-gray-200 py-2 focus:outline-none focus:border-[#bda1c9] transition-colors font-light italic"
                  />
                </div>
                <div class="grid grid-cols-2 gap-4">
                  <div class="space-y-2">
                    <label
                      class="block text-[9px] tracking-widest uppercase text-gray-400 font-sans"
                      >City *</label
                    >
                    <input
                      v-model="form.shippingCity"
                      type="text"
                      required
                      class="w-full bg-transparent border-b border-gray-200 py-2 focus:outline-none focus:border-[#bda1c9] transition-colors font-light italic"
                    />
                  </div>
                  <div class="space-y-2">
                    <label
                      class="block text-[9px] tracking-widest uppercase text-gray-400 font-sans"
                      >Postal Code *</label
                    >
                    <input
                      v-model="form.shippingZip"
                      type="text"
                      required
                      class="w-full bg-transparent border-b border-gray-200 py-2 focus:outline-none focus:border-[#bda1c9] transition-colors font-light italic"
                    />
                  </div>
                </div>
                <div class="space-y-2">
                  <label
                    class="block text-[9px] tracking-widest uppercase text-gray-400 font-sans"
                    >Country *</label
                  >
                  <input
                    v-model="form.shippingCountry"
                    type="text"
                    required
                    class="w-full bg-transparent border-b border-gray-200 py-2 focus:outline-none focus:border-[#bda1c9] transition-colors font-light italic"
                  />
                </div>
                <div class="space-y-2">
                  <label
                    class="block text-[9px] tracking-widest uppercase text-gray-400 font-sans"
                    >Delivery Notes</label
                  >
                  <input
                    v-model="form.shippingNotes"
                    type="text"
                    placeholder="e.g. concierge instructions, gate code"
                    class="w-full bg-transparent border-b border-gray-200 py-2 focus:outline-none focus:border-[#bda1c9] transition-colors placeholder:text-gray-200 font-light italic"
                  />
                </div>
              </div>
            </div>

            <!-- Step 4: Travel & Accommodation -->
            <div
              v-if="currentStep === 4"
              class="space-y-6 animate-in fade-in duration-500"
            >
              <div class="space-y-4">
                <h4
                  class="text-xs font-serif text-[#3D3B39] uppercase tracking-widest border-b border-black/5 pb-2"
                >
                  Travel Information
                </h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="space-y-2">
                    <label
                      class="block text-[9px] tracking-widest uppercase text-gray-400 font-sans"
                      >Arrival Date *</label
                    >
                    <input
                      v-model="form.arrivalDate"
                      type="date"
                      required
                      class="w-full bg-transparent border-b border-gray-200 py-2 focus:outline-none focus:border-[#bda1c9] transition-colors font-light"
                    />
                  </div>
                  <div class="space-y-2">
                    <label
                      class="block text-[9px] tracking-widest uppercase text-gray-400 font-sans"
                      >Departure Date *</label
                    >
                    <input
                      v-model="form.departureDate"
                      type="date"
                      required
                      class="w-full bg-transparent border-b border-gray-200 py-2 focus:outline-none focus:border-[#bda1c9] transition-colors font-light"
                    />
                  </div>
                </div>
              </div>

              <div class="space-y-4 pt-4">
                <h4
                  class="text-xs font-serif text-[#3D3B39] uppercase tracking-widest border-b border-black/5 pb-2"
                >
                  Accommodation
                </h4>
                <div class="space-y-2">
                  <label
                    class="block text-[9px] tracking-widest uppercase text-gray-400 font-sans"
                    >Kindly indicate the hotel where you will be staying
                    *</label
                  >
                  <input
                    v-model="form.hotel"
                    type="text"
                    required
                    placeholder="Enter hotel name"
                    class="w-full bg-transparent border-b border-gray-200 py-2 focus:outline-none focus:border-[#bda1c9] transition-colors placeholder:text-gray-200 font-light italic"
                  />
                </div>
              </div>
            </div>

            <!-- Step 5: Events & Activities -->
            <div
              v-if="currentStep === 5"
              class="space-y-10 animate-in fade-in duration-500"
            >
              <div class="space-y-8">
                <h4
                  class="text-xs font-serif text-[#3D3B39] uppercase tracking-widest border-b border-black/5 pb-2"
                >
                  Event Attendance
                </h4>

                <!-- Welcome Evening -->
                <div class="space-y-4 p-6 bg-black/5 rounded-sm">
                  <div>
                    <h5 class="text-base font-serif text-[#3D3B39]">
                      Welcome to Florence
                    </h5>
                    <p
                      class="text-[10px] text-gray-400 uppercase tracking-wider font-sans"
                    >
                      Thursday, April 22, 2027 at 9:00 PM
                    </p>
                  </div>

                  <div class="flex space-x-6">
                    <label
                      class="flex items-center space-x-2 cursor-pointer group"
                    >
                      <input
                        type="radio"
                        value="will_attend"
                        v-model="form.events.welcomeEvening.status"
                        class="peer h-4 w-4 appearance-none border border-gray-300 rounded-full checked:border-[#bda1c9] checked:border-[5px] transition-all"
                      />
                      <span
                        class="text-sm text-gray-600 font-light italic group-hover:text-[#3D3B39]"
                        >Will attend</span
                      >
                    </label>
                    <label
                      class="flex items-center space-x-2 cursor-pointer group"
                    >
                      <input
                        type="radio"
                        value="not_attend"
                        v-model="form.events.welcomeEvening.status"
                        class="peer h-4 w-4 appearance-none border border-gray-300 rounded-full checked:border-[#bda1c9] checked:border-[5px] transition-all"
                      />
                      <span
                        class="text-sm text-gray-600 font-light italic group-hover:text-[#3D3B39]"
                        >Will not attend</span
                      >
                    </label>
                  </div>

                  <div
                    v-if="form.events.welcomeEvening.status === 'will_attend'"
                    class="pt-2 animate-in fade-in duration-300"
                  >
                    <label
                      class="block text-[9px] tracking-widest uppercase text-gray-400 font-sans mb-1"
                      >Number of attendees</label
                    >
                    <input
                      v-model.number="form.events.welcomeEvening.guests"
                      type="number"
                      min="1"
                      class="w-20 bg-transparent border-b border-gray-300 py-1 focus:outline-none focus:border-[#bda1c9] text-sm font-light"
                    />
                  </div>
                </div>

                <!-- Wedding Day -->
                <div class="space-y-4 p-6 bg-black/5 rounded-sm">
                  <div>
                    <h5 class="text-base font-serif text-[#3D3B39]">
                      Wedding Day
                    </h5>
                    <p
                      class="text-[10px] text-gray-400 uppercase tracking-wider font-sans"
                    >
                      Friday, April 23, 2027 at 4:00 PM
                    </p>
                  </div>

                  <div class="flex space-x-6">
                    <label
                      class="flex items-center space-x-2 cursor-pointer group"
                    >
                      <input
                        type="radio"
                        value="will_attend"
                        v-model="form.events.weddingDay.status"
                        class="peer h-4 w-4 appearance-none border border-gray-300 rounded-full checked:border-[#bda1c9] checked:border-[5px] transition-all"
                      />
                      <span
                        class="text-sm text-gray-600 font-light italic group-hover:text-[#3D3B39]"
                        >Will attend</span
                      >
                    </label>
                    <label
                      class="flex items-center space-x-2 cursor-pointer group"
                    >
                      <input
                        type="radio"
                        value="not_attend"
                        v-model="form.events.weddingDay.status"
                        class="peer h-4 w-4 appearance-none border border-gray-300 rounded-full checked:border-[#bda1c9] checked:border-[5px] transition-all"
                      />
                      <span
                        class="text-sm text-gray-600 font-light italic group-hover:text-[#3D3B39]"
                        >Will not attend</span
                      >
                    </label>
                  </div>

                  <div
                    v-if="form.events.weddingDay.status === 'will_attend'"
                    class="pt-2 animate-in fade-in duration-300"
                  >
                    <label
                      class="block text-[9px] tracking-widest uppercase text-gray-400 font-sans mb-1"
                      >Number of attendees</label
                    >
                    <input
                      v-model.number="form.events.weddingDay.guests"
                      type="number"
                      min="1"
                      class="w-20 bg-transparent border-b border-gray-300 py-1 focus:outline-none focus:border-[#bda1c9] text-sm font-light"
                    />
                  </div>
                </div>

                <!-- Farewell Poolside Brunch -->
                <div class="space-y-4 p-6 bg-black/5 rounded-sm">
                  <div>
                    <h5 class="text-base font-serif text-[#3D3B39]">
                      Farewell Poolside Brunch
                    </h5>
                    <p
                      class="text-[10px] text-gray-400 uppercase tracking-wider font-sans"
                    >
                      Saturday, April 24, 2027 at 11:30 AM
                    </p>
                  </div>

                  <div class="flex space-x-6">
                    <label
                      class="flex items-center space-x-2 cursor-pointer group"
                    >
                      <input
                        type="radio"
                        value="will_attend"
                        v-model="form.events.farewellBrunch.status"
                        class="peer h-4 w-4 appearance-none border border-gray-300 rounded-full checked:border-[#bda1c9] checked:border-[5px] transition-all"
                      />
                      <span
                        class="text-sm text-gray-600 font-light italic group-hover:text-[#3D3B39]"
                        >Will attend</span
                      >
                    </label>
                    <label
                      class="flex items-center space-x-2 cursor-pointer group"
                    >
                      <input
                        type="radio"
                        value="not_attend"
                        v-model="form.events.farewellBrunch.status"
                        class="peer h-4 w-4 appearance-none border border-gray-300 rounded-full checked:border-[#bda1c9] checked:border-[5px] transition-all"
                      />
                      <span
                        class="text-sm text-gray-600 font-light italic group-hover:text-[#3D3B39]"
                        >Will not attend</span
                      >
                    </label>
                  </div>

                  <div
                    v-if="form.events.farewellBrunch.status === 'will_attend'"
                    class="pt-2 animate-in fade-in duration-300"
                  >
                    <label
                      class="block text-[9px] tracking-widest uppercase text-gray-400 font-sans mb-1"
                      >Number of attendees</label
                    >
                    <input
                      v-model.number="form.events.farewellBrunch.guests"
                      type="number"
                      min="1"
                      class="w-20 bg-transparent border-b border-gray-300 py-1 focus:outline-none focus:border-[#bda1c9] text-sm font-light"
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- Step 6: Dietary Requirements -->
            <div
              v-if="currentStep === 6"
              class="space-y-8 animate-in fade-in duration-500"
            >
              <div class="space-y-4">
                <h4
                  class="text-xs font-serif text-[#3D3B39] uppercase tracking-widest border-b border-black/5 pb-2"
                >
                  Dietary Requirements
                </h4>
                <p class="text-[10px] text-gray-400 italic font-sans italic">
                  We kindly ask you to inform us of any dietary requirements:
                </p>

                <div class="space-y-2">
                  <label
                    class="block text-[9px] tracking-widest uppercase text-gray-400 font-sans"
                    >Food allergies (medical) *</label
                  >
                  <textarea
                    v-model="form.dietary.allergies"
                    rows="2"
                    placeholder="Please specify any medical food allergies..."
                    class="w-full bg-transparent border border-gray-200 p-4 focus:outline-none focus:border-[#bda1c9] transition-colors placeholder:text-gray-300 font-light text-base italic resize-none"
                  ></textarea>
                </div>

                <div class="space-y-2">
                  <label
                    class="block text-[9px] tracking-widest uppercase text-gray-400 font-sans"
                    >Dietary preferences (vegetarian, vegan, etc.)</label
                  >
                  <textarea
                    v-model="form.dietary.preferences"
                    rows="2"
                    placeholder="e.g. Vegetarian, Vegan, no seafood..."
                    class="w-full bg-transparent border border-gray-200 p-4 focus:outline-none focus:border-[#bda1c9] transition-colors placeholder:text-gray-300 font-light text-base italic resize-none"
                  ></textarea>
                </div>
              </div>
            </div>

            <!-- Error Message -->
            <p
              v-if="errorMessage"
              class="text-xs text-red-500 font-sans tracking-wide text-center uppercase"
            >
              {{ errorMessage }}
            </p>

            <!-- Navigation Buttons -->
            <div
              class="flex items-center justify-between pt-8 border-t border-black/5"
            >
              <button
                v-if="currentStep > 1"
                type="button"
                @click="prevStep"
                class="text-[10px] tracking-[0.3em] font-sans uppercase text-gray-400 hover:text-[#3D3B39] transition-colors"
              >
                Back
              </button>
              <div v-else></div>

              <button
                v-if="currentStep < 6"
                type="button"
                @click="nextStep"
                class="px-12 py-4 bg-[#3D3B39] text-white text-[10px] tracking-[0.3em] font-sans uppercase hover:bg-[#D5C6DC] hover:text-[#3D3B39] rounded-[5px] shadow-[0_4px_12px_rgba(166,130,173,0.15)] hover:shadow-[0_10px_30px_rgba(166,130,173,0.3)] hover:-translate-y-0.5 transition-all duration-300"
              >
                {{
                  currentStep === 2 && form.attending === "no"
                    ? "Confirm RSVP"
                    : "Continue"
                }}
              </button>

              <button
                v-else
                type="submit"
                :disabled="isSubmitting"
                class="px-12 py-4 bg-[#D5C6DC] text-[#3D3B39] text-[10px] tracking-[0.3em] font-sans uppercase hover:bg-white hover:text-[#3D3B39] rounded-[5px] shadow-[0_10px_30px_rgba(166,130,173,0.3)] hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ isSubmitting ? "Sending..." : "Confirm RSVP" }}
              </button>
            </div>
          </form>
        </div>

        <p
          class="text-center mt-12 text-[9px] tracking-[0.2em] font-sans text-gray-400 uppercase"
        >
          Need help?
          <a
            href="mailto:emmetmarissa@AFFRESCO.IT"
            class="underline hover:text-[#3D3B39]"
            >emmetmarissa@AFFRESCO.IT</a
          >
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.grayscale-50 {
  filter: grayscale(50%);
}

.animate-in {
  animation: fadeIn 0.5s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Custom form styles */
input[type="date"]::-webkit-calendar-picker-indicator {
  filter: invert(0.5);
  cursor: pointer;
}
</style>
