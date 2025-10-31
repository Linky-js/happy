<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const { $gsap } = useNuxtApp()

const links = [
  { name: 'Карта', link: '#objects' },
]

const showLinks = [
  { name: 'Видео', link: '/videos' },
  { name: 'О нас', link: '/about' },
  { name: 'Контакты', link: '#contacts' },
]

const active = ref(null)

function scrollToSection(selector) {
  const target = document.querySelector(selector)
  if (target) {
    active.value = selector
    $gsap.to(window, {
      duration: 1,
      scrollTo: { y: target, offsetY: 0 },
      ease: 'power2.out'
    })
  }
}

async function handleClick(link) {
  if (route.path !== '/') {
    await router.push('/')
    await nextTick()
    setTimeout(() => scrollToSection(link), 2400)
  } else {
    scrollToSection(link)
  }
}

onMounted(() => {
  links.forEach(({ link }) => {
    const section = document.querySelector(link)
    if (section) {
      $gsap.to(section, {
        scrollTrigger: {
          trigger: section,
          start: "top center",
          end: "bottom center",
          onEnter: () => active.value = link,
          onEnterBack: () => active.value = link,
        }
      })
    }
  })

  window.addEventListener('scroll', () => {
    if (window.scrollY < 50) active.value = null
  })
})
</script>

<template>
  <nav class="menu">
    <!-- Кнопки для скролла -->
    <button
      v-for="(link, idx) in links"
      :key="'scroll-' + idx"
      class="menu__link"
      :class="{ active: active === link.link }"
      @click="handleClick(link.link)"
    >
      {{ link.name }}
    </button>

    <!-- Nuxt ссылки -->
    <NuxtLink
      v-for="(link, idx) in showLinks"
      :key="'nav-' + idx"
      class="menu__link"
      :to="link.link"
      :class="{ active: route.path === link.link }"
    >
      {{ link.name }}
    </NuxtLink>
  </nav>
</template>


<style lang="sass" scoped>
.menu 
  position: fixed
  left: 50%
  top: 20px
  transform: translateX(-50%)
  z-index: 10  
  background: rgba(255, 255, 255, 0.5)
  border: 1px solid rgba(255, 255, 255, 1)
  backdrop-filter: blur(40px)
  border-radius: 100px
  padding: 6px
  display: flex
  justify-content: center
  margin: 0 auto
  max-width: 452px
  width: 100%
  &__link 
    max-width: 110px
    width: 100%
    padding: 10px
    color: #3E4B52
    font-weight: 500
    line-height: 135%
    font-size: 15px
    background: none
    transition: .3s all
    border-radius: 100px
    text-align: center
    &.active 
      box-shadow: 0px 2px 14px 0px rgba(15, 20, 44, 0.12)
      background: #fff
</style>