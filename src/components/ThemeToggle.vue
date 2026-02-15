<script setup>
import { ref, onMounted, watch } from 'vue'

const isDark = ref(true)

function toggleTheme() {
  isDark.value = !isDark.value
  document.documentElement.setAttribute('data-theme', isDark.value ? 'dark' : 'light')
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme) {
    isDark.value = savedTheme === 'dark'
  } else {
    isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
  }
  document.documentElement.setAttribute('data-theme', isDark.value ? 'dark' : 'light')
})
</script>

<template>
  <button class="theme-toggle" @click="toggleTheme" aria-label="切换主题">
    <div class="toggle-track">
      <div class="toggle-thumb" :class="{ light: !isDark }">
        <span v-if="isDark" class="icon moon">🌙</span>
        <span v-else class="icon sun">☀️</span>
      </div>
      <div class="stars" v-if="isDark">
        <span class="star">✦</span>
        <span class="star">✧</span>
        <span class="star">✦</span>
      </div>
      <div class="clouds" v-else>
        <span class="cloud">☁️</span>
      </div>
    </div>
  </button>
</template>

<style scoped>
.theme-toggle {
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  z-index: 1001;
}

.toggle-track {
  position: relative;
  width: 60px;
  height: 30px;
  background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%);
  border-radius: 15px;
  padding: 3px;
  transition: all 0.4s ease;
  overflow: hidden;
}

[data-theme="light"] .toggle-track {
  background: linear-gradient(135deg, #7dd3fc 0%, #38bdf8 100%);
}

.toggle-thumb {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 24px;
  height: 24px;
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  border-radius: 50%;
  transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.toggle-thumb.light {
  left: 33px;
  background: linear-gradient(135deg, #fef3c7 0%, #fcd34d 100%);
  box-shadow: 0 0 20px rgba(252, 211, 77, 0.5);
}

.icon {
  font-size: 14px;
  line-height: 1;
}

.stars, .clouds {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.star {
  position: absolute;
  font-size: 8px;
  color: white;
  opacity: 0.8;
  animation: twinkle 2s ease-in-out infinite;
}

.star:nth-child(1) { top: 6px; right: 8px; animation-delay: 0s; }
.star:nth-child(2) { top: 16px; right: 18px; animation-delay: 0.5s; }
.star:nth-child(3) { bottom: 6px; right: 10px; animation-delay: 1s; }

@keyframes twinkle {
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.2); }
}

.cloud {
  position: absolute;
  font-size: 10px;
  opacity: 0.8;
  top: 50%;
  left: 8px;
  transform: translateY(-50%);
}

[data-theme="light"] .stars {
  display: none;
}

[data-theme="dark"] .clouds {
  display: none;
}
</style>
