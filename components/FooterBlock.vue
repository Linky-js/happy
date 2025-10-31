<script setup>

</script>
<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__left">
        <NuxtLink to="/policy">Политика конфиденциальности</NuxtLink>
        <NuxtLink to="/policy">Сookies</NuxtLink>
      </div>
      <div class="footer__right">
        <p>Сайт разработан <a href="">Art factory</a></p>
        <p>© 2025</p>
      </div>
    </div>
  </footer>
</template>

<style lang="sass" scoped>
.footer
  background: #fff
  padding: 36px 0
  &.nobg 
    background: none
  .container 
    display: flex
    align-items: center
    justify-content: space-between
    gap: 15px
  &__left, &__right 
    display: flex
    flex-direction: column
    text-align: left
    gap: 16px
    p, a 
      color: #2E363B
      font-size: 14px
      line-height: 135%
    a:hover 
      text-decoration: underline
  &__right 
    text-align: right
    a 
      color: #2E6CF0
@media (max-width: 767px)
  .footer 
    padding: 36px 0
    .container 
      gap: 48px
      flex-direction: column
      align-items: center
      justify-content: center
    &__left, &__right
      gap: 24px
      text-align: center
    &__right 
      text-align: center
</style>