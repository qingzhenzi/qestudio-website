<script setup>
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import gsap from 'gsap'

onMounted(() => {
  gsap.to('.error-code', {
    scale: 1.05,
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  })

  gsap.to('.floating-star', {
    y: -15,
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: 'power1.inOut',
    stagger: {
      each: 0.3,
      from: 'random',
    },
  })

  gsap.from('.error-content', {
    opacity: 0,
    y: 30,
    duration: 0.8,
    delay: 0.3,
    ease: 'back.out(1.7)',
  })
})
</script>

<template>
  <div class="error-page">
    <div class="error-bg">
      <div class="floating-star star-1">✦</div>
      <div class="floating-star star-2">✧</div>
      <div class="floating-star star-3">✦</div>
      <div class="floating-star star-4">✧</div>
      <div class="floating-star star-5">✦</div>
    </div>

    <div class="error-content">
      <div class="error-code">
        <span class="digit">4</span>
        <span class="digit">0</span>
        <span class="digit">4</span>
      </div>

      <h1 class="error-title">页面未找到</h1>
      <p class="error-message">抱歉，您访问的页面不存在或已被移动</p>

      <RouterLink to="/" class="home-button">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
        </svg>
        返回首页
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.error-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%);
  padding: 2rem;
}

.error-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.floating-star {
  position: absolute;
  font-size: 1.5rem;
  color: var(--primary-light);
  opacity: 0.4;
}

.star-1 { top: 10%; left: 15%; }
.star-2 { top: 20%; right: 20%; }
.star-3 { top: 60%; left: 10%; }
.star-4 { bottom: 20%; right: 15%; }
.star-5 { bottom: 30%; left: 25%; }

.error-content {
  text-align: center;
  z-index: 1;
  padding: 2rem;
}

.error-code {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  font-size: clamp(6rem, 20vw, 10rem);
  font-weight: 900;
  background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 50%, var(--accent) 100%);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradient-shift 3s ease infinite;
  filter: drop-shadow(0 0 30px rgba(16, 185, 129, 0.3));
  margin-bottom: 1.5rem;
}

.digit {
  display: inline-block;
}

.error-title {
  font-size: clamp(1.5rem, 4vw, 2rem);
  font-weight: 700;
  margin-bottom: 0.75rem;
  color: var(--text-primary);
}

.error-message {
  font-size: 1rem;
  color: var(--text-secondary);
  margin-bottom: 2rem;
}

.home-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.75rem;
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  background: var(--gradient-primary);
  border-radius: var(--border-radius-lg);
  transition: all var(--transition-normal);
  box-shadow: 0 4px 20px rgba(16, 185, 129, 0.3);
}

.home-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 30px rgba(16, 185, 129, 0.5);
}

.home-button svg {
  width: 20px;
  height: 20px;
}

@keyframes gradient-shift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@media (prefers-reduced-motion: reduce) {
  .error-code,
  .floating-star,
  .home-button {
    animation: none !important;
  }
}
</style>
