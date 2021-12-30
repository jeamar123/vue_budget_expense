<template>
  <div class="fixed left-0 top-0 w-full h-full bg-black bg-opacity-40 flex flex-col items-center justify-center text-white" style="z-index: 99999">
    <img v-if="image != ''" :src="image" alt="" class="w-60 mb-5">
    processing ...
  </div>
</template>

<script>
export default {
  name: "Loader",

  props: {
    image: {
      type: String,
      default: ''
    },
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