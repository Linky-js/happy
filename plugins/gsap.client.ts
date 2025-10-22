import { defineNuxtPlugin } from '#app'
import gsap from 'gsap'
import ScrollToPlugin from 'gsap/ScrollToPlugin'
import ScrollTrigger from 'gsap/ScrollTrigger'

export default defineNuxtPlugin(() => {
  gsap.registerPlugin(ScrollToPlugin, ScrollTrigger)
  return {
    provide: {
      gsap
    }
  }
})