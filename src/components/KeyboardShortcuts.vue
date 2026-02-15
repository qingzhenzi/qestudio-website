<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const router = useRouter()

const shortcuts = [
  { key: '/', description: t('shortcuts.search'), action: 'search' },
  { key: 'h', description: t('shortcuts.home'), action: 'home' },
  { key: 'a', description: t('shortcuts.about'), action: 'about' },
  { key: 's', description: t('shortcuts.services'), action: 'services' },
  { key: 'p', description: t('shortcuts.portfolio'), action: 'portfolio' },
  { key: 'b', description: t('shortcuts.blog'), action: 'blog' },
  { key: 'c', description: t('shortcuts.contact'), action: 'contact' },
  { key: '?', description: t('shortcuts.help'), action: 'help' },
]

const showHelp = ref(false)
const emit = defineEmits(['open-search'])

function handleKeydown(e) {
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
    return
  }

  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault()
    emit('open-search')
    return
  }

  if (e.key === '?') {
    showHelp.value = !showHelp.value
    return
  }

  if (e.key === 'Escape' && showHelp.value) {
    showHelp.value = false
    return
  }

  if (showHelp.value) return

  const routes = {
    '/': 'h',
    '/about': 'a',
    '/services': 's',
    '/portfolio': 'p',
    '/blog': 'b',
    '/faq': 'f',
    '/contact': 'c',
  }

  for (const [path, key] of Object.entries(routes)) {
    if (e.key.toLowerCase() === key) {
      router.push(path)
      break
    }
  }

  if (e.key === '/') {
    e.preventDefault()
    emit('open-search')
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <Teleport to="body">
    <transition name="help-modal">
      <div v-if="showHelp" class="shortcuts-overlay" @click="showHelp = false">
        <div class="shortcuts-modal" @click.stop>
          <div class="modal-header">
            <h3>{{ t('shortcuts.title') }}</h3>
            <button class="close-btn" @click="showHelp = false" aria-label="Close">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>
          <div class="shortcuts-list">
            <div v-for="shortcut in shortcuts" :key="shortcut.key" class="shortcut-item">
              <kbd class="shortcut-key">{{ shortcut.key }}</kbd>
              <span class="shortcut-desc">{{ shortcut.description }}</span>
            </div>
          </div>
          <div class="modal-footer">
            <span class="hint">{{ t('shortcuts.hint') }}</span>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<style scoped>
.shortcuts-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99997;
}

.shortcuts-modal {
  width: 100%;
  max-width: 480px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-xl);
  box-shadow: var(--shadow-xl);
  overflow: hidden;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid var(--border-color);
}

.modal-header h3 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
}

.close-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  border-radius: var(--border-radius-md);
  transition: all var(--transition-fast);
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  color: var(--text-primary);
}

.close-btn svg {
  width: 20px;
  height: 20px;
}

.shortcuts-list {
  padding: 1rem 1.25rem;
  display: grid;
  gap: 0.75rem;
}

.shortcut-item {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.shortcut-key {
  min-width: 40px;
  padding: 0.375rem 0.75rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--border-radius-md);
  font-size: 0.875rem;
  font-family: inherit;
  text-align: center;
  color: var(--text-primary);
}

.shortcut-desc {
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.modal-footer {
  padding: 0.75rem 1.25rem;
  border-top: 1px solid var(--border-color);
}

.hint {
  font-size: 0.75rem;
  color: var(--text-muted);
}

.help-modal-enter-active,
.help-modal-leave-active {
  transition: opacity 0.2s ease;
}

.help-modal-enter-from,
.help-modal-leave-to {
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .help-modal-enter-active,
  .help-modal-leave-active {
    transition: none;
  }
}
</style>
