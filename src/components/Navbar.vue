<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import siteConfig from '../config/site.config'

const route = useRoute()
const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

const navigation = siteConfig.navigation

function handleScroll() {
  isScrolled.value = window.scrollY > 50
}

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

function closeMobileMenu() {
  isMobileMenuOpen.value = false
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header class="navbar" :class="{ scrolled: isScrolled }">
    <div class="navbar-container">
      <RouterLink to="/" class="logo" @click="closeMobileMenu">
        <span class="logo-text gradient-text">{{ siteConfig.site.name }}</span>
      </RouterLink>

      <nav class="nav-links" :class="{ active: isMobileMenuOpen }">
        <RouterLink
          v-for="item in navigation"
          :key="item.path"
          :to="item.path"
          class="nav-link"
          :class="{ active: route.path === item.path }"
          @click="closeMobileMenu"
        >
          {{ item.name }}
        </RouterLink>
        <div class="nav-actions mobile-only">
          <slot name="actions"></slot>
        </div>
      </nav>

      <div class="nav-right">
        <div class="nav-actions desktop-only">
          <slot name="actions"></slot>
        </div>
        <button class="mobile-menu-btn" @click="toggleMobileMenu" aria-label="Toggle menu">
          <span class="hamburger" :class="{ active: isMobileMenuOpen }">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 1rem 0;
  transition: all var(--transition-normal);
}

.navbar.scrolled {
  background: var(--bg-primary);
  backdrop-filter: blur(20px);
  box-shadow: var(--shadow-lg);
  padding: 0.75rem 0;
}

[data-theme="light"] .navbar.scrolled {
  background: rgba(248, 250, 252, 0.95);
}

.navbar-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: -0.02em;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.nav-link {
  position: relative;
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--text-secondary);
  transition: color var(--transition-fast);
  padding: 0.5rem 0;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--gradient-primary);
  transition: width var(--transition-normal);
}

.nav-link:hover,
.nav-link.active {
  color: var(--text-primary);
}

.nav-link:hover::after,
.nav-link.active::after {
  width: 100%;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.nav-actions {
  display: flex;
  align-items: center;
}

.mobile-only {
  display: none;
}

.mobile-menu-btn {
  display: none;
  padding: 0.5rem;
}

.hamburger {
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 24px;
}

.hamburger span {
  display: block;
  width: 100%;
  height: 2px;
  background: var(--text-primary);
  transition: all var(--transition-fast);
}

.hamburger.active span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.hamburger.active span:nth-child(2) {
  opacity: 0;
}

.hamburger.active span:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}

@media (max-width: 768px) {
  .desktop-only {
    display: none;
  }

  .mobile-only {
    display: flex;
    margin-top: 2rem;
  }

  .mobile-menu-btn {
    display: flex;
    z-index: 1001;
  }

  .nav-links {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--bg-primary);
    backdrop-filter: blur(20px);
    flex-direction: column;
    justify-content: center;
    gap: 2rem;
    opacity: 0;
    visibility: hidden;
    transition: all var(--transition-normal);
  }

  .nav-links.active {
    opacity: 1;
    visibility: visible;
  }

  .nav-link {
    font-size: 1.5rem;
  }
}
</style>
