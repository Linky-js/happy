<script setup>
import MenuBlock from '~/components/MenuBlock.vue';
import FooterBlock from '~/components/FooterBlock.vue';
const page = useState('homepage', () => null)
const pagePolicy = useState('pagePolicy', () => null)

if (!page.value) {
  const { data } = await useAsyncData('homepage', () =>
    $fetch('https://wp.xn--80aeina8anebeag6dzd.xn--p1ai/wp-json/wp/v2/pages/9?acf_fields=true')
  )
  page.value = data.value
}
if (!pagePolicy.value) {
  const { data } = await useAsyncData('pagePolicy', () =>
    $fetch('https://wp.xn--80aeina8anebeag6dzd.xn--p1ai/wp-json/wp/v2/pages/224?acf_fields=true')
  )
  pagePolicy.value = data.value
}
</script>
<template>
  <section class="policy">
    <MenuBlock :page="page"/>
    <div class="content">
      <div class="container">
        <h2>{{ pagePolicy.title.rendered }}</h2>
        <div class="content__text" v-html="pagePolicy.content.rendered"></div>
      </div>
    </div>
    <FooterBlock/>
  </section>
</template>
<style lang="sass" scoped>
.policy
  background: #fff
.content 
  padding-top: 140px
  padding-bottom: 100px
  .container 
    display: flex
    flex-direction: column
    gap:15px
  &__text 
    display: flex
    flex-direction: column
    gap:15px
    :deep(h2)
      margin-top: 20px
@media (max-width: 767px)
  .content 
    padding-top: 110px
    padding-bottom: 40px
</style>