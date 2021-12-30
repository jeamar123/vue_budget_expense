<template>

  <div class="p-8">
    <div class="flex items-center justify-between mb-8">
      <div class="flex-1"></div>
      <div class="">
        <VButton
          btnStyle="primary"
          btnClass="px-8 py-3 ml-2"
          @click="isAdd = true;isEdit = false;formData = { name: null }"
        > 
          Add Category
        </VButton>
      </div>
    </div>

    <div class="flex w-full gap-8">

      <Card class="max-w-xl min-w-500px w-1/3 min-h-300px">
        <div class="flex items-center justify-between mb-5">
          <h3 class="text-c-gray">Categories</h3>
        </div>
        
        <table class="w-full">
          <thead>
            <tr>
              <th class="px-5 py-3 bg-c-F6F6FB text-left w-20">ID</th>
              <th class="px-5 py-3 bg-c-F6F6FB text-left">Name</th>
              <th class="px-5 py-3 bg-c-F6F6FB text-left w-32"></th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="(list, index) in categories" 
              :key="list.index"
            >
              <td class="py-4 px-5" :class="{'border-t border-c-EBEBEB': index != 0}">{{ list.id }}</td>
              <td class="py-4 px-5" :class="{'border-t border-c-EBEBEB': index != 0}">{{ list.name }}</td>
              <td class="py-4 px-5" :class="{'border-t border-c-EBEBEB': index != 0}">
                <div class="flex items-center gap-5">
                  <a @click="editCategory(list)" href="javascript:void(0)" class="underline text-c-green text-xxs">Edit</a>
                  <a @click="deleteCategory(list)" href="javascript:void(0)" class="underline text-c-red text-xxs">Remove</a>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </Card>

      <div v-if="isAdd || isEdit" class="w-80">
        <Card>
          <h3 class="text-c-gray mb-9">{{ isEdit ? 'Update' : 'Create' }} Category</h3>

          <InputGroup
            inputClass="py-1 placeholder-gray-200"
            placeholder="Name"
            v-model="formData.name"
          />

          <div class="flex items-center justify-end mt-8">
            <VButton
              btnStyle="default"
              btnClass="px-6 py-2 ml-1"
              @click="isAdd = false;isEdit = false;"
            > 
              Cancel
            </VButton>
            <VButton
              btnStyle="primary"
              btnClass="px-6 py-2 ml-1"
              @click="saveCategory"
            > 
              Save
            </VButton>
          </div>
        </Card>
      </div>
    </div>

    <VModal v-if="isConfirmDeleteShow" title="Confirm" @close="isConfirmDeleteShow = false" @confirm="removeCategory">
      <template class="" v-slot:body>
        Are you sure you want to remove this category?
      </template>
    </VModal>
  </div>

</template>

<script>
import { mapState } from "vuex";
import { 
  REQUEST_CATEGORY_LIST,
  REQUEST_CATEGORY_ADD,
  REQUEST_CATEGORY_UPDATE,
  REQUEST_CATEGORY_DELETE,
} from '../store/modules/category'
import { checkForm } from '@/helpers/utils';

import Card from '@/components/common/Card'
import InputGroup from '@/components/common/InputGroup'
import VButton from '@/components/common/VButton'
import VModal from '@/components/common/VModal'

export default {
  name: 'Categories',

  components: {
    Card,
    InputGroup,
    VButton,
    VModal,
  },

  data(){
    return {
      isAdd: false,
      isEdit: false,
      formData: {
        name: null
      },
      formErrors: {},
      isConfirmDeleteShow: false,
    }
  },

  computed: {
    ...mapState({
      categories: (state) => state.category.items,
      user: (state) => state.auth.user,
    }),
  },

  mounted () {
    this.getCategoryList();
  },

  methods: {
    checkForm,

    async getCategoryList () {
      const { dispatch } = this.$store
      let vm = this
      vm.$emit('triggerLoader', true);
      await dispatch(REQUEST_CATEGORY_LIST)
      vm.$emit('triggerLoader', false);
    },

    async saveCategory () {
      const { dispatch } = this.$store
      let vm = this

      vm.formErrors = vm.checkForm(vm.formData);
      if(vm.formErrors.errors){ return false; }
      
      let params = {
        name: vm.formData.name
      }
      vm.$emit('triggerLoader', true);
      if(vm.isEdit){
        await dispatch(REQUEST_CATEGORY_UPDATE, { id: vm.formData.id, data: params })
      }else{
        await dispatch(REQUEST_CATEGORY_ADD, params)
      }
      vm.$emit('triggerLoader', false);
      vm.formData = { name: null };
      vm.isEdit = false;
    },

    async removeCategory () {
      const { dispatch } = this.$store
      let vm = this

      vm.$emit('triggerLoader', true);
      await dispatch(REQUEST_CATEGORY_DELETE, { id: vm.formData.id })
      vm.$emit('triggerLoader', false);
      vm.formData = { name: null }
      vm.isConfirmDeleteShow = false;
    },

    editCategory (obj) {
      let vm = this
      vm.formData = { 
        name: obj.name, 
        id: obj.id 
      };
      vm.isAdd = false;
      vm.isEdit = true;
    },

    deleteCategory (obj) {
      let vm = this
      vm.formData = obj;
      vm.isAdd = false;
      vm.isEdit = false;
      vm.isConfirmDeleteShow = true;
    }
    
    
  }
}
</script>
