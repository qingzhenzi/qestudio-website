<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const cursorDot = ref(null)
const cursorOutline = ref(null)
const isHovering = ref(false)
const isClicking = ref(false)
const isVisible = ref(false)

let mouseX = 0
let mouseY = 0
let outlineX = 0
let outlineY = 0

function handleMouseMove(e) {
  mouseX = e.clientX
  mouseY = e.clientY
  
  if (cursorDot.value) {
    cursorDot.value.style.left = `${mouseX}px`
    cursorDot.value.style.top = `${mouseY}px`
  }
  
  if (!isVisible.value) {
    isVisible.value = true
  }
}

function animateOutline() {
  outlineX += (mouseX - outlineX) * 0.15
  outlineY += (mouseY - outlineY) * 0.15
  
  if (cursorOutline.value) {
    cursorOutline.value.style.left = `${outlineX}px`
    cursorOutline.value.style.top = `${outlineY}px`
  }
  
  requestAnimationFrame(animateOutline)
}

function handleMouseEnter() {
  isHovering.value = true
}

function handleMouseLeave() {
  isHovering.value = false
}

function handleMouseDown() {
  isClicking.value = true
}

function handleMouseUp() {
  isClicking.value = false
}

onMounted(() => {
  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mousedown', handleMouseDown)
  document.addEventListener('mouseup', handleMouseUp)
  
  const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, [role="button"]')
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', handleMouseEnter)
    el.addEventListener('mouseleave', handleMouseLeave)
  })
  
  animateOutline()
})

onUnmounted(() => {
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mousedown', handleMouseDown)
  document.removeEventListener('mouseup', handleMouseUp)
  
  const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, [role="button"]')
  interactiveElements.forEach(el => {
    el.removeEventListener('mouseenter', handleMouseEnter)
    el.removeEventListener('mouseleave', handleMouseLeave)
  })
})
</script>

<template>
  <div class="custom-cursor" :class="{ visible: isVisible }">
    <div
      ref="cursorDot"
      class="cursor-dot"
      :class="{ hovering: isHovering, clicking: isClicking }"
    ></div>
    <div
      ref="cursorOutline"
      class="cursor-outline"
      :class="{ hovering: isHovering, clicking: isClicking }"
    ></div>
    <div class="cursor-trail">
      <span v-for="i in 6" :key="i" class="trail-dot" :style="{ '--delay': i * 0.05 + 's' }"></span>
    </div>
  </div>
</template>

<style scoped>
.custom-cursor {
  pointer-events: none;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99999;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.custom-cursor.visible {
  opacity: 1;
}

.cursor-dot {
  position: fixed;
  width: 8px;
  height: 8px;
  background: linear-gradient(135deg, #6366f1 0%, #ec4899 100%);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.2s ease, height 0.2s ease, background 0.2s ease;
  pointer-events: none;
}

.cursor-dot.hovering {
  width: 4px;
  height: 4px;
  background: #ec4899;
}

.cursor-dot.clicking {
  width: 12px;
  height: 12px;
}

.cursor-outline {
  position: fixed;
  width: 40px;
  height: 40px;
  border: 2px solid rgba(99, 102, 241, 0.5);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.3s ease, height 0.3s ease, border-color 0.3s ease;
  pointer-events: none;
}

.cursor-outline.hovering {
  width: 60px;
  height: 60px;
  border-color: rgba(236, 72, 153, 0.5);
}

.cursor-outline.clicking {
  width: 30px;
  height: 30px;
  border-color: rgba(99, 102, 241, 0.8);
}

.cursor-trail {
  position: fixed;
  pointer-events: none;
}

.trail-dot {
  position: fixed;
  width: 4px;
  height: 4px;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  border-radius: 50%;
  opacity: 0;
  animation: trail-fade 0.5s ease-out forwards;
  animation-delay: var(--delay);
}

@keyframes trail-fade {
  0% {
    opacity: 0.5;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(0);
  }
}

@media (max-width: 768px) {
  .custom-cursor {
    display: none;
  }
}

@media (hover: none) {
  .custom-cursor {
    display: none;
  }
}
</style>
