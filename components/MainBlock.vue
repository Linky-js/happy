<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import MenuBlock from './MenuBlock.vue';
const { $gsap } = useNuxtApp()

const img1 = ref('./img/main-1.jpg');
const img2 = ref('./img/main-2.png');
const img3 = ref('./img/main-3.png');

const isMobile = ref(false);
function checkMobile() {
  if (process.client) {
    isMobile.value = window.innerWidth < 767
  }
}
function scrollToMap() {
  $gsap.to(window, {
    duration: 1.2,
    scrollTo: "#objects",
    ease: "power2.inOut",
  });
}
function scrollToContacts() {
  $gsap.to(window, {
    duration: 1.2,
    scrollTo: "#contacts",
    ease: "power2.inOut",
  });
}
onMounted(() => {
  checkMobile()
  isMobile.value = window.innerWidth < 767;

  if (!isMobile.value) {
    $gsap.from('.menu', {
      opacity: 0,
      y: -50, // сверху вниз
      duration: 1,
      delay: 1,
      ease: "power3.out"
    })
  }
  $gsap.from('.img2', {
    opacity: 0,
    y: 50,
    scale: 1.1,
    duration: 1.2,
    ease: "power3.out"
  })

  $gsap.from('.img3', {
    opacity: 0,
    y: 50,
    scale: 1.1,
    duration: 1.2,
    ease: "power3.out",
    delay: 0.4
  })

  $gsap.from('.main__text > *', {
    opacity: 0,
    y: 30,
    duration: 1,
    delay: 1,
    stagger: 0.2,
    ease: 'power2.out'
  })
});
onBeforeUnmount(() => {
  if (process.client) {
    window.removeEventListener('resize', checkMobile)
  }
})
</script>
<template>
  <section class="main">
    <MenuBlock v-if="!isMobile" />
    <div class="main__imgs">
      <img class="img1" :src="img1" alt="" />
      <img class="img2" :src="img2" alt="" />
      <img class="img3" :src="img3" alt="" />
    </div>
    <div class="main__text">
      <div class="main__top">
        <h1>Счастливые люди России </h1>
        <p>Настоящие истории радости и исполнения мечт со всей страны</p>
      </div>
      <div class="main__bot">
        <p>Мы отправились в путешествие по всей России, чтобы запечатлеть моменты искреннего счастья — от романтических
          предложений до невероятных чудес, ставших реальностью. </p>
        <div class="main__btns">
          <button type="button" @click="scrollToMap"  class="btn-main">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M2 8.19702C2 6.49502 2 5.64302 2.436 5.14702C2.59025 4.97216 2.77883 4.8309 2.99 4.73202C3.58 4.45902 4.357 4.72802 5.91 5.26702C6.551 5.48902 7.019 5.65102 7.408 5.75002C7.52633 5.77758 7.6322 5.84355 7.70908 5.93762C7.78597 6.03169 7.82954 6.14858 7.833 6.27002V21.42C7.833 21.726 7.562 21.958 7.266 21.879C6.81489 21.7595 6.27849 21.5736 5.58176 21.3321L5.573 21.329L4.279 20.88C3.179 20.499 2.629 20.308 2.315 19.854C2 19.4 2 18.797 2 17.591V8.19702ZM18.427 2.67202L19.72 3.12002L19.721 3.12102C20.821 3.50202 21.371 3.69302 21.685 4.14702C22 4.60002 22 5.20402 22 6.41002V15.804C22 17.506 22 18.358 21.564 18.854C21.4097 19.0289 21.2212 19.1701 21.01 19.269C20.42 19.542 19.643 19.273 18.09 18.734C17.449 18.511 16.981 18.35 16.592 18.251C16.4737 18.2235 16.3678 18.1575 16.2909 18.0634C16.214 17.9693 16.1705 17.8525 16.167 17.731V2.58102C16.167 2.27502 16.438 2.04302 16.734 2.12202C17.1851 2.24152 17.7215 2.42745 18.4182 2.66896L18.427 2.67202Z"
                fill="white" />
              <path
                d="M12.62 3.48102L11.084 4.54602C10.529 4.93102 10.121 5.21402 9.774 5.41502C9.69257 5.46108 9.6245 5.52752 9.57646 5.6078C9.52843 5.68809 9.50208 5.77948 9.5 5.87302V20.92C9.5 21.29 9.884 21.522 10.196 21.322C10.5294 21.1091 10.9112 20.8446 11.3732 20.5248L11.38 20.52L12.916 19.455C13.471 19.07 13.879 18.787 14.226 18.586C14.3074 18.54 14.3755 18.4735 14.4235 18.3932C14.4716 18.313 14.4979 18.2216 14.5 18.128V3.08002C14.5 2.70902 14.116 2.47802 13.804 2.67702C13.469 2.89202 13.085 3.15802 12.62 3.48102Z"
                fill="#ADC7FF" />
            </svg>
            <span>Перейти к карте</span>
          </button>
          <button type="button" @click="scrollToContacts" class="btn-bd">
            Поделись своей историей
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
<style lang="sass" scoped>
.main 
  position: relative
  height: 1080px
  overflow: hidden
  padding: 0 20px
  padding-top: 171px
  padding-bottom: 106px
.main__text
  display: flex
  gap: 445px
  flex-direction: column
  align-items: center
  justify-content: center
  text-align: center
  position: relative
  z-index: 2
  color: #fff
.main__top 
  display: flex
  flex-direction: column
  gap: 29px
  p
    font-size: 18px
    color: #fff
.main__bot 
  display: flex
  flex-direction: column
  gap: 40px
  p 
    font-size: 16px
    line-height: 135%
    border-width: 0px 5px 0px 6px
    border-radius: 16px
    color: #fff
    border-style: solid
    border-color: #FFFFFF
    font-weight: 500
    padding: 30px 10px
    max-width: 763px
.main__imgs 
  position: absolute
  top: 0
  left: 0
  width: 100%
  height: 100%
  img 
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    object-fit: cover
.img2 
  z-index: 2
.main__btns 
  display: flex
  align-items: center
  gap: 10px
  justify-content: center
.btn-main 
  font-size: 15px
  font-weight: 600
  line-height: 135%
  color: #fff
  background: linear-gradient(0deg, #4D86FF 0%, #2E6CF0 100%)
  display: flex
  align-items: center
  gap: 10px
  justify-content: center
  padding: 16px
  max-width: 244px
  width: 100%
  border-radius: 100px
  transition: .3s all
  border: 1px solid transparent
  &:hover
    gap: 20px
    border-color: #fff
.btn-bd 
  font-size: 15px
  line-height: 135%
  color: #fff
  max-width: 244px
  width: 100%
  padding: 18px
  border-radius: 100px
  border: 1px solid #fff
  transition: .3s all
  text-align: center
  backdrop-filter: blur(12px)
  background: rgba(0, 0, 0, 0.1)
  &:hover 
    border-color: #2E6CF0
@media (max-width: 767px)
  .main 
    padding-top: 80px
    padding-bottom: 48px
    padding-left: 8px
    padding-right: 8px
    height: 100%
    &__text 
      gap: 263px
    &__top 
      gap: 20px
      p 
        font-size: 14px
    &__bot 
      gap: 28px
      p 
        padding: 15px 10px
        font-size: 13px
    &__btns 
      flex-direction: column
      align-items: center
      justify-content: center
      gap: 16px
      max-width: 288px
      width: 100%
      margin: 0 auto
  .btn-main 
    font-size: 14px
    height: 56px
    max-width: 100%
  .btn-bd 
    font-size: 14px
    height: 56px
    max-width: 100%
</style>