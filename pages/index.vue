<script setup>
import { onMounted } from 'vue';
import MainBlock from '~/components/MainBlock.vue';
import Videosblock from '~/components/Videosblock.vue';
import ObjectsBlock from '~/components/ObjectsBlock.vue';
import HistoryBlock from '~/components/HistoryBlock.vue';
import NewsBlock from '~/components/NewsBlock.vue';
import AboutBlock from '~/components/AboutBlock.vue';
import ContactsBlock from '~/components/ContactsBlock.vue';
import FooterBlock from '~/components/FooterBlock.vue';
const { data: page } = await useAsyncData('homepage', () =>
  $fetch(`https://wp.xn--80aeina8anebeag6dzd.xn--p1ai/wp-json/wp/v2/pages/9?acf_fields=true`)
);
const { data: videos, pending, error } = await useAsyncData('videos', () =>
  $fetch('https://wp.xn--80aeina8anebeag6dzd.xn--p1ai/wp-json/wp/v2/video?per_page=100')
);

// const { data: projects } = await useAsyncData('projects', () =>
//   $fetch('https://pergament.dmgug.ru/wp-json/wp/v2/project?per_page=4&_embed&acf_fields=true')
// );
async function getImageUrl(id) {
  if (!id) return null;
  try {
    const res = await $fetch(
      `https://pergament.dmgug.ru/wp-json/wp/v2/media/${id}`
    );
    return res.source_url;
  } catch (error) {
    console.error("Ошибка при получении изображения:", error);
    return null;
  }
}
onMounted(() => {
  console.log('page', page);
  
})
</script>
<template>
  <MainBlock />
  <Videosblock />
  <ObjectsBlock :page="page" />
  <HistoryBlock :videos="videos" />
  <NewsBlock :title="'Статьи и размышления о счастье'" :text="'Где живёт счастье? Как его найти и сохранить? Здесь мы делимся личными историями, очерками, наблюдениями и рассуждениями о том, что делает людей по-настоящему счастливыми в России.'"/>
  <AboutBlock />
  <ContactsBlock />
  <FooterBlock />
</template>
<style scoped></style>