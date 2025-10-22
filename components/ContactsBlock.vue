<script setup>

</script>
<template>
  <section class="contacts" id="contacts">
    <div class="contacts__bg">
      <div class="container">
        <div class="contacts__form">
          <div class="head">
            <h3>Поделитесь своей историей</h3>
            <p>У вас есть история, которую стоит рассказать? <br>Напишите нам — возможно, именно вы станете героем
              следующего выпуска.</p>
          </div>
          <form class="form">
            <input type="text" placeholder="Имя" class="input">
            <input type="email" placeholder="E-mail" class="input">
            <input type="text" placeholder="Регион" class="input">
            <input type="text" placeholder="Тема/краткое описание" class="input">
            <div class="check">
              <input type="checkbox" name="policy" id="check-policy">
              <label for="check-policy">Даю согласие на обработку <NuxtLink to="/">персональных данных</NuxtLink>
              </label>
            </div>
            <button type="submit" class="btn">Отправить</button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
<style lang="sass" scoped>
.contacts 
  padding: 0 20px
  background: #fff
  &.nobg 
    background: none
  &__bg 
    background: url('/img/bg-contacts.jpg') center center / cover
    border-radius: 16px
    padding-top: 48px
    padding-bottom: 50px
  .container 
    display: flex
    justify-content: flex-end
  &__form  
    max-width: 536px
    width: 100%
    padding: 42px 36px
    border: 1px solid #fff
    background: rgba(255, 255, 255, 0.7)
    backdrop-filter: blur(30px)
    border-radius: 16px
    .head 
      display: flex
      flex-direction: column
      align-items: center
      text-align: center
      justify-content: center
      gap: 26px
      margin-bottom: 51px
      h3 
        font-size: 32px
        line-height: 110%
        font-weight: 500
        color: #2E6CF0
      p 
        font-size: 16px
        line-height: 135%
        color: #616161
  .form 
    display: grid
    grid-template-columns: repeat(2, 1fr)
    gap: 16px
    .input 
      width: 100% 
      font-size: 14px
      line-height: 135%
      color: #3B3B3B
      background: #fff
      text-align: center
      border: 1px solid #E1E5EB
      border-radius: 8px
      padding: 19px 19px 18px
      transition: .3s all
      &:hover, &:focus 
        border-color: #2E6CF0
      &.error 
        color: #EF2727
        border-color: #EF2727
      &:placeholder
        color: #7D7E80
      &:nth-child(3), &:nth-child(4)
        grid-column: 1 / 3
    .btn 
      max-width: 392px
      width: 100%
      grid-column: 1 / 3
      background: #2E6CF0
      border-radius: 100px
      padding: 18px 
      margin: 0 auto
      color: #fff
      font-weight: 500
      font-size: 14px
      line-height: 135%
      border: 1px solid #2E6CF0
      transition: .3s all
      &:hover 
        background: transparent
        color: #2E6CF0
    .check 
      margin-top: 12px
      margin-bottom: 12px
      margin-left: auto
      margin-right: auto
      grid-column: 1 / 3
      input 
        position: absolute
        width: 0
        height: 0
        opacity: 0
      label 
        font-size: 14px
        line-height: 135%
        color: #7D7E80
        cursor: pointer
        position: relative
        padding-left: 33px
        display: block
        a 
          color: #7D7E80
          text-decoration: underline
        &:before 
          background: #fff
          width: 22px
          height: 22px
          content: ''
          border-radius: 50%
          display: inline-block
          position: absolute
          left: 0
          top: -2px
      input:checked + label
        &:before 
          background: url('data:image/svg+xml,<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="22" height="22" rx="11" fill="%232E6CF0"/><path d="M16.2493 8.08324L9.24935 15.0832L6.04102 11.8749L6.86352 11.0524L9.24935 13.4324L15.4268 7.26074L16.2493 8.08324Z" fill="white"/></svg>')
          background-size: cover
@media (max-width: 767px)
  .contacts 
    padding: 0
    .container 
      padding: 0
    &__bg 
      padding: 4px
      padding-top: 203px
      background-position: 40% 0
      background-repeat: no-repeat
      background-size: cover
    &__form 
      max-width: 100%
      padding-top: 26px
      padding-left: 16px
      padding-right: 16px
      padding-bottom: 45px
      .head 
        gap: 16px
        margin-bottom: 18px
        h3 
          font-size: 32px
          font-weight: 600
        p
          font-size: 13px
    .form 
      gap: 8px
      .check 
        margin-top: 16px
        margin-bottom: 16px
        label 
          font-size: 12px
</style>