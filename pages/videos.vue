<script setup>
import HistoryBlock from '~/components/HistoryBlock.vue';
import MenuBlock from '~/components/MenuBlock.vue';
import FooterBlock from '~/components/FooterBlock.vue';
// Глобальные состояния
const page = useState('homepage', () => null)
const videos = useState('videos', () => [])
const regions = useState('regions', () => [])
// Если данных нет (напрямую перешли по ссылке) — загружаем
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

if (regions.value.length === 0) {
  const { data } = await useAsyncData('regions', () =>
    $fetch('https://wp.xn--80aeina8anebeag6dzd.xn--p1ai/wp-json/wp/v2/region?per_page=100')
  );
  regions.value = data.value
}

</script>

<template>
  <section class="videos-page">
    <MenuBlock :page="page" />
    <HistoryBlock :page="page" />
    <FooterBlock />
  </section>
</template>