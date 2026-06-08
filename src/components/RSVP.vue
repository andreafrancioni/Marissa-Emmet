<script setup>
import { ref, reactive } from "vue";

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
    welcomeDinner: { status: "", guests: 1 },
    weddingDay: { status: "", guests: 1 },
  },
  children: {
    hasChildren: "",
    count: 1,
    names: "",
    welcomeDinner: "",
    weddingDay: "",
    hasBabysitter: "",
    babysitterName: "",
    babysitterEvents: "",
  },
  dietary: {
    allergies: "",
    preferences: "",
  },
});

const nextStep = () => {
  if (validateStep()) {
    if (
      (currentStep.value === 2 && form.attending === "no") ||
      currentStep.value === 3
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
  /* Commentato temporaneamente come richiesto dai clienti
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
  */
  errorMessage.value = "";
  return true;
};

const submitForm = async () => {
  /* Commentato temporaneamente come richiesto dai clienti
  if (form.attending === "yes" && form.events.weddingDay.status === "") {
    errorMessage.value =
      "Please let us know if you will attend the Wedding Day.";
    return;
  }
  if (form.attending === "yes" && !form.dietary.allergies) {
    errorMessage.value = "Please fill in the food allergies field.";
    return;
  }
  */

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
    class="relative min-h-screen py-24 bg-[#F1F1EB] overflow-hidden flex items-center justify-center"
  >
    <div class="relative z-10 w-full max-w-2xl px-6">
      <div
        class="bg-white/40 backdrop-blur-sm p-8 md:p-12 border border-black/5 shadow-sm rounded-sm"
      >
        <!-- Header -->
        <div class="text-center mb-12">
          <h3
            class="text-[10px] tracking-[0.4em] font-sans text-gray-500 uppercase mb-4"
          >
            Confirm Attendance
          </h3>
          <h2
            class="text-4xl md:text-5xl font-serif text-[#3D3D3D] leading-tight"
          >
            Emmet & Marissa Wedding
          </h2>
          <div class="w-12 h-[1px] bg-[#E5C352] mx-auto mt-6"></div>
        </div>

        <!-- Success Message -->
        <div
          v-if="isSuccess"
          class="text-center py-12 animate-in fade-in duration-700"
        >
          <h3 class="text-2xl font-serif text-[#3D3D3D] mb-4">Grazie Mille!</h3>
          <p class="text-lg text-gray-600 font-light italic">
            Your response has been recorded. We look forward to celebrating with
            you!
          </p>
          <div class="mt-8">
            <svg
              class="w-16 h-16 text-[#E5C352] mx-auto opacity-50"
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
          <!-- Step Indicators (Temporaneamente limitati a 3) -->
          <div class="flex justify-center mb-12 space-x-12">
            <div v-for="step in 3" :key="step" class="relative">
              <div
                :class="[
                  'w-2 h-2 rounded-full transition-all duration-500',
                  currentStep >= step
                    ? 'bg-[#E5C352] scale-125'
                    : 'bg-gray-300',
                ]"
              ></div>
              <div
                v-if="step < 3"
                class="absolute top-1/2 left-full w-12 h-[1px] -translate-y-1/2"
                :class="currentStep > step ? 'bg-[#E5C352]' : 'bg-gray-200'"
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
                  class="text-xs font-serif text-[#3D3D3D] uppercase tracking-widest border-b border-black/5 pb-2"
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
                      class="w-full bg-transparent border-b border-gray-200 py-2 focus:outline-none focus:border-[#E5C352] transition-colors placeholder:text-gray-200 font-light italic"
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
                      class="w-full bg-transparent border-b border-gray-200 py-2 focus:outline-none focus:border-[#E5C352] transition-colors font-light italic"
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
                    class="w-full bg-transparent border-b border-gray-200 py-2 focus:outline-none focus:border-[#E5C352] transition-colors font-light italic"
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
                    class="w-full bg-transparent border-b border-gray-200 py-2 focus:outline-none focus:border-[#E5C352] transition-colors font-light italic"
                  />
                </div>
              </div>

              <div class="space-y-4 pt-4">
                <h4
                  class="text-xs font-serif text-[#3D3D3D] uppercase tracking-widest border-b border-black/5 pb-2"
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
                      class="w-full bg-transparent border-b border-gray-200 py-2 focus:outline-none focus:border-[#E5C352] transition-colors placeholder:text-gray-200 font-light italic"
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
                      class="w-full bg-transparent border-b border-gray-200 py-2 focus:outline-none focus:border-[#E5C352] transition-colors font-light italic"
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
                  class="text-sm font-serif text-[#3D3D3D] uppercase tracking-[0.2em]"
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
                        class="peer h-5 w-5 appearance-none border border-gray-300 rounded-full checked:border-[#E5C352] checked:border-[6px] transition-all"
                      />
                    </div>
                    <span
                      class="text-base text-gray-600 font-light italic group-hover:text-[#3D3D3D] transition-colors"
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
                        class="peer h-5 w-5 appearance-none border border-gray-300 rounded-full checked:border-[#E5C352] checked:border-[6px] transition-all"
                      />
                    </div>
                    <span
                      class="text-base text-gray-600 font-light italic group-hover:text-[#3D3D3D] transition-colors"
                      >Regretfully decline</span
                    >
                  </label>
                </div>
              </div>
            </div>

            <!-- Step 3: Shipping Address -->
            <div
              v-if="currentStep === 3"
              class="space-y-6 animate-in fade-in duration-500"
            >
              <div class="space-y-4">
                <h4
                  class="text-xs font-serif text-[#3D3D3D] uppercase tracking-widest border-b border-black/5 pb-2"
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
                    class="w-full bg-transparent border-b border-gray-200 py-2 focus:outline-none focus:border-[#E5C352] transition-colors font-light italic"
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
                    class="w-full bg-transparent border-b border-gray-200 py-2 focus:outline-none focus:border-[#E5C352] transition-colors font-light italic"
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
                      class="w-full bg-transparent border-b border-gray-200 py-2 focus:outline-none focus:border-[#E5C352] transition-colors font-light italic"
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
                      class="w-full bg-transparent border-b border-gray-200 py-2 focus:outline-none focus:border-[#E5C352] transition-colors font-light italic"
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
                    class="w-full bg-transparent border-b border-gray-200 py-2 focus:outline-none focus:border-[#E5C352] transition-colors font-light italic"
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
                    class="w-full bg-transparent border-b border-gray-200 py-2 focus:outline-none focus:border-[#E5C352] transition-colors placeholder:text-gray-200 font-light italic"
                  />
                </div>
              </div>
            </div>

            <!-- Step 4: Travel & Accommodation (Commentato temporaneamente) -->
            <!--
            <div
              v-if="currentStep === 4"
              class="space-y-6 animate-in fade-in duration-500"
            >
              <div class="space-y-4">
                <h4
                  class="text-xs font-serif text-[#3D3D3D] uppercase tracking-widest border-b border-black/5 pb-2"
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
                      class="w-full bg-transparent border-b border-gray-200 py-2 focus:outline-none focus:border-[#E5C352] transition-colors font-light"
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
                      class="w-full bg-transparent border-b border-gray-200 py-2 focus:outline-none focus:border-[#E5C352] transition-colors font-light"
                    />
                  </div>
                </div>
              </div>

              <div class="space-y-4 pt-4">
                <h4
                  class="text-xs font-serif text-[#3D3D3D] uppercase tracking-widest border-b border-black/5 pb-2"
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
                    class="w-full bg-transparent border-b border-gray-200 py-2 focus:outline-none focus:border-[#E5C352] transition-colors placeholder:text-gray-200 font-light italic"
                  />
                </div>
              </div>
            </div>
            -->

            <!-- Step 5: Events & Activities (Commentato temporaneamente) -->
            <!--
            <div
              v-if="currentStep === 5"
              class="space-y-10 animate-in fade-in duration-500"
            >
              <div class="space-y-8">
                <h4
                  class="text-xs font-serif text-[#3D3D3D] uppercase tracking-widest border-b border-black/5 pb-2"
                >
                  Event Attendance
                </h4>

                <div class="space-y-4 p-6 bg-black/5 rounded-sm">
                  <div>
                    <h5 class="text-base font-serif text-[#3D3D3D]">
                      Welcome Dinner
                    </h5>
                    <p
                      class="text-[10px] text-gray-400 uppercase tracking-wider font-sans"
                    >
                      June 18, 2027 at 7:00 PM
                    </p>
                  </div>

                  <div class="flex space-x-6">
                    <label
                      class="flex items-center space-x-2 cursor-pointer group"
                    >
                      <input
                        type="radio"
                        value="will_attend"
                        v-model="form.events.welcomeDinner.status"
                        class="peer h-4 w-4 appearance-none border border-gray-300 rounded-full checked:border-[#E5C352] checked:border-[5px] transition-all"
                      />
                      <span
                        class="text-sm text-gray-600 font-light italic group-hover:text-[#3D3D3D]"
                        >Will attend</span
                      >
                    </label>
                    <label
                      class="flex items-center space-x-2 cursor-pointer group"
                    >
                      <input
                        type="radio"
                        value="not_attend"
                        v-model="form.events.welcomeDinner.status"
                        class="peer h-4 w-4 appearance-none border border-gray-300 rounded-full checked:border-[#E5C352] checked:border-[5px] transition-all"
                      />
                      <span
                        class="text-sm text-gray-600 font-light italic group-hover:text-[#3D3D3D]"
                        >Will not attend</span
                      >
                    </label>
                  </div>

                  <div
                    v-if="form.events.welcomeDinner.status === 'will_attend'"
                    class="pt-2 animate-in fade-in duration-300"
                  >
                    <label
                      class="block text-[9px] tracking-widest uppercase text-gray-400 font-sans mb-1"
                      >Number of attendees</label
                    >
                    <input
                      v-model.number="form.events.welcomeDinner.guests"
                      type="number"
                      min="1"
                      class="w-20 bg-transparent border-b border-gray-300 py-1 focus:outline-none focus:border-[#E5C352] text-sm font-light"
                    />
                  </div>
                </div>

                <div class="space-y-4 p-6 bg-black/5 rounded-sm">
                  <div>
                    <h5 class="text-base font-serif text-[#3D3D3D]">
                      Wedding Day
                    </h5>
                    <p
                      class="text-[10px] text-gray-400 uppercase tracking-wider font-sans"
                    >
                      June 19, 2027 from 4:00 PM onwards
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
                        class="peer h-4 w-4 appearance-none border border-gray-300 rounded-full checked:border-[#E5C352] checked:border-[5px] transition-all"
                      />
                      <span
                        class="text-sm text-gray-600 font-light italic group-hover:text-[#3D3D3D]"
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
                        class="peer h-4 w-4 appearance-none border border-gray-300 rounded-full checked:border-[#E5C352] checked:border-[5px] transition-all"
                      />
                      <span
                        class="text-sm text-gray-600 font-light italic group-hover:text-[#3D3D3D]"
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
                      class="w-20 bg-transparent border-b border-gray-300 py-1 focus:outline-none focus:border-[#E5C352] text-sm font-light"
                    />
                  </div>
                </div>
              </div>

              <div class="space-y-6 pt-6 border-t border-black/5">
                <div class="text-center space-y-4">
                  <h4
                    class="text-sm font-serif text-[#3D3D3D] uppercase tracking-[0.2em]"
                  >
                    Children
                  </h4>
                  <p class="text-[11px] text-gray-500 font-sans">
                    Will you be accompanied by children?
                  </p>
                  <div class="flex items-center justify-center space-x-8">
                    <label
                      class="flex items-center space-x-2 cursor-pointer group"
                    >
                      <input
                        type="radio"
                        value="yes"
                        v-model="form.children.hasChildren"
                        class="peer h-4 w-4 appearance-none border border-gray-300 rounded-full checked:border-[#E5C352] checked:border-[5px] transition-all"
                      />
                      <span
                        class="text-sm text-gray-600 font-light italic group-hover:text-[#3D3D3D]"
                        >Yes</span
                      >
                    </label>
                    <label
                      class="flex items-center space-x-2 cursor-pointer group"
                    >
                      <input
                        type="radio"
                        value="no"
                        v-model="form.children.hasChildren"
                        class="peer h-4 w-4 appearance-none border border-gray-300 rounded-full checked:border-[#E5C352] checked:border-[5px] transition-all"
                      />
                      <span
                        class="text-sm text-gray-600 font-light italic group-hover:text-[#3D3D3D]"
                        >No</span
                      >
                    </label>
                  </div>
                </div>

                <div
                  v-if="form.children.hasChildren === 'yes'"
                  class="space-y-8 animate-in fade-in duration-500 bg-black/5 p-6 rounded-sm"
                >
                  <p
                    class="text-[10px] text-gray-400 italic font-sans italic text-center uppercase tracking-wider"
                  >
                    Please provide the following details
                  </p>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-2">
                      <label
                        class="block text-[9px] tracking-widest uppercase text-gray-400 font-sans"
                        >Number of children</label
                      >
                      <input
                        v-model.number="form.children.count"
                        type="number"
                        min="1"
                        class="w-full bg-transparent border-b border-gray-200 py-1 focus:outline-none focus:border-[#E5C352] text-sm font-light"
                      />
                    </div>
                    <div class="space-y-2">
                      <label
                        class="block text-[9px] tracking-widest uppercase text-gray-400 font-sans"
                        >Name(s)</label
                      >
                      <input
                        v-model="form.children.names"
                        type="text"
                        placeholder="e.g. Leo, Sofia"
                        class="w-full bg-transparent border-b border-gray-200 py-1 focus:outline-none focus:border-[#E5C352] text-sm font-light italic"
                      />
                    </div>
                  </div>

                  <div class="space-y-4">
                    <p
                      class="text-[9px] tracking-widest uppercase text-gray-400 font-sans border-b border-black/5 pb-1"
                    >
                      Children attendance at each event
                    </p>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div class="space-y-2">
                        <label
                          class="block text-[10px] font-serif text-[#3D3D3D]"
                          >Welcome Dinner</label
                        >
                        <select
                          v-model="form.children.welcomeDinner"
                          class="w-full bg-transparent border-b border-gray-200 py-1 focus:outline-none focus:border-[#E5C352] text-sm font-light italic"
                        >
                          <option value="">Select status</option>
                          <option value="will_attend">Will attend</option>
                          <option value="not_attend">Will not attend</option>
                        </select>
                      </div>
                      <div class="space-y-2">
                        <label
                          class="block text-[10px] font-serif text-[#3D3D3D]"
                          >Wedding Day</label
                        >
                        <select
                          v-model="form.children.weddingDay"
                          class="w-full bg-transparent border-b border-gray-200 py-1 focus:outline-none focus:border-[#E5C352] text-sm font-light italic"
                        >
                          <option value="">Select status</option>
                          <option value="will_attend">Will attend</option>
                          <option value="not_attend">Will not attend</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div class="space-y-4 pt-4 border-t border-black/10">
                    <p class="text-[11px] text-center text-gray-500 font-sans">
                      Will you be accompanied by a babysitter?
                    </p>
                    <div class="flex items-center justify-center space-x-8">
                      <label
                        class="flex items-center space-x-2 cursor-pointer group"
                      >
                        <input
                          type="radio"
                          value="yes"
                          v-model="form.children.hasBabysitter"
                          class="peer h-4 w-4 appearance-none border border-gray-300 rounded-full checked:border-[#E5C352] checked:border-[5px] transition-all"
                        />
                        <span
                          class="text-sm text-gray-600 font-light italic group-hover:text-[#3D3D3D]"
                          >Yes</span
                        >
                      </label>
                      <label
                        class="flex items-center space-x-2 cursor-pointer group"
                      >
                        <input
                          type="radio"
                          value="no"
                          v-model="form.children.hasBabysitter"
                          class="peer h-4 w-4 appearance-none border border-gray-300 rounded-full checked:border-[#E5C352] checked:border-[5px] transition-all"
                        />
                        <span
                          class="text-sm text-gray-600 font-light italic group-hover:text-[#3D3D3D]"
                          >No</span
                        >
                      </label>
                    </div>

                    <div
                      v-if="form.children.hasBabysitter === 'yes'"
                      class="space-y-4 pt-4 animate-in fade-in duration-300"
                    >
                      <div class="space-y-2">
                        <label
                          class="block text-[9px] tracking-widest uppercase text-gray-400 font-sans"
                          >Babysitter name (if available)</label
                        >
                        <input
                          v-model="form.children.babysitterName"
                          type="text"
                          class="w-full bg-transparent border-b border-gray-200 py-1 focus:outline-none focus:border-[#E5C352] text-sm font-light italic"
                        />
                      </div>
                      <div class="space-y-2">
                        <label
                          class="block text-[9px] tracking-widest uppercase text-gray-400 font-sans"
                          >Which events will the babysitter attend?</label
                        >
                        <input
                          v-model="form.children.babysitterEvents"
                          type="text"
                          placeholder="e.g. Only Wedding Day"
                          class="w-full bg-transparent border-b border-gray-200 py-1 focus:outline-none focus:border-[#E5C352] text-sm font-light italic"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            -->

            <!-- Step 6: Dietary Requirements (Commentato temporaneamente) -->
            <!--
            <div
              v-if="currentStep === 6"
              class="space-y-8 animate-in fade-in duration-500"
            >
              <div class="space-y-4">
                <h4
                  class="text-xs font-serif text-[#3D3D3D] uppercase tracking-widest border-b border-black/5 pb-2"
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
                    class="w-full bg-transparent border border-gray-200 p-4 focus:outline-none focus:border-[#E5C352] transition-colors placeholder:text-gray-300 font-light text-base italic resize-none"
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
                    class="w-full bg-transparent border border-gray-200 p-4 focus:outline-none focus:border-[#E5C352] transition-colors placeholder:text-gray-300 font-light text-base italic resize-none"
                  ></textarea>
                </div>
              </div>
            </div>
            -->

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
                class="text-[10px] tracking-[0.3em] font-sans uppercase text-gray-400 hover:text-[#3D3D3D] transition-colors"
              >
                Back
              </button>
              <div v-else></div>

              <button
                v-if="currentStep < 3"
                type="button"
                @click="nextStep"
                class="px-12 py-4 bg-[#3D3D3D] text-white text-[10px] tracking-[0.3em] font-sans uppercase hover:bg-[#E5C352] transition-all duration-300"
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
                class="px-12 py-4 bg-[#E5C352] text-white text-[10px] tracking-[0.3em] font-sans uppercase hover:bg-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
            class="underline hover:text-[#3D3D3D]"
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
