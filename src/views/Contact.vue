<script setup>
import { onMounted } from 'vue'
import gsap from 'gsap'
import siteConfig from '../config/site.config'
import QQGroupCard from '../components/QQGroupCard.vue'

onMounted(() => {
  gsap.from('.contact-hero-content', {
    opacity: 0,
    y: 30,
    duration: 1,
    ease: 'power3.out',
  })

  gsap.from('.contact-card', {
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
  <div class="contact">
    <section class="contact-hero">
      <div class="contact-hero-bg">
        <div class="orb orb-1"></div>
        <div class="orb orb-2"></div>
      </div>
      <div class="container">
        <div class="contact-hero-content">
          <h1 class="page-title gradient-text">联系我们</h1>
          <p class="page-subtitle">有问题？随时联系我们</p>
        </div>
      </div>
    </section>

    <section class="contact-section section">
      <div class="container">
        <div class="contact-grid">
          <div class="contact-card glass">
            <div class="card-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
            </div>
            <div class="card-content">
              <h3>电子邮件</h3>
              <a :href="`mailto:${siteConfig.contact.email}`" class="email-link">
                {{ siteConfig.contact.email }}
              </a>
              <p class="card-desc">工作日通常在24小时内回复</p>
            </div>
          </div>

          <div class="contact-card glass">
            <div class="card-icon qq-icon">
              <img src="/qq-icon.svg" alt="QQ" />
            </div>
            <div class="card-content">
              <h3>QQ群</h3>
              <div class="qq-wrapper">
                <QQGroupCard />
              </div>
            </div>
          </div>
        </div>

        <div class="notice-box glass">
          <div class="notice-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <div class="notice-content">
            <h3>支持时间</h3>
            <p>寒暑假定期复活活跃支持，其他日期不一定支持</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.contact-hero {
  min-height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding-top: 100px;
  overflow: hidden;
}

.contact-hero-bg {
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
  background: var(--accent);
  top: -200px;
  left: -100px;
}

.orb-2 {
  width: 400px;
  height: 400px;
  background: var(--secondary);
  bottom: -150px;
  right: -100px;
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

.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  max-width: 900px;
  margin: 0 auto 3rem;
}

.contact-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2.5rem;
  border-radius: var(--border-radius-xl);
  transition: transform var(--transition-normal), box-shadow var(--transition-normal);
}

.contact-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-glow);
}

.card-icon {
  width: 72px;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--gradient-primary);
  border-radius: var(--border-radius-xl);
  margin-bottom: 1.5rem;
}

.card-icon svg {
  width: 36px;
  height: 36px;
  color: var(--text-primary);
}

.card-icon img {
  width: 128px;
  height: 128px;
}

.qq-icon {
  background: transparent;
}

.card-content {
  width: 100%;
}

.card-content h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
}

.email-link {
  display: inline-block;
  font-size: 1rem;
  color: var(--primary-light);
  margin-bottom: 0.75rem;
  transition: color var(--transition-fast);
  word-break: break-all;
}

.email-link:hover {
  color: var(--primary);
}

.card-desc {
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.qq-wrapper {
  display: flex;
  justify-content: center;
}

.notice-box {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 2rem;
  border-radius: var(--border-radius-xl);
  max-width: 600px;
  margin: 0 auto;
}

.notice-icon {
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--gradient-secondary);
  border-radius: var(--border-radius-lg);
  flex-shrink: 0;
}

.notice-icon svg {
  width: 28px;
  height: 28px;
  color: var(--text-primary);
}

.notice-content h3 {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.375rem;
}

.notice-content p {
  font-size: 0.9375rem;
  color: var(--text-secondary);
}

@media (max-width: 768px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }

  .notice-box {
    flex-direction: column;
    text-align: center;
  }
}
</style>
