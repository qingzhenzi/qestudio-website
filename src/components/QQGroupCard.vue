<script setup>
import { computed } from 'vue'
import siteConfig from '../config/site.config'

const props = defineProps({
  showAvatar: {
    type: Boolean,
    default: true
  },
  compact: {
    type: Boolean,
    default: false
  }
})

const qqGroupNumber = computed(() => siteConfig.contact.qqGroupNumber)
const qqGroupName = computed(() => siteConfig.contact.qqGroup)
const qqGroupLink = computed(() => siteConfig.contact.qqGroupLink)

const qqGroupAvatar = computed(() => 
  `https://p.qlogo.cn/gh/${qqGroupNumber.value}/${qqGroupNumber.value}/100/`
)
</script>

<template>
  <a 
    :href="qqGroupLink"
    target="_blank"
    rel="noopener noreferrer"
    class="qq-group-card"
    :class="{ compact }"
  >
    <div v-if="showAvatar" class="qq-avatar">
      <img :src="qqGroupAvatar" :alt="qqGroupName" />
      <div class="qq-badge">
        <img src="/qq-icon.svg" alt="QQ" />
      </div>
    </div>
    <div class="qq-info">
      <h4 class="qq-name">{{ qqGroupName }}</h4>
      <p class="qq-number">群号：{{ qqGroupNumber }}</p>
      <span v-if="!compact" class="qq-join">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
          <circle cx="8.5" cy="7" r="4"/>
          <line x1="20" y1="8" x2="20" y2="14"/>
          <line x1="23" y1="11" x2="17" y2="11"/>
        </svg>
        加入群聊
      </span>
    </div>
  </a>
</template>

<style scoped>
.qq-group-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.25rem;
  background: linear-gradient(135deg, rgba(18, 183, 245, 0.1) 0%, rgba(0, 153, 255, 0.05) 100%);
  border: 1px solid rgba(18, 183, 245, 0.2);
  border-radius: var(--border-radius-xl);
  text-decoration: none;
  transition: all var(--transition-normal);
}

.qq-group-card:hover {
  background: linear-gradient(135deg, rgba(18, 183, 245, 0.15) 0%, rgba(0, 153, 255, 0.1) 100%);
  border-color: rgba(18, 183, 245, 0.4);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(18, 183, 245, 0.2);
}

.qq-group-card.compact {
  padding: 0.75rem 1rem;
  gap: 0.75rem;
}

.qq-avatar {
  position: relative;
  width: 56px;
  height: 56px;
  flex-shrink: 0;
}

.qq-group-card.compact .qq-avatar {
  width: 44px;
  height: 44px;
}

.qq-avatar img {
  width: 100%;
  height: 100%;
  border-radius: var(--border-radius-lg);
  object-fit: cover;
}

.qq-badge {
  position: absolute;
  bottom: -10px;
  right: -10px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.qq-badge img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.15));
}

.qq-info {
  flex: 1;
  min-width: 0;
}

.qq-name {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.25rem;
}

.qq-group-card.compact .qq-name {
  font-size: 0.9375rem;
}

.qq-number {
  font-size: 0.8125rem;
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
}

.qq-group-card.compact .qq-number {
  font-size: 0.75rem;
  margin-bottom: 0;
}

.qq-join {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.8125rem;
  font-weight: 500;
  color: #12B7F5;
}

.qq-join svg {
  width: 14px;
  height: 14px;
}

.qq-group-card:hover .qq-join {
  color: #22D3EE;
}
</style>
