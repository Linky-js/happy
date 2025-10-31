<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import ModalVideo from './ModalVideo.vue';

gsap.registerPlugin(ScrollToPlugin);

const props = defineProps({
  page: {
    type: Object,
    required: true
  },
})

const videos = useState('videos')       
const regions = useState('regions')    
const isMobile = ref(false)

videos.value = videos.value.map(video => {
  const regionObjects = video.acf?.code_region || []

  const matchedCodes = regionObjects
    .map(vReg => {
      const match = regions.value.find(r => r.id === vReg.ID)
      return match?.acf?.code_region
    })
    .filter(Boolean)

  return {
    ...video,
    regionCodes: matchedCodes
  }
})

function checkMobile() {
  if (process.client) {
    isMobile.value = window.innerWidth <= 767
  }
}

// UI / фильтры
const sorts = [
  'По дате',
  'По длительности',
  'По рейтингу',
]

const activeDropdown = ref(null)
const selectedSort = ref(sorts[0])

// selectedRegions хранит выбранные объекты региона или строку 'Все регионы'
const selectedRegions = ref([])
const selectedRegionsNames = ref([])

const postsCount = ref(6)
const showAll = ref(false)

const memoryImg1 = ref('./img/history/memory-1.jpg')
const memoryImg2 = ref('./img/history/memory-2.jpg')
const memoryIcon = ref('./img/history/memory-icon.svg')
const memoryImg3 = ref('./img/history/memory-3.jpg')
const memoryImg4 = ref('./img/history/memory-4.jpg')
const memoryU = ref('./img/history/memory-u.png')
const isActiveMemory = ref(false)

const showModal = ref(false);
const currentVideo = ref(null)

// Вспомогательные функции

function toggleActiveMemory(memory) {
  if (memory === isActiveMemory.value) {
    isActiveMemory.value = false
    return
  }
  isActiveMemory.value = memory
  
}

function openModal(link) {
  
  currentVideo.value = link
  showModal.value = true
}

function toggleDropdown(name) {
  activeDropdown.value = activeDropdown.value === name ? null : name
}

function toggleRegion(region) {
  // region — объект региона из regions (или строка 'Все регионы')
  if (region === 'Все регионы') {
    selectedRegions.value = ['Все регионы']
    selectedRegionsNames.value = ['Все регионы']
    return
  }

  // если уже есть 'Все регионы' — снимаем
  selectedRegions.value = selectedRegions.value.filter(r => r !== 'Все регионы')
  selectedRegionsNames.value = selectedRegionsNames.value.filter(n => n !== 'Все регионы')

  const idx = selectedRegions.value.indexOf(region)
  if (idx !== -1) {
    selectedRegions.value.splice(idx, 1)
    selectedRegionsNames.value.splice(idx, 1)
  } else {
    selectedRegions.value.push(region)
    selectedRegionsNames.value.push(region?.title?.rendered || '')
  }
}

function selectSort(sort) {
  selectedSort.value = sort
  activeDropdown.value = null
}

// Сортировка и фильтрация

function _regionCodesFromSelection() {
  // Возвращаем массив кодов регионов, выбранных в фильтре
  // region.acf.code_region может быть строкой или массив
  if (!selectedRegions.value.length) return []
  if (selectedRegions.value.includes('Все регионы')) return []


  const codes = []
  for (const r of selectedRegions.value) {
    if (!r) continue
    const cr = r.acf?.code_region
    if (!cr) continue
    if (Array.isArray(cr)) codes.push(...cr)
    else codes.push(cr)
  }

  return Array.from(new Set(codes))
}

function _videoHasRegion(video, selectedCodes) {
  // video.acf.code_region — массив, проверим пересечение
  if (!video || !video.acf) return false
  const vCodes = video.regionCodes
  if (!vCodes) return false
  if (Array.isArray(vCodes)) {
    return vCodes.some(vc => selectedCodes.includes(vc))
  } else {
    return selectedCodes.includes(vCodes)
  }
}

const processedVideos = computed(() => {
  const list = Array.isArray(videos.value) ? videos.value.slice() : []


  // --- фильтр по регионам
  const selectedCodes = _regionCodesFromSelection()
  let filtered = list
  if (selectedCodes.length) {
    filtered = filtered.filter(v => _videoHasRegion(v, selectedCodes))
  }

  // --- фильтр по Категориям
  const currentCategory = isActiveMemory.value
  if (currentCategory) {
    filtered = filtered.filter(v => v._embedded?.['wp:term']?.[0]?.[0].name === currentCategory)
    console.log(filtered);
    
  }

  // --- сортировка
  const sort = selectedSort.value
  filtered.sort((a, b) => {
    if (sort === 'По дате') {
      // new -> first
      return new Date(b.date) - new Date(a.date)
    }
    if (sort === 'По длительности') {
      // ожидаем наличие a.acf.duration или похожего поля (fallback 0)
      const getDur = x => {
        const d = x.acf?.duration ?? x.acf?.time ?? x.acf?.length ?? 0
        const n = parseFloat(d)
        return Number.isFinite(n) ? n : 0
      }
      return getDur(b) - getDur(a)
    }
    if (sort === 'По рейтингу') {
      // поле у вас называется "raiting" — используем parseFloat
      const getRate = x => {
        const r = x.acf?.raiting ?? x.acf?.rating ?? 0
        const n = parseFloat(r)
        return Number.isFinite(n) ? n : 0
      }
      return getRate(b) - getRate(a)
    }

    // default: по дате
    return new Date(b.date) - new Date(a.date)
  })

  return filtered
})

// видимые посты
const visiblePosts = computed(() => {
  const list = processedVideos.value || []
  const visible = isMobile.value ? 3 : postsCount.value
  if (!showAll.value) {
    return list.slice(0, visible)
  }
  return list.slice(0, list.length)
})

const hiddenCount = computed(() => {
  const listLen = processedVideos.value?.length ?? 0
  const visible = isMobile.value ? 3 : postsCount.value
  return Math.max(0, listLen - (showAll.value ? listLen : visible))
})

// показать ещё — работает с processedVideos
function showMore() {
  if (!showAll.value) {
    postsCount.value = processedVideos.value.length || postsCount.value
    showAll.value = true
  } else {
    postsCount.value = 6
    showAll.value = false
  }
}

// клик вне
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
function postTags(post) {
  
  let tags = post?._embedded?.['wp:term']
    ?.flat()
    ?.filter(t => t.taxonomy === 'video_tag') || []
    
  return tags
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
        <h2 v-html="props.page.acf?.['h-4']"></h2>
        <p v-html="props.page.acf?.['desk-4']"></p>
      </div>
      <div class="filter">
        <p>Используйте фильтры, чтобы найти истории по региону</p>
        <div class="filter__right">
          <div class="filter__item filter__regions" :class="{ active: activeDropdown === 'regions' }">
            <div class="filter__item-head" @click="toggleDropdown('regions')">
              {{ selectedRegionsNames.length ? selectedRegionsNames.join(', ') : 'Все регионы' }}
            </div>
            <div class="filter__item-list">
              <div v-for="region in regions" :key="region" class="filter__item-key checkbox"
                :class="{ active: selectedRegions.includes(region) }" @click="toggleRegion(region)">
                {{ region?.title?.rendered }}
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
      <div class="dop">
        <p class="dop__memory" :class="{ active: isActiveMemory === 'Воспоминания' }" @click="toggleActiveMemory('Воспоминания')">Воспоминания</p>
        <p class="dop__activities" :class="{ active: isActiveMemory === 'Активности' }" @click="toggleActiveMemory('Активности')">Активности</p>
      </div>
      <div class="posts">
        <transition name="fade">
          <div class="memory" v-if="isActiveMemory === 'Воспоминания'" :class="{ active: isActiveMemory === 'Воспоминания' }">
            <div class="memory__imgs">
              <img class="memory__imgs-img img1" :src="memoryImg1" alt="">
              <img class="memory__imgs-img img2" :src="memoryImg2" alt="">
              <div class="memory__imgs-icon">
                <img class="imgIcon" :src="memoryIcon" alt="" />
              </div>
              <img class="memory__imgs-img img3" :src="memoryImg3" alt="">
              <img class="memory__imgs-img img4" :src="memoryImg4" alt="">
            </div>
            <img class="memory__u" :src="memoryU" alt="">
            <button class="memory__btn" @click="scrollToContacts">Заказать воспоминания</button>
          </div>
        </transition>
        <div v-for="(post, i) in visiblePosts" :key="i" class="post">
          <div class="post__top"
            :style="{ backgroundImage: `url(${post._embedded?.['wp:featuredmedia']?.[0]?.source_url})` }">
            <div v-for="reg in post?.acf?.code_region" :key="reg.id" class="post__region">
              {{ reg.post_title }}
            </div>
            <div class="post__play" @click="openModal(post?.acf?.link)">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M17.8405 7.79377C18.2408 8.00661 18.5755 8.32435 18.809 8.71293C19.0425 9.1015 19.1658 9.54628 19.1658 9.9996C19.1658 10.4529 19.0425 10.8977 18.809 11.2863C18.5755 11.6749 18.2408 11.9926 17.8405 12.2054L7.16384 18.0113C5.44467 18.9471 3.33301 17.7304 3.33301 15.8063V4.19377C3.33301 2.26877 5.44467 1.05294 7.16384 1.98711L17.8405 7.79377Z"
                  fill="white" />
              </svg>
            </div>
            <p>{{ post.title.rendered }}</p>
          </div>
          <div class="post__bot">
            <p v-for="tag in postTags(post)" :key="tag">{{ tag.name }}</p>
          </div>
        </div>

      </div>
      <button class="btn-load" :class="{ ta: showAll }" v-if="videos.length > 6" @click="showMore">
        {{ showAll ? 'Скрыть' : 'Показать ещё' }}
        <span v-if="!showAll">{{ hiddenCount }}</span>
      </button>
    </div>
    <ModalVideo v-if="showModal" :linkVideo="currentVideo" @close="showModal = false" />
  </section>
</template>
<style lang="sass" scoped>
.memory 
  height: 252px
  width: 100%
  overflow: hidden
  background: url('/img/history/memory-bg.jpg') center / cover no-repeat
  border-radius: 12px
  opacity: 0
  visibility: hidden
  transition: .3s all
  position: relative
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
      :deep(span)
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
  margin-bottom: 12px
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
  .filter
    p 
      display: none
    &__right 
      max-width: 100%
      width: 100%
      display: flex
      flex-direction: column
      gap: 12px
    &__item 
      width: 100%
      &.filter__themes, &.filter__sorts  
        width: 100%
  .posts 
    grid-template-columns: repeat(2, 1fr)
@media (max-width: 767px)
  .dop 
    margin-bottom: 24px
  .memory
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
      :deep(span)
        display: inline-block
        width: max-content
        margin: 0 auto
  .filter 
    padding: 14px
     
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