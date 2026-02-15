<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  visible: Boolean,
  url: String,
  title: String,
})

const emit = defineEmits(['close', 'confirm'])

const displayUrl = ref('')

watch(() => props.url, (newUrl) => {
  if (newUrl) {
    try {
      const urlObj = new URL(newUrl)
      displayUrl.value = urlObj.hostname + urlObj.pathname
    } catch {
      displayUrl.value = newUrl
    }
  }
})

function openLink() {
  window.open(props.url, '_blank', 'noopener,noreferrer')
  emit('confirm')
  emit('close')
}

function closeModal() {
  emit('close')
}
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="visible" class="modal-overlay" @click.self="closeModal">
        <div class="modal-content">
          <div class="modal-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
            </svg>
          </div>
          <h3 class="modal-title">即将离开本站</h3>
          <p class="modal-desc">您即将访问外部链接，请注意信息安全</p>
          <div class="modal-url">
            <span class="url-label">目标地址：</span>
            <span class="url-value">{{ displayUrl }}</span>
          </div>
          <div class="modal-actions">
            <button class="btn btn-cancel" @click="closeModal">
              取消
            </button>
            <button class="btn btn-confirm" @click="openLink">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
              继续访问
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 1rem;
}

.modal-content {
  background: var(--bg-secondary);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--border-radius-xl);
  padding: 2rem;
  max-width: 420px;
  width: 100%;
  text-align: center;
}

.modal-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--secondary) 0%, var(--accent) 100%);
  border-radius: 50%;
}

.modal-icon svg {
  width: 32px;
  height: 32px;
  color: white;
}

.modal-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.modal-desc {
  color: var(--text-secondary);
  font-size: 0.9375rem;
  margin-bottom: 1.5rem;
}

.modal-url {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: var(--border-radius-md);
  padding: 0.75rem 1rem;
  margin-bottom: 1.5rem;
  text-align: left;
}

.url-label {
  font-size: 0.75rem;
  color: var(--text-muted);
  display: block;
  margin-bottom: 0.25rem;
}

.url-value {
  font-size: 0.8125rem;
  color: var(--primary-light);
  word-break: break-all;
}

.modal-actions {
  display: flex;
  gap: 1rem;
}

.btn {
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  font-size: 0.9375rem;
  font-weight: 600;
  border-radius: var(--border-radius-lg);
  transition: all var(--transition-fast);
}

.btn svg {
  width: 16px;
  height: 16px;
}

.btn-cancel {
  background: rgba(255, 255, 255, 0.05);
  color: var(--text-secondary);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.btn-cancel:hover {
  background: rgba(255, 255, 255, 0.1);
  color: var(--text-primary);
}

.btn-confirm {
  background: var(--gradient-primary);
  color: var(--text-primary);
}

.btn-confirm:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(16, 185, 129, 0.4);
}

.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-content,
.modal-leave-to .modal-content {
  transform: scale(0.9);
}
</style>
