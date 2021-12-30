<template>
  <div class="flex h-screen bg-white">
    <div class="w-6/12 flex flex-col">
      <form class="flex-1 flex items-center">
        <div class="mt-20 mb-36 lg:mb-44 xl:mb-60 px-16 lg:px-32 w-full xl:w-10/12 2xl:w-10/12">
          <div class="mb-12">
            <p class="text-3xl font-thin">Login</p>
          </div>

          <div class="mb-4 w-full">
            <label for="" class="text-c-gray font-light block text-sm mb-1">Email/username</label>
            <InputGroup
              inputClass="py-1 font-medium text-c-black"
              v-model="formData.email"
              :isError="formErrors.email"
              autofocus
            />
          </div>

          <div class="mb-8 relative">
            <label for="" class="text-c-gray font-light block text-sm mb-1">Password</label>

            <InputGroup
              inputType="password"
              inputClass="py-1 font-medium text-c-black"
              :isError="formErrors.password"
              v-model="formData.password"
            />
          </div>

          <div class="flex items-center">
            <div class="w-6/12 mr-5">
              <a href="javascript:void(0)" @click="$router.push({ name: 'Register' })" class="underline text-xs text-c-black">No Account yet? Create one.</a>
            </div>
            <div class="w-6/12">
              <VButton
                btnStyle="primary"
                btnClass="w-full py-3 rounded-lg"
                @click="submitLogin"
              > 
                Go
              </VButton>
              
            </div>
          </div>
        </div>
      </form>
    </div>
    <div class="w-7/12 border-l bg-c-1C5085"></div>

    <ErrorNotification 
      v-if="error.isShow"
      :message="error.message"
      position="left"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import { REQUEST_LOGIN } from '../store/modules/auth'
import { checkForm } from '@/helpers/utils';
import InputGroup from '@/components/common/InputGroup'
import VButton from '@/components/common/VButton'
import ErrorNotification from '@/components/ErrorNotification';

export default {
  name: 'Login',

  components: {
    // Card,
    InputGroup,
    VButton,
    ErrorNotification
  },

  data(){
    return {
      formData: {
        email: null,
        password: null
      },
      formErrors: {},
    }
  },

  computed: {
    ...mapState({
      error: (state) => state.error,
    }),
  },

  mounted () {
  },

  methods: {
    checkForm,

    async submitLogin ( ) {
      const { dispatch } = this.$store
      let vm = this

      vm.formErrors = vm.checkForm(vm.formData);
      if(vm.formErrors.errors){ return false; }

      let params = {
        email: vm.formData.email,
        password: vm.formData.password,
      }
      let res = await dispatch(REQUEST_LOGIN, params)
      if(res && res.data.status){
        vm.$router.push({ name: 'Home' });
      }
    }
  }
}
</script>
