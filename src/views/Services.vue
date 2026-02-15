<script setup>
import { onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import QQGroupCard from '../components/QQGroupCard.vue'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    id: 1,
    title: '技术支持',
    description: '为简幻云、简幻欢等系列产品提供专业的技术支持服务，帮助用户解决使用过程中遇到的各种问题。',
    features: ['问题诊断与排查', '故障修复指导', '功能使用教学', '技术咨询解答'],
  },
  {
    id: 2,
    title: '问题反馈',
    description: '收集并处理用户反馈的问题与建议，推动产品持续改进和优化。',
    features: ['Bug 问题反馈', '功能改进建议', '问题进度追踪', '修复通知推送'],
  },
  {
    id: 3,
    title: '社区交流',
    description: '活跃的用户社区，分享使用经验，交流技术心得。',
    features: ['用户经验分享', '技术问题讨论', '教程资源共享', '社区活动参与'],
  },
  {
    id: 4,
    title: '文档支持',
    description: '完善的产品文档和教程，帮助用户快速上手和深入了解产品功能。',
    features: ['产品使用文档', '常见问题解答', '视频图文教程', '版本更新日志'],
  },
]

onMounted(() => {
  gsap.from('.services-hero-content', {
    opacity: 0,
    y: 30,
    duration: 1,
    ease: 'power3.out',
  })

  gsap.utils.toArray('.service-card').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 80%',
      },
      opacity: 0,
      y: 50,
      duration: 0.6,
      delay: (i % 2) * 0.1,
      ease: 'power3.out',
    })
  })
})
</script>

<template>
  <div class="services">
    <section class="services-hero">
      <div class="services-hero-bg">
        <div class="orb orb-1"></div>
        <div class="orb orb-2"></div>
      </div>
      <div class="container">
        <div class="services-hero-content">
          <h1 class="page-title gradient-text">产品服务</h1>
          <p class="page-subtitle">为简幻云、简幻欢等系列产品提供技术支持</p>
        </div>
      </div>
    </section>

    <section class="services-list section">
      <div class="container">
        <div class="services-grid">
          <div
            v-for="service in services"
            :key="service.id"
            class="service-card"
          >
            <h3 class="service-title">{{ service.title }}</h3>
            <p class="service-description">{{ service.description }}</p>
            <ul class="service-features">
              <li v-for="(feature, index) in service.features" :key="index">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M5 12l5 5L20 7"/>
                </svg>
                {{ feature }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section class="qq-section section">
      <div class="container">
        <h2 class="section-title">加入我们</h2>
        <p class="section-subtitle">加入QQ群，获取及时的技术支持和交流</p>
        <div class="qq-card-wrapper">
          <QQGroupCard />
        </div>
      </div>
    </section>

    <section class="process section">
      <div class="container">
        <h2 class="section-title">支持时间</h2>
        <p class="section-subtitle">寒暑假定期复活活跃支持，其他日期不一定支持</p>
        <div class="notice-card glass">
          <div class="notice-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <div class="notice-content">
            <h3>响应时间</h3>
            <p>工作日通常在24小时内回复，节假日可能会有延迟</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.services-hero {
  min-height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding-top: 100px;
  overflow: hidden;
}

.services-hero-bg {
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
  background: var(--secondary);
  top: -200px;
  left: -100px;
}

.orb-2 {
  width: 400px;
  height: 400px;
  background: var(--accent);
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

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.service-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: var(--border-radius-xl);
  padding: 2rem;
  transition: all var(--transition-normal);
}

.service-card:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(16, 185, 129, 0.3);
  transform: translateY(-5px);
  box-shadow: var(--shadow-glow);
}

.service-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
}

.service-description {
  color: var(--text-secondary);
  font-size: 0.9375rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.service-features {
  list-style: none;
  margin-bottom: 0;
}

.service-features li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-secondary);
  font-size: 0.875rem;
  padding: 0.375rem 0;
}

.service-features li svg {
  width: 16px;
  height: 16px;
  color: var(--primary);
  flex-shrink: 0;
}

.qq-section {
  background: linear-gradient(180deg, transparent 0%, rgba(18, 183, 245, 0.05) 50%, transparent 100%);
}

.qq-card-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

.notice-card {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 2rem;
  border-radius: var(--border-radius-xl);
  max-width: 600px;
  margin: 0 auto;
}

.notice-icon {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--gradient-primary);
  border-radius: var(--border-radius-lg);
  flex-shrink: 0;
}

.notice-icon svg {
  width: 30px;
  height: 30px;
  color: var(--text-primary);
}

.notice-content h3 {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.notice-content p {
  color: var(--text-secondary);
  font-size: 0.9375rem;
}

@media (max-width: 768px) {
  .services-grid {
    grid-template-columns: 1fr;
  }

  .notice-card {
    flex-direction: column;
    text-align: center;
  }
}
</style>
