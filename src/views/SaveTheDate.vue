<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const videoRef = ref(null);
const hasStarted = ref(false);
const showRsvpButton = ref(false);

const startVideo = () => {
  if (hasStarted.value) return;
  
  if (videoRef.value) {
    videoRef.value.load();
    const playPromise = videoRef.value.play();
    if (playPromise !== undefined) {
      playPromise.catch((e) => {
        console.warn("Video play failed:", e);
      });
    }
  }
  hasStarted.value = true;
};

const onTimeUpdate = () => {
  if (!videoRef.value) return;
  const duration = videoRef.value.duration;
  const currentTime = videoRef.value.currentTime;
  
  if (duration && (duration - currentTime <= 8)) {
    showRsvpButton.value = true;
  }
};

const onVideoEnded = () => {
  showRsvpButton.value = true;
};

const goToRSVP = () => {
  router.push("/rsvp");
};
</script>

<template>
  <div class="save-the-date-container bg-black" @click="startVideo">
    <div class="video-wrapper" :class="{ 'is-playing': hasStarted }">
      <video
        ref="videoRef"
        class="fullscreen-video"
        playsinline
        @timeupdate="onTimeUpdate"
        @ended="onVideoEnded"
      >
        <source
          src="../assets/savethedatenuovo.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      <div class="instruction-overlay" v-if="!hasStarted">
        <span class="instruction-text">CLICK TO OPEN</span>
      </div>

      <Transition name="fade">
        <div v-if="showRsvpButton" class="end-overlay">
          <button @click.stop="goToRSVP" class="rsvp-button">RSVP</button>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.save-the-date-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100dvw;
  height: 100dvh;
  background-color: #000;
  overflow: hidden;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.video-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.fullscreen-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.instruction-overlay {
  position: absolute;
  bottom: 15%;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 10;
  pointer-events: none;
}

.instruction-text {
  color: #3C4F33;
  font-family: "Montserrat", sans-serif;
  font-size: 1.2rem;
  letter-spacing: 0.4em;
  animation: fadeInOut 2s infinite ease-in-out;
  text-align: center;
}

.end-overlay {
  position: absolute;
  bottom: 60px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 20;
}

.rsvp-button {
  padding: 1.25rem 3.5rem;
  background-color: #d5c6dc;
  color: #3d3b39;
  border: none;
  font-family: "Montserrat", sans-serif;
  font-size: 0.8rem;
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

@keyframes fadeInOut {
  0%,
  100% {
    opacity: 0.3;
  }
  50% {
    opacity: 1;
  }
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
