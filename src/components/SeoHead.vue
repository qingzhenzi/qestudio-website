<script setup>
import { watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import siteConfig from '../config/site.config'

const route = useRoute()

function updateMetaTags(meta = {}) {
  const {
    title = siteConfig.seo.title,
    description = siteConfig.seo.description,
    keywords = siteConfig.seo.keywords,
    image = siteConfig.seo.ogImage,
    url = siteConfig.site.url + route.path,
  } = meta

  document.title = title

  updateMetaTag('description', description)
  updateMetaTag('keywords', keywords)
  
  updateMetaTag('og:title', title, 'property')
  updateMetaTag('og:description', description, 'property')
  updateMetaTag('og:image', image, 'property')
  updateMetaTag('og:url', url, 'property')
  updateMetaTag('og:type', 'website', 'property')
  updateMetaTag('og:site_name', siteConfig.site.name, 'property')
  
  updateMetaTag('twitter:card', siteConfig.seo.twitterCard, 'name')
  updateMetaTag('twitter:title', title, 'name')
  updateMetaTag('twitter:description', description, 'name')
  updateMetaTag('twitter:image', image, 'name')
  
  updateMetaTag('author', siteConfig.seo.author, 'name')
  updateMetaTag('robots', 'index, follow', 'name')
}

function updateMetaTag(name, content, attr = 'name') {
  let element = document.querySelector(`meta[${attr}="${name}"]`)
  
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attr, name)
    document.head.appendChild(element)
  }
  
  element.setAttribute('content', content)
}

function updateCanonicalUrl() {
  const url = siteConfig.site.url + route.path
  let link = document.querySelector('link[rel="canonical"]')
  
  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', 'canonical')
    document.head.appendChild(link)
  }
  
  link.setAttribute('href', url)
}

watch(
  () => route.meta,
  (meta) => {
    updateMetaTags({
      title: meta.title ? `${meta.title} | ${siteConfig.site.name}` : siteConfig.seo.title,
      description: meta.description || siteConfig.seo.description,
      keywords: meta.keywords || siteConfig.seo.keywords,
    })
    updateCanonicalUrl()
  },
  { immediate: true }
)

onMounted(() => {
  updateCanonicalUrl()
})
</script>

<template>
  <slot />
</template>
