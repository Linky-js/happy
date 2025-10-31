<script setup>
import MenuBlock from '~/components/MenuBlock.vue';
import FooterBlock from '~/components/FooterBlock.vue';
import ContactsBlock from '~/components/ContactsBlock.vue';

const page = useState('homepage', () => null)
const pageContacts = useState('pageContacts', () => null)

if (!page.value) {
  const { data } = await useAsyncData('homepage', () =>
    $fetch('https://wp.xn--80aeina8anebeag6dzd.xn--p1ai/wp-json/wp/v2/pages/9?acf_fields=true')
  )
  page.value = data.value
}
if (!pageContacts.value) {
  const { data } = await useAsyncData('pageContacts', () =>
    $fetch('https://wp.xn--80aeina8anebeag6dzd.xn--p1ai/wp-json/wp/v2/pages/215?acf_fields=true')
  )
  pageContacts.value = data.value
}
</script>
<template>
  <section class="contacts-page">
    <MenuBlock :page="page" />
    <div class="content">
      <div class="container">
        <h2>{{ pageContacts.title.rendered }}</h2>
        <div class="content__text" v-html="pageContacts.content.rendered">
        </div>
        <div class="content__items">
          <div class="content__item" v-for="item in pageContacts.acf?.kontakty" :key="item">
            <div class="key">{{ item.vyrazhenie }}</div>
            <div class="value">{{ item.znachenie }}</div>
          </div>
        </div>
      </div>
    </div>
    <ContactsBlock :page="page" />
    <FooterBlock />
  </section>
</template>

<style lang="sass" scoped>
.content 
  padding-top: 140px
  padding-bottom: 80px
  background: #fff
  .container 
    display: flex
    flex-direction: column
    gap:24px
  &__text 
    margin-bottom: 20px
  &__items 
    width: 100%
    display: grid
    grid-template-columns: repeat(4, 1fr)
    gap: 20px
  &__item 
    position: relative
    display: flex
    gap: 10px
    align-items: center
    font-size: 18px
    line-height: 130%
    padding-left: 15px
    &::before
      content: ''
      width: 6px
      height: 6px
      border-radius: 50%
      background-color: #2E6CF0
      position: absolute
      left: 0
      top: 50%
      transform: translateY(-50%)
@media (max-width: 1200px)
  .content 
    &__items
      grid-template-columns: repeat(2, 1fr)
@media (max-width: 767px)
  .content 
    padding-top: 110px
    padding-bottom: 48px
  .content__items 
    grid-template-columns: 1fr
    gap: 15px
  .content__item 
    font-size: 14px
    gap:7px
</style>