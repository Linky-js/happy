<script setup>
const props = defineProps({
  linkVideo: { type: String, required: true },
})

const emit = defineEmits(["close"]);
</script>
<template>
  <div class="modal" @click.self="emit('close')">
    <div class="modal__content">
      <div class="modal__close" @click="emit('close')">
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0.5" y="0.5" width="29" height="29" rx="14.5" fill="#EBECF0" />
          <rect x="0.5" y="0.5" width="29" height="29" rx="14.5" stroke="#DBDBDB" />
          <path
            d="M11.2663 18.6654L10.333 17.732L14.0663 13.9987L10.333 10.2654L11.2663 9.33203L14.9997 13.0654L18.733 9.33203L19.6663 10.2654L15.933 13.9987L19.6663 17.732L18.733 18.6654L14.9997 14.932L11.2663 18.6654Z"
            fill="#696969" />
        </svg>
      </div>
      <iframe :src="linkVideo" style="border: none;" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
        allowfullscreen></iframe>
    </div>
  </div>
</template>
<style lang="sass" scoped>
.modal 
  position: fixed
  top: 0
  left: 0
  width: 100%
  height: 100%
  background: rgba(0, 0, 0, 0.5)
  backdrop-filter: blur(8px)
  display: flex
  justify-content: center
  align-items: center
  z-index: 1000
  padding: 20px
  &__content 
    position: relative
    max-height: 760px
    height: 100%
    max-width: 1353px
    width: 100%
    border-radius: 20px
    iframe 
      width: 100%
      border-radius: 20px
      height: 100%
      object-fit: cover
  &__close 
    width: 44px
    height: 44px
    border-radius: 12px
    background: #fff
    border: 1px solid #fff
    display: flex
    align-items: center
    justify-content: center
    position: absolute
    top: -54px
    right: 0
    cursor: pointer
@media (max-width: 1400px)
  .modal__content 
    max-height: 600px
@media (max-height: 600px)
  .modal__close 
    top: 0px
@media (max-width: 767px)
  .modal__content 
    max-height: 200px
    max-width: 335px
</style>