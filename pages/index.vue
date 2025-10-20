<script setup>
import ObjectsBlock from '~/components/ObjectsBlock.vue';

const { data: page } = await useAsyncData('homepage', () =>
  $fetch(`https://pergament.dmgug.ru/wp-json/wp/v2/pages/9?acf_fields=true`)
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
</script>
<template>
    <h1>Home</h1>
    <ObjectsBlock :page="page"  />
</template>
<style scoped>

</style>