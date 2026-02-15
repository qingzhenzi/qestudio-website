<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { setLocale, getAvailableLocales } from '../locales'

const { locale } = useI18n()
const locales = getAvailableLocales()
const isOpen = ref(false)
const switcherRef = ref(null)

function changeLocale(code) {
  setLocale(code)
  isOpen.value = false
}

function toggleDropdown() {
  isOpen.value = !isOpen.value
}

function handleClickOutside(event) {
  if (switcherRef.value && !switcherRef.value.contains(event.target)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div ref="switcherRef" class="locale-switcher">
    <button class="locale-btn" @click="toggleDropdown" aria-label="Switch language">
      <span class="globe-icon">🌐</span>
      <span class="current-locale">{{ locales.find(l => l.code === locale)?.flag }}</span>
      <svg class="chevron" :class="{ open: isOpen }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M6 9l6 6 6-6"/>
      </svg>
    </button>
    
    <transition name="dropdown">
      <div v-if="isOpen" class="locale-dropdown">
        <button
          v-for="loc in locales"
          :key="loc.code"
          class="locale-option"
          :class="{ active: locale === loc.code }"
          @click="changeLocale(loc.code)"
        >
          <span class="flag">{{ loc.flag }}</span>
          <span class="name">{{ loc.name }}</span>
          <span v-if="locale === loc.code" class="check">✓</span>
        </button>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.locale-switcher {
  position: relative;
}

.locale-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--border-radius-md);
  color: var(--text-primary);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.locale-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
}

.globe-icon {
  font-size: 1rem;
}

.current-locale {
  font-size: 1.125rem;
}

.chevron {
  width: 16px;
  height: 16px;
  color: var(--text-secondary);
  transition: transform var(--transition-fast);
}

.chevron.open {
  transform: rotate(180deg);
}

.locale-dropdown {
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  min-width: 150px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  overflow: hidden;
  z-index: 100;
}

.locale-option {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.75rem 1rem;
  background: none;
  border: none;
  color: var(--text-primary);
  cursor: pointer;
  transition: all var(--transition-fast);
  text-align: left;
}

.locale-option:hover {
  background: rgba(99, 102, 241, 0.1);
}

.locale-option.active {
  background: rgba(99, 102, 241, 0.2);
  color: var(--primary-light);
}

.flag {
  font-size: 1.25rem;
}

.name {
  flex: 1;
  font-size: 0.9375rem;
}

.check {
  color: var(--primary);
  font-weight: bold;
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
