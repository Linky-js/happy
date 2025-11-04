<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

import MenuBlock from '~/components/MenuBlock.vue'
import NewsPost from '~/components/NewsPost.vue'
import ContactsBlock from '~/components/ContactsBlock.vue'
import FooterBlock from '~/components/FooterBlock.vue'

// Получаем посты
const { data: postsRef } = await useAsyncData('posts', () =>
  $fetch('https://wp.xn--80aeina8anebeag6dzd.xn--p1ai/wp-json/wp/v2/posts?per_page=100&_embed')
)

// Получаем теги
const { data: tagsRef } = await useAsyncData('tags', () =>
  $fetch('https://wp.xn--80aeina8anebeag6dzd.xn--p1ai/wp-json/wp/v2/tags?per_page=100')
)

const selectedTags = ref([])
const showAll = ref(false)
const postsCount = ref(8)

function updatePostsCount() {
  postsCount.value = window.innerWidth < 768 ? 6 : 8
}

onMounted(() => {
  updatePostsCount()
  window.addEventListener('resize', updatePostsCount)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updatePostsCount)
})

function toggleTag(tagId) {
  if (selectedTags.value.includes(tagId)) {
    selectedTags.value = selectedTags.value.filter(t => t !== tagId)
  } else {
    selectedTags.value.push(tagId)
  }
  showAll.value = false
}

// Фильтрация постов по тегам
const filteredPosts = computed(() => {
  const posts = postsRef.value || []
  if (selectedTags.value.length === 0) return posts
  return posts.filter(post =>
    post.tags.some(tagId => selectedTags.value.includes(tagId))
  )
})

// Ограничиваем количество видимых постов
const visiblePosts = computed(() => {
  if (showAll.value) return filteredPosts.value
  return filteredPosts.value.slice(0, postsCount.value)
})

const showButton = computed(() => filteredPosts.value.length > postsCount.value)

function toggleShow() {
  showAll.value = !showAll.value
}
</script>

<template>
  <MenuBlock />
  <section class="news">
    <div class="container">
      <div class="news__head">
        <!-- <NuxtLink to="/" class="btn">Вернуться на главную</NuxtLink> -->
        <h2>Статьи и размышления о счастье</h2>

        <!-- ✅ Вывод тегов -->
        <div class="tags" v-if="tagsRef?.length">
          <div
            class="tags__item"
            v-for="tag in tagsRef"
            :key="tag.id"
            :class="{ active: selectedTags.includes(tag.id) }"
            @click="toggleTag(tag.id)"
          >
            {{ tag.name }}
          </div>
        </div>
      </div>

      <!-- ✅ Вывод постов -->
      <div class="posts">
        <NewsPost v-for="post in visiblePosts" :key="post.id" :post="post" />
      </div>

      <div class="posts__bot" v-if="showButton">
        <button type="button" class="btn-load" @click="toggleShow">
          {{ showAll ? 'Скрыть' : 'Показать ещё' }}
        </button>
      </div>
    </div>
  </section>

  <ContactsBlock class="nobg" />
  <FooterBlock class="nobg" />
</template>

<style lang="sass" scoped>
.news
  padding-top: 120px
  margin-bottom: 120px
  &__head 
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
    text-align: center
    gap: 24px
    margin-bottom: 36px
    .btn 
      color: #3E4B52
      font-weight: 500
      font-size: 15px
      line-height: 135%
      text-align: center
      padding: 16px 28px
      border-radius: 100px
      border: 1px solid #fff
      background: rgba(255, 255, 255, 0.5)
      transition: .3s all
      display: inline-block
      margin-bottom: 11px
      &:hover 
        color: #2E6CF0
        border-color: #2E6CF0
.tags
  display: flex
  align-items: center
  gap: 8px
  justify-content: center
  &__item 
    padding: 8px 16px
    border-radius: 100px
    border: 1px solid #C2C2C2
    font-size: 14px
    line-height: 1
    font-weight: 500
    transition: .3s all
    cursor: pointer
    &.active, &:hover 
      color: #2E6CF0
      border-color: #2E6CF0
.posts 
  display: grid
  grid-template-columns: repeat(2, 1fr)
  gap: 48px 20px
  margin-bottom: 48px
  &__bot 
    display: flex
    align-items: center
    justify-content: center
    
.btn-load 
  padding: 18px
  max-width: 181px
  width: 100%
  text-align: center
  font-size: 14px
  line-height: 135%
  font-weight: 500
  color: #2E6CF0
  border: 1px solid #2E6CF0
  border-radius: 100px
  transition: .3s all
  display: inline-block
  &:hover 
    border-color: #A5A9B0
@media (max-width: 767px)
  .news 
    padding-top: 80px
    margin-bottom: 80px
    &__head 
      gap: 16px
      margin-bottom: 40px
      .btn 
        margin-bottom: 4px  
      h2 
        text-align: left
        width: 100%
  .tags 
    overflow-x: auto
    justify-content: flex-start
    width: 100%
    &::-webkit-scrollbar
      display: none
  .posts 
    grid-template-columns: 1fr
    gap: 20px
    margin-bottom: 36px
  .btn-load 
    max-width: 288px
</style>