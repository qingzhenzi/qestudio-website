<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%231e293b" width="400" height="300"/%3E%3C/svg%3E',
  },
  width: {
    type: String,
    default: null,
  },
  height: {
    type: String,
    default: null,
  },
  objectFit: {
    type: String,
    default: 'cover',
  },
})

const imageRef = ref(null)
const isLoaded = ref(false)
const isError = ref(false)
const isInView = ref(false)

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isInView.value = true
          observer.disconnect()
        }
      })
    },
    {
      rootMargin: '100px',
      threshold: 0.1,
    }
  )

  if (imageRef.value) {
    observer.observe(imageRef.value)
  }
})

function handleLoad() {
  isLoaded.value = true
}

function handleError() {
  isError.value = true
}
</script>

<template>
  <div
    ref="imageRef"
    class="lazy-image"
    :style="{
      width: width,
      height: height,
    }"
  >
    <transition name="fade">
      <img
        v-if="isInView"
        :src="isError ? placeholder : src"
        :alt="alt"
        class="image"
        :class="{ loaded: isLoaded }"
        :style="{ objectFit }"
        loading="lazy"
        @load="handleLoad"
        @error="handleError"
      />
    </transition>
    <div v-if="!isLoaded && isInView" class="loading-placeholder">
      <div class="shimmer"></div>
    </div>
    <div v-if="isError" class="error-placeholder">
      <span>🖼️</span>
    </div>
  </div>
</template>

<style scoped>
.lazy-image {
  position: relative;
  overflow: hidden;
  background: var(--bg-card);
  border-radius: var(--border-radius-md);
}

.image {
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.image.loaded {
  opacity: 1;
}

.loading-placeholder {
  position: absolute;
  inset: 0;
  background: var(--bg-secondary);
}

.shimmer {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.1) 50%,
    transparent 100%
  );
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.error-placeholder {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-secondary);
  font-size: 2rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
