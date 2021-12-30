<template>

  <div 
    class="w-full h-screen flex"
  >
    <Loader v-if="loader.show"/>

    <Sidemenu/>

    <div class="flex-1">
      <Header />

      <main class="scroll-container overflow-y-auto">
        <router-view @triggerNotif="notification" @triggerLoader="showLoader"></router-view>
      </main>
    </div>

    <Notification 
      v-if="isNotification.show"
      :title="isNotification.title"
      :message="isNotification.message"
    />

    <ErrorNotification 
      v-if="error.isShow"
      :message="error.message"
      position="left"
    />
  </div>

</template>

<style lang="scss">
  .scroll-container{
    height: calc(100vh - 64px);
  }
</style>

<script>
import { mapState } from "vuex";
import Loader from '@/components/common/Loader';
import Header from '@/components/Header';
import Sidemenu from '@/components/Sidemenu';
import Notification from '@/components/common/Notification';
import ErrorNotification from '@/components/ErrorNotification';

export default {
  name: 'Home',

  components: {
    Loader,
    Header,
    Sidemenu,
    Notification,
    ErrorNotification
  },

  data(){
    return {
      loader: {
        show: false,
      },
      isNotification:{
        show: false,
        title: '',
        message: '',
      }
    }
  },

  computed: {
    ...mapState({
      error: (state) => state.error,
    }),
  },

  created(){
  },

  methods: {
    
    showLoader ( status ) {
      let vm = this
      vm.loader.show = status;
    },

    notification(status, obj){
      let vm = this
      vm.isNotification = {
        show: status,
        title: obj.title || '',
        message: obj.message || ''
      };
      
      if(status) setTimeout(() => vm.isNotification.show = false, 3000); 
    },
  }
}
</script>
