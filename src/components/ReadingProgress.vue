<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const progress = ref(0)

function updateProgress() {
  const scrollTop = window.scrollY
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  const scrollProgress = (scrollTop / docHeight) * 100
  progress.value = Math.min(100, Math.max(0, scrollProgress))
}

onMounted(() => {
  window.addEventListener('scroll', updateProgress, { passive: true })
  updateProgress()
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateProgress)
})
</script>

<template>
  <div class="reading-progress" role="progressbar" :aria-valuenow="Math.round(progress)" aria-valuemin="0" aria-valuemax="100">
    <div class="progress-bar" :style="{ width: `${progress}%` }">
      <div class="progress-glow"></div>
    </div>
  </div>
</template>

<style scoped>
.reading-progress {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: rgba(99, 102, 241, 0.1);
  z-index: 9999;
}

.progress-bar {
  height: 100%;
  background: var(--gradient-primary);
  position: relative;
  transition: width 0.1s ease-out;
}

.progress-glow {
  position: absolute;
  right: 0;
  top: -2px;
  width: 10px;
  height: 7px;
  background: var(--primary-light);
  border-radius: 50%;
  box-shadow: 0 0 10px var(--primary), 0 0 20px var(--primary);
  animation: pulse 1s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.2);
  }
}

@media (prefers-reduced-motion: reduce) {
  .progress-glow {
    animation: none;
  }
  
  .progress-bar {
    transition: none;
  }
}
</style>
