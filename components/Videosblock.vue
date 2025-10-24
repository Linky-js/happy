<script setup>
import ModalVideo from './ModalVideo.vue';
import { Swiper, SwiperSlide } from 'swiper/vue';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';

import { EffectCoverflow, Navigation } from 'swiper/modules';


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
const vidos = [
  {
    text: 'Вместе с семьей',
    img: './img/poster-1.jpg',
    iframe: 'https://vkvideo.ru/video_ext.php?oid=-227034863&id=456252662&hd=2&',
    time: '03:54'
  },
  {
    text: 'Что мы узнали о счастье, путешествуя по России',
    img: './img/poster-2.jpg',
    iframe: 'https://rutube.ru/play/embed/21b0a06ad93f3b8407df0323eaa7185d/',
    time: '06:21',
  },
  {
    text: 'Вместе с семьей',
    img: './img/poster-3.jpg',
    iframe: 'https://rutube.ru/play/embed/21b0a06ad93f3b8407df0323eaa7185d/',
    time: '06:21',
  },
]

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
      <h2>Видео от редакции</h2>
      <p>Каждое видео — это искренние эмоции, неожиданные повороты и настоящая жизнь</p>
    </div>
    <div class="vidos__box">
      <div class="arrows">
        <div class="arrow arrow-prev">
          <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M0.842941 7.71065L6.49994 13.3676L7.91394 11.9536L2.96394 7.00365L7.91394 2.05365L6.49994 0.639648L0.842941 6.29665C0.65547 6.48418 0.550154 6.73848 0.550154 7.00365C0.550154 7.26881 0.65547 7.52312 0.842941 7.71065Z"
              fill="#3B3B3B" />
          </svg>
        </div>
        <div class="arrow arrow-next">
          <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M7.15694 7.71065L1.49994 13.3676L0.0859375 11.9536L5.03594 7.00365L0.0859375 2.05365L1.49994 0.639648L7.15694 6.29665C7.34441 6.48418 7.44972 6.73848 7.44972 7.00365C7.44972 7.26881 7.34441 7.52312 7.15694 7.71065Z"
              fill="#3B3B3B" />
          </svg>
        </div>
      </div>
      <swiper v-bind="swiperOptions"  class="vidos__swiper">
        <swiper-slide class="vidos__slider" v-for="video in vidos" :key="video.id">
          <div class="vidos__slider-img">
            <img :src="video.img" alt="">
          </div>
          <div class="vidos__slider-play" @click="openModal(video.iframe)">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M17.8395 7.79377C18.2398 8.00661 18.5746 8.32435 18.808 8.71293C19.0415 9.1015 19.1648 9.54628 19.1648 9.9996C19.1648 10.4529 19.0415 10.8977 18.808 11.2863C18.5746 11.6749 18.2398 11.9926 17.8395 12.2054L7.16286 18.0113C5.4437 18.9471 3.33203 17.7304 3.33203 15.8063V4.19377C3.33203 2.26877 5.4437 1.05294 7.16286 1.98711L17.8395 7.79377Z"
                fill="white" />
            </svg>
          </div>
          <div class="vidos__slider-text">
            <p>{{ video.text }}</p>
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
      font-size: 18px
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
    backdrop-filter: blur(6px)
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
        font-size: 14px
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