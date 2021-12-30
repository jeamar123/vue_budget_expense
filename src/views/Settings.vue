<template>
  <div class="p-8">
    <div class="flex items-center justify-between mb-8">
      <div class="flex-1"></div>
      <div class="">
        <VButton
          btnStyle="primary"
          btnClass="px-8 py-3 ml-2"
        > 
          Save
        </VButton>
      </div>
    </div>

    <Card class="max-w-sm w-full pb-10">
      <div class="flex items-center justify-between mb-5">
        <h3 class="text-c-gray">Profile</h3>
      </div>

      <div class="flex items-center justify-center mb-5">
        <img :src="'/assets/images/person-1.png'" class="h-40 w-40 border border-gray-300 rounded-full" alt="">
      </div>

      <div class="mb-5 relative">
        <label for="" class="text-c-gray font-light block text-xs">First Name</label>
        <InputGroup
          inputClass="py-1 font-medium text-sm"
          :isError="formErrors.first_name"
          v-model="formData.first_name"
        />
      </div>

      <div class="mb-5 relative">
        <label for="" class="text-c-gray font-light block text-xs">Last Name</label>
        <InputGroup
          inputClass="py-1 font-medium text-sm"
          :isError="formErrors.last_name"
          v-model="formData.last_name"
        />
      </div>

      <div class="mb-5 relative">
        <label for="" class="text-c-gray font-light block text-xs">Email</label>
        <InputGroup
          inputClass="py-1 font-medium text-sm"
          :isError="formErrors.email"
          v-model="formData.email"
        />
      </div>
      
    </Card>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { 
  REQUEST_AUTH_USER,
  REQUEST_USER_UPDATE,
} from '../store/modules/auth'
import { checkForm, isEmail } from '@/helpers/utils';

import Card from '@/components/common/Card'
import InputGroup from '@/components/common/InputGroup'
import VButton from '@/components/common/VButton'

export default {
  name: 'Settings',

  components: {
    Card,
    InputGroup,
    VButton,
  },

  data(){
    return {
      formData: {
        first_name: null,
        last_name: null,
        email: null,
      },
      formErrors: {},
      isEmailError: false,
    }
  },

  computed: {
    ...mapState({
      user: (state) => state.auth.user,
    }),
  },

  async mounted () {
    this.getUserDetails();
  },

  methods: {
    checkForm, 
    isEmail,

    async getUserDetails () {
      const { dispatch } = this.$store
      let vm = this
      vm.$emit('triggerLoader', true);
      await dispatch(REQUEST_AUTH_USER)
      vm.formData = {
        first_name: vm.user.first_name,
        last_name: vm.user.last_name,
        email: vm.user.email,
      }
      console.log(vm.formData);
      vm.$emit('triggerLoader', false);
    },
     
    async updateUserDetails () {
      const { dispatch } = this.$store
      let vm = this

      vm.formErrors = vm.checkForm(vm.formData);
      if(vm.formErrors.errors){ return false; }
      if(!isEmail(vm.formData.email)){ vm.isEmailError = true; return false; }

      let params = {
        first_name: vm.formData.first_name,
        last_name: vm.formData.last_name,
        email: vm.formData.email,
      }
      
      vm.$emit('triggerLoader', true);
      await dispatch(REQUEST_USER_UPDATE, { id: vm.user?.id, data: params})
      vm.$emit('triggerLoader', false);
    },
  }
}
</script>
