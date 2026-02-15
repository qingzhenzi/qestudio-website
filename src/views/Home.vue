<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import siteConfig from '../config/site.config'

gsap.registerPlugin(ScrollTrigger)

const heroRef = ref(null)
const featuresRef = ref(null)
const statsRef = ref(null)

onMounted(() => {
  gsap.from('.hero-title', {
    opacity: 0,
    y: 50,
    duration: 1,
    ease: 'power3.out',
  })

  gsap.from('.hero-subtitle', {
    opacity: 0,
    y: 30,
    duration: 1,
    delay: 0.2,
    ease: 'power3.out',
  })

  gsap.from('.hero-buttons', {
    opacity: 0,
    y: 30,
    duration: 1,
    delay: 0.4,
    ease: 'power3.out',
  })

  gsap.from('.hero-orb', {
    scale: 0,
    opacity: 0,
    duration: 1.5,
    delay: 0.3,
    ease: 'elastic.out(1, 0.5)',
    stagger: 0.2,
  })

  gsap.utils.toArray('.feature-card').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      opacity: 0,
      y: 50,
      duration: 0.8,
      delay: i * 0.1,
      ease: 'power3.out',
    })
  })

  gsap.utils.toArray('.stat-item').forEach((stat, i) => {
    gsap.from(stat, {
      scrollTrigger: {
        trigger: stat,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      opacity: 0,
      scale: 0.8,
      duration: 0.6,
      delay: i * 0.1,
      ease: 'back.out(1.7)',
    })
  })
})
</script>

<template>
  <div class="home">
    <section ref="heroRef" class="hero">
      <div class="hero-bg">
        <div class="hero-orb orb-1"></div>
        <div class="hero-orb orb-2"></div>
        <div class="hero-orb orb-3"></div>
        <div class="hero-grid"></div>
      </div>
      
      <div class="hero-content">
        <h1 class="hero-title">
          <span class="gradient-text animate-gradient">{{ siteConfig.hero.title }}</span>
        </h1>
        <p class="hero-subtitle">{{ siteConfig.hero.subtitle }}</p>
        <div class="hero-buttons">
          <RouterLink :to="siteConfig.hero.cta.primary.link" class="btn btn-primary">
            {{ siteConfig.hero.cta.primary.text }}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </RouterLink>
          <RouterLink :to="siteConfig.hero.cta.secondary.link" class="btn btn-secondary">
            {{ siteConfig.hero.cta.secondary.text }}
          </RouterLink>
        </div>
      </div>

      <div class="scroll-indicator">
        <div class="mouse">
          <div class="wheel"></div>
        </div>
        <span>向下滚动</span>
      </div>
    </section>

    <section ref="featuresRef" class="features section">
      <div class="container">
        <h2 class="section-title">核心能力</h2>
        <p class="section-subtitle">我们为简幻云、简幻欢等系列产品提供专业的第三方技术支持</p>
        
        <div class="features-grid">
          <div
            v-for="(feature, index) in siteConfig.features"
            :key="index"
            class="feature-card"
          >
            <div class="feature-icon">
              <svg v-if="feature.icon === 'support'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"/>
              </svg>
              <svg v-else-if="feature.icon === 'fix'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
              <svg v-else-if="feature.icon === 'optimize'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
              <svg v-else-if="feature.icon === 'community'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
            </div>
            <h3 class="feature-title">{{ feature.title }}</h3>
            <p class="feature-description">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <section ref="statsRef" class="stats section">
      <div class="container">
        <div class="stats-grid">
          <div
            v-for="(stat, index) in siteConfig.stats"
            :key="index"
            class="stat-item"
          >
            <span class="stat-value gradient-text">{{ stat.value }}</span>
            <span class="stat-label">{{ stat.label }}</span>
          </div>
        </div>
      </div>
    </section>

    <section class="cta section">
      <div class="container">
        <div class="cta-card glass">
          <h2 class="cta-title">需要技术支持？</h2>
          <p class="cta-subtitle">加入我们的QQ群，获取及时的技术帮助</p>
          <a 
            :href="siteConfig.contact.qqGroupLink"
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn-primary btn-lg"
          >
            加入QQ群
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding-top: 80px;
}

.hero-bg {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.hero-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.5;
}

.orb-1 {
  width: 600px;
  height: 600px;
  background: var(--primary);
  top: -200px;
  right: -200px;
  animation: float 8s ease-in-out infinite;
}

.orb-2 {
  width: 400px;
  height: 400px;
  background: var(--secondary);
  bottom: -100px;
  left: -100px;
  animation: float 10s ease-in-out infinite reverse;
}

.orb-3 {
  width: 300px;
  height: 300px;
  background: var(--accent);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: pulse 6s ease-in-out infinite;
}

.hero-grid {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(rgba(16, 185, 129, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(16, 185, 129, 0.03) 1px, transparent 1px);
  background-size: 50px 50px;
}

.hero-content {
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 900px;
  padding: 0 2rem;
}

.hero-title {
  font-size: clamp(2.5rem, 8vw, 5rem);
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  letter-spacing: -0.02em;
}

.hero-subtitle {
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: var(--text-secondary);
  margin-bottom: 2.5rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.75rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: var(--border-radius-lg);
  transition: all var(--transition-normal);
}

.btn svg {
  width: 18px;
  height: 18px;
  transition: transform var(--transition-fast);
}

.btn-primary {
  background: var(--gradient-primary);
  color: var(--text-primary);
  box-shadow: 0 4px 20px rgba(16, 185, 129, 0.4);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(16, 185, 129, 0.5);
}

.btn-primary:hover svg {
  transform: translateX(4px);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.05);
  color: var(--text-primary);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
}

.btn-lg {
  padding: 1rem 2rem;
  font-size: 1.125rem;
}

.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-muted);
  font-size: 0.75rem;
  animation: float 2s ease-in-out infinite;
}

.mouse {
  width: 24px;
  height: 40px;
  border: 2px solid var(--text-muted);
  border-radius: 12px;
  position: relative;
}

.wheel {
  width: 4px;
  height: 8px;
  background: var(--text-muted);
  border-radius: 2px;
  position: absolute;
  top: 8px;
  left: 50%;
  transform: translateX(-50%);
  animation: scroll 2s ease-in-out infinite;
}

@keyframes scroll {
  0%, 100% {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
  50% {
    opacity: 0.5;
    transform: translateX(-50%) translateY(8px);
  }
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.feature-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: var(--border-radius-xl);
  padding: 2.5rem;
  transition: all var(--transition-normal);
}

.feature-card:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(16, 185, 129, 0.3);
  transform: translateY(-5px);
  box-shadow: var(--shadow-glow);
}

.feature-icon {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--gradient-primary);
  border-radius: var(--border-radius-lg);
  margin-bottom: 1.5rem;
}

.feature-icon svg {
  width: 30px;
  height: 30px;
  color: var(--text-primary);
}

.feature-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
}

.feature-description {
  color: var(--text-secondary);
  font-size: 0.9375rem;
  line-height: 1.6;
}

.stats {
  background: linear-gradient(180deg, transparent 0%, rgba(16, 185, 129, 0.05) 50%, transparent 100%);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
}

.stat-item {
  text-align: center;
  padding: 2rem;
}

.stat-value {
  display: block;
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 800;
  margin-bottom: 0.5rem;
}

.stat-label {
  color: var(--text-secondary);
  font-size: 1rem;
}

.cta-card {
  text-align: center;
  padding: 4rem;
  border-radius: var(--border-radius-xl);
}

.cta-title {
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 700;
  margin-bottom: 1rem;
}

.cta-subtitle {
  color: var(--text-secondary);
  font-size: 1.125rem;
  margin-bottom: 2rem;
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .cta-card {
    padding: 2rem;
  }
}
</style>
