<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import LazyImage from '../components/LazyImage.vue'

gsap.registerPlugin(ScrollTrigger)

const activeFilter = ref('all')
const filters = [
  { id: 'all', name: '全部' },
  { id: 'news', name: '新闻' },
  { id: 'update', name: '更新' },
  { id: 'notice', name: '公告' },
]

const articles = ref([
  {
    id: 1,
    title: '待添加文章',
    excerpt: '文章摘要待补充...',
    category: 'news',
    date: '2026-01-01',
    image: '',
    readTime: '5分钟',
  },
])

const filteredArticles = ref(articles.value)

function setFilter(filterId) {
  activeFilter.value = filterId
  if (filterId === 'all') {
    filteredArticles.value = articles.value
  } else {
    filteredArticles.value = articles.value.filter(a => a.category === filterId)
  }
}

onMounted(() => {
  gsap.from('.blog-hero-content', {
    opacity: 0,
    y: 30,
    duration: 1,
    ease: 'power3.out',
  })
})
</script>

<template>
  <div class="blog">
    <section class="blog-hero">
      <div class="blog-hero-bg">
        <div class="orb orb-1"></div>
        <div class="orb orb-2"></div>
      </div>
      <div class="container">
        <div class="blog-hero-content">
          <h1 class="page-title gradient-text">新闻动态</h1>
          <p class="page-subtitle">了解 QEStudio 的最新动态</p>
        </div>
      </div>
    </section>

    <section class="articles section">
      <div class="container">
        <div class="filter-tabs">
          <button
            v-for="filter in filters"
            :key="filter.id"
            class="filter-tab"
            :class="{ active: activeFilter === filter.id }"
            @click="setFilter(filter.id)"
          >
            {{ filter.name }}
          </button>
        </div>

        <div v-if="filteredArticles.length === 0" class="empty-state">
          <div class="empty-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/>
            </svg>
          </div>
          <h3>暂无文章</h3>
          <p>该分类下暂无文章，敬请期待</p>
        </div>

        <transition-group name="articles" tag="div" class="articles-grid" v-else>
          <article
            v-for="article in filteredArticles"
            :key="article.id"
            class="article-card"
          >
            <div class="article-image" v-if="article.image">
              <LazyImage :src="article.image" :alt="article.title" height="200px" />
              <span class="article-category">{{ filters.find(f => f.id === article.category)?.name }}</span>
            </div>
            <div class="article-image placeholder" v-else>
              <div class="placeholder-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/>
                </svg>
              </div>
              <span class="article-category">{{ filters.find(f => f.id === article.category)?.name }}</span>
            </div>
            <div class="article-content">
              <div class="article-meta">
                <span class="date">{{ article.date }}</span>
                <span class="read-time">{{ article.readTime }}</span>
              </div>
              <h3 class="article-title">{{ article.title }}</h3>
              <p class="article-excerpt">{{ article.excerpt }}</p>
              <a href="#" class="read-more">
                阅读更多
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </div>
          </article>
        </transition-group>
      </div>
    </section>
  </div>
</template>

<style scoped>
.blog-hero {
  min-height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding-top: 100px;
  overflow: hidden;
}

.blog-hero-bg {
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

.filter-tabs {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.filter-tab {
  padding: 0.75rem 1.5rem;
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--text-secondary);
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--border-radius-lg);
  transition: all var(--transition-fast);
}

.filter-tab:hover {
  color: var(--text-primary);
  border-color: rgba(255, 255, 255, 0.2);
}

.filter-tab.active {
  background: var(--gradient-primary);
  color: var(--text-primary);
  border-color: transparent;
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
}

.empty-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 50%;
}

.empty-icon svg {
  width: 40px;
  height: 40px;
  color: var(--text-muted);
}

.empty-state h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.empty-state p {
  color: var(--text-secondary);
  font-size: 0.9375rem;
}

.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.article-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-xl);
  overflow: hidden;
  transition: all var(--transition-normal);
}

.article-card:hover {
  border-color: rgba(16, 185, 129, 0.3);
  transform: translateY(-5px);
  box-shadow: var(--shadow-glow);
}

.article-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.article-image.placeholder {
  background: rgba(255, 255, 255, 0.02);
  display: flex;
  align-items: center;
  justify-content: center;
}

.placeholder-icon svg {
  width: 48px;
  height: 48px;
  color: var(--text-muted);
}

.article-category {
  position: absolute;
  top: 1rem;
  left: 1rem;
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--text-primary);
  background: var(--primary);
  border-radius: var(--border-radius-sm);
}

.article-content {
  padding: 1.5rem;
}

.article-meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 0.75rem;
}

.date,
.read-time {
  font-size: 0.75rem;
  color: var(--text-muted);
}

.article-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  line-height: 1.4;
}

.article-excerpt {
  color: var(--text-secondary);
  font-size: 0.875rem;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.read-more {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--primary-light);
  font-size: 0.875rem;
  font-weight: 500;
  transition: all var(--transition-fast);
}

.read-more:hover {
  color: var(--text-primary);
}

.read-more svg {
  width: 16px;
  height: 16px;
  transition: transform var(--transition-fast);
}

.read-more:hover svg {
  transform: translateX(4px);
}

.articles-enter-active,
.articles-leave-active {
  transition: all 0.5s ease;
}

.articles-enter-from,
.articles-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

@media (max-width: 768px) {
  .articles-grid {
    grid-template-columns: 1fr;
  }
}
</style>
