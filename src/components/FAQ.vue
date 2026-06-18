<script setup>
import { ref } from 'vue';

const activeIndex = ref(null);

const toggleAccordion = (index) => {
  activeIndex.value = activeIndex.value === index ? null : index;
};

const faqs = [
  {
    question: "What travel documents do I need to travel to Florence, Italy?",
    answer: `<p>A valid passport is required for all guests traveling to Italy.</p>
          <p>
            <strong>For our Irish and other EU guests:</strong> Italy is part of
            the Schengen Area, so a valid passport is all that is required.
          </p>
          <p>
            <strong>For our American guests:</strong> Please ensure your
            passport is valid for at least three months beyond your planned
            departure date from the Schengen Area. Travelers whose passports do
            not meet this requirement may be denied entry.
          </p>
          <p>
            We recommend checking your passport expiration date well in advance
            of travel. For additional information, please visit the U.S.
            Department of State website.
          </p>`
  },
  {
    question: "Are there any special entry requirements for U.S. travelers?",
    answer: `<p>
            <strong>Entry/Exit System (EES):</strong> This system will require
            non-EU travelers to have their passport scanned and provide
            biometric information (such as fingerprints and a facial photo) when
            entering the European Union. This may increase processing times at
            airports and border crossings.
          </p>
          <p>
            <strong>European Travel Information and Authorisation System (ETIAS):</strong>
            The EU currently plans to introduce ETIAS in 2027. Once implemented,
            U.S. travelers and other visa-exempt non-EU visitors will need to
            obtain travel authorization before entering participating European
            countries, including Italy.
          </p>
          <p>
            As our wedding approaches, we recommend checking the latest travel
            guidance to ensure you have completed any required steps before
            departure.
          </p>`
  },
  {
    question: "When should I book my flights?",
    answer: `<p>
            We recommend booking flights as early as possible, especially if you
            plan to extend your stay in Italy before or after the wedding
            weekend. Spring is a popular travel season in Tuscany, and airfare
            and hotel availability may become more limited closer to the date.
          </p>`
  },
  {
    question: "What hotel should I stay at?",
    answer: `<p>
            Wherever feels most comfortable and enjoyable for your time in
            Florence!
          </p>
          <p>
            We will provide several recommended hotels on our website, along
            with any available group rates or discount codes. However, you are
            welcome to stay wherever you'd like, we do not expect guests to stay
            at any particular hotel.
          </p>
          <p>
            The only thing we ask is that you choose accommodations near our
            designated transportation pick-up and drop-off locations. This will
            make it easier for you to access transportation to and from the
            villa for our wedding events.
          </p>
          <p>
            Whether you prefer a luxury hotel, boutique property, apartment, or
            Airbnb, we encourage you to find the option that best suits your
            travel style and budget.
          </p>
          <p>
            If you have any questions, please don't hesitate to reach out, we're
            happy to help! Our e-mail:
            <a
              href="mailto:emmetmarissa@affresco.it"
              class="text-blue-700 underline font-medium"
              >emmetmarissa@affresco.it</a
            >
          </p>`
  },
  {
    question: "Can we bring children?",
    answer: `<p>
            To allow all of our guests to relax and fully enjoy the celebration,
            we have chosen to make our wedding an adults-only event
          </p>
          <p>
            As much as we love your little ones, we kindly ask that this be a
            celebration for adults only. We hope this gives you the opportunity
            to enjoy a carefree weekend in Florence with us.
          </p>
          <p>
            We truly appreciate your understanding and support, and we can't
            wait to celebrate together!
          </p>`
  }
];
</script>

<template>
  <section id="faq" class="py-24 px-4 bg-white">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="text-6xl md:text-8xl text-[#3D3D3D] mb-4">
          Faq
        </h2>
        <div class="w-12 h-[1px] bg-[#D5C6DC] mx-auto mt-6"></div>
      </div>
      
      <div class="space-y-4">
        <div 
          v-for="(faq, index) in faqs" 
          :key="index"
          class="border border-[#D5C6DC] rounded-xl overflow-hidden transition-all duration-300"
          :class="activeIndex === index ? 'shadow-md bg-[#F9F7FA]' : 'bg-white hover:bg-gray-50'"
        >
          <button 
            @click="toggleAccordion(index)"
            class="w-full text-left px-6 py-6 flex justify-between items-center focus:outline-none"
          >
            <h3 class="text-xl font-title text-[#3D3D3D] pr-8">
              {{ faq.question }}
            </h3>
            <span class="text-[#D5C6DC] transition-transform duration-300 transform" :class="activeIndex === index ? 'rotate-180' : ''">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </button>
          
          <div 
            class="overflow-hidden transition-all duration-500 ease-in-out"
            :style="{ 
              maxHeight: activeIndex === index ? '1000px' : '0', 
              opacity: activeIndex === index ? '1' : '0' 
            }"
          >
            <div class="px-6 pb-6 pt-0 text-[#3D3D3D]/80 font-light leading-relaxed space-y-4" v-html="faq.answer">
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
