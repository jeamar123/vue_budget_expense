<template>
  <div 
    class="bg-white rounded-md shadow-c-primary"
    :class="[paddingClass]"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Card",

  props: {
    paddingClass: {
      type: String,
      default: 'py-5 px-4'
    }
  },

  data(){
    return  {

    }
  },

  computed: {
    
  },

  methods: {

  },
};
</script>