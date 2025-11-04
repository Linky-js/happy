<script setup>
import { useRoute } from 'vue-router'
import { onMounted, ref, watch, computed } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper/modules'
import NewsBlock from '~/components/NewsBlock.vue'
import FooterBlock from '~/components/FooterBlock.vue'
import ContactsBlock from '~/components/ContactsBlock.vue'

import 'swiper/css'
import 'swiper/css/navigation'

const route = useRoute()

const { data: newPost, refresh } = await useAsyncData(
  () => `newPost-${route.params.slug}`,
  () => $fetch(
    `https://wp.xn--80aeina8anebeag6dzd.xn--p1ai/wp-json/wp/v2/posts?slug=${route.params.slug}&acf_format=standard&_embed=true`
  )
)

const post = computed(() => newPost.value?.[0])

const tags = computed(() =>
  post.value?._embedded?.['wp:term']
    ?.flat()
    ?.filter(t => t.taxonomy === 'post_tag') || []
)

watch(
  () => route.params.slug,
  async () => {
    await refresh() // 🔄 обновляем запрос при смене slug
  }
)

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

</script>


<template>
  <Head>
    <Title>{{ post.acf?.titlemeta }}</Title>
    <Meta name="description" :content="post.acf?.descriptionmeta" />
    <Meta name="keywords" :content="post.acf?.keywordsmeta" />
    <Meta property="og:title" :content="post.acf?.titlemeta" />
    <Meta property="og:description" :content="post.acf?.descriptionmeta" />
    <Meta property="og:url" :content="post.acf?.urlmeta" />
    <Meta property="og:type" content="website" />
  </Head>
  <section class="article" v-if="post">
    <div class="article__thumb">
      <img :src="post?._embedded?.['wp:featuredmedia']?.[0]?.source_url" alt="">
      <div class="container">
        <NuxtLink to="/news" class="btn-back">
          <svg width="10" height="20" viewBox="0 0 10 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M1.53621 9.4073L6.25038 4.69314L7.42871 5.87147L3.30371 9.99647L7.42871 14.1215L6.25038 15.2998L1.53621 10.5856C1.37999 10.4294 1.29222 10.2174 1.29222 9.99647C1.29222 9.7755 1.37999 9.56358 1.53621 9.4073Z"
              fill="#4B4B4B" />
          </svg>
          Все статьи
        </NuxtLink>
      </div>
    </div>
    <div class="container">
      <div class="article__header">
        <div class="left">
          <div class="author">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M9.99967 9.99967C9.08301 9.99967 8.29829 9.67329 7.64551 9.02051C6.99273 8.36773 6.66634 7.58301 6.66634 6.66634C6.66634 5.74967 6.99273 4.96495 7.64551 4.31217C8.29829 3.6594 9.08301 3.33301 9.99967 3.33301C10.9163 3.33301 11.7011 3.6594 12.3538 4.31217C13.0066 4.96495 13.333 5.74967 13.333 6.66634C13.333 7.58301 13.0066 8.36773 12.3538 9.02051C11.7011 9.67329 10.9163 9.99967 9.99967 9.99967ZM3.33301 14.9997V14.333C3.33301 13.8608 3.45467 13.4269 3.69801 13.0313C3.94134 12.6358 4.26412 12.3336 4.66634 12.1247C5.52745 11.6941 6.40245 11.3713 7.29134 11.1563C8.18023 10.9413 9.08301 10.8336 9.99967 10.833C10.9163 10.8325 11.8191 10.9402 12.708 11.1563C13.5969 11.3725 14.4719 11.6952 15.333 12.1247C15.7358 12.333 16.0588 12.6352 16.3022 13.0313C16.5455 13.4275 16.6669 13.8613 16.6663 14.333V14.9997C16.6663 15.458 16.5033 15.8505 16.1772 16.1772C15.8511 16.5038 15.4586 16.6669 14.9997 16.6663H4.99967C4.54134 16.6663 4.14912 16.5033 3.82301 16.1772C3.4969 15.8511 3.33356 15.4586 3.33301 14.9997Z"
                fill="#2E6CF0" />
            </svg>
            {{ post.acf.author }}
          </div>
          <div class="date">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M17 9.80566V11.2246C17 13.9006 17.0001 15.2393 16.1797 16.0703C15.3593 16.9012 14.0398 16.9014 11.4004 16.9014H8.59961C5.9602 16.9014 4.63997 16.9019 3.82031 16.0703C3.00061 15.2386 3 13.9006 3 11.2246V9.80566C3 9.21029 2.99969 8.68088 3.00879 8.20898H16.9912C17.0003 8.68088 17 9.21029 17 9.80566ZM6.5 12.6445C6.31441 12.6445 6.13615 12.7186 6.00488 12.8516C5.87366 12.9846 5.79986 13.1654 5.7998 13.3535C5.7998 13.5417 5.87367 13.7224 6.00488 13.8555C6.13616 13.9885 6.31435 14.0635 6.5 14.0635C6.68565 14.0635 6.86384 13.9885 6.99512 13.8555C7.12633 13.7224 7.2002 13.5417 7.2002 13.3535C7.20014 13.1654 7.12634 12.9846 6.99512 12.8516C6.86385 12.7186 6.68559 12.6445 6.5 12.6445ZM10 12.6445C9.81441 12.6445 9.63615 12.7186 9.50488 12.8516C9.37366 12.9846 9.29986 13.1654 9.2998 13.3535C9.2998 13.5417 9.37367 13.7224 9.50488 13.8555C9.63616 13.9885 9.81435 14.0635 10 14.0635C10.1857 14.0635 10.3638 13.9885 10.4951 13.8555C10.6263 13.7224 10.7002 13.5417 10.7002 13.3535C10.7001 13.1654 10.6263 12.9846 10.4951 12.8516C10.3639 12.7186 10.1856 12.6445 10 12.6445ZM13.5 12.6445C13.3144 12.6445 13.1361 12.7186 13.0049 12.8516C12.8737 12.9846 12.7999 13.1654 12.7998 13.3535C12.7998 13.5417 12.8737 13.7224 13.0049 13.8555C13.1362 13.9885 13.3143 14.0635 13.5 14.0635C13.6857 14.0635 13.8638 13.9885 13.9951 13.8555C14.1263 13.7224 14.2002 13.5417 14.2002 13.3535C14.2001 13.1654 14.1263 12.9846 13.9951 12.8516C13.8639 12.7186 13.6856 12.6445 13.5 12.6445ZM6.5 9.80566C6.31435 9.80566 6.13616 9.88059 6.00488 10.0137C5.87371 10.1467 5.7998 10.3275 5.7998 10.5156C5.7999 10.7036 5.87387 10.8836 6.00488 11.0166C6.13616 11.1497 6.31435 11.2246 6.5 11.2246C6.68565 11.2246 6.86384 11.1497 6.99512 11.0166C7.12613 10.8836 7.2001 10.7036 7.2002 10.5156C7.2002 10.3275 7.12629 10.1467 6.99512 10.0137C6.86384 9.88059 6.68565 9.80566 6.5 9.80566ZM10 9.80566C9.81435 9.80566 9.63616 9.88059 9.50488 10.0137C9.37371 10.1467 9.2998 10.3275 9.2998 10.5156C9.2999 10.7036 9.37387 10.8836 9.50488 11.0166C9.63616 11.1497 9.81435 11.2246 10 11.2246C10.1857 11.2246 10.3638 11.1497 10.4951 11.0166C10.6261 10.8836 10.7001 10.7036 10.7002 10.5156C10.7002 10.3275 10.6263 10.1467 10.4951 10.0137C10.3638 9.88059 10.1857 9.80566 10 9.80566ZM13.5 9.80566C13.3143 9.80566 13.1362 9.88059 13.0049 10.0137C12.8737 10.1467 12.7998 10.3275 12.7998 10.5156C12.7999 10.7036 12.8739 10.8836 13.0049 11.0166C13.1362 11.1497 13.3143 11.2246 13.5 11.2246C13.6857 11.2246 13.8638 11.1497 13.9951 11.0166C14.1261 10.8836 14.2001 10.7036 14.2002 10.5156C14.2002 10.3275 14.1263 10.1467 13.9951 10.0137C13.8638 9.88059 13.6857 9.80566 13.5 9.80566ZM13.5283 2.99316C13.6685 2.99328 13.8032 3.04573 13.9023 3.13965C14.0016 3.2337 14.0566 3.36211 14.0566 3.49512V4.55078C15.0718 4.62834 15.7389 4.81667 16.2285 5.28125C16.7189 5.74531 16.9182 6.37694 17 7.33984H3C3.08185 6.37761 3.28111 5.74531 3.77148 5.28125C4.26113 4.81667 4.92749 4.62767 5.94336 4.55078V3.49512C5.94336 3.36211 5.99842 3.2337 6.09766 3.13965C6.19679 3.04573 6.33152 2.99328 6.47168 2.99316C6.61202 2.99316 6.74744 3.0456 6.84668 3.13965C6.94592 3.2337 7.00098 3.36211 7.00098 3.49512V4.50684C7.47018 4.49814 7.99689 4.49805 8.58887 4.49805H11.4111C12.0031 4.49805 12.5298 4.49814 12.999 4.50684V3.49512C12.999 3.36211 13.0541 3.2337 13.1533 3.13965C13.2526 3.0456 13.388 2.99316 13.5283 2.99316Z"
                fill="#2E6CF0" />
            </svg>
            {{ formatDate(post.date) }}
          </div>
        </div>
        <div class="right">
          <div v-for="tag in tags" :key="tag.id" class="tag">{{ tag.name }}</div>
          <div class="time">{{ post.acf.time }}</div>
        </div>
      </div>
      <div class="article__content">
        <div class="article__head">
          <h2>{{ post.title.rendered }}</h2>
          <div class="content" v-html="post.content.rendered"></div>
        </div>
        <div class="article__block" v-for="(block, i) in post.acf.blocks" :key="i">
          <div class="article__block-text" v-html="block.text"></div>
          <div class="article__block-imgs" v-if="block.slider">
            <div class="arrows">
              <div class="arrow arrow-prev" :class="`prev-${i}`">
                <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M0.842941 7.71065L6.49994 13.3676L7.91394 11.9536L2.96394 7.00365L7.91394 2.05365L6.49994 0.639648L0.842941 6.29665C0.65547 6.48418 0.550154 6.73848 0.550154 7.00365C0.550154 7.26881 0.65547 7.52312 0.842941 7.71065Z"
                    fill="#3B3B3B" />
                </svg>
              </div>
              <div class="arrow arrow-next" :class="`next-${i}`">
                <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M7.15694 7.71065L1.49994 13.3676L0.0859375 11.9536L5.03594 7.00365L0.0859375 2.05365L1.49994 0.639648L7.15694 6.29665C7.34441 6.48418 7.44972 6.73848 7.44972 7.00365C7.44972 7.26881 7.34441 7.52312 7.15694 7.71065Z"
                    fill="#3B3B3B" />
                </svg>
              </div>
            </div>
            <Swiper class="article__block-swiper" :slides-per-view="'auto'" :space-between="20" :modules="[Navigation]"
              :navigation="{
                nextEl: `.next-${i}`,
                prevEl: `.prev-${i}`,
              }" :breakpoints="{
                767: {
                  spaceBetween: 20,
                },
                320: {
                  spaceBetween: 12,
                }
              }">
              <SwiperSlide v-for="(img, j) in block.slider" :key="j">
                <img :src="img" alt="">
              </SwiperSlide>
            </Swiper>

          </div>
          <div class="article__block-img" v-if="block.img">
            <img :src="block.img" alt="">
          </div>
        </div>
      </div>
    </div>
  </section>
  <NewsBlock v-if="post" title="Другие статьи" class="news-another" :dontslug="post?.id" />
  <ContactsBlock class="nobg" />
  <FooterBlock class="nobg" />
</template>

<style lang="sass" scoped>
.arrows 
  display: flex
  align-items: center
  gap: 31px
  position: absolute
  bottom: 436px
  right: 0
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
.btn-back 
  padding: 16px 28px
  border-radius: 100px
  background: rgba(255, 255, 255, 0.5)
  border: 1px solid rgba(255, 255, 255, 1)
  backdrop-filter: blur(40px)
  display: flex
  align-items: center
  gap: 10px
  justify-content: center
  color: #3e4b52
  width: max-content 
  transition: .3s all
  &:hover 
    color: #2E6CF0
    border-color: #2E6CF0
.article 
  position: relative
  padding-top: 20px
  overflow: hidden
  &__thumb 
    height: 690px
    width: 100%
    position: relative
    overflow: hidden
    padding-top: 20px
    img 
      position: absolute
      left: 20px
      top: 0px
      width: calc( 100% - 40px )
      height: 100%
      object-fit: cover
      border-radius: 16px
  &__header 
    display: flex
    align-items: center
    justify-content: space-between
    gap: 15px
    margin: 24px 0
    .left
      display: flex
      align-items: center
      gap: 29px
    .right
      display: flex
      align-items: center
      gap: 7px
    .author, .date 
      display: flex
      align-items: center
      gap: 6px
      font-size: 14px
      line-height: 1
      color: #585858
    .tag 
      font-size: 14px
      font-weight: 500
      line-height: 1
      color: #585858
      background: #DEE1E6
      text-align: center
      padding: 6px 10px
      border-radius: 100px
  &__head 
    display: flex
    flex-direction: column
    gap: 24px
    max-width: 900px
    width: 100%
  &__content 
    display: flex
    flex-direction: column
    gap: 92px
    padding-bottom: 120px
    border-bottom: 1px solid #B3B3B3  
    .content 
      display: flex
      flex-direction: column
      gap: 15px
  &__block
    display: flex
    flex-direction: column
    gap: 36px
    position: relative
    &-text 
      display: flex
      flex-direction: column
      gap: 24px
      max-width: 900px
      width: 100%
    &-swiper 
      overflow: visible
      .swiper-slide 
        max-width: max-content
        img 
          height: 400px
          width: auto
          max-width: 100%
          object-fit: cover
          border-radius: 12px
    &-img 
      img 
        max-width: 100%
        width: 100%
        border-radius: 12px
@media (max-width: 1400px)
  .article
    padding-top: 10px
    &__thumb 
      img 
        left: 10px
        width: calc(100% - 20px)
@media (max-width: 1200px)
  .arrows 
    display: none
  .article__thumb
    height: 500px
  .article__block-swiper
    .swiper-slide 
      img 
        height: 250px
@media (max-width: 767px)
  .article
    padding-top: 8px
    &__thumb
      height: 351px
      padding-top: 14px
      img 
        border-radius: 16px
        left: 8px
        width: calc(100% - 16px)
    &__header 
      flex-direction: column
      justify-content: flex-start
      align-items: flex-start
      gap: 28px
      margin-bottom: 8px
      .left 
        width: 100%
        justify-content: space-between
      .author, .date
        font-size: 12px
        svg 
          width: 18px
          height: 18px
      .tag 
        font-size: 12px
      .time 
        font-size: 12px
    &__content 
      gap: 80px
    &__block 
      gap: 24px
      &-text 
        gap: 24px
      &-swiper 
        .swiper-slide 
          img 
            height: 206px
</style>
