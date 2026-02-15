<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const canvas = ref(null)
let animationId = null
let particles = []
let mouse = { x: null, y: null }

const config = {
  particleCount: 80,
  particleColor: 'rgba(99, 102, 241, 0.6)',
  lineColor: 'rgba(99, 102, 241, 0.15)',
  particleRadius: 2,
  lineWidth: 1,
  connectionDistance: 150,
  mouseRadius: 200,
  speed: 0.5,
}

class Particle {
  constructor(canvas) {
    this.canvas = canvas
    this.x = Math.random() * canvas.width
    this.y = Math.random() * canvas.height
    this.vx = (Math.random() - 0.5) * config.speed
    this.vy = (Math.random() - 0.5) * config.speed
    this.radius = Math.random() * config.particleRadius + 1
  }

  update() {
    this.x += this.vx
    this.y += this.vy

    if (this.x < 0 || this.x > this.canvas.width) this.vx *= -1
    if (this.y < 0 || this.y > this.canvas.height) this.vy *= -1

    if (mouse.x !== null && mouse.y !== null) {
      const dx = mouse.x - this.x
      const dy = mouse.y - this.y
      const distance = Math.sqrt(dx * dx + dy * dy)
      if (distance < config.mouseRadius) {
        const force = (config.mouseRadius - distance) / config.mouseRadius
        this.x -= dx * force * 0.02
        this.y -= dy * force * 0.02
      }
    }
  }

  draw(ctx) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    ctx.fillStyle = config.particleColor
    ctx.fill()
  }
}

function initParticles(canvasEl) {
  particles = []
  for (let i = 0; i < config.particleCount; i++) {
    particles.push(new Particle(canvasEl))
  }
}

function drawConnections(ctx) {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x
      const dy = particles[i].y - particles[j].y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < config.connectionDistance) {
        const opacity = 1 - distance / config.connectionDistance
        ctx.beginPath()
        ctx.moveTo(particles[i].x, particles[i].y)
        ctx.lineTo(particles[j].x, particles[j].y)
        ctx.strokeStyle = `rgba(99, 102, 241, ${opacity * 0.15})`
        ctx.lineWidth = config.lineWidth
        ctx.stroke()
      }
    }
  }
}

function animate(ctx, canvasEl) {
  ctx.clearRect(0, 0, canvasEl.width, canvasEl.height)

  particles.forEach(particle => {
    particle.update()
    particle.draw(ctx)
  })

  drawConnections(ctx)
  animationId = requestAnimationFrame(() => animate(ctx, canvasEl))
}

function handleResize() {
  const canvasEl = canvas.value
  if (!canvasEl) return
  canvasEl.width = window.innerWidth
  canvasEl.height = window.innerHeight
  initParticles(canvasEl)
}

function handleMouseMove(e) {
  mouse.x = e.clientX
  mouse.y = e.clientY
}

function handleMouseLeave() {
  mouse.x = null
  mouse.y = null
}

onMounted(() => {
  const canvasEl = canvas.value
  const ctx = canvasEl.getContext('2d')
  
  canvasEl.width = window.innerWidth
  canvasEl.height = window.innerHeight
  
  initParticles(canvasEl)
  animate(ctx, canvasEl)
  
  window.addEventListener('resize', handleResize)
  window.addEventListener('mousemove', handleMouseMove)
  window.addEventListener('mouseleave', handleMouseLeave)
})

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('mousemove', handleMouseMove)
  window.removeEventListener('mouseleave', handleMouseLeave)
})
</script>

<template>
  <canvas ref="canvas" class="particle-canvas"></canvas>
</template>

<style scoped>
.particle-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
}
</style>
