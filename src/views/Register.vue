<template>
  <div class="flex h-screen bg-white">
    <div class="w-7/12 border-r bg-c-1C5085"></div>
    <div class="w-6/12 flex flex-col">
      <form class="flex-1 flex items-center">
        <div class="mt-20 mb-36 lg:mb-44 xl:mb-60 px-16 lg:px-32 w-full xl:w-10/12 2xl:w-10/12">
          <div class="mb-12">
            <p class="text-3xl font-thin">Create your Account</p>
          </div>

          <div class="mb-4 w-full">
            <label for="" class="text-c-gray font-light block text-sm mb-1">First Name</label>
            <InputGroup
              inputClass="py-1 font-medium text-c-black"
              v-model="formData.first_name"
              :isError="formErrors.first_name"
              autofocus
            />
          </div>

          <div class="mb-4 w-full">
            <label for="" class="text-c-gray font-light block text-sm mb-1">Last Name</label>
            <InputGroup
              inputClass="py-1 font-medium text-c-black"
              v-model="formData.last_name"
              :isError="formErrors.last_name"
            />
          </div>

          <div class="mb-4 w-full">
            <label for="" class="text-c-gray font-light block text-sm mb-1">Email</label>
            <InputGroup
              inputClass="py-1 font-medium text-c-black"
              v-model="formData.email"
              :isError="formErrors.email"
            />
          </div>

          <div class="mb-8 relative">
            <label for="" class="text-c-gray font-light block text-sm mb-1">Password</label>

            <InputGroup
              inputType="password"
              inputClass="py-1 font-medium text-c-black"
              v-model="formData.password"
              :isError="formErrors.password || passwordErr"
            />
          </div>

          <div class="mb-8 relative">
            <label for="" class="text-c-gray font-light block text-sm mb-1">Confirm Password</label>

            <InputGroup
              inputType="password"
              inputClass="py-1 font-medium text-c-black"
              v-model="formData.confirm_password"
              :isError="formErrors.confirm_password || passwordErr"
            />
          </div>

          <div class="flex items-center">
            <div class="w-6/12 mr-5">
              <a href="javascript:void(0)" @click="$router.push({ name: 'Login' })" class="underline text-xs text-c-black">Already have an account? Sign in.</a>
            </div>
            <div class="w-6/12">
              <VButton
                btnStyle="primary"
                btnClass="w-full py-3 rounded-lg"
                @click="submitRegister"
              > 
                Register
              </VButton>
            </div>
          </div>
        </div>
      </form>
    </div>

    <ErrorNotification 
      v-if="error.isShow"
      :message="error.message"
      position="left"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import { REQUEST_REGISTER } from '../store/modules/auth'
import { checkForm, isEmail } from '@/helpers/utils';
import InputGroup from '@/components/common/InputGroup'
import VButton from '@/components/common/VButton'
import ErrorNotification from '@/components/ErrorNotification';

export default {
  name: 'Register',

  components: {
    // Card,
    InputGroup,
    VButton,
    ErrorNotification
  },

  data(){
    return {
      formData: {
        first_name: null,
        last_name: null,
        email: null,
        password: null,
        confirm_password: null,
      },
      formErrors: {},
      passwordErr: false,
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
    isEmail,

    async submitRegister ( ) {
      const { dispatch } = this.$store
      let vm = this

      vm.formErrors = vm.checkForm(vm.formData);
      if(vm.formErrors.errors){ return false; }
      if(!isEmail(vm.formData.email)){ vm.isEmailError = true; return false; }

      if( vm.formData.password != vm.formData.confirm_password ){
        vm.passwordErr = true;
        return false;
      } 

      let params = {
        first_name: vm.formData.first_name,
        last_name: vm.formData.last_name,
        email: vm.formData.email,
        password: vm.formData.password,
      }
      let res = await dispatch(REQUEST_REGISTER, params)
      console.log(res);
      // if(res && res.data.status){
        
      // }
    }
  }
}
</script>
