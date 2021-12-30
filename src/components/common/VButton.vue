<template>
  <button
    class="font-normal text-center py-2 px-2 rounded-md"
    :class="[
      classes, 
      btnClass
    ]"
    :type="type">
    <slot />
  </button>
</template>

<script>
// ! Note:
// !- there's no default padding so it can support all type of button
// !- create var

export default {
  name: 'VButton',
  props: {
    type: {
      type: String,
      default: 'button' // button | submit | reset
    },
    btnStyle: {
      type: String,
      default: 'default'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    btnClass: {
      type: String,
      default: ''
    },
  },
  computed: {
    classes () {
      return {
        'text-c-primary bg-transparent border border-transparent': this.btnStyle == 'default',
        'text-white bg-gray-500': this.btnStyle == 'dark-default',
        'text-white bg-c-primary': this.btnStyle == 'primary',
        'text-c-primary border border-c-primary': this.btnStyle == 'outline-primary',
      }
    }
  }
}
</script>