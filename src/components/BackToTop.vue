<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isVisible = ref(false)
const isAnimating = ref(false)

function handleScroll() {
  isVisible.value = window.scrollY > 300
}

function scrollToTop() {
  if (isAnimating.value) return
  isAnimating.value = true
  
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
  
  setTimeout(() => {
    isAnimating.value = false
  }, 500)
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <transition name="back-to-top">
    <button
      v-show="isVisible"
      class="back-to-top"
      :class="{ animating: isAnimating }"
      @click="scrollToTop"
      aria-label="返回顶部"
    >
      <div class="btn-content">
        <span class="sparkle sparkle-1">✦</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M12 19V5M5 12l7-7 7 7"/>
        </svg>
        <span class="sparkle sparkle-2">✧</span>
      </div>
      <div class="btn-ring"></div>
      <div class="btn-particles">
        <span v-for="i in 6" :key="i" class="particle"></span>
      </div>
    </button>
  </transition>
</template>

<style scoped>
.back-to-top {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%);
  background-size: 200% 200%;
  animation: gradient-shift 3s ease infinite;
  border: none;
  cursor: pointer;
  z-index: 1000;
  box-shadow: 
    0 4px 20px rgba(139, 92, 246, 0.4),
    0 0 40px rgba(139, 92, 246, 0.2);
  transition: all 0.3s ease;
  overflow: visible;
}

.back-to-top:hover {
  transform: translateY(-5px) scale(1.1);
  box-shadow: 
    0 8px 30px rgba(139, 92, 246, 0.5),
    0 0 60px rgba(139, 92, 246, 0.3);
}

.back-to-top.animating {
  animation: bounce-up 0.5s ease;
}

.btn-content {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}

.btn-content svg {
  width: 24px;
  height: 24px;
  color: white;
  transition: transform 0.3s ease;
}

.back-to-top:hover .btn-content svg {
  transform: translateY(-2px);
}

.sparkle {
  position: absolute;
  font-size: 10px;
  color: white;
  opacity: 0.8;
  animation: sparkle-float 2s ease-in-out infinite;
}

.sparkle-1 {
  top: -5px;
  left: -5px;
  animation-delay: 0s;
}

.sparkle-2 {
  bottom: -5px;
  right: -5px;
  animation-delay: 0.5s;
}

@keyframes sparkle-float {
  0%, 100% { transform: translateY(0) scale(1); opacity: 0.8; }
  50% { transform: translateY(-5px) scale(1.2); opacity: 1; }
}

.btn-ring {
  position: absolute;
  inset: -3px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.3);
  animation: ring-pulse 2s ease-in-out infinite;
}

@keyframes ring-pulse {
  0%, 100% { transform: scale(1); opacity: 0.3; }
  50% { transform: scale(1.1); opacity: 0.6; }
}

.btn-particles {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: white;
  border-radius: 50%;
  opacity: 0;
}

.back-to-top:hover .particle {
  animation: particle-burst 0.6s ease-out forwards;
}

.particle:nth-child(1) { top: 0; left: 50%; animation-delay: 0s; }
.particle:nth-child(2) { top: 25%; right: 0; animation-delay: 0.05s; }
.particle:nth-child(3) { bottom: 25%; right: 0; animation-delay: 0.1s; }
.particle:nth-child(4) { bottom: 0; left: 50%; animation-delay: 0.15s; }
.particle:nth-child(5) { bottom: 25%; left: 0; animation-delay: 0.2s; }
.particle:nth-child(6) { top: 25%; left: 0; animation-delay: 0.25s; }

@keyframes particle-burst {
  0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
  100% { 
    opacity: 0;
  }
}

.particle:nth-child(1) { animation-name: particle-up; }
.particle:nth-child(2) { animation-name: particle-right-up; }
.particle:nth-child(3) { animation-name: particle-right-down; }
.particle:nth-child(4) { animation-name: particle-down; }
.particle:nth-child(5) { animation-name: particle-left-down; }
.particle:nth-child(6) { animation-name: particle-left-up; }

@keyframes particle-up {
  0% { transform: translateY(0) scale(0); opacity: 1; }
  100% { transform: translateY(-20px) scale(1); opacity: 0; }
}

@keyframes particle-right-up {
  0% { transform: translate(0, 0) scale(0); opacity: 1; }
  100% { transform: translate(15px, -15px) scale(1); opacity: 0; }
}

@keyframes particle-right-down {
  0% { transform: translate(0, 0) scale(0); opacity: 1; }
  100% { transform: translate(15px, 15px) scale(1); opacity: 0; }
}

@keyframes particle-down {
  0% { transform: translateY(0) scale(0); opacity: 1; }
  100% { transform: translateY(20px) scale(1); opacity: 0; }
}

@keyframes particle-left-down {
  0% { transform: translate(0, 0) scale(0); opacity: 1; }
  100% { transform: translate(-15px, 15px) scale(1); opacity: 0; }
}

@keyframes particle-left-up {
  0% { transform: translate(0, 0) scale(0); opacity: 1; }
  100% { transform: translate(-15px, -15px) scale(1); opacity: 0; }
}

@keyframes bounce-up {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@keyframes gradient-shift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.back-to-top-enter-active,
.back-to-top-leave-active {
  transition: all 0.3s ease;
}

.back-to-top-enter-from,
.back-to-top-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.8);
}

@media (max-width: 768px) {
  .back-to-top {
    bottom: 1.5rem;
    right: 1.5rem;
    width: 44px;
    height: 44px;
  }
  
  .btn-content svg {
    width: 20px;
    height: 20px;
  }
}
</style>
