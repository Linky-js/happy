<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { defineProps, defineEmits } from "vue";
import NewsPost from "../NewsPost.vue";
const emit = defineEmits(["close", "play"]);
const props = defineProps({
  openObject: Object
})
const isMobile = ref(false);
function checkMobile() {
  if (process.client) {
    isMobile.value = window.innerWidth < 767
  }
}
function handleOverlayClick(e) {
  if (e.target.classList.contains('modal-overlay')) {
    emit('close');
  }
}
function formatPost(post) {
  const slug = post.slug || ''
  const tagTerm = post._embedded?.['wp:term']
    ?.flat()
    ?.find(t => t.taxonomy === 'post_tag');


  const categoryTerm = post._embedded?.['wp:term']
    ?.flat()
    ?.find(t => t.taxonomy === 'category');
  return {
    link: `/news/${slug}`,
    img: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/img/placeholder.jpg',
    tag: tagTerm?.name || categoryTerm?.name || '',
    time: post.acf?.time || '',
    title: post.title?.rendered || '',
    text: post.excerpt?.rendered?.replace(/<[^>]*>/g, '').slice(0, 110) + '...',
    author: post.acf?.author || '',
    date: new Date(post.date).toLocaleDateString('ru-RU', { day: '2-digit', month: 'long', year: 'numeric' })
  }
}
onMounted(() => {
  checkMobile();
  window.addEventListener('resize', checkMobile);
})
onBeforeUnmount(() => {
  if (process.client) {
    window.removeEventListener('resize', checkMobile)
  }
})
</script>
<template>
  <div class="modal-overlay" @click="handleOverlayClick">
    <div class="mobile" v-if="isMobile">
      <div class="mobile__title">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M8 0.332031C9.5913 0.332031 11.1174 0.964172 12.2426 2.08939C13.3679 3.21461 14 4.74073 14 6.33203C14 8.38136 12.8827 10.0587 11.7053 11.262C11.1171 11.8567 10.4753 12.3959 9.788 12.8727L9.504 13.066L9.37067 13.1547L9.11933 13.3147L8.89533 13.4514L8.618 13.6127C8.42976 13.7201 8.21675 13.7767 8 13.7767C7.78325 13.7767 7.57024 13.7201 7.382 13.6127L7.10467 13.4514L6.758 13.238L6.63 13.1547L6.35667 12.9727C5.61522 12.471 4.9246 11.8981 4.29467 11.262C3.11733 10.058 2 8.38136 2 6.33203C2 4.74073 2.63214 3.21461 3.75736 2.08939C4.88258 0.964172 6.4087 0.332031 8 0.332031ZM8 4.33203C7.73736 4.33203 7.47728 4.38376 7.23463 4.48427C6.99198 4.58478 6.7715 4.7321 6.58579 4.91782C6.40007 5.10353 6.25275 5.32401 6.15224 5.56666C6.05173 5.80932 6 6.06939 6 6.33203C6 6.59467 6.05173 6.85475 6.15224 7.0974C6.25275 7.34005 6.40007 7.56053 6.58579 7.74624C6.7715 7.93196 6.99198 8.07928 7.23463 8.17979C7.47728 8.2803 7.73736 8.33203 8 8.33203C8.53043 8.33203 9.03914 8.12132 9.41421 7.74624C9.78929 7.37117 10 6.86246 10 6.33203C10 5.8016 9.78929 5.29289 9.41421 4.91782C9.03914 4.54274 8.53043 4.33203 8 4.33203Z"
            fill="#164CBF" />
        </svg>
        {{ props.openObject.region?.title?.rendered }}
      </div>
      <div class="mobile__close" @click="emit('close')">
        <div class="close">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M4.26634 12.6663L3.33301 11.733L7.06634 7.99967L3.33301 4.26634L4.26634 3.33301L7.99967 7.06634L11.733 3.33301L12.6663 4.26634L8.93301 7.99967L12.6663 11.733L11.733 12.6663L7.99967 8.93301L4.26634 12.6663Z"
              fill="#696969" />
          </svg>
        </div>
      </div>
    </div>
    <div class="modal">
      <div class="modal__head">
        <div class="title">
          Счастье в <span>{{ props.openObject.region?.acf?.predlog || props.openObject.region?.title?.rendered }}</span>
        </div>
        <div class="close" @click="emit('close')" v-if="!isMobile">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M4.26634 12.6663L3.33301 11.733L7.06634 7.99967L3.33301 4.26634L4.26634 3.33301L7.99967 7.06634L11.733 3.33301L12.6663 4.26634L8.93301 7.99967L12.6663 11.733L11.733 12.6663L7.99967 8.93301L4.26634 12.6663Z"
              fill="#696969" />
          </svg>
        </div>
      </div>
      <div class="modal__content">
        <div class="modal__desk">Познакомьтесь с историями удивительных людей, которым удалось исполнить мечту, обрести
          семью, найти любовь
          или просто подарить окружающим улыбку.
        </div>
        <div class="modal__box">
          <div class="modal__box-head">
            <div class="mintitle">Видео</div>
            <div class="arrows" v-if="props.openObject.videos?.length > 1">
              <div class="arrow arrow-prev arrow-video-prev">
                <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M0.842941 7.71065L6.49994 13.3676L7.91394 11.9536L2.96394 7.00365L7.91394 2.05365L6.49994 0.639648L0.842941 6.29665C0.65547 6.48418 0.550154 6.73848 0.550154 7.00365C0.550154 7.26881 0.65547 7.52312 0.842941 7.71065Z"
                    fill="#3B3B3B" />
                </svg>
              </div>
              <div class="arrow arrow-next arrow-video-next">
                <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M7.15694 7.71065L1.49994 13.3676L0.0859375 11.9536L5.03594 7.00365L0.0859375 2.05365L1.49994 0.639648L7.15694 6.29665C7.34441 6.48418 7.44972 6.73848 7.44972 7.00365C7.44972 7.26881 7.34441 7.52312 7.15694 7.71065Z"
                    fill="#3B3B3B" />
                </svg>
              </div>
            </div>
          </div>
          <swiper class="modal__swiper" :slides-per-view="'auto'" :space-between="20" :modules="[Navigation]"
            :navigation="{
              prevEl: '.arrow-video-prev',
              nextEl: '.arrow-video-next'
            }">
            <swiper-slide v-for="(video, i) in props.openObject.videos" :key="video.id" class="modal__item">
              <img :src="video._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/img/placeholder.jpg'"
                :alt="video.title.rendered" />
              <div class="modal__item-play" @click="emit('play', video)">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M17.8405 7.79377C18.2408 8.00661 18.5755 8.32435 18.809 8.71293C19.0425 9.1015 19.1658 9.54628 19.1658 9.9996C19.1658 10.4529 19.0425 10.8977 18.809 11.2863C18.5755 11.6749 18.2408 11.9926 17.8405 12.2054L7.16384 18.0113C5.44467 18.9471 3.33301 17.7304 3.33301 15.8063V4.19377C3.33301 2.26877 5.44467 1.05294 7.16384 1.98711L17.8405 7.79377Z"
                    fill="white" />
                </svg>
              </div>
              <div class="modal__item-title">{{ video.title.rendered }}</div>
            </swiper-slide>
          </swiper>
        </div>
        <div class="modal__box" v-if="props.openObject.posts?.length > 0">
          <div class="modal__box-head">
            <div class="mintitle">Статьи</div>
            <div class="arrows" v-if="props.openObject.posts?.length > 1">
              <div class="arrow arrow-prev arrow-news-prev">
                <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M0.842941 7.71065L6.49994 13.3676L7.91394 11.9536L2.96394 7.00365L7.91394 2.05365L6.49994 0.639648L0.842941 6.29665C0.65547 6.48418 0.550154 6.73848 0.550154 7.00365C0.550154 7.26881 0.65547 7.52312 0.842941 7.71065Z"
                    fill="#3B3B3B" />
                </svg>
              </div>
              <div class="arrow arrow-next arrow-news-next">
                <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M7.15694 7.71065L1.49994 13.3676L0.0859375 11.9536L5.03594 7.00365L0.0859375 2.05365L1.49994 0.639648L7.15694 6.29665C7.34441 6.48418 7.44972 6.73848 7.44972 7.00365C7.44972 7.26881 7.34441 7.52312 7.15694 7.71065Z"
                    fill="#3B3B3B" />
                </svg>
              </div>
            </div>
          </div>
          <swiper class="modal__swiper" :slides-per-view="'auto'" :space-between="20" :modules="[Navigation]"
            :navigation="{ prevEl: '.arrow-news-prev', nextEl: '.arrow-news-next' }">
            <swiper-slide v-for="(post, i) in props.openObject.posts" :key="post.id" class="modal__news">
              <NewsPost :post="formatPost(post)" />
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </div>
  </div>

</template>
<style lang="sass" scoped>
.modal-overlay
  position: absolute
  bottom: 0
  right: 0
  inset: 0
  height: 100%
  width: 100%
  display: flex
  align-items: flex-end
  justify-content: flex-end
  z-index: 3
  padding-top: 24px
  padding-right: 20px
  padding-bottom: 24px
.arrows 
  display: flex
  align-items: center
  gap: 24px
.arrow 
  width: 48px
  height: 48px
  border-radius: 50%
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
.close
  display: flex
  width: 32px
  height: 32px
  padding: 8px
  justify-content: center
  align-items: center
  flex-shrink: 0
  border-radius: 100px
  border: 1px solid #DBDBDB
  background: #EBECF0
  cursor: pointer

.modal
  height: 100%
  max-width: 658px
  width: 100%
  background: #fff
  border-radius: 12px
  overflow: hidden
  position: relative
  &__head 
    display: flex
    align-items: center
    justify-content: space-between
    gap: 15px
    border-bottom: 1px solid #F5F5F5
    padding-right: 16px
    padding-left: 36px
    padding-top: 20px
    padding-bottom: 20px
    .title 
      font-size: 24px
      line-height: 140%
      font-weight: 600
      color: #2E363B
      span 
        background: #2E6CF0
        padding: 6px 12px
        color: #ffff
        font-size: 18px
        line-height: 1
        font-weight: 600
        border-radius: 100px
  &__content 
    padding-left: 36px
    padding-right: 16px
    padding-top: 24px
    padding-bottom: 12px
    overflow-y: auto
    overflow-x: hidden
    height: calc(100% - 80px)
    &::-webkit-scrollbar
      width: 4px
      background-color: #fff
    &::-webkit-scrollbar-thumb
      background-color: #E6E6E6
  &__swiper 
    overflow: visible
    margin-left: 0
  &__desk 
    font-size: 16px
    line-height: 140%
    color: #474A4B
    margin-bottom: 48px
  &__box 
    display: flex
    position: relative
    flex-direction: column
    gap: 24px
    max-height: 100%
    margin-bottom: 64px
    &:last-child
      margin-bottom: 0
    &-head 
      display: flex
      align-items: center
      justify-content: space-between
      gap: 15px
    .mintitle 
      font-size: 22px
      line-height: 1
      font-weight: 600
      color: #2E363B
  &__news 
    max-width: 501px
    height: auto
  &__item 
    max-width: 501px
    height: 300px
    position: relative
    border-radius: 12px
    overflow: hidden
    display: flex
    img 
      width: 100%
      height: 100%
      object-fit: cover
      position: absolute
      top: 0
      left: 0
    &-title 
      padding: 16px 20px
      background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 100%)
      backdrop-filter: blur(12px)
      border-radius: 0 0 12px 12px
      margin-top: auto
      min-height: 74px
      color: #fff
      font-size: 18px
      font-weight: 600
      line-height: 1
      width: 100%
    &-play 
      display: flex
      align-items: center
      justify-content: center
      position: absolute
      top: 50%
      left: 50%
      transform: translate(-50%, -50%)
      z-index: 2
      cursor: pointer
      width: 48px
      height: 48px
      backdrop-filter: blur(4px)
      background: rgba(0, 0, 0, 0.1)
      border: 1px solid #fff
      border-radius: 50%
@media (max-width: 767px)
  .modal-overlay
    flex-direction: column
    align-items: center
    justify-content: center
    padding: 8px 6px 6px
  .mobile
    display: flex
    align-items: center
    gap: 5px
    margin-bottom: 8px
    &__title
      padding: 14px 14px 12px
      display: flex
      align-items: center
      gap: 5px
      font-size: 14px
      line-height: 1
      font-weight: 500
      color: #164CBF
      background: rgba(255, 255, 255, 0.9)
      border: 1px solid rgba(255, 255, 255, 1)
      backdrop-filter: blur(20px)
      border-radius: 12px
    &__close 
      width: 44px
      height: 44px
      display: flex
      align-items: center
      justify-content: center
      background: rgba(255, 255, 255, 0.9)
      border: 1px solid rgba(255, 255, 255, 1)
      backdrop-filter: blur(20px)
      border-radius: 12px
  .close 
    width: 30px
    height: 30px
    svg 
      width: 16px
      height: 16px
  .modal__head 
    padding: 16px
    .title 
      font-size: 18px
      span 
        font-size: 14px
        padding: 6px 12px
  .modal__content 
    padding: 10px 16px
    height: calc(100% - 59px)
  .modal__desk
    font-size: 14px
    margin-bottom: 36px
  .arrow 
    display: none
  .modal__box 
    margin-bottom: 36px
    gap: 12px
    .mintitle 
      font-size: 18px
  .modal__item 
    max-width: 300px
    height: 197px
    &-title 
      padding: 16px
      font-size: 14px
      min-height: 66px
  .modal__news 
    max-width: 300px
</style>