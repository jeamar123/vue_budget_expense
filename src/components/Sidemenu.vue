<template>
  <div class="shadow-lg z-50 w-16 h-full bg-white px-3 py-3 text-center flex flex-col justify-between">
    <div class="">
      <div class="h-12 w-full border-b border-gray-300"></div>

      <router-link :to="{ name: 'Home' }" class="my-6 block">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-7 mx-auto hover:text-c-black" viewBox="0 0 20 20" fill="currentColor"
          :class="{
            'text-c-black' : $route.name == 'Home',
            'text-c-D1D5DB' : $route.name != 'Home',
          }"
        >
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
      </router-link>

      <router-link :to="{ name: 'Transactions' }" class="my-6 block">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-7 mx-auto hover:text-c-black" viewBox="0 0 20 20" fill="currentColor"
          :class="{
            'text-c-black' : $route.name == 'Transactions',
            'text-c-D1D5DB' : $route.name != 'Transactions',
          }"
        >
          <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd" />
        </svg>
      </router-link>
      
      <router-link :to="{ name: 'Income' }" class="my-6 block">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-7 mx-auto hover:text-c-black" viewBox="0 0 20 20" fill="currentColor"
          :class="{
            'text-c-black' : $route.name == 'Income',
            'text-c-D1D5DB' : $route.name != 'Income',
          }"
        >
          <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clip-rule="evenodd" />
        </svg>
      </router-link>

      <router-link :to="{ name: 'Categories' }" class="my-6 block">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-7 mx-auto hover:text-c-black" viewBox="0 0 20 20" fill="currentColor"
          :class="{
            'text-c-black' : $route.name == 'Categories',
            'text-c-D1D5DB' : $route.name != 'Categories',
          }"
        >
          <path fill-rule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clip-rule="evenodd" />
        </svg>
      </router-link>
      
      <router-link :to="{ name: 'Budgets' }" class="my-6 block">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-7 mx-auto hover:text-c-black" fill="none" viewBox="0 0 24 24" stroke="currentColor"
          :class="{
            'text-c-black' : $route.name == 'Budgets',
            'text-c-D1D5DB' : $route.name != 'Budgets',
          }"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
        </svg>    
      </router-link>

    </div>




    <div>
      <router-link :to="{ name: 'Settings' }" class="my-4 block">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-7 mx-auto hover:text-c-black" viewBox="0 0 20 20" fill="currentColor"
          :class="{
            'text-c-black' : $route.name == 'Settings',
            'text-c-D1D5DB' : $route.name != 'Settings',
          }"
        >
          <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
        </svg>
      </router-link>
      <a href="javascript:void(0)" @click="isConfirmLogoutShow = true" class="my-4 block">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-7 mx-auto text-c-D1D5DB hover:text-c-black" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clip-rule="evenodd" />
        </svg>
      </a>
    </div>

    <VModal v-if="isConfirmLogoutShow" title="Confirm" @close="isConfirmLogoutShow = false" @confirm="logout" class="text-left">
      <template v-slot:body>
        Are you sure you want to logout?
      </template>
    </VModal>
  </div>
</template>

<script>
import { 
  REQUEST_LOGOUT
} from '../store/modules/auth'
import VModal from '@/components/common/VModal'

export default {
  name: 'Sidemenu',

  props: {
    
  },

  components: {
    VModal
  },

  data() {
    return {
      isConfirmLogoutShow: false,
    }
  },

  computed: {
    
  },

  created(){
   
  },

  watch: {
    async $route() {
      
    }
  },

  methods: {
    async logout () {
      const { dispatch } = this.$store
      let vm = this
      vm.$emit('triggerLoader', true);
      let response = await dispatch(REQUEST_LOGOUT)
      if(response.data.status){
        vm.$router.push({ name: 'Login' });
      }
      vm.$emit('triggerLoader', false);
    },
  },
}
</script>
