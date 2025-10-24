<script setup>
import { ref, onMounted } from 'vue'

const links = [
  { name: 'Карта', link: '#objects' },
  { name: 'Галерея', link: '#history' },
  { name: 'О нас', link: '#about' },
  { name: 'Контакты', link: '#contacts' },
]

const { $gsap } = useNuxtApp()
const active = ref(null)

function scrollTo(link) {
  const target = document.querySelector(link)
  if (target) {
    active.value = link 
    $gsap.to(window, {
      duration: 1,
      scrollTo: { y: target, offsetY: 0 }
    })
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
          onLeave: () => null,
          onLeaveBack: () => null
        }
      })
    }
  })
  window.addEventListener('scroll', () => {
    if (window.scrollY < 50) {
      active.value = null
    }
  })
})
</script>

<template>
  <nav class="menu">
    <button v-for="(link, idx) in links" :key="idx" class="menu__link" :class="{ active: active === link.link }"
      @click="scrollTo(link.link)">
      {{ link.name }}
    </button>
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
    &.active 
      box-shadow: 0px 2px 14px 0px rgba(15, 20, 44, 0.12)
      background: #fff
</style>