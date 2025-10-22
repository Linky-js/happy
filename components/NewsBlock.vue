<script setup>
import NewsPost from './NewsPost.vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

const modules = [Navigation];
const props = defineProps({
  title: { type: String, required: true },
  text: { type: String, required: false },
})
const posts = [
  {
    img: '/img/news-1.jpg',
    title: 'Что мы узнали о счастье, путешествуя по России',
    text: 'Команда проекта делится впечатлениями о людях, которые умеют быть счастливыми — несмотря ни на что.',
    tag: 'Философия',
    time: '~12 мин.',
    author: 'Редакция проекта',
    date: '15 июля 2025',
    link: '/news/slug',
  },
  {
    img: '/img/news-2.jpg',
    title: 'Счастье — это не география. Это отношения',
    text: 'Психолог Наталья Воронина рассуждает о том, как поддержка и любовь близких делают нас счастливыми, где бы мы ни были.',
    tag: 'Психология',
    time: '~5 мин.',
    author: 'Наталья Воронина',
    date: '3 июля 2025',
    link: '/news/slug',
  },
  {
    img: '/img/news-3.jpg',
    title: 'Когда мечта сбывается: 5 вдохновляющих историй',
    text: 'Короткие, но поразительные истории людей, чьи мечты стали реальностью благодаря настойчивости, вере и помощи окружающих.',
    tag: 'Вдохновение',
    time: '~8 мин.',
    author: 'Анастасия Громова',
    date: '1 июля 2025',
    link: '/news/slug',
  },
]
</script>
<template>
  <section class="news" id="news">
    <div class="container">
      <div class="news__head">
        <h2>{{ props.title }}</h2>
        <p v-if="props.text">{{ props.text }}</p>
      </div>
      <swiper :slides-per-view="'auto'" :space-between="20" :modules="modules" :navigation="{
        prevEl: '.arrow-prev',
        nextEl: '.arrow-next',
        
      }" :breakpoints="{
        767: {
          spaceBetween: 20,
        }, 
        320: {
          spaceBetween: 16,
        }
      }" class="news__slider">
        <swiper-slide v-for="post in posts" :key="post.id">
          <NewsPost :post="post" />
        </swiper-slide>
      </swiper>
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
      <div class="news__bot">
        <NuxtLink to="/news" class="btn">Читать все статьи</NuxtLink>
      </div>
    </div>
  </section>
</template>
<style lang="sass" scoped>
.news-another 
  margin-bottom: 120px
.btn 
  max-width: 207px
  width: 100%
  height: 56px
  display: flex
  align-items: center
  justify-content: center
  border: 1px solid #2E6CF0
  font-size: 14px
  line-height: 135%
  font-weight: 500
  color: #2E6CF0
  border-radius: 100px
  transition: .3s all
  &:hover
    border-color: #A5A9B0
.arrows 
  display: flex
  align-items: center
  gap: 31px
  position: absolute
  bottom: 10px
  right: 20px
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

.news
  padding-top: 120px
  overflow-x: hidden
  .container 
    position: relative
  &__head 
    display: flex
    flex-direction: column
    gap: 27px
    margin-bottom: 48px
    p 
      max-width: 875px
      width: 100%
  &__bot 
    margin-top: 32px
.news__slider 
  position: relative
  overflow: visible
.swiper-slide
  max-width: 540px
  width: 100%
@media (max-width: 767px)
  .arrows 
    display: none
  .news
    padding-top: 80px
    &-anoter 
      margin-bottom: 90px
    &__head 
      gap: 16px
      margin-bottom: 36px
    &__bot 
      margin-top: 36px
      display: flex
      align-items: center
      justify-content: center
      .btn
        max-width: 288px
        width: 100%
  .swiper-slide 
    max-width: 319px
</style>