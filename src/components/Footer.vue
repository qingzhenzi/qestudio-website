<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import siteConfig from '../config/site.config'
import QQGroupCard from '../components/QQGroupCard.vue'
import ExternalLinkModal from '../components/ExternalLinkModal.vue'

const currentYear = new Date().getFullYear()

const showExternalModal = ref(false)
const externalUrl = ref('')
const externalTitle = ref('')

function handleExternalLink(url, title) {
  externalUrl.value = url
  externalTitle.value = title
  showExternalModal.value = true
}
</script>

<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-grid">
        <div class="footer-brand">
          <RouterLink to="/" class="footer-logo">
            <span class="gradient-text">{{ siteConfig.site.name }}</span>
          </RouterLink>
          <p class="footer-description">{{ siteConfig.site.description }}</p>
          <div class="social-links">
            <button
              @click="handleExternalLink(siteConfig.social.github, 'GitHub')"
              class="social-link"
              aria-label="GitHub"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            </button>
          </div>
        </div>

        <div class="footer-links">
          <h4>快速链接</h4>
          <nav>
            <RouterLink
              v-for="item in siteConfig.navigation"
              :key="item.path"
              :to="item.path"
            >
              {{ item.name }}
            </RouterLink>
          </nav>
        </div>

        <div class="footer-contact">
          <h4>联系我们</h4>
          <div class="contact-email">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            <a :href="`mailto:${siteConfig.contact.email}`">{{ siteConfig.contact.email }}</a>
          </div>
          <QQGroupCard :show-avatar="true" :compact="true" />
        </div>

        <div class="footer-friends">
          <h4>友情链接</h4>
          <div class="friends-links">
            <button
              v-for="friend in siteConfig.friends"
              :key="friend.url"
              @click="handleExternalLink(friend.url, friend.name)"
              class="friend-link"
            >
              <span class="friend-name">{{ friend.name }}</span>
              <span class="friend-desc">{{ friend.description }}</span>
            </button>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <p>&copy; {{ currentYear }} {{ siteConfig.site.name }}. All rights reserved.</p>
      </div>
    </div>

    <ExternalLinkModal 
      v-model:visible="showExternalModal"
      :url="externalUrl"
      :title="externalTitle"
      @close="showExternalModal = false"
    />
  </footer>
</template>

<style scoped>
.footer {
  background: linear-gradient(180deg, transparent 0%, rgba(10, 15, 26, 0.9) 100%);
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding: 4rem 0 2rem;
  margin-top: auto;
}

.footer-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
}

.footer-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1fr;
  gap: 3rem;
}

.footer-brand {
  max-width: 280px;
}

.footer-logo {
  display: inline-block;
  font-size: 1.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
}

.footer-description {
  color: var(--text-secondary);
  font-size: 0.875rem;
  line-height: 1.7;
  margin-bottom: 1.5rem;
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  color: var(--text-secondary);
  transition: all var(--transition-fast);
  border: none;
  cursor: pointer;
}

.social-link:hover {
  background: var(--primary);
  color: var(--text-primary);
  transform: translateY(-3px);
}

.social-link svg {
  width: 20px;
  height: 20px;
}

.footer-links h4,
.footer-contact h4,
.footer-friends h4 {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: var(--text-primary);
}

.contact-email {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.contact-email svg {
  width: 18px;
  height: 18px;
  color: var(--primary);
  flex-shrink: 0;
}

.contact-email a {
  font-size: 0.8125rem;
  color: var(--text-secondary);
  transition: color var(--transition-fast);
  word-break: break-all;
}

.contact-email a:hover {
  color: var(--primary-light);
}

.footer-links nav {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.footer-links nav a {
  color: var(--text-secondary);
  font-size: 0.875rem;
  transition: color var(--transition-fast);
}

.footer-links nav a:hover {
  color: var(--primary-light);
}

.friends-links {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.friend-link {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
  padding: 0.5rem 0.75rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: var(--border-radius-md);
  text-decoration: none;
  transition: all var(--transition-fast);
  border: none;
  cursor: pointer;
  text-align: left;
  width: 100%;
}

.friend-link:hover {
  background: rgba(16, 185, 129, 0.1);
  transform: translateX(4px);
}

.friend-name {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-primary);
}

.friend-desc {
  font-size: 0.6875rem;
  color: var(--text-muted);
}

.footer-bottom {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  text-align: center;
}

.footer-bottom p {
  color: var(--text-muted);
  font-size: 0.875rem;
}

@media (max-width: 1024px) {
  .footer-grid {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
}

@media (max-width: 640px) {
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .footer-brand {
    max-width: 100%;
  }
}
</style>
