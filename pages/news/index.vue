<script setup>
import { ref, computed } from 'vue'
import NewsPost from '~/components/NewsPost.vue';
import ContactsBlock from '~/components/ContactsBlock.vue';
import FooterBlock from '~/components/FooterBlock.vue';
const tags = [
  'Философия',
  'Психология',
  'Вдохновение',
]
const posts = [
  {
    img: './img/news-1.jpg',
    title: 'Что мы узнали о счастье, путешествуя по России',
    text: 'Команда проекта делится впечатлениями о людях, которые умеют быть счастливыми — несмотря ни на что.',
    tag: 'Философия',
    time: '~12 мин.',
    author: 'Редакция проекта',
    date: '15 июля 2025',
    link: '/news/slug',
  },
  {
    img: './img/news-2.jpg',
    title: 'Счастье — это не география. Это отношения',
    text: 'Психолог Наталья Воронина рассуждает о том, как поддержка и любовь близких делают нас счастливыми, где бы мы ни были.',
    tag: 'Психология',
    time: '~5 мин.',
    author: 'Наталья Воронина',
    date: '3 июля 2025',
    link: '/news/slug',
  },
  {
    img: './img/news-3.jpg',
    title: 'Когда мечта сбывается: 5 вдохновляющих историй',
    text: 'Короткие, но поразительные истории людей, чьи мечты стали реальностью благодаря настойчивости, вере и помощи окружающих.',
    tag: 'Вдохновение',
    time: '~8 мин.',
    author: 'Анастасия Громова',
    date: '1 июля 2025',
    link: '/news/slug',
  },
  {
    img: './img/news-1.jpg',
    title: 'Что мы узнали о счастье, путешествуя по России',
    text: 'Команда проекта делится впечатлениями о людях, которые умеют быть счастливыми — несмотря ни на что.',
    tag: 'Философия',
    time: '~12 мин.',
    author: 'Редакция проекта',
    date: '15 июля 2025',
    link: '/news/slug',
  },
  {
    img: './img/news-2.jpg',
    title: 'Счастье — это не география. Это отношения',
    text: 'Психолог Наталья Воронина рассуждает о том, как поддержка и любовь близких делают нас счастливыми, где бы мы ни были.',
    tag: 'Психология',
    time: '~5 мин.',
    author: 'Наталья Воронина',
    date: '3 июля 2025',
    link: '/news/slug',
  },
  {
    img: './img/news-3.jpg',
    title: 'Когда мечта сбывается: 5 вдохновляющих историй',
    text: 'Короткие, но поразительные истории людей, чьи мечты стали реальностью благодаря настойчивости, вере и помощи окружающих.',
    tag: 'Вдохновение',
    time: '~8 мин.',
    author: 'Анастасия Громова',
    date: '1 июля 2025',
    link: '/news/slug',
  },
  {
    img: './img/news-1.jpg',
    title: 'Что мы узнали о счастье, путешествуя по России',
    text: 'Команда проекта делится впечатлениями о людях, которые умеют быть счастливыми — несмотря ни на что.',
    tag: 'Философия',
    time: '~12 мин.',
    author: 'Редакция проекта',
    date: '15 июля 2025',
    link: '/news/slug',
  },
  {
    img: './img/news-2.jpg',
    title: 'Счастье — это не география. Это отношения',
    text: 'Психолог Наталья Воронина рассуждает о том, как поддержка и любовь близких делают нас счастливыми, где бы мы ни были.',
    tag: 'Психология',
    time: '~5 мин.',
    author: 'Наталья Воронина',
    date: '3 июля 2025',
    link: '/news/slug',
  },
  {
    img: './img/news-3.jpg',
    title: 'Когда мечта сбывается: 5 вдохновляющих историй',
    text: 'Короткие, но поразительные истории людей, чьи мечты стали реальностью благодаря настойчивости, вере и помощи окружающих.',
    tag: 'Вдохновение',
    time: '~8 мин.',
    author: 'Анастасия Громова',
    date: '1 июля 2025',
    link: '/news/slug',
  },
  {
    img: './img/news-1.jpg',
    title: 'Что мы узнали о счастье, путешествуя по России',
    text: 'Команда проекта делится впечатлениями о людях, которые умеют быть счастливыми — несмотря ни на что.',
    tag: 'Философия',
    time: '~12 мин.',
    author: 'Редакция проекта',
    date: '15 июля 2025',
    link: '/news/slug',
  },
  {
    img: './img/news-2.jpg',
    title: 'Счастье — это не география. Это отношения',
    text: 'Психолог Наталья Воронина рассуждает о том, как поддержка и любовь близких делают нас счастливыми, где бы мы ни были.',
    tag: 'Психология',
    time: '~5 мин.',
    author: 'Наталья Воронина',
    date: '3 июля 2025',
    link: '/news/slug',
  },
  {
    img: './img/news-3.jpg',
    title: 'Когда мечта сбывается: 5 вдохновляющих историй',
    text: 'Короткие, но поразительные истории людей, чьи мечты стали реальностью благодаря настойчивости, вере и помощи окружающих.',
    tag: 'Вдохновение',
    time: '~8 мин.',
    author: 'Анастасия Громова',
    date: '1 июля 2025',
    link: '/news/slug',
  },
  {
    img: './img/news-1.jpg',
    title: 'Что мы узнали о счастье, путешествуя по России',
    text: 'Команда проекта делится впечатлениями о людях, которые умеют быть счастливыми — несмотря ни на что.',
    tag: 'Философия',
    time: '~12 мин.',
    author: 'Редакция проекта',
    date: '15 июля 2025',
    link: '/news/slug',
  },
  {
    img: './img/news-2.jpg',
    title: 'Счастье — это не география. Это отношения',
    text: 'Психолог Наталья Воронина рассуждает о том, как поддержка и любовь близких делают нас счастливыми, где бы мы ни были.',
    tag: 'Психология',
    time: '~5 мин.',
    author: 'Наталья Воронина',
    date: '3 июля 2025',
    link: '/news/slug',
  },
  {
    img: './img/news-3.jpg',
    title: 'Когда мечта сбывается: 5 вдохновляющих историй',
    text: 'Короткие, но поразительные истории людей, чьи мечты стали реальностью благодаря настойчивости, вере и помощи окружающих.',
    tag: 'Вдохновение',
    time: '~8 мин.',
    author: 'Анастасия Громова',
    date: '1 июля 2025',
    link: '/news/slug',
  },
]

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

function toggleTag(tag) {
  if (selectedTags.value.includes(tag)) {
    selectedTags.value = selectedTags.value.filter(t => t !== tag)
  } else {
    selectedTags.value.push(tag)
  }
  showAll.value = false
}

const filteredPosts = computed(() => {
  if (selectedTags.value.length === 0) return posts
  return posts.filter(post => selectedTags.value.includes(post.tag))
})

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
  <section class="news">
    <div class="container">
      <div class="news__head">
        <NuxtLink to="/" class="btn">Вернуться на главную</NuxtLink>
        <h2>Статьи и размышления о счастье</h2>
        <div class="tags">
          <div class="tags__item" v-for="tag in tags" :key="tag" :class="{ active: selectedTags.includes(tag) }"
            @click="toggleTag(tag)">
            {{ tag }}
          </div>
        </div>
      </div>
      <div class="posts">
        <NewsPost v-for="(post, i) in visiblePosts" :key="i" :post="post" />
      </div>
      <div class="posts__bot" v-if="showButton">
        <button type="button" class="btn-load" @click="toggleShow">
          {{ showAll ? 'Скрыть' : 'Показать ещё' }}
        </button>
      </div>
    </div>
  </section>
  <ContactsBlock class="nobg"/>
  <FooterBlock class="nobg"/>
</template>
<style lang="sass" scoped>
.news
  padding-top: 20px
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
    padding-top: 14px
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