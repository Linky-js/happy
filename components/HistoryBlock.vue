<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import ModalVideo from './ModalVideo.vue';

gsap.registerPlugin(ScrollToPlugin);

const isMobile = ref(false)

function checkMobile() {
  if (process.client) {
    isMobile.value = window.innerWidth <= 767
  }
}

const regions = [
  'Все регионы',
  'Московская область',
  'Санкт-Петербург',
  'Краснодарский край',
  'Красноярский край',
  'Свердловская область',
  'Волгоградская область',
]
const themes = [
  'Все темы',
  'Семья',
  'Музыка',
  'Кино',
  'Спорт',
  'Путешествия',
  'Природа',
  'Культура',
]
const sorts = [
  'По дате',
  'По длительности',
  'По рейтингу',
]

const posts = [
  {
    text: '«Предложение на высоте» — воздушный шар над Переславлем',
    img: './img/history/poster-1.jpg',
    iframe: 'https://vkvideo.ru/video_ext.php?oid=-227034863&id=456252662&hd=2&',
    region: 'Московская область',
  },
  {
    text: '«Предложение на высоте» — воздушный шар над Переславлем',
    img: './img/history/poster-2.jpg',
    iframe: 'https://vkvideo.ru/video_ext.php?oid=-227034863&id=456252662&hd=2&',
    region: 'Ярославская область',
    themes: [
      'Семья',
      'Мечта',
    ],
  },
  {
    text: '«Праздник в каждом дворе» — добрые соседи в Анапе',
    img: './img/history/poster-3.jpg',
    iframe: 'https://vkvideo.ru/video_ext.php?oid=-227034863&id=456252662&hd=2&',
    region: 'Краснодарский край',
    themes: [
      'Дружба',
      'Воспоминания',
    ],
  },
  {
    text: '«Две страуса и мечта» — как мужчина стал фермером в Таганроге',
    img: './img/history/poster-4.jpg',
    iframe: 'https://vkvideo.ru/video_ext.php?oid=-227034863&id=456252662&hd=2&',
    region: 'Ростовская область',
    themes: [
      'Исполненные мечты',
      'Животные',
    ],
  },
  {
    text: '«Предложение на высоте» — воздушный шар над Липецком',
    img: './img/history/poster-5.jpg',
    iframe: 'https://vkvideo.ru/video_ext.php?oid=-227034863&id=456252662&hd=2&',
    region: 'Липецкая область',
    themes: [
      'Исполненные мечты',
      'Предложение',
    ],
  },
  {
    text: '«Музыка сердца» — как мальчик из глубинки получил рояль',
    img: './img/history/poster-6.jpg',
    iframe: 'https://vkvideo.ru/video_ext.php?oid=-227034863&id=456252662&hd=2&',
    region: 'Удмуртская область',
    themes: [
      'Исполненные мечты',
      'Счастье',
    ],
  },
  {
    text: '«Предложение на высоте» — воздушный шар над Переславлем',
    img: './img/history/poster-1.jpg',
    iframe: 'https://vkvideo.ru/video_ext.php?oid=-227034863&id=456252662&hd=2&',
    region: 'Московская область',
  },
  {
    text: '«Предложение на высоте» — воздушный шар над Переславлем',
    img: './img/history/poster-2.jpg',
    iframe: 'https://vkvideo.ru/video_ext.php?oid=-227034863&id=456252662&hd=2&',
    region: 'Ярославская область',
    themes: [
      'Семья',
      'Мечта',
    ],
  },
  {
    text: '«Праздник в каждом дворе» — добрые соседи в Анапе',
    img: './img/history/poster-3.jpg',
    iframe: 'https://vkvideo.ru/video_ext.php?oid=-227034863&id=456252662&hd=2&',
    region: 'Краснодарский край',
    themes: [
      'Дружба',
      'Воспоминания',
    ],
  },
  {
    text: '«Две страуса и мечта» — как мужчина стал фермером в Таганроге',
    img: './img/history/poster-4.jpg',
    iframe: 'https://vkvideo.ru/video_ext.php?oid=-227034863&id=456252662&hd=2&',
    region: 'Ростовская область',
    themes: [
      'Исполненные мечты',
      'Животные',
    ],
  },
  {
    text: '«Предложение на высоте» — воздушный шар над Липецком',
    img: './img/history/poster-5.jpg',
    iframe: 'https://vkvideo.ru/video_ext.php?oid=-227034863&id=456252662&hd=2&',
    region: 'Липецкая область',
    themes: [
      'Исполненные мечты',
      'Предложение',
    ],
  },
  {
    text: '«Музыка сердца» — как мальчик из глубинки получил рояль',
    img: './img/history/poster-6.jpg',
    iframe: 'https://vkvideo.ru/video_ext.php?oid=-227034863&id=456252662&hd=2&',
    region: 'Удмуртская область',
    themes: [
      'Исполненные мечты',
      'Счастье',
    ],
  },
]

const memoryImg1 = ref('./img/history/memory-1.jpg')
const memoryImg2 = ref('./img/history/memory-2.jpg')
const memoryIcon = ref('./img/history/memory-icon.svg')
const memoryImg3 = ref('./img/history/memory-3.jpg')
const memoryImg4 = ref('./img/history/memory-4.jpg')
const memoryU = ref('./img/history/memory-u.png')
const isActiveMemory = ref(false)

const activeDropdown = ref(null)
const selectedTheme = ref(themes[0])
const selectedSort = ref(sorts[0])

const selectedRegions = ref([])

const postsCount = ref(6)
const showAll = ref(false)
const hiddenCount = computed(() => {
  const visible = isMobile.value ? 3 : postsCount.value
  return posts.length - visible
})

const visiblePosts = computed(() => {
  if (isMobile.value && !showAll.value) {
    return posts.slice(0, 3)
  }
  return posts.slice(0, postsCount.value)
})

const showModal = ref(false);
const currentVideo = ref(null)
const showDop = computed(() => selectedTheme.value !== 'Все темы')


function toggleActiveMemory() {
  isActiveMemory.value = !isActiveMemory.value
}

function openModal(link) {
  currentVideo.value = link
  showModal.value = true
}

function showMore() {
  if (!showAll.value) {
    postsCount.value = posts.length
    showAll.value = true
  } else {
    postsCount.value = 6
    showAll.value = false
  }
}

// открыть/закрыть dropdown
function toggleDropdown(name) {
  activeDropdown.value = activeDropdown.value === name ? null : name
}

// выбор региона (чекбокс)
function toggleRegion(region) {
  if (region === 'Все регионы') {
    selectedRegions.value = ['Все регионы']
  } else {
    if (selectedRegions.value.includes(region)) {
      selectedRegions.value = selectedRegions.value.filter(r => r !== region)
    } else {
      selectedRegions.value.push(region)
      selectedRegions.value = selectedRegions.value.filter(r => r !== 'Все регионы')
    }
  }
}

// выбор radio
function selectTheme(theme) {
  selectedTheme.value = theme
  activeDropdown.value = null
}
function selectSort(sort) {
  selectedSort.value = sort
  activeDropdown.value = null
}

// закрытие по клику вне
function handleClickOutside(e) {
  const filter = document.querySelector('.filter')
  if (filter && !filter.contains(e.target)) {
    activeDropdown.value = null
  }
}

function scrollToContacts() {
  gsap.to(window, {
    duration: 1.2,
    scrollTo: "#contacts",
    ease: "power2.inOut",
  });
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  checkMobile()
  window.addEventListener('resize', checkMobile)
})
onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
  window.removeEventListener('resize', checkMobile)
})

</script>
<template>
  <section class="history" id="history">
    <div class="container">
      <div class="history__head">
        <h2>Истории, которые <span>вдохновляют</span></h2>
        <p>Вы можете посмотреть все наши видео в одном месте. <br>Каждое видео — это искренние эмоции, неожиданные
          повороты и настоящая жизнь</p>
      </div>
      <div class="filter">
        <p>Используйте фильтры, чтобы найти истории по теме или региону</p>
        <div class="filter__right">
          <div class="filter__item filter__regions" :class="{ active: activeDropdown === 'regions' }">
            <div class="filter__item-head" @click="toggleDropdown('regions')">
              {{ selectedRegions.length ? selectedRegions.join(', ') : 'Все регионы' }}
            </div>
            <div class="filter__item-list">
              <div v-for="region in regions" :key="region" class="filter__item-key checkbox"
                :class="{ active: selectedRegions.includes(region) }" @click="toggleRegion(region)">
                {{ region }}
              </div>
            </div>
          </div>
          <div class="filter__item filter__themes" :class="{ active: activeDropdown === 'themes' }">
            <div class="filter__item-head" @click="toggleDropdown('themes')">
              {{ selectedTheme }}
            </div>
            <div class="filter__item-list">
              <div v-for="theme in themes" :key="theme" class="filter__item-key radio"
                :class="{ active: selectedTheme === theme }" @click="selectTheme(theme)">
                {{ theme }}
              </div>
            </div>
          </div>
          <div class="filter__item filter__sorts" :class="{ active: activeDropdown === 'sorts' }">
            <div class="filter__item-head" @click="toggleDropdown('sorts')">
              {{ selectedSort }}
            </div>
            <div class="filter__item-list">
              <div v-for="sort in sorts" :key="sort" class="filter__item-key radio"
                :class="{ active: selectedSort === sort }" @click="selectSort(sort)">
                {{ sort }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Transition name="expand">
        <div class="dop" v-if="showDop">
          <p class="dop__memory" :class="{ active: isActiveMemory }" @click="toggleActiveMemory">Воспоминания</p>
          <p class="dop__activities">Активности</p>
        </div>
      </Transition>
      <div class="posts">
        <div v-for="(post, i) in visiblePosts" :key="i" class="post">
          <div class="post__top" :style="{ backgroundImage: `url(${post.img})` }">
            <div class="post__region">
              {{ post.region }}
            </div>
            <div class="post__play" @click="openModal(post.iframe)">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M17.8405 7.79377C18.2408 8.00661 18.5755 8.32435 18.809 8.71293C19.0425 9.1015 19.1658 9.54628 19.1658 9.9996C19.1658 10.4529 19.0425 10.8977 18.809 11.2863C18.5755 11.6749 18.2408 11.9926 17.8405 12.2054L7.16384 18.0113C5.44467 18.9471 3.33301 17.7304 3.33301 15.8063V4.19377C3.33301 2.26877 5.44467 1.05294 7.16384 1.98711L17.8405 7.79377Z"
                  fill="white" />
              </svg>
            </div>
            <p>{{ post.text }}</p>
          </div>
          <div class="post__bot" v-if="post.themes">
            <p v-for="theme in post.themes" :key="theme">{{ theme }}</p>
          </div>
        </div>
        <div class="memory" :class="{ active: isActiveMemory }">
          <div class="memory__imgs">
            <img class="memory__imgs-img img1" :src="memoryImg1" alt="">
            <img class="memory__imgs-img img2" :src="memoryImg2" alt="">
            <div class="memory__imgs-icon">
              <img class="imgIcon" :src="memoryIcon" alt=""></img>
            </div>
            <img class="memory__imgs-img img3" :src="memoryImg3" alt="">
            <img class="memory__imgs-img img4" :src="memoryImg4" alt="">
          </div>
          <img class="memory__u" :src="memoryU" alt="">
          <button class="memory__btn" @click="scrollToContacts">Заказать воспоминания</button>
        </div>
      </div>
      <button class="btn-load" :class="{ ta: showAll }" v-if="posts.length > 6" @click="showMore">
        {{ showAll ? 'Скрыть' : 'Показать ещё' }}
        <span v-if="!showAll">{{ hiddenCount }}</span>
      </button>
    </div>
    <ModalVideo v-if="showModal" :linkVideo="currentVideo" @close="showModal = false" />
  </section>
</template>
<style lang="sass" scoped>
.memory 
  position: absolute
  top: 0
  left: 0
  z-index: 2
  max-width: calc(428px * 100% / 1324px)
  height: 252px
  width: 100%
  overflow: hidden
  background: url('/img/history/memory-bg.jpg') center / cover no-repeat
  border-radius: 12px
  opacity: 0
  visibility: hidden
  transition: .3s all
  &.active 
    opacity: 1
    visibility: visible

  &__imgs 
    display: flex
    align-items: center
    justify-content: center
    gap: 16px
    margin-bottom: 13px
    position: relative
    z-index: 2
    &-img 
      width: 44px
      height: 44px
      border-radius: 50%
      border: 1px solid #74A0FF
      &:nth-child(1), &:nth-child(5) 
        margin-top: 90px
    &-icon 
      width: 44px
      height: 44px
      border-radius: 50%
      display: flex
      align-items: center
      justify-content: center
      background: #E6EEFF
      border: 1px solid #74A0FF
      margin-top: 82px
  &__u 
    position: absolute
    bottom: 0
    left: 50%
    transform: translateX(-50%)
  &__btn
    max-width: 244px
    width: 100%
    height: 56px
    display: flex
    align-items: center
    justify-content: center
    border-radius: 100px
    background: #fff
    border: 1px solid #fff
    color: #2E6CF0
    font-size: 15px
    line-height: 135%
    font-weight: 600
    text-align: center
    position: relative
    z-index: 2
    margin: 0 auto
    transition: .3s all
    &:hover 
      color: #fff
      background: transparent

.dop 
  margin-top: -24px
  margin-bottom: 24px
  display: flex
  align-items: center
  gap: 9px
  p
    cursor: pointer
    padding: 10px 14px
    font-size: 13px
    font-weight: 500
    line-height: 135%
    color: #505050
    border-radius: 100px
    border: 1px solid #C2C2C2
    transition: .3s all
    &.active, &:hover
      color: #2E6CF0
      border-color: #2E6CF0
.btn-load 
  display: flex
  align-items: center 
  justify-content: space-between
  border: 1px solid #2E6CF0
  border-radius: 100px
  padding: 14px
  padding-left: 22px
  color: #2E6CF0
  font-size: 15px
  line-height: 135%
  font-weight: 600
  max-width: 244px
  width: 100%
  margin: 0 auto
  &.ta 
    justify-content: center
    padding-left: 14px
  span 
    width: 28px
    height: 28px
    display: flex
    align-items: center
    justify-content: center
    background: #2E6CF0
    border-radius: 50%
    color: #fff
    font-size: 12px
    font-weight: 600
    line-height: 135%
  &:hover 
    border-color: #A5A9B1
.history
  padding-top: 120px
  &__head 
    display: flex
    flex-direction: column
    gap: 27px
    margin-bottom: 48px
    text-align: center
    h2 
      span 
        color: #6E8009
        padding: 6px 20px 10px
        background: #E1E8B1
        border-radius: 100px
.filter
  background: #fff
  border-radius: 12px
  width: 100%
  display: flex
  align-items: center
  justify-content: space-between
  gap: 15px
  padding: 12px
  padding-left: 18px
  margin-bottom: 36px
  &__right 
    display: flex
    gap: 12px
    align-items: center
  p 
    font-size: 15px
    font-weight: 500
    color: #505050
  &__item 
    position: relative
    width: 240px 
    font-size: 14px
    line-height: 120%
    color: #4C4C4C
    background: #F2F4F7
    border-radius: 8px
    border: 1px solid #F0F2F5
    &.active 
      border-radius: 8px 8px 0 0
      z-index: 3
      .filter__item-head::after 
        transform: rotate(180deg)
      .filter__item-list 
        opacity: 1
        visibility: visible
        pointer-events: all
    &.filter__themes, &.filter__sorts
      width: 185px
    &.filter__themes 
      .filter__item-head 
        &::before 
          background: #C5D848
    &.filter__sorts
      .filter__item-head 
        &::before 
          background: none
    &-head 
      display: flex
      align-items: center
      justify-content: space-between
      cursor: pointer
      width: 100%
      height: 40px
      padding-left: 14px
      padding-right: 10px
      border-radius: 8px
      white-space: nowrap       
      overflow: hidden         
      text-overflow: ellipsis
      &::before 
        content: ''
        background: #2E6CF0
        position: absolute
        left: 1px
        top: 50%
        width: 5px
        height: 20px
        border-radius: 0 12px 12px 0
        transform: translateY(-50%)
      &:after 
        content: ''
        height: 12px
        width: 20px
        background: url('data:image/svg+xml,<svg width="20" height="10" viewBox="0 0 20 10" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(%23clip0_1_7524)"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.4073 8.46379L4.69314 3.74962L5.87147 2.57129L9.99647 6.69629L14.1215 2.57129L15.2998 3.74962L10.5856 8.46379C10.4294 8.62001 10.2174 8.70778 9.99647 8.70778C9.7755 8.70778 9.56358 8.62001 9.4073 8.46379Z" fill="%234B4B4B"/></g><defs><clipPath id="clip0_1_7524"><rect width="10" height="20" fill="white" transform="translate(20) rotate(90)"/></clipPath></defs></svg>')
    &-list 
      position: absolute
      opacity: 0
      visibility: hidden
      pointer-events: none
      width: 100%
      background: #F2F4F7
      border: 1px solid #F0F2F5
      border-radius: 0 0 8px 8px
      transition: .3s all
      padding-bottom: 11px
      max-height: 313px
      overflow-y: auto 
      
      &::-webkit-scrollbar
        width: 3px
        background-color: #F2F4F7
      &::-webkit-scrollbar-thumb
        background-color: #D4D7DD
        border-radius: 5px
    &-key 
      padding-top: 11px
      padding-left: 10px
      padding-right: 14px
      padding-bottom: 10px
      font-size: 14px
      line-height: 120%
      color: #4C4C4C
      display: flex
      align-items: center
      justify-content: space-between
      cursor: pointer
      gap: 10px
      width: 100%
      &.radio 
        &.active 
          &::after 
            background: url('data:image/svg+xml,<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="13.5" y="0.5" width="13" height="13" rx="6.5" transform="rotate(90 13.5 0.5)" stroke="%232E6CF0"/><rect x="11" y="3" width="8" height="8" rx="4" transform="rotate(90 11 3)" fill="%232E6CF0"/></svg>')
            background-size: cover
        &::after 
          width: 14px
          height: 14px 
          content: ''
          background: #D4D7DD
          display: inline-block
          border-radius: 50%
      &.checkbox
        &.active 
          &::after 
            background: url('data:image/svg+xml,<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="12" width="12" height="12" rx="2" transform="rotate(90 12 0)" fill="%232E6CF0"/><path d="M8.99996 4.33328L4.99996 8.33328L3.16663 6.49995L3.63663 6.02995L4.99996 7.38995L8.52996 3.86328L8.99996 4.33328Z" fill="white"/></svg>')
            background-size: cover
        &::after 
          display: inline-block
          content: ''
          width: 12px
          height: 12px
          background: #D4D7DD
          border-radius: 2px
.posts 
  display: grid
  grid-template-columns: repeat(3, 1fr)
  gap: 20px
  margin-bottom: 48px
  position: relative
.post 
  
  &__top 
    background-size: cover
    background-repeat: no-repeat
    height: 252px
    border-radius: 12px
    overflow: hidden
    display: flex
    flex-direction: column
    justify-content: space-between
    position: relative
    p 
      background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 100%)
      backdrop-filter: blur(12px)
      font-size: 16px
      line-height: 120%
      font-weight: 600
      color: #fff
      padding: 16px
      padding-bottom: 12px
  &__play 
    display: flex
    align-items: center
    justify-content: center
    width: 48px
    height: 48px
    border-radius: 50%
    backdrop-filter: blur(4px)
    background: rgba(0, 0, 0, 0.1)
    border: 1px solid #fff
    position: absolute
    left: 50%
    top: 50%
    transform: translate(-50%, -50%)
    cursor: pointer
  &__region 
    font-size: 13px
    line-height: 135%
    color: #fff
    font-weight: 500
    padding: 3px 8px
    background: #2E6CF0
    border: 1px solid #3F7BFF
    border-radius: 6px
    margin-left: auto
    margin-right: 11px
    margin-top: 12px
  &__bot 
    display: flex
    align-items: center
    gap: 6px
    margin-top: 8px
    p 
      color: #546204
      background: #E1E8B1
      padding: 6px 10px
      border-radius: 100px
      font-size: 13px
      line-height: 135%
      font-weight: 500
@media (max-width: 1200px)
  .memory
    max-width: calc(50% - 10px)
  .filter
    p 
      display: none
    &__right 
      max-width: 100%
      width: 100%
      display: grid
      grid-template-columns: repeat(2, 1fr)
      gap: 12px
    &__item 
      width: 100%
      &.filter__regions
        grid-column: 1 / 3
      &.filter__themes, &.filter__sorts  
        width: 100%
  .posts 
    grid-template-columns: repeat(2, 1fr)
@media (max-width: 767px)
  .dop 
    margin-top: 0
  .memory
    max-width: calc(100% - 28px)
    left: 14px
    height: 197px
    &__imgs 
      margin-top: -30px
  .container 
    padding: 0 6px
  .history 
    padding-top: 80px
    &__head 
      gap: 16px
      margin-bottom: 36px
      padding-left: 14px
      padding-right: 14px
      span 
        display: inline-block
        width: max-content
        margin: 0 auto
  .filter 
    padding: 14px
    margin-bottom: 20px
     
  .posts 
    padding-left: 14px
    padding-right: 14px
    gap: 20px
    grid-template-columns: 1fr
    margin-bottom: 36px
  .post 
    &__top 
      height: 197px
      border-radius: 12px
      p 
        padding: 16px
        font-size: 14px
    &__region
      padding: 3px 8px
      font-size: 10px
      top: 12px
      right: 11px
    &__bot 
      p 
        font-size: 11px
  .btn-load
    max-width: 288px
    width: 100%
</style>