<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const activeFilter = ref('all')
const filters = [
  { id: 'all', name: '全部' },
  { id: 'simpcloud', name: '简幻云' },
  { id: 'simpfun', name: '简幻欢' },
  { id: 'other', name: '其他' },
]

const projects = ref([
  {
    id: 1,
    title: '待添加项目',
    category: 'simpcloud',
    description: '项目描述待补充...',
    image: '',
    tags: ['待添加'],
  },
])

const filteredProjects = ref(projects.value)

function setFilter(filterId) {
  activeFilter.value = filterId
  if (filterId === 'all') {
    filteredProjects.value = projects.value
  } else {
    filteredProjects.value = projects.value.filter(p => p.category === filterId)
  }
}

onMounted(() => {
  gsap.from('.portfolio-hero-content', {
    opacity: 0,
    y: 30,
    duration: 1,
    ease: 'power3.out',
  })
})
</script>

<template>
  <div class="portfolio">
    <section class="portfolio-hero">
      <div class="portfolio-hero-bg">
        <div class="orb orb-1"></div>
        <div class="orb orb-2"></div>
      </div>
      <div class="container">
        <div class="portfolio-hero-content">
          <h1 class="page-title gradient-text">案例展示</h1>
          <p class="page-subtitle">我们支持的产品案例</p>
        </div>
      </div>
    </section>

    <section class="projects section">
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

        <div v-if="filteredProjects.length === 0" class="empty-state">
          <div class="empty-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
            </svg>
          </div>
          <h3>暂无案例</h3>
          <p>该分类下暂无案例，敬请期待</p>
        </div>

        <transition-group name="projects" tag="div" class="projects-grid" v-else>
          <div
            v-for="project in filteredProjects"
            :key="project.id"
            class="project-card"
          >
            <div class="project-image" v-if="project.image">
              <img :src="project.image" :alt="project.title" loading="lazy" />
              <div class="project-overlay">
                <span class="project-category">{{ filters.find(f => f.id === project.category)?.name }}</span>
              </div>
            </div>
            <div class="project-image placeholder" v-else>
              <div class="placeholder-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
              </div>
              <div class="project-overlay">
                <span class="project-category">{{ filters.find(f => f.id === project.category)?.name }}</span>
              </div>
            </div>
            <div class="project-content">
              <h3 class="project-title">{{ project.title }}</h3>
              <p class="project-description">{{ project.description }}</p>
              <div class="project-tags">
                <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
              </div>
            </div>
          </div>
        </transition-group>
      </div>
    </section>
  </div>
</template>

<style scoped>
.portfolio-hero {
  min-height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding-top: 100px;
  overflow: hidden;
}

.portfolio-hero-bg {
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
  right: -100px;
}

.orb-2 {
  width: 400px;
  height: 400px;
  background: var(--primary);
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

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.project-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: var(--border-radius-xl);
  overflow: hidden;
  transition: all var(--transition-normal);
}

.project-card:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(16, 185, 129, 0.3);
  transform: translateY(-5px);
  box-shadow: var(--shadow-glow);
}

.project-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.project-image.placeholder {
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

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-slow);
}

.project-card:hover .project-image img {
  transform: scale(1.1);
}

.project-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 0%, rgba(10, 15, 26, 0.8) 100%);
  display: flex;
  align-items: flex-end;
  padding: 1rem;
}

.project-category {
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--text-primary);
  background: var(--primary);
  padding: 0.25rem 0.75rem;
  border-radius: var(--border-radius-sm);
}

.project-content {
  padding: 1.5rem;
}

.project-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.project-description {
  color: var(--text-secondary);
  font-size: 0.875rem;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  font-size: 0.75rem;
  color: var(--text-muted);
  background: rgba(255, 255, 255, 0.05);
  padding: 0.25rem 0.5rem;
  border-radius: var(--border-radius-sm);
}

.projects-enter-active,
.projects-leave-active {
  transition: all 0.5s ease;
}

.projects-enter-from,
.projects-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

@media (max-width: 768px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
}
</style>
