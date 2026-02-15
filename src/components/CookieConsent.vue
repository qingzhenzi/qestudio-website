<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const isVisible = ref(false)

onMounted(() => {
  const consent = localStorage.getItem('cookie-consent')
  if (!consent) {
    setTimeout(() => {
      isVisible.value = true
    }, 1500)
  }
})

function accept() {
  localStorage.setItem('cookie-consent', 'accepted')
  isVisible.value = false
}

function decline() {
  localStorage.setItem('cookie-consent', 'declined')
  isVisible.value = false
}
</script>

<template>
  <transition name="cookie-slide">
    <div v-if="isVisible" class="cookie-consent">
      <div class="cookie-content">
        <div class="cookie-icon">🍪</div>
        <div class="cookie-text">
          <h4>{{ t('cookie.title') }}</h4>
          <p>{{ t('cookie.message') }}</p>
        </div>
      </div>
      <div class="cookie-actions">
        <button class="btn-decline" @click="decline">
          {{ t('cookie.decline') }}
        </button>
        <button class="btn-accept" @click="accept">
          {{ t('cookie.accept') }}
        </button>
      </div>
      <div class="cookie-sparkles">
        <span v-for="i in 5" :key="i" class="sparkle">✦</span>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.cookie-consent {
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  max-width: 500px;
  width: calc(100% - 2rem);
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-xl);
  padding: 1.5rem;
  box-shadow: var(--shadow-xl);
  z-index: 9999;
  overflow: hidden;
}

.cookie-content {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.cookie-icon {
  font-size: 2rem;
  animation: bounce 2s ease-in-out infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  25% { transform: translateY(-5px) rotate(-5deg); }
  75% { transform: translateY(-5px) rotate(5deg); }
}

.cookie-text h4 {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
  color: var(--text-primary);
}

.cookie-text p {
  font-size: 0.875rem;
  color: var(--text-secondary);
  line-height: 1.5;
}

.cookie-actions {
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
}

.btn-decline,
.btn-accept {
  padding: 0.625rem 1.25rem;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: var(--border-radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.btn-decline {
  background: transparent;
  border: 1px solid var(--border-color);
  color: var(--text-secondary);
}

.btn-decline:hover {
  border-color: var(--text-secondary);
  color: var(--text-primary);
}

.btn-accept {
  background: var(--gradient-primary);
  border: none;
  color: var(--text-primary);
  box-shadow: 0 2px 10px rgba(99, 102, 241, 0.3);
}

.btn-accept:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4);
}

.cookie-sparkles {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.sparkle {
  position: absolute;
  font-size: 10px;
  color: var(--primary);
  opacity: 0.3;
  animation: sparkle-float 3s ease-in-out infinite;
}

.sparkle:nth-child(1) { top: 10%; left: 5%; animation-delay: 0s; }
.sparkle:nth-child(2) { top: 20%; right: 10%; animation-delay: 0.5s; }
.sparkle:nth-child(3) { bottom: 30%; left: 15%; animation-delay: 1s; }
.sparkle:nth-child(4) { bottom: 15%; right: 5%; animation-delay: 1.5s; }
.sparkle:nth-child(5) { top: 50%; right: 20%; animation-delay: 2s; }

@keyframes sparkle-float {
  0%, 100% { opacity: 0.3; transform: translateY(0) scale(1); }
  50% { opacity: 0.6; transform: translateY(-10px) scale(1.2); }
}

.cookie-slide-enter-active,
.cookie-slide-leave-active {
  transition: all 0.4s ease;
}

.cookie-slide-enter-from,
.cookie-slide-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(20px);
}

@media (max-width: 480px) {
  .cookie-consent {
    bottom: 1rem;
    padding: 1rem;
  }

  .cookie-content {
    flex-direction: column;
    text-align: center;
  }

  .cookie-actions {
    flex-direction: column;
  }

  .btn-decline,
  .btn-accept {
    width: 100%;
  }
}
</style>
