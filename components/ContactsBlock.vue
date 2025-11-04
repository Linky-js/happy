<script setup>
import { ref, nextTick, watch } from 'vue'


const name = ref('')
const email = ref('')
const region = ref('')
const topic = ref('')
const policy = ref(false)
const message = ref('')
const loading = ref(false)
const success = ref(false)
const error = ref(null)
const textarea = ref(null)
const submitForm = async () => {
  error.value = null
  success.value = false
  if (!policy.value) {
    error.value = 'Поставьте галочку на согласие обработки данных.'
    return
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email.value)) {
    error.value = 'Введите корректный email.'
    return
  }
  loading.value = true
  try {
    const formData = new FormData()
    formData.append('_wpcf7', '204')
    formData.append('_wpcf7_unit_tag', 'form_123')
    formData.append('_wpcf7_version', '6.1.3')
    formData.append('_wpcf7_locale', 'ru_RU')
    formData.append('your-name', name.value)
    formData.append('your-email', email.value)
    formData.append('your-region', region.value)
    formData.append('your-topic', topic.value)
    const res = await $fetch('https://wp.xn--80aeina8anebeag6dzd.xn--p1ai/wp-json/contact-form-7/v1/contact-forms/204/feedback', {
      method: 'POST',
      body: formData,
    })

    if (res.status === 'mail_sent') {
      success.value = true
      name.value = ''
      email.value = ''
      region.value = ''
      topic.value = ''
      policy.value = false
    } else {
      error.value = res.message || 'Ошибка отправки'
    }
  } catch (err) {
    error.value = 'Ошибка при соединении с сервером'
  } finally {
    loading.value = false
  }
}
const autoResize = () => {
  const el = textarea.value
  if (el) {
    el.style.height = 'auto'
    el.style.height = el.scrollHeight + 'px'
  }
}
watch(topic, async () => {
  await nextTick()
  autoResize()
})
watch(email, (val) => {
  // Удаляем недопустимые символы
  email.value = val.replace(/[^a-zA-Z0-9@._-]/g, '')
})
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

          <form class="form" @submit.prevent="submitForm">
            <input v-model="name" type="text" placeholder="Имя" class="input" required>
            <input v-model="email" type="email" placeholder="E-mail" class="input" required>
            <input v-model="region" type="text" placeholder="Регион" class="input">
            <textarea v-model="topic" rows="1" placeholder="Тема/краткое описание" class="input" @input="autoResize"
              ref="textarea"></textarea>
            <div class="check">
              <input type="checkbox" id="check-policy" v-model="policy">
              <label for="check-policy">
                Даю согласие на обработку <NuxtLink to="/policy">персональных данных</NuxtLink>
              </label>
            </div>

            <button type="submit" class="btn" :disabled="loading">
              {{ loading ? 'Отправка...' : 'Отправить' }}
            </button>

            <p v-if="success" class="success"><span>✅</span> Заявка успешно отправлена!</p>
            <p v-if="error" class="error-text"><span>❌</span> {{ error }}</p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="sass" scoped>
.success 
  display: flex
  align-items: center
  justify-content: center
  gap: 5px
  font-size: 16px
  width: 100%
  grid-column: 1 / 3
.error-text 
  display: flex
  align-items: center
  justify-content: center
  gap: 5px
  font-size: 16px
  width: 100%
  grid-column: 1 / 3
  color: #EF2727
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
    textarea.input 
      resize: none
      height: 58px
      &::-webkit-scrollbar
        display: none
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