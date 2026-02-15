<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import siteConfig from '../config/site.config'
import QQGroupCard from '../components/QQGroupCard.vue'
import ExternalLinkModal from '../components/ExternalLinkModal.vue'

const showExternalModal = ref(false)
const externalUrl = ref('')
const externalTitle = ref('')

function handleExternalLink(url, title) {
  externalUrl.value = url
  externalTitle.value = title
  showExternalModal.value = true
}

onMounted(() => {
  gsap.from('.about-hero-content', {
    opacity: 0,
    y: 30,
    duration: 1,
    ease: 'power3.out',
  })

  gsap.from('.link-card', {
    opacity: 0,
    y: 30,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power3.out',
    delay: 0.3,
  })
})
</script>

<template>
  <div class="about">
    <section class="about-hero">
      <div class="about-hero-bg">
        <div class="orb orb-1"></div>
        <div class="orb orb-2"></div>
      </div>
      <div class="container">
        <div class="about-hero-content">
          <h1 class="page-title gradient-text">关于我们</h1>
          <p class="page-subtitle">QEStudio - 专业技术服务团队</p>
        </div>
      </div>
    </section>

    <section class="about-section section">
      <div class="container">
        <div class="intro-text">
          <p>
            QEStudio 专注为简幻云、简幻欢等系列产品提供第三方技术支持服务。
            我们致力于解决用户在使用过程中遇到的技术问题，持续优化产品体验。
          </p>
        </div>

        <div class="links-grid">
          <button 
            @click="handleExternalLink(siteConfig.social.github, 'GitHub')"
            class="link-card glass"
          >
            <div class="card-icon github-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            </div>
            <div class="card-content">
              <h3>GitHub</h3>
              <p>查看我们的开源项目</p>
              <span class="card-link">
                访问 GitHub
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                </svg>
              </span>
            </div>
          </button>

          <QQGroupCard class="link-card-qq" />
        </div>
      </div>
    </section>

    <ExternalLinkModal 
      v-model:visible="showExternalModal"
      :url="externalUrl"
      :title="externalTitle"
      @close="showExternalModal = false"
    />
  </div>
</template>

<style scoped>
.about-hero {
  min-height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding-top: 100px;
  overflow: hidden;
}

.about-hero-bg {
  position: absolute;
  inset: 0;
}

.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.4;
}

.orb-1 {
  width: 500px;
  height: 500px;
  background: var(--primary);
  top: -200px;
  right: -100px;
}

.orb-2 {
  width: 400px;
  height: 400px;
  background: var(--secondary);
  bottom: -150px;
  left: -100px;
}

.page-title {
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 800;
  margin-bottom: 1rem;
}

.page-subtitle {
  font-size: 1.25rem;
  color: var(--text-secondary);
}

.intro-text {
  max-width: 700px;
  margin: 0 auto 4rem;
  text-align: center;
}

.intro-text p {
  font-size: 1.125rem;
  color: var(--text-secondary);
  line-height: 1.8;
}

.links-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.link-card {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 2rem;
  border-radius: var(--border-radius-xl);
  text-decoration: none;
  transition: transform var(--transition-normal), box-shadow var(--transition-normal);
  cursor: pointer;
  border: none;
  width: 100%;
  text-align: left;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.link-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-glow);
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(16, 185, 129, 0.3);
}

.link-card-qq {
  width: 100%;
}

.card-icon {
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--border-radius-lg);
  flex-shrink: 0;
}

.card-icon svg {
  width: 32px;
  height: 32px;
  color: white;
}

.github-icon {
  background: linear-gradient(135deg, #333 0%, #24292e 100%);
}

.card-content {
  flex: 1;
}

.card-content h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
  color: var(--text-primary);
}

.card-content p {
  font-size: 0.9375rem;
  color: var(--text-secondary);
  margin-bottom: 0.75rem;
}

.card-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--primary-light);
  transition: gap var(--transition-fast);
}

.link-card:hover .card-link {
  gap: 0.75rem;
}

.card-link svg {
  width: 16px;
  height: 16px;
}

@media (max-width: 768px) {
  .link-card {
    flex-direction: column;
    text-align: center;
  }
}
</style>
