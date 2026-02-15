<script setup>
import { ref, onMounted, onUnmounted, watch, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const { t, locale } = useI18n()
const router = useRouter()

const isOpen = ref(false)
const searchQuery = ref('')
const searchInput = ref(null)
const selectedIndex = ref(-1)

const searchableContent = computed(() => [
  { 
    title: t('nav.home'), 
    path: '/', 
    type: 'page',
    keywords: ['home', 'index', '首页', '主页', 'welcome', '欢迎', 'QEStudio', 'studio'] 
  },
  { 
    title: t('nav.about'), 
    path: '/about', 
    type: 'page',
    keywords: ['about', 'company', 'team', '关于', '公司', '团队', '我们', 'who', '简介'] 
  },
  { 
    title: t('nav.services'), 
    path: '/services', 
    type: 'page',
    keywords: ['services', 'products', '服务', '产品', '量子', 'AI', '人工智能', 'quantum', 'computing', '计算'] 
  },
  { 
    title: t('nav.portfolio'), 
    path: '/portfolio', 
    type: 'page',
    keywords: ['portfolio', 'projects', '案例', '项目', '作品', 'works', 'showcase'] 
  },
  { 
    title: t('nav.blog'), 
    path: '/blog', 
    type: 'page',
    keywords: ['blog', 'news', '博客', '新闻', '文章', 'article', 'post', '动态'] 
  },
  { 
    title: t('nav.faq'), 
    path: '/faq', 
    type: 'page',
    keywords: ['faq', 'help', '问题', '帮助', '问答', 'question', 'answer', '常见问题'] 
  },
  { 
    title: t('nav.contact'), 
    path: '/contact', 
    type: 'page',
    keywords: ['contact', 'email', '联系', '邮件', '地址', 'QQ', '群', 'support', '支持'] 
  },
  { 
    title: locale.value === 'zh-CN' ? '量子计算服务' : 'Quantum Computing', 
    path: '/services#quantum', 
    type: 'service',
    keywords: ['quantum', '量子', 'computing', '计算', 'algorithm', '算法', 'optimization', '优化'] 
  },
  { 
    title: locale.value === 'zh-CN' ? 'AI 解决方案' : 'AI Solutions', 
    path: '/services#ai', 
    type: 'service',
    keywords: ['AI', '人工智能', 'machine learning', '机器学习', 'deep learning', '深度学习', 'neural', '神经网络'] 
  },
  { 
    title: locale.value === 'zh-CN' ? '软件开发' : 'Software Development', 
    path: '/services#software', 
    type: 'service',
    keywords: ['software', '软件', 'development', '开发', 'web', 'app', 'application', '应用'] 
  },
  { 
    title: locale.value === 'zh-CN' ? '技术咨询服务' : 'Technical Consulting', 
    path: '/services#consulting', 
    type: 'service',
    keywords: ['consulting', '咨询', 'advisory', '顾问', 'technical', '技术'] 
  },
  { 
    title: locale.value === 'zh-CN' ? '量子优化平台案例' : 'Quantum Optimization Platform', 
    path: '/portfolio#quantum-opt', 
    type: 'portfolio',
    keywords: ['quantum', '量子', 'optimization', '优化', 'platform', '平台', 'logistics', '物流'] 
  },
  { 
    title: locale.value === 'zh-CN' ? '智能客服系统案例' : 'AI Customer Service', 
    path: '/portfolio#ai-service', 
    type: 'portfolio',
    keywords: ['AI', '智能', 'customer', '客服', 'chatbot', '聊天', 'NLP'] 
  },
  { 
    title: locale.value === 'zh-CN' ? '数据分析平台案例' : 'Data Analytics Platform', 
    path: '/portfolio#data-analytics', 
    type: 'portfolio',
    keywords: ['data', '数据', 'analytics', '分析', 'visualization', '可视化', 'BI', 'dashboard'] 
  },
  { 
    title: locale.value === 'zh-CN' ? 'QEStudio摸鱼总部' : 'QEStudio QQ Group', 
    path: 'https://qm.qq.com/cgi-bin/qm/qr?k=c0nV23IWUaO6FepuIcKy3LZJvOYqog0Z&jump_from=webapi&authKey=i9aVVsbAEm88n4eQtXLAAxY2Ghp676AQ9sOOaJYq3MVLDpr7HyjJkf8clBHBRR1a', 
    type: 'external',
    keywords: ['QQ', '群', 'group', '社区', 'community', '交流', '讨论', '摸鱼'] 
  },
  { 
    title: 'GitHub', 
    path: 'https://github.com/qestudio', 
    type: 'external',
    keywords: ['github', '代码', 'code', '开源', 'open source', 'repository', '仓库'] 
  },
  { 
    title: 'support@qestudio.sgrkvp.top', 
    path: 'mailto:support@qestudio.sgrkvp.top', 
    type: 'contact',
    keywords: ['email', '邮件', 'support', '支持', '联系', 'contact', 'help'] 
  },
])

const results = ref([])

function openSearch() {
  isOpen.value = true
  document.body.style.overflow = 'hidden'
  setTimeout(() => {
    searchInput.value?.focus()
  }, 100)
}

function closeSearch() {
  isOpen.value = false
  searchQuery.value = ''
  results.value = []
  selectedIndex.value = -1
  document.body.style.overflow = ''
}

function search() {
  if (!searchQuery.value.trim()) {
    results.value = []
    return
  }

  const query = searchQuery.value.toLowerCase()
  results.value = searchableContent.value.filter(item => {
    return item.title.toLowerCase().includes(query) ||
           item.keywords.some(k => k.toLowerCase().includes(query))
  })
  selectedIndex.value = results.value.length > 0 ? 0 : -1
}

function selectResult(result) {
  if (result.path.startsWith('http') || result.path.startsWith('mailto')) {
    window.open(result.path, '_blank')
  } else {
    router.push(result.path)
  }
  closeSearch()
}

function getTypeLabel(type) {
  const labels = {
    page: locale.value === 'zh-CN' ? '页面' : 'Page',
    service: locale.value === 'zh-CN' ? '服务' : 'Service',
    portfolio: locale.value === 'zh-CN' ? '案例' : 'Portfolio',
    external: locale.value === 'zh-CN' ? '外部链接' : 'External',
    contact: locale.value === 'zh-CN' ? '联系方式' : 'Contact',
  }
  return labels[type] || type
}

function handleKeydown(e) {
  if (!isOpen.value) {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault()
      openSearch()
    }
    return
  }

  switch (e.key) {
    case 'Escape':
      closeSearch()
      break
    case 'ArrowDown':
      e.preventDefault()
      if (selectedIndex.value < results.value.length - 1) {
        selectedIndex.value++
      }
      break
    case 'ArrowUp':
      e.preventDefault()
      if (selectedIndex.value > 0) {
        selectedIndex.value--
      }
      break
    case 'Enter':
      e.preventDefault()
      if (results.value[selectedIndex.value]) {
        selectResult(results.value[selectedIndex.value])
      }
      break
  }
}

watch(searchQuery, search)

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})

defineExpose({ openSearch, closeSearch })
</script>

<template>
  <Teleport to="body">
    <transition name="search-modal">
      <div v-if="isOpen" class="search-overlay" @click="closeSearch">
        <div class="search-modal" @click.stop>
          <div class="search-header">
            <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="M21 21l-4.35-4.35"/>
            </svg>
            <input
              ref="searchInput"
              v-model="searchQuery"
              type="text"
              class="search-input"
              :placeholder="t('search.placeholder')"
              aria-label="Search"
            />
            <kbd class="search-shortcut">ESC</kbd>
          </div>

          <div v-if="results.length > 0" class="search-results">
            <button
              v-for="(result, index) in results"
              :key="result.path"
              class="search-result-item"
              :class="{ selected: index === selectedIndex }"
              @click="selectResult(result)"
              @mouseenter="selectedIndex = index"
            >
              <div class="result-main">
                <span class="result-title">{{ result.title }}</span>
                <span class="result-type">{{ getTypeLabel(result.type) }}</span>
              </div>
              <span class="result-path">{{ result.path }}</span>
            </button>
          </div>

          <div v-else-if="searchQuery && results.length === 0" class="search-empty">
            <span class="empty-icon">🔍</span>
            <span class="empty-text">{{ t('search.noResults') }}</span>
          </div>

          <div v-else class="search-hints">
            <div class="hint">
              <kbd>↑</kbd><kbd>↓</kbd>
              <span>{{ t('search.navigate') }}</span>
            </div>
            <div class="hint">
              <kbd>Enter</kbd>
              <span>{{ t('search.select') }}</span>
            </div>
            <div class="hint">
              <kbd>ESC</kbd>
              <span>{{ t('search.close') }}</span>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<style scoped>
.search-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 15vh;
  z-index: 99998;
}

.search-modal {
  width: 100%;
  max-width: 600px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-xl);
  box-shadow: var(--shadow-xl);
  overflow: hidden;
}

.search-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid var(--border-color);
}

.search-icon {
  width: 20px;
  height: 20px;
  color: var(--text-muted);
  flex-shrink: 0;
}

.search-input {
  flex: 1;
  background: none;
  border: none;
  font-size: 1rem;
  color: var(--text-primary);
  outline: none;
}

.search-input::placeholder {
  color: var(--text-muted);
}

.search-shortcut {
  padding: 0.25rem 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  font-size: 0.75rem;
  color: var(--text-muted);
}

.search-results {
  max-height: 400px;
  overflow-y: auto;
  padding: 0.5rem;
}

.search-result-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  width: 100%;
  padding: 0.75rem 1rem;
  background: none;
  border: none;
  border-radius: var(--border-radius-md);
  text-align: left;
  cursor: pointer;
  transition: background var(--transition-fast);
}

.search-result-item:hover,
.search-result-item.selected {
  background: rgba(16, 185, 129, 0.1);
}

.result-main {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

.result-title {
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--text-primary);
}

.result-type {
  font-size: 0.6875rem;
  padding: 0.125rem 0.5rem;
  background: var(--gradient-primary);
  border-radius: 999px;
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.result-path {
  font-size: 0.75rem;
  color: var(--text-muted);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.search-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 3rem;
  color: var(--text-muted);
}

.empty-icon {
  font-size: 2rem;
}

.search-hints {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  padding: 1rem;
  border-top: 1px solid var(--border-color);
}

.hint {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  color: var(--text-muted);
}

.hint kbd {
  padding: 0.125rem 0.375rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  font-family: inherit;
}

.search-modal-enter-active,
.search-modal-leave-active {
  transition: opacity 0.2s ease;
}

.search-modal-enter-from,
.search-modal-leave-to {
  opacity: 0;
}

.search-modal-enter-active .search-modal,
.search-modal-leave-active .search-modal {
  transition: transform 0.2s ease;
}

.search-modal-enter-from .search-modal,
.search-modal-leave-to .search-modal {
  transform: translateY(-20px);
}

@media (prefers-reduced-motion: reduce) {
  .search-modal-enter-active,
  .search-modal-leave-active {
    transition: none;
  }
}
</style>
