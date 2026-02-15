<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const activeCategory = ref('all')
const openItems = ref([])

const categories = [
  { id: 'all', name: '全部' },
  { id: 'general', name: '基础问题' },
  { id: 'support', name: '技术支持' },
  { id: 'community', name: '社区相关' },
]

const faqs = [
  {
    id: 1,
    question: 'QEStudio是什么？',
    answer: 'QEStudio是一个专注为简幻云、简幻欢等系列产品提供第三方技术支持的团队。我们致力于帮助用户解决在使用这些产品过程中遇到的各种技术问题。',
    category: 'general',
  },
  {
    id: 2,
    question: '你们提供哪些服务？',
    answer: '我们提供技术支持服务、问题反馈收集、社区交流平台、产品文档支持等。具体包括：问题诊断与排查、故障修复指导、功能使用教学、Bug反馈处理、功能建议收集等。',
    category: 'general',
  },
  {
    id: 3,
    question: '服务是免费的吗？',
    answer: '是的，我们提供的技术支持服务完全免费。我们是一个志愿者团队，致力于为简幻云、简幻欢用户社区提供帮助。',
    category: 'general',
  },
  {
    id: 4,
    question: '如何获取技术支持？',
    answer: '您可以通过以下方式获取技术支持：1. 加入我们的QQ群（群号：949671297）直接提问；2. 发送邮件至 support@qestudio.sgrkvp.top；3. 在社区中搜索或发帖讨论。',
    category: 'support',
  },
  {
    id: 5,
    question: '技术支持的响应时间是多久？',
    answer: '我们的支持时间主要在寒暑假期间，此时响应较为及时。其他时间可能会有延迟，通常工作日会在24小时内回复，节假日可能会有更长的等待时间。感谢您的理解！',
    category: 'support',
  },
  {
    id: 6,
    question: '如何反馈Bug或提出功能建议？',
    answer: '您可以通过QQ群或邮件向我们反馈问题。反馈时请尽量提供：问题描述、复现步骤、截图或错误信息、您的环境信息（如操作系统、软件版本等），这将帮助我们更快地定位和解决问题。',
    category: 'support',
  },
  {
    id: 7,
    question: '加入QQ群有什么好处？',
    answer: '加入QQ群您可以：获得更及时的技术支持、与其他用户交流使用经验、第一时间获取产品更新通知、参与社区活动等。欢迎加入QEStudio摸鱼总部（群号：949671297）！',
    category: 'community',
  },
  {
    id: 8,
    question: '可以在社区分享教程或资源吗？',
    answer: '当然可以！我们非常欢迎用户分享使用教程、技巧心得、资源工具等。您可以在QQ群中分享，优质内容会被整理收录到我们的文档库中，帮助更多用户。',
    category: 'community',
  },
  {
    id: 9,
    question: '你们与简幻云、简幻欢是什么关系？',
    answer: 'QEStudio是一个独立的第三方技术支持团队，与简幻云、简幻欢官方没有直接隶属关系。我们是由热心用户组成的志愿者团队，为这些产品的用户提供技术支持和帮助。',
    category: 'general',
  },
  {
    id: 10,
    question: '如何加入QEStudio团队？',
    answer: '如果您对技术支持工作感兴趣，愿意帮助其他用户解决问题，欢迎联系我们！我们欢迎有技术热情、乐于助人的朋友加入。可以通过QQ群或邮件表达您的意向。',
    category: 'community',
  },
]

const filteredFaqs = ref(faqs)

function setCategory(categoryId) {
  activeCategory.value = categoryId
  if (categoryId === 'all') {
    filteredFaqs.value = faqs
  } else {
    filteredFaqs.value = faqs.filter(f => f.category === categoryId)
  }
}

function toggleItem(id) {
  const index = openItems.value.indexOf(id)
  if (index === -1) {
    openItems.value.push(id)
  } else {
    openItems.value.splice(index, 1)
  }
}

function isOpen(id) {
  return openItems.value.includes(id)
}

onMounted(() => {
  gsap.from('.faq-hero-content', {
    opacity: 0,
    y: 30,
    duration: 1,
    ease: 'power3.out',
  })

  gsap.utils.toArray('.faq-item').forEach((item, i) => {
    gsap.from(item, {
      scrollTrigger: {
        trigger: item,
        start: 'top 85%',
      },
      opacity: 0,
      y: 30,
      duration: 0.5,
      delay: (i % 5) * 0.05,
      ease: 'power3.out',
    })
  })
})
</script>

<template>
  <div class="faq">
    <section class="faq-hero">
      <div class="faq-hero-bg">
        <div class="orb orb-1"></div>
        <div class="orb orb-2"></div>
      </div>
      <div class="container">
        <div class="faq-hero-content">
          <h1 class="page-title gradient-text">常见问题</h1>
          <p class="page-subtitle">快速找到您需要的答案</p>
        </div>
      </div>
    </section>

    <section class="faq-list section">
      <div class="container">
        <div class="category-tabs">
          <button
            v-for="cat in categories"
            :key="cat.id"
            class="category-tab"
            :class="{ active: activeCategory === cat.id }"
            @click="setCategory(cat.id)"
          >
            {{ cat.name }}
          </button>
        </div>

        <div class="faq-items">
          <div
            v-for="faq in filteredFaqs"
            :key="faq.id"
            class="faq-item"
            :class="{ open: isOpen(faq.id) }"
          >
            <button class="faq-question" @click="toggleItem(faq.id)">
              <span class="question-text">{{ faq.question }}</span>
              <span class="toggle-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path v-if="!isOpen(faq.id)" d="M12 5v14M5 12h14"/>
                  <path v-else d="M5 12h14"/>
                </svg>
              </span>
            </button>
            <transition name="expand">
              <div v-if="isOpen(faq.id)" class="faq-answer">
                <p>{{ faq.answer }}</p>
              </div>
            </transition>
          </div>
        </div>

        <div class="faq-contact">
          <div class="contact-card glass">
            <div class="contact-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
              </svg>
            </div>
            <h3>还有其他问题？</h3>
            <p>加入QQ群或发送邮件联系我们</p>
            <router-link to="/contact" class="btn btn-primary">
              联系我们
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.faq-hero {
  min-height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding-top: 100px;
  overflow: hidden;
}

.faq-hero-bg {
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

.category-tabs {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.category-tab {
  padding: 0.625rem 1.25rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-secondary);
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--border-radius-lg);
  transition: all var(--transition-fast);
}

.category-tab:hover {
  color: var(--text-primary);
  border-color: rgba(255, 255, 255, 0.2);
}

.category-tab.active {
  background: var(--gradient-primary);
  color: var(--text-primary);
  border-color: transparent;
}

.faq-items {
  max-width: 800px;
  margin: 0 auto;
}

.faq-item {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-lg);
  margin-bottom: 1rem;
  overflow: hidden;
  transition: all var(--transition-fast);
}

.faq-item:hover {
  border-color: rgba(16, 185, 129, 0.3);
}

.faq-item.open {
  border-color: var(--primary);
  box-shadow: var(--shadow-glow);
}

.faq-question {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.25rem 1.5rem;
  text-align: left;
  cursor: pointer;
}

.question-text {
  font-size: 1rem;
  font-weight: 500;
  color: var(--text-primary);
}

.toggle-icon {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary);
  transition: transform var(--transition-fast);
}

.faq-item.open .toggle-icon {
  transform: rotate(180deg);
}

.toggle-icon svg {
  width: 20px;
  height: 20px;
}

.faq-answer {
  padding: 0 1.5rem 1.25rem;
}

.faq-answer p {
  color: var(--text-secondary);
  font-size: 0.9375rem;
  line-height: 1.7;
}

.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  max-height: 0;
  padding-top: 0;
  padding-bottom: 0;
}

.expand-enter-to,
.expand-leave-from {
  max-height: 500px;
}

.faq-contact {
  margin-top: 4rem;
  text-align: center;
}

.contact-card {
  display: inline-block;
  padding: 2.5rem 3rem;
  border-radius: var(--border-radius-xl);
}

.contact-icon {
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--gradient-primary);
  border-radius: var(--border-radius-xl);
  margin: 0 auto 1rem;
}

.contact-icon svg {
  width: 32px;
  height: 32px;
  color: var(--text-primary);
}

.contact-card h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.contact-card p {
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: var(--border-radius-lg);
  transition: all var(--transition-normal);
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

@media (max-width: 768px) {
  .category-tabs {
    gap: 0.5rem;
  }

  .category-tab {
    padding: 0.5rem 1rem;
    font-size: 0.8125rem;
  }

  .faq-question {
    padding: 1rem;
  }

  .contact-card {
    padding: 2rem;
  }
}
</style>
