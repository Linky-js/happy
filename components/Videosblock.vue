<script setup>
import ModalVideo from './ModalVideo.vue';
import { Swiper, SwiperSlide } from 'swiper/vue';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';

import { EffectCoverflow, Navigation } from 'swiper/modules';

const props = defineProps({
  page: {
    type: Object,
    required: true
  }
})


const swiperOptions = {
  effect: 'coverflow',
  grabCursor: false,
  centeredSlides: true,
  spaceBetween: 270,
  allowTouchMove: false,
  slidesPerView: 'auto',
  initialSlide: 1,
  modules: [EffectCoverflow, Navigation],
  coverflowEffect: {
    rotate: 30,
    stretch: 0,
    depth: 100,
    modifier: 1,
    scale: 1,
    slideShadows: false,
    grabCursor: false
  },
  navigation: {
    prevEl: '.arrow-prev',
    nextEl: '.arrow-next'
  },
  breakpoints: {
    1200: {
      effect: 'coverflow',
      spaceBetween: 270,
    },
    768: {
      effect: 'coverflow',
      spaceBetween: 200,
    },
    320: {
      slidesPerView: 'auto',
      spaceBetween: 8,
      allowTouchMove: true,
    },
  }
}
const vidos = computed(() => props.page.acf?.videos || [])

const showModal = ref(false);
const currentVideo = ref(null)

function openModal(link) {
  currentVideo.value = link
  showModal.value = true
}
</script>
<template>
  <section class="vidos" id="vidos">
    <div class="vidos__head">
      <h2>{{ props.page.acf?.['h-2'] }}</h2>
      <p>{{ props.page.acf?.['desk-2'] }}</p>
    </div>
    <div class="vidos__box">
      <div class="arrows">
        <div class="arrow arrow-prev">
          <svg width="12" height="24" viewBox="0 0 12 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M1.84306 12.7106L7.50006 18.3676L8.91406 16.9536L3.96406 12.0036L8.91406 7.05365L7.50006 5.63965L1.84306 11.2966C1.65559 11.4842 1.55028 11.7385 1.55028 12.0036C1.55028 12.2688 1.65559 12.5231 1.84306 12.7106Z"
              fill="#3B3B3B" />
          </svg>
        </div>
        <div class="arrow arrow-next">
          <svg width="12" height="24" viewBox="0 0 12 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M10.1569 12.7106L4.49994 18.3676L3.08594 16.9536L8.03594 12.0036L3.08594 7.05365L4.49994 5.63965L10.1569 11.2966C10.3444 11.4842 10.4497 11.7385 10.4497 12.0036C10.4497 12.2688 10.3444 12.5231 10.1569 12.7106Z"
              fill="#3B3B3B" />
          </svg>
        </div>
      </div>
      <swiper v-bind="swiperOptions" class="vidos__swiper">
        <swiper-slide class="vidos__slider" v-for="video in vidos" :key="video.id">
          <div class="vidos__slider-img">
            <img :src="video.poster" alt="">
          </div>
          <div class="vidos__slider-play" @click="openModal(video.ssylka_na_video)">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M17.8395 7.79377C18.2398 8.00661 18.5746 8.32435 18.808 8.71293C19.0415 9.1015 19.1648 9.54628 19.1648 9.9996C19.1648 10.4529 19.0415 10.8977 18.808 11.2863C18.5746 11.6749 18.2398 11.9926 17.8395 12.2054L7.16286 18.0113C5.4437 18.9471 3.33203 17.7304 3.33203 15.8063V4.19377C3.33203 2.26877 5.4437 1.05294 7.16286 1.98711L17.8395 7.79377Z"
                fill="white" />
            </svg>
          </div>
          <div class="vidos__slider-text">
            <p>{{ video.title }}</p>
            <div class="time">{{ video.time }}</div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
    <ModalVideo v-if="showModal" :linkVideo="currentVideo" @close="showModal = false" />
  </section>
</template>
<style lang="sass" scoped>
.vidos
  padding-top: 120px
  &__head 
    display: flex
    flex-direction: column
    text-align: center
    gap: 30px
    p 
      font-size: 20px
      line-height: 135%
  &__box 
    position: relative
.vidos__swiper
  width: 100%
  padding-top: 50px
  padding-bottom: 50px
  position: relative
  pointer-events: none
  .swiper-wrapper 
    cursor: auto !important
.arrow 
  width: 48px
  height: 48px
  border-radius: 50%
  background: #F0F2F5
  border: 1px solid #B5B5B5
  display: flex
  align-items: center
  justify-content: center
  cursor: pointer
  z-index: 2
  transition: .3s all
  top: 50%
  position: absolute
  transform: translateY(-50%)
  &.swiper-button-disabled
    border-color: #CECECE
    cursor: auto
    path 
      fill: #AFAFAF
    &:hover 
      border-color: #CECECE
      path 
        fill: #AFAFAF
  path 
    transition: .3s all
  &:hover 
    border-color: #2E6CF0
    path 
      fill: #2E6CF0
.arrow-prev 
  left: 23%

.arrow-next 
  right: 23%
.vidos__slider
  background-position: center
  background-size: cover
  width: 916px
  height: 430px
  border-radius: 20px
  position: relative
  overflow: hidden
  display: flex
  &.swiper-slide-prev
    transform: translate3d(0px, 0px, -110px) rotateX(0deg) rotateY(33deg) scale(1.35) !important
  &.swiper-slide-next
    transform: translate3d(0px, 0px, -110px) rotateX(0deg) rotateY(-33deg) scale(1.35) !important
  &-text
    display: flex
    align-items: flex-end
    justify-content: space-between
    position: relative
    width: 100%
    z-index: 2
    padding: 32px 28px
    margin-top: auto
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 100%)
    backdrop-filter: blur(1px)
    min-height: 140px
    
    p 
      color: #fff
      font-size: 18px
      line-height: 135%
      font-weight: 600
    .time 
      font-size: 12px
      font-weight: 600
      line-height: 1
      padding: 6px 8px
      background: rgba(0,0,0,.2)
      border-radius: 8px
      color: #fff
      
  
  &-play 
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
    width: 48px
    height: 48px
    backdrop-filter: blur(4px)
    border-radius: 50%
    background: rgba(0, 0, 0, 0.1)
    display: flex
    align-items: center
    justify-content: center
    z-index: 10
    cursor: pointer
    pointer-events: all
  &-img
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    
    img 
      width: 100%
      height: 100%
      object-fit: cover
@media (max-width: 1600px)
  .arrow-prev 
    left: 16%
  .arrow-next 
    right: 16%
@media (max-width: 1400px)
  .arrow-prev 
    left: 10%
  .arrow-next 
    right: 10%
@media (max-width: 1200px)
  .vidos__slider 
    width: 700px
    height: 400px
@media (max-width: 767px)
  .vidos
    padding-top: 80px
    &__head 
      gap: 16px
      margin-bottom: 36px
      padding-left: 20px
      padding-right: 20px
      p 
        font-size: 16px
    &__swiper 
      pointer-events: all
      padding: 0
  .arrows 
    display: none
  .vidos__slider 
    width: 317px
    height: 182px
    border-radius: 12px
    position: relative
    transform: none !important
    &-text 
      min-height: 66px
      padding: 16px
      align-items: flex-end
      p 
        font-size: 14px
      .time 
        position: absolute
        top: -100px
        left: 16px
    &.swiper-slide-prev
      transform: none !important
    &.swiper-slide-next
      transform: none !important
</style>