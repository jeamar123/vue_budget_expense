<template>
  <div 
    class="custom-notification-container fixed bottom-5 right-5 bg-white rounded-sm shadow-lg px-4 py-3 z-50 text-white" 
    :style="{
      'background-color' : bgColors[Math.floor(Math.random() * bgColors.length)] ,
    }"
  >
    <p class="font-semibold text-sm mb-1">{{ title }}</p>
    <p class="font-light text-sm mb-0">{{ message }}</p>
  </div>
</template>

<style lang="scss">
  .custom-notification-container {
    min-width: 250px;
  }
</style>

<script>
import { bgDarkColors } from '@/config/settings'

export default {
  name: 'Notification',

  props: {
    title:  {
      type: String,
      default: 'Title'
    },
    message: {
      type: String,
      default: 'Message'
    },
  },

  data(){
    return {
      bgColors: bgDarkColors
    }
  },
}
</script>