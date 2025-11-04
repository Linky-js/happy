<script setup>
import MainBlock from '~/components/MainBlock.vue'
import Videosblock from '~/components/Videosblock.vue'
import ObjectsBlock from '~/components/ObjectsBlock.vue'
import HistoryBlock from '~/components/HistoryBlock.vue'
import NewsBlock from '~/components/NewsBlock.vue'
import AboutBlock from '~/components/AboutBlock.vue'
import ContactsBlock from '~/components/ContactsBlock.vue'
import FooterBlock from '~/components/FooterBlock.vue'

// Состояния (глобальные между страницами)
const page = useState('homepage', () => null)
const videos = useState('videos', () => [])

// Если данных ещё нет — загружаем
if (!page.value) {
  const { data } = await useAsyncData('homepage', () =>
    $fetch('https://wp.xn--80aeina8anebeag6dzd.xn--p1ai/wp-json/wp/v2/pages/9?acf_fields=true')
  )
  page.value = data.value
}

if (videos.value.length === 0) {
  const { data } = await useAsyncData('videos', () =>
    $fetch('https://wp.xn--80aeina8anebeag6dzd.xn--p1ai/wp-json/wp/v2/video?per_page=100&_embed=true&acf_fields=true')
  )
  videos.value = data.value
}
</script>
<template>
  <Head>
    <Title>{{ page.acf?.titlemeta }}</Title>
    <Meta name="description" :content="page.acf?.descriptionmeta" />
    <Meta name="keywords" :content="page.acf?.keywordsmeta" />
    <Meta property="og:title" :content="page.acf?.titlemeta" />
    <Meta property="og:description" :content="page.acf?.descriptionmeta" />
    <Meta property="og:url" :content="page.acf?.urlmeta" />
    <Meta property="og:type" content="website" />
  </Head>
  <main>
    <MainBlock :page="page"/>
    <Videosblock :page="page"/>
    <ObjectsBlock :page="page" />
    <HistoryBlock v-if="videos && videos.length > 0" :page="page" />
    <NewsBlock :title="'Статьи и размышления о счастье'" :text="'Где живёт счастье? Как его найти и сохранить? Здесь мы делимся личными историями, очерками, наблюдениями и рассуждениями о том, что делает людей по-настоящему счастливыми в России.'"/>
    <AboutBlock :page="page"/>
    <ContactsBlock :page="page"/>
    <FooterBlock />
  </main>
</template>
<style scoped></style>