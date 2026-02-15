<script setup>
import { ref, onMounted } from 'vue'

const isLoading = ref(true)
const progress = ref(0)

onMounted(() => {
  const interval = setInterval(() => {
    progress.value += Math.random() * 15
    if (progress.value >= 100) {
      progress.value = 100
      clearInterval(interval)
      setTimeout(() => {
        isLoading.value = false
      }, 300)
    }
  }, 100)

  window.addEventListener('load', () => {
    progress.value = 100
    setTimeout(() => {
      isLoading.value = false
    }, 500)
  })
})
</script>

<template>
  <transition name="loader-fade">
    <div v-if="isLoading" class="loader">
      <div class="loader-bg">
        <div class="bg-gradient"></div>
        <div class="stars">
          <span v-for="i in 20" :key="i" class="star" :style="{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 2}s`
          }">✦</span>
        </div>
      </div>

      <div class="loader-content">
        <div class="dots-container">
          <div class="dot dot-1"></div>
          <div class="dot dot-2"></div>
          <div class="dot dot-3"></div>
        </div>

        <div class="logo-text">
          <span v-for="(char, index) in 'QEStudio'" :key="index" class="char" :style="{ animationDelay: `${index * 0.1}s` }">
            {{ char }}
          </span>
        </div>

        <div class="loading-bar">
          <div class="bar-track">
            <div class="bar-fill" :style="{ width: `${progress}%` }">
              <div class="bar-glow"></div>
            </div>
          </div>
          <div class="progress-text">
            <span class="progress-value">{{ Math.round(progress) }}</span>
            <span class="progress-percent">%</span>
          </div>
        </div>

        <div class="loading-tips">
          <span class="tip-text">正在加载...</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.loader {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loader-bg {
  position: absolute;
  inset: 0;
  background: #0a0f1a;
  overflow: hidden;
}

.bg-gradient {
  position: absolute;
  inset: 0;
  background: 
    radial-gradient(ellipse at 50% 0%, rgba(16, 185, 129, 0.2) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 50%, rgba(6, 182, 212, 0.15) 0%, transparent 40%),
    radial-gradient(ellipse at 20% 80%, rgba(245, 158, 11, 0.1) 0%, transparent 40%);
}

.stars {
  position: absolute;
  inset: 0;
}

.star {
  position: absolute;
  color: white;
  font-size: 12px;
  opacity: 0.6;
  animation: twinkle 2s ease-in-out infinite;
}

@keyframes twinkle {
  0%, 100% { opacity: 0.3; transform: scale(0.8); }
  50% { opacity: 1; transform: scale(1.2); }
}

.loader-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.dots-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  height: 60px;
}

.dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  animation: bounce 1.4s ease-in-out infinite;
}

.dot-1 {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  animation-delay: 0s;
  box-shadow: 0 0 20px rgba(16, 185, 129, 0.5);
}

.dot-2 {
  background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%);
  animation-delay: 0.2s;
  box-shadow: 0 0 20px rgba(6, 182, 212, 0.5);
}

.dot-3 {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  animation-delay: 0.4s;
  box-shadow: 0 0 20px rgba(245, 158, 11, 0.5);
}

@keyframes bounce {
  0%, 80%, 100% {
    transform: translateY(0) scale(1);
  }
  40% {
    transform: translateY(-30px) scale(1.1);
  }
}

.logo-text {
  font-size: 2.5rem;
  font-weight: 800;
  display: flex;
  gap: 2px;
}

.char {
  display: inline-block;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: char-bounce 0.6s ease-out forwards;
  opacity: 0;
  transform: translateY(20px);
}

@keyframes char-bounce {
  0% { opacity: 0; transform: translateY(20px); }
  60% { transform: translateY(-5px); }
  100% { opacity: 1; transform: translateY(0); }
}

.loading-bar {
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.bar-track {
  width: 100%;
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  background: var(--gradient-primary);
  border-radius: 3px;
  transition: width 0.3s ease;
  position: relative;
}

.bar-glow {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, transparent 70%);
  animation: glow-pulse 1s ease-in-out infinite;
}

@keyframes glow-pulse {
  0%, 100% { opacity: 0.5; transform: translateY(-50%) scale(1); }
  50% { opacity: 1; transform: translateY(-50%) scale(1.2); }
}

.progress-text {
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.progress-value {
  font-weight: 600;
  color: var(--text-primary);
}

.progress-percent {
  color: var(--text-muted);
}

.loading-tips {
  margin-top: 1rem;
}

.tip-text {
  font-size: 0.875rem;
  color: var(--text-muted);
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}

.loader-fade-enter-active,
.loader-fade-leave-active {
  transition: all 0.5s ease;
}

.loader-fade-enter-from,
.loader-fade-leave-to {
  opacity: 0;
}

.loader-fade-leave-to {
  transform: scale(1.1);
}
</style>
