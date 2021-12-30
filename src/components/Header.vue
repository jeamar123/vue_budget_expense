<template>
  <header 
    class="w-full z-10 relative shadow-sm bg-white "
  >
    <div class="mx-auto h-16 flex items-center px-5">
      <div class="flex items-center">
        <svg @click="$router.push({ name: 'Home' })" class="h-5 w-5 text-gray-600 cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        <svg class="h-4 w-4 mx-1 text-gray-600"  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
        <h5 class="">{{ $route.name == 'Home' ? 'Dashboard' : $route.name }}</h5>
      </div>
      <div class="flex-1"></div>
      <div class="flex items-center">
        <div class="mx-5 relative cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>

          <span class="h-4 w-4 flex items-center justify-center text-xs leading-none inline-block rounded-full bg-red-500 text-white absolute bottom-0 -right-1">3</span>
        </div>
        <div class="">
          <h4 class="">Hi, {{ user.first_name }}</h4>
        </div>
        <div class="flex-none ml-4 user-img relative user-header-toggle">
          <div class="flex items-center cursor-pointer">
            <div class="img-container flex-1">
              <img @click="$router.push({ name: 'Settings' })" :src="'/assets/images/person-1.png'" class="h-9 w-9 border border-gray-300 rounded-full" alt="">
            </div>
            <!-- <svg class="w-3 h-3 text-gray-400 mx-2" width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.00003 5.16528L7.50586 1.65945L6.68103 0.834033L3.99769 3.51737L1.31436 0.834033L0.49361 1.65945L4.00003 5.16528Z" fill="#2E3A59"/>
            </svg> -->
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapState } from "vuex";
import { REQUEST_AUTH_USER } from '../store/modules/auth'

export default {
  name: 'Header',

  props: {
    
  },

  components: {
  },

  data() {
    return {
      timeNow: this.$moment().format('hh:mm:ss'),
      dateToday: this.$moment().format('DD MMM YYYY'),
    }
  },

  computed: {
    ...mapState({
      user: (state) => state.auth.user,
    }),
  },

  mounted(){
    this.onReady();
  },

  watch: {
    async $route() {
      
    }
  },

  methods: {
    async onReady () {
      const { dispatch } = this.$store
      await dispatch(REQUEST_AUTH_USER)
    },
  },
}
</script>
