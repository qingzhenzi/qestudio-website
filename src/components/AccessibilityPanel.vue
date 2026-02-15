<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const fontSize = ref(100)
const isOpen = ref(false)

const sizes = [
  { value: 80, label: t('accessibility.small') },
  { value: 90, label: t('accessibility.medium') },
  { value: 100, label: t('accessibility.normal') },
  { value: 110, label: t('accessibility.large') },
  { value: 120, label: t('accessibility.xlarge') },
]

const reducedMotion = ref(false)
const highContrast = ref(false)

function updateFontSize() {
  document.documentElement.style.fontSize = `${fontSize.value}%`
  localStorage.setItem('font-size', fontSize.value)
}

function toggleReducedMotion() {
  reducedMotion.value = !reducedMotion.value
  document.documentElement.classList.toggle('reduced-motion', reducedMotion.value)
  localStorage.setItem('reduced-motion', reducedMotion.value)
}

function toggleHighContrast() {
  highContrast.value = !highContrast.value
  document.documentElement.classList.toggle('high-contrast', highContrast.value)
  localStorage.setItem('high-contrast', highContrast.value)
}

function setFontSize(value) {
  fontSize.value = value
  updateFontSize()
}

onMounted(() => {
  const savedFontSize = localStorage.getItem('font-size')
  if (savedFontSize) {
    fontSize.value = parseInt(savedFontSize)
    updateFontSize()
  }

  const savedReducedMotion = localStorage.getItem('reduced-motion')
  if (savedReducedMotion === 'true') {
    reducedMotion.value = true
    document.documentElement.classList.add('reduced-motion')
  }

  const savedHighContrast = localStorage.getItem('high-contrast')
  if (savedHighContrast === 'true') {
    highContrast.value = true
    document.documentElement.classList.add('high-contrast')
  }

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    reducedMotion.value = true
    document.documentElement.classList.add('reduced-motion')
  }
})
</script>

<template>
  <div class="accessibility-panel">
    <button
      class="accessibility-toggle"
      :class="{ active: isOpen }"
      @click="isOpen = !isOpen"
      :aria-expanded="isOpen"
      aria-label="Accessibility options"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="4.5" r="2.5"/>
        <path d="M12 7v10"/>
        <path d="M6.5 9.5l2.5 2 3-1.5 3 1.5 2.5-2"/>
        <path d="M7 21l5-4 5 4"/>
      </svg>
    </button>

    <transition name="panel-slide">
      <div v-if="isOpen" class="accessibility-menu">
        <div class="menu-header">
          <span class="icon">♿</span>
          <span class="title">{{ t('accessibility.title') }}</span>
        </div>

        <div class="menu-section">
          <span class="section-label">{{ t('accessibility.fontSize') }}</span>
          <div class="font-size-options">
            <button
              v-for="size in sizes"
              :key="size.value"
              class="size-btn"
              :class="{ active: fontSize === size.value }"
              @click="setFontSize(size.value)"
            >
              {{ size.label }}
            </button>
          </div>
        </div>

        <div class="menu-section">
          <label class="toggle-option">
            <span class="option-label">{{ t('accessibility.reducedMotion') }}</span>
            <input
              type="checkbox"
              :checked="reducedMotion"
              @change="toggleReducedMotion"
            />
            <span class="toggle-slider"></span>
          </label>
        </div>

        <div class="menu-section">
          <label class="toggle-option">
            <span class="option-label">{{ t('accessibility.highContrast') }}</span>
            <input
              type="checkbox"
              :checked="highContrast"
              @change="toggleHighContrast"
            />
            <span class="toggle-slider"></span>
          </label>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.accessibility-panel {
  position: fixed;
  bottom: 5rem;
  right: 1.5rem;
  z-index: 9990;
}

.accessibility-toggle {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 50%;
  color: var(--text-primary);
  cursor: pointer;
  transition: all var(--transition-fast);
  box-shadow: var(--shadow-lg);
}

.accessibility-toggle:hover,
.accessibility-toggle.active {
  background: var(--primary);
  border-color: var(--primary);
  transform: scale(1.1);
}

.accessibility-toggle svg {
  width: 24px;
  height: 24px;
}

.accessibility-menu {
  position: absolute;
  bottom: 60px;
  right: 0;
  width: 280px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-xl);
  box-shadow: var(--shadow-xl);
  overflow: hidden;
}

.menu-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  background: rgba(99, 102, 241, 0.1);
  border-bottom: 1px solid var(--border-color);
}

.menu-header .icon {
  font-size: 1.25rem;
}

.menu-header .title {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--text-primary);
}

.menu-section {
  padding: 1rem;
  border-bottom: 1px solid var(--border-color);
}

.menu-section:last-child {
  border-bottom: none;
}

.section-label {
  display: block;
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--text-muted);
  margin-bottom: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.font-size-options {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.size-btn {
  padding: 0.5rem 0.75rem;
  font-size: 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--border-radius-md);
  color: var(--text-secondary);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.size-btn:hover {
  border-color: var(--primary);
  color: var(--text-primary);
}

.size-btn.active {
  background: var(--primary);
  border-color: var(--primary);
  color: white;
}

.toggle-option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
}

.option-label {
  font-size: 0.875rem;
  color: var(--text-primary);
}

.toggle-option input {
  display: none;
}

.toggle-slider {
  width: 44px;
  height: 24px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  position: relative;
  transition: background var(--transition-fast);
}

.toggle-slider::after {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  width: 20px;
  height: 20px;
  background: white;
  border-radius: 50%;
  transition: transform var(--transition-fast);
}

.toggle-option input:checked + .toggle-slider {
  background: var(--primary);
}

.toggle-option input:checked + .toggle-slider::after {
  transform: translateX(20px);
}

.panel-slide-enter-active,
.panel-slide-leave-active {
  transition: all 0.3s ease;
}

.panel-slide-enter-from,
.panel-slide-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

@media (max-width: 480px) {
  .accessibility-panel {
    bottom: 6rem;
    right: 1rem;
  }

  .accessibility-menu {
    width: 260px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .panel-slide-enter-active,
  .panel-slide-leave-active {
    transition: none;
  }
}
</style>
