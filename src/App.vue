<script setup>
import { ref, onMounted } from 'vue'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import ParticleBackground from './components/ParticleBackground.vue'
import BackToTop from './components/BackToTop.vue'
import ThemeToggle from './components/ThemeToggle.vue'
import LoadingScreen from './components/LoadingScreen.vue'
import SeoHead from './components/SeoHead.vue'
import LocaleSwitcher from './components/LocaleSwitcher.vue'
import CookieConsent from './components/CookieConsent.vue'
import CustomCursor from './components/CustomCursor.vue'
import ReadingProgress from './components/ReadingProgress.vue'
import SearchModal from './components/SearchModal.vue'
import KeyboardShortcuts from './components/KeyboardShortcuts.vue'
import AccessibilityPanel from './components/AccessibilityPanel.vue'

const searchModal = ref(null)
const showSkipLink = ref(false)

function openSearch() {
  searchModal.value?.openSearch()
}

onMounted(() => {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      showSkipLink.value = true
    }
  })
})
</script>

<template>
  <SeoHead>
    <a href="#main-content" class="skip-link">跳转到主要内容</a>
    <div class="app">
      <CustomCursor />
      <LoadingScreen />
      <ParticleBackground />
      <ReadingProgress />
      <Navbar>
        <template #actions>
          <button class="search-btn" @click="openSearch" aria-label="Search">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="M21 21l-4.35-4.35"/>
            </svg>
          </button>
          <LocaleSwitcher />
          <ThemeToggle />
        </template>
      </Navbar>
      <main id="main-content" class="main-content">
        <router-view v-slot="{ Component, route }">
          <transition name="page" mode="out-in">
            <component :is="Component" :key="route.path" />
          </transition>
        </router-view>
      </main>
      <Footer />
      <BackToTop />
      <CookieConsent />
      <SearchModal ref="searchModal" />
      <KeyboardShortcuts @open-search="openSearch" />
      <AccessibilityPanel />
    </div>
  </SeoHead>
</template>

<style scoped>
.search-btn {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--border-radius-md);
  color: var(--text-secondary);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.search-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  color: var(--text-primary);
}

.search-btn svg {
  width: 18px;
  height: 18px;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
}

.main-content {
  flex: 1;
  position: relative;
  z-index: 1;
}

.page-enter-active,
.page-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(30px) scale(0.98);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-30px) scale(0.98);
}
</style>
