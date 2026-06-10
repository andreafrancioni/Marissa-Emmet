<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const videoRef = ref(null);
const hasStarted = ref(false);
const videoEnded = ref(false);
const showRsvpButton = ref(false);

const isOpen = ref(false);
const isOut = ref(false);
const isZooming = ref(false);
const isFullScreen = ref(false);

// Helper to set theme-color and body background
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

const openEnvelope = () => {
  if (isOpen.value) return;

  isOpen.value = true;

  // Unlock video on iOS/Safari synchronously with the user click
  if (videoRef.value) {
    videoRef.value.load();
    const playPromise = videoRef.value.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          videoRef.value.pause();
        })
        .catch((e) => {
          console.warn("Video unlock failed:", e);
        });
    }
  }

  // Sequence the animation
  setTimeout(() => {
    isOut.value = true;
    setTimeout(() => {
      isZooming.value = true;
      setTimeout(() => {
        isFullScreen.value = true;
        // Wait for the 2s fade-in transition before playing the video
        setTimeout(() => {
          startExperience();
        }, 2000);
      }, 2500); // Wait for the full 2.5s zooming animation
    }, 1000); // Time for moving-up animation
  }, 800); // Time for flap opening
};

const startExperience = () => {
  hasStarted.value = true;
  setThemeColor("#000000");
  if (videoRef.value) {
    videoRef.value.play();
  }
};

const onTimeUpdate = () => {
  if (videoRef.value && videoRef.value.currentTime >= 12) {
    showRsvpButton.value = true;
  }
};

const onVideoEnded = () => {
  videoEnded.value = true;
  showRsvpButton.value = true;
};

const goToRSVP = () => {
  router.push("/rsvp");
};
</script>

<template>
  <div class="save-the-date-container" :class="{ 'bg-black': hasStarted }">
    <!-- 3D Envelope Experience -->
    <div v-if="!videoEnded" class="envelope-scene">
      <div class="glow-effect"></div>

      <div
        class="envelope-wrapper"
        :class="{ 'is-open': isOpen, 'is-out': isOut }"
        @click="openEnvelope"
      >
        <div class="envelope">
          <!-- Top Flap -->
          <div class="flap top">
            <svg
              viewBox="0 0 360 180"
              class="flap-svg top-svg"
              preserveAspectRatio="none"
            >
              <!-- Outer shape -->
              <path
                d="M 0 0 L 360 0 L 360 40 C 293 100, 248 160, 180 170 C 113 160, 68 100, 0 40 Z"
                fill="var(--envelope-color)"
              />
              <!-- Outer solid gold line -->
              <path
                d="M 9 0 L 9 38 C 73 95, 118 152, 180 162 C 242 152, 287 95, 351 38 L 351 0"
                fill="none"
                stroke="var(--envelope-gold-color)"
                stroke-width="1.5"
              />
              <!-- Inner dotted gold line -->
              <path
                d="M 18 0 L 18 35 C 79 90, 124 145, 180 154 C 236 145, 281 90, 342 35 L 342 0"
                fill="none"
                stroke="var(--envelope-gold-color)"
                stroke-width="2"
                stroke-dasharray="1,6"
                stroke-linecap="round"
              />
            </svg>
          </div>

          <!-- Front Face (Replaces Side/Bottom Flaps) -->
          <div class="flap front">
            <svg
              viewBox="0 0 360 220"
              class="flap-svg front-svg"
              preserveAspectRatio="none"
            >
              <!-- Main shape -->
              <path
                d="M 0 0 L 135 120 C 163 145, 197 145, 225 120 L 360 0 L 360 220 L 0 220 Z"
                fill="var(--envelope-color)"
              />

              <!-- Flap seams -->
              <path
                d="M 0 220 L 180 140 L 360 220"
                stroke="var(--envelope-seam-color)"
                stroke-width="1"
                fill="none"
              />

              <!-- Bottom gold lines (matching the top flap style) -->
              <path
                d="M 14 220 L 180 142 L 347 220"
                stroke="var(--envelope-gold-color)"
                stroke-width="1.5"
                fill="none"
              />
              <path
                d="M 27 220 L 180 152 L 333 220"
                stroke="var(--envelope-gold-color)"
                stroke-width="2"
                stroke-dasharray="1,6"
                stroke-linecap="round"
                fill="none"
              />

              <!-- Slit -->
              <path
                d="M 163 171 C 174 176, 186 176, 197 171"
                stroke="var(--envelope-slit-color)"
                stroke-width="2"
                fill="none"
                stroke-linecap="round"
              />
            </svg>
          </div>

          <!-- The Letter -->
          <div
            class="letter"
            :class="{ 'moving-up': isOut, zooming: isZooming }"
          >
            <img
              src="../assets/marissaemmetlogo.jpeg"
              class="letter-image"
              alt="Marissa & Emmet Logo"
            />
          </div>
        </div>
      </div>

      <div class="instruction" v-if="!isOpen">TAP TO OPEN</div>
    </div>

    <!-- Full Screen Letter / Video Content -->
    <Transition name="fade-video">
      <div v-show="isFullScreen" class="full-screen-letter">
        <video
          ref="videoRef"
          class="full-screen-video"
          playsinline
          @timeupdate="onTimeUpdate"
          @ended="onVideoEnded"
        >
          <source src="../assets/savethedateemmetmarissa.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <!-- End State Overlay -->
        <Transition name="fade">
          <div v-if="showRsvpButton" class="end-overlay">
            <button @click="goToRSVP" class="rsvp-button">RSVP NOW</button>
          </div>
        </Transition>
      </div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.save-the-date-container {
  /* --- Customizable Envelope Colors --- */
  --envelope-color: #eadaf5;
  --envelope-inside-color: #eadaf5a7; /* Slightly darker for inside depth */
  --envelope-seam-color: #bda1c9; /* Darker for flap seams */
  --envelope-slit-color: #a58eaf; /* Darkest for the slit shadow */
  --envelope-gold-color: #d5b752; /* Gold detailing */

  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #FEF6FA; // Deep dark background
  overflow: hidden;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 2000px;
  transition: background-color 1.5s ease;
}

.envelope-scene {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: opacity 1s ease;

  &.fade-out {
    opacity: 0;
    pointer-events: none;
  }
}

.glow-effect {
  position: absolute;
  width: 500px;
  height: 400px;
  background: radial-gradient(
    circle,
    rgba(229, 195, 82, 0.12) 0%,
    rgba(0, 0, 0, 0) 70%
  );
  border-radius: 50%;
  filter: blur(60px);
  z-index: 1;
  animation: pulse 5s infinite ease-in-out;
}

.envelope-wrapper {
  position: relative;
  width: 360px;
  height: 220px;
  background-color: var(--envelope-inside-color);
  cursor: pointer;
  z-index: 10;
  transform-style: preserve-3d;
  transition: transform 0.8s cubic-bezier(0.165, 0.84, 0.44, 1);
  box-shadow:
    0 20px 50px rgba(0, 0, 0, 0.6),
    inset 0 0 20px rgba(0, 0, 0, 0.05);
  animation: float 6s infinite ease-in-out; // Slower floating

  &:hover {
    transform: scale(1.05) rotateX(10deg);
  }

  &.is-open {
    animation: none;
  }
}

.envelope {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
}

.flap {
  position: absolute;
  z-index: 20;
}

.flap.top {
  top: 0;
  left: 0;
  width: 100%;
  height: 180px;
  transform-origin: top;
  transition: transform 0.8s ease-in-out;
  z-index: 40;
  filter: drop-shadow(0 2px 5px rgba(0, 0, 0, 0.3));
}

.is-open .flap.top {
  transform: rotateX(180deg);
  z-index: 10;
}

.flap.front {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 35;
}

.flap-svg {
  width: 100%;
  height: 100%;
  display: block;
}

.letter {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 320px;
  height: 180px;
  background: #fef6fa;
  z-index: 15;
  transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);

  &.moving-up {
    transform: translate(-50%, calc(-50% - 200px));
  }

  &.zooming {
    width: 100vw;
    height: 100vh;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2000;
    transition:
      width 2.5s cubic-bezier(0.4, 0, 0.2, 1),
      height 2.5s cubic-bezier(0.4, 0, 0.2, 1),
      top 2.5s cubic-bezier(0.4, 0, 0.2, 1),
      left 2.5s cubic-bezier(0.4, 0, 0.2, 1),
      transform 2.5s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: none;
    border-radius: 0;
  }
}

.letter-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
}

.instruction {
  margin-top: 40px;
  color: #e5c352;
  font-family: "Montserrat", sans-serif;
  font-size: 0.8rem;
  letter-spacing: 0.4em;
  animation: fadeInOut 2s infinite ease-in-out;
  z-index: 5;
}

// Full Screen Letter / Video
.full-screen-letter {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #fef6fa;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.full-screen-video {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.end-overlay {
  position: absolute;
  bottom: 60px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1100;
}

.rsvp-button {
  padding: 1.25rem 3.5rem;
  background-color: #D5C6DC;
  color: #3D3B39;
  border: none;
  font-family: "Montserrat", sans-serif;
  font-size: 0.7rem;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  border-radius: 5px;
  box-shadow: 0 10px 30px rgba(166, 130, 173, 0.3);

  &:hover {
    background-color: white;
    color: #3d3d3d;
    transform: translateY(-2px);
  }
}

.handwriting {
  font-family: "Great Vibes", cursive;
}

// Animations
@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes pulse {
  0%,
  100% {
    opacity: 0.5;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.1);
  }
}

@keyframes fadeInOut {
  0%,
  100% {
    opacity: 0.3;
  }
  50% {
    opacity: 1;
  }
}

// Transition for video fading in
.fade-video-enter-active {
  transition: opacity 2s ease;
}

.fade-video-enter-from {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
