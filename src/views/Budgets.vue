<template>

  <div class="p-8">
    <div class="flex items-center justify-between mb-8">
      <div class="">
        <DateSelector 
          dateType="month"
          :value="selectedMonthYear"
          @onChange="dateChanged"
        />
      </div>
      <div class="">
        <VButton
          v-if="isEdit"
          btnStyle="default"
          btnClass="px-8 py-3 underline ml-2"
          @click="cancelEdit"
        > 
          Cancel
        </VButton>
        <VButton
          btnStyle="primary"
          btnClass="px-8 py-3 ml-2"
          @click="toggleEditSave"
        > 
          {{ isEdit ? 'Save' : 'Update Budget' }}
        </VButton>
      </div>
    </div>

    <div class="max-w-xl">
      <Card class="mb-8">
        <div class="flex items-center justify-between mb-5">
          <h3 class="text-c-gray">Planned</h3>
        </div>
        
        <table class="w-full">
          <thead>
            <tr>
              <th class="px-5 py-3 bg-c-F6F6FB font-medium text-left">Items</th>
              <th class="pl-5 py-3 bg-c-F6F6FB font-medium text-left w-40"></th>
            </tr>
          </thead>
          <tbody class="font-medium">
            <tr v-for="(list, index) in planned" :key="list.index">
              <td class="px-5 py-4 border-b border-transparent" :class="{ 'border-c-EBEBEB' : !isEdit && index == 0 }">
                {{ capitalize(list.name) }}
              </td>
              <td class="pl-5 py-4 border-b border-transparent text-right" :class="{ 'border-c-EBEBEB' : !isEdit && index == 0 }">
                <div v-if="!isEdit" class="">{{ currencyFilter(list.amount) }}</div>
                <InputGroup
                  v-if="isEdit"
                  inputClass="text-right"
                  :isError="showErrors && !editPlannedArr[index].amount"
                  v-model="editPlannedArr[index].amount"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </Card>

      <Card class="mb-8">
        <div class="flex items-center justify-between mb-5">
          <h3 class="text-c-gray">Budgets</h3>
        </div>
        
        <table class="w-full">
          <thead>
            <tr>
              <th class="px-5 py-3 bg-c-F6F6FB font-medium text-left">Name</th>
              <th class="px-5 py-3 bg-c-F6F6FB font-medium text-left"></th>
              <th v-if="isEdit" class="px-5 py-3 bg-c-F6F6FB font-medium text-left"></th>
            </tr>
          </thead>
          <tbody v-if="categories.length == 0">
            <tr>
              <td class="px-5 py-4 text-center" colspan="2">
                <a @click="$router.push({ name: 'Categories' })" class="underline text-c-66A5D4 italic cursor-pointer">Create at least one category first.</a>
              </td>
            </tr>
          </tbody>
          <tbody v-if="categories.length > 0" class="font-medium">
            <tr v-for="(list, index) in budgets" :key="list.index">
              <td class="px-5 py-4 border-b border-transparent" :class="{ 'border-c-EBEBEB' : !isEdit && index != budgets.length-1 }">
                <div v-if="!isEdit" class="">{{ capitalize(list.name) }}</div>
                <div v-if="isEdit" class="category-drop-wrapper relative">
                  <div class="relative" @click="toggleDrop(list, budgets, !list.isShowCategoryPicker)">
                    <InputGroup
                      inputClass="cursor-pointer outline-none"
                      :isError="showErrors && !editArr[index].name"
                      v-model="editArr[index].name"
                      readonly
                    />
                    <svg class="absolute right-0 top-2" width="9" height="5" viewBox="0 0 9 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M0.969834 0.469811C1.11048 0.329208 1.30121 0.250221 1.50008 0.250221C1.69896 0.250221 1.88969 0.329208 2.03033 0.469811L4.50008 2.93956L6.96983 0.469811C7.03902 0.398178 7.12178 0.341042 7.21328 0.301735C7.30478 0.262428 7.4032 0.241738 7.50278 0.240873C7.60237 0.240008 7.70113 0.258984 7.7933 0.296694C7.88547 0.334405 7.96921 0.390095 8.03963 0.460515C8.11005 0.530934 8.16574 0.614673 8.20345 0.706845C8.24116 0.799018 8.26014 0.897777 8.25927 0.997362C8.25841 1.09695 8.23772 1.19536 8.19841 1.28686C8.1591 1.37837 8.10197 1.46113 8.03033 1.53031L5.03033 4.53031C4.88969 4.67091 4.69896 4.7499 4.50008 4.7499C4.30121 4.7499 4.11048 4.67091 3.96983 4.53031L0.969834 1.53031C0.829231 1.38967 0.750244 1.19893 0.750244 1.00006C0.750244 0.801188 0.829231 0.610457 0.969834 0.469811Z" fill="#898989"/>
                    </svg>
                  </div>

                  <ul v-if="list.isShowCategoryPicker" class="absolute top-7 w-full bg-white border border-c-EBEBEB overflow-auto max-h-150px c-scrollbar z-50 shadow-c-primary">
                    <li v-for="cat in categories" :key="cat.index" class="border-b border-c-EBEBEB p-3 cursor-pointer" @click="setCategory(editArr[index], cat)">{{ cat.name }}</li>
                  </ul>
                </div>
              </td>
              <td class="pl-5 py-4 border-b border-transparent text-right" :class="{ 'border-c-EBEBEB' : !isEdit && index != budgets.length-1 }">
                <div v-if="!isEdit" class="">{{ currencyFilter(list.amount) }}</div>
                <InputGroup
                  v-if="isEdit"
                  placeholder="0"
                  inputClass="text-right"
                  :isError="showErrors && !editArr[index].amount"
                  v-model="editArr[index].amount"
                />
              </td>
              <td v-if="isEdit" class="px-5 py-4 border-b border-transparent text-right" :class="{ 'border-c-EBEBEB' : !isEdit }">
                <a @click="selectedBudget = list;isConfirmDeleteShow = true;" href="javascript:void(0)" class="underline text-c-red text-xxs">Remove</a>
              </td>
            </tr>
          </tbody>

          <!-- For Adding New Income -->
          <tbody class="font-medium" v-if="isEdit">
            <tr v-for="(list, index) in newArr" :key="list.index">
              <td class="px-5 py-4 border-b border-transparent">
                <div class="category-drop-wrapper relative">
                  <div class="relative" @click="toggleDrop(list, newArr, !list.isShowCategoryPicker)">
                    <InputGroup
                      inputClass="cursor-pointer outline-none"
                      :isError="showErrors && !list.name"
                      v-model="list.name"
                      readonly
                    />
                    <svg class="absolute right-0 top-2" width="9" height="5" viewBox="0 0 9 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M0.969834 0.469811C1.11048 0.329208 1.30121 0.250221 1.50008 0.250221C1.69896 0.250221 1.88969 0.329208 2.03033 0.469811L4.50008 2.93956L6.96983 0.469811C7.03902 0.398178 7.12178 0.341042 7.21328 0.301735C7.30478 0.262428 7.4032 0.241738 7.50278 0.240873C7.60237 0.240008 7.70113 0.258984 7.7933 0.296694C7.88547 0.334405 7.96921 0.390095 8.03963 0.460515C8.11005 0.530934 8.16574 0.614673 8.20345 0.706845C8.24116 0.799018 8.26014 0.897777 8.25927 0.997362C8.25841 1.09695 8.23772 1.19536 8.19841 1.28686C8.1591 1.37837 8.10197 1.46113 8.03033 1.53031L5.03033 4.53031C4.88969 4.67091 4.69896 4.7499 4.50008 4.7499C4.30121 4.7499 4.11048 4.67091 3.96983 4.53031L0.969834 1.53031C0.829231 1.38967 0.750244 1.19893 0.750244 1.00006C0.750244 0.801188 0.829231 0.610457 0.969834 0.469811Z" fill="#898989"/>
                    </svg>
                  </div>

                  <ul v-if="list.isShowCategoryPicker" class="absolute top-7 w-full bg-white border border-c-EBEBEB overflow-auto max-h-150px c-scrollbar z-50 shadow-c-primary">
                    <li v-for="cat in categories" :key="cat.index" class="border-b border-c-EBEBEB p-3 cursor-pointer" @click="setCategory(list, cat)">{{ cat.name }}</li>
                  </ul>
                </div>
              </td>
              <td class="pl-5 py-4 border-b border-transparent text-right">
                <InputGroup
                  placeholder="0"
                  inputClass="text-right"
                  :isError="showErrors && !list.amount"
                  v-model="list.amount"
                />
              </td>
              <td class="px-5 py-4 border-b border-transparent text-right">
                <a @click="removeRow(newArr, index)" href="javascript:void(0)" class="underline text-c-red text-xxs">Remove</a>
              </td>
            </tr>
          </tbody>
        </table>
      </Card>
      
      <div v-if="isEdit && categories.length > 0 && budgets.length != 3" class="flex justify-end max-w-5xl mt-5">
        <VButton
          btnStyle="primary"
          btnClass="px-8 py-3"
          @click="addNewRow"
        > 
          Add
        </VButton>
      </div>
    </div>

    <VModal v-if="isConfirmDeleteShow" title="Confirm" @close="isConfirmDeleteShow = false" @confirm="removeBudget">
      <template class="" v-slot:body>
        Are you sure you want to remove this budget?
      </template>
    </VModal>
  </div>

</template>

<script>
import { mapState } from "vuex";
import { 
  REQUEST_BUDGET_DETAILS,
  REQUEST_BUDGET_BULK_UPDATE,
  REQUEST_BUDGET_DELETE
} from '../store/modules/budget'
import { REQUEST_CATEGORY_LIST } from '../store/modules/category'
import { 
  checkForm, 
  currencyFilter,
  objToURLParams,
  checkOutsideClick,
  setValueInsideArrObj,
  capitalize
} from '@/helpers/utils';

import Card from '@/components/common/Card'
import VButton from '@/components/common/VButton'
import InputGroup from '@/components/common/InputGroup'
import VModal from '@/components/common/VModal'

import DateSelector from '@/components/Dashboard/DateSelector'

export default {
  name: 'Budgets',

  components: {
    Card,
    VButton,
    InputGroup,
    VModal,
    DateSelector
  },

  data(){
    return {
      datePickerMasks: {
        input: 'MMM DD, YYYY',
      },
      isEdit: false,
      isShowMonthPicker: false,
      selectedMonthYear: new Date(),
      editPlannedArr: [],
      editArr: [],
      saveArr: [],
      newArr: [],
      showErrors: false,
      isConfirmDeleteShow: false,
      selectedBudget: {},
    }
  },

  computed: {
    ...mapState({
      user: (state) => state.auth.user,
      categories: (state) => state.category.items,
      budgets: (state) => state.budget.budgets,
      planned: (state) => state.budget.planned,
    }),
  },

  mounted () {
    this.getBudgetList();
    this.getCategoryList();
    this.initClickOutsideListener();
  },

  methods: {
    currencyFilter,
    checkForm,
    objToURLParams,
    checkOutsideClick,
    setValueInsideArrObj,
    capitalize,

    /*
      * For ShowHide Toggle Event Listeners
      */
    initClickOutsideListener ()	{
      let vm = this

      // If no parent class found on click, close all dropdowns
      window.addEventListener("click", function(e){
        let check = vm.checkOutsideClick(e, '.category-drop-wrapper');
        if(!check){
          vm.hideAllDropdowns();
        }

        let checkMonthDrop = vm.checkOutsideClick(e, '.month-drop-wrapper');
        if(!checkMonthDrop){
          vm.isShowMonthPicker = false;
        }
      });
    },

    hideAllDropdowns () {
      let vm = this
      vm.setValueInsideArrObj(vm.budgets, 'isShowCategoryPicker', false);
      vm.setValueInsideArrObj(vm.newArr, 'isShowCategoryPicker', false);
    },

    toggleDrop (obj, array, value) {
      let vm = this
      vm.setValueInsideArrObj(array, 'isShowCategoryPicker', false);
      obj.isShowCategoryPicker = value;
    },

    setCategory (obj, category) {
      let vm = this
      obj.category = category;
      obj.category_id = category.id;
      obj.name = category.name;
      vm.hideAllDropdowns();
    },

    dateChanged (ev) {
      let vm = this
      vm.selectedMonthYear = new Date(ev.start);
      vm.newArr = []
      vm.isEdit = false;
      vm.getBudgetList();
    },

    monthSelected (ev) {
      let vm = this
      vm.selectedMonthYear = new Date(this.$moment(ev.start).startOf('month'));
      vm.isShowMonthPicker = false;
      vm.getBudgetList();
    },

    cancelEdit () {
      let vm = this
      vm.newArr = []
      vm.isEdit = false;
      vm.showErrors = false;
    },

    toggleEditSave () {
      let vm = this
      let payload = {
        planned: [],
        budgets: [],
      };
      
      if(!vm.isEdit){ 
        vm.editPlannedArr = []; 
        vm.planned.forEach(item => {
          vm.editPlannedArr.push({
            id: item.id,
            amount: item.amount,
            name: item.name,
            date: item.date,
          });
        });

        vm.editArr = []; 
        vm.budgets.forEach(item => {
          vm.editArr.push({
            id: item.id,
            amount: item.amount,
            name: item.name,
            date: item.date,
            category: item.category,
            category_id: item.category_id
          });
        });
        vm.isEdit = true;
        return false;  
      }

      vm.editPlannedArr.forEach(item => {
        let params = {
          id: item.id,
          date: item.date,
          amount: item.amount,
          name: item.name,
        }
        let check = vm.checkForm(params);
        if(check.errors){ vm.showErrors = true; return false; }
        payload.planned.push(params);
      });
      
      vm.editArr.forEach(item => {
        let params = {
          id: item.id,
          date: item.date,
          amount: item.amount,
          name: item.name,
          category: item.category,
          category_id: item.category_id
        }
        let check = vm.checkForm(params);
        if(check.errors){ vm.showErrors = true; return false; }
        payload.budgets.push(params);
      });

      vm.newArr.forEach(item => {
        let params = {
          date: this.$moment().format('YYYY-MM-DD'),
          amount: item.amount,
          name: item.name,
          category: item.category,
          category_id: item.category_id
        }
        let check = vm.checkForm(params);
        if(check.errors){ vm.showErrors = true; return false; }
        payload.budgets.push(params);
      });
      if(vm.showErrors) return false; 
      vm.newArr = []
      vm.isEdit = false;
      vm.saveBudgets(payload);
    },

    async saveBudgets (payload) {
      let vm = this
      const { dispatch } = this.$store
      let params  = { 
        date: vm.$moment(vm.selectedMonthYear).startOf('month').format('YYYY-MM-DD'),
      }
      let urlParams = '?' + vm.objToURLParams(params);
      vm.$emit('triggerLoader', true);
      await dispatch(REQUEST_BUDGET_BULK_UPDATE, { urlParams: urlParams, data: payload })
      vm.$emit('triggerLoader', false);

      vm.newArr = []
      vm.isEdit = false;
    },

    addNewRow () {
      let vm = this
      vm.newArr.push({ date: new Date() });
    },

    removeRow (arr, index) {
      arr.splice(index, 1);
    },
    
    async getBudgetList () {
      const { dispatch } = this.$store
      let vm = this
      let params  = { 
        date: vm.$moment(vm.selectedMonthYear).startOf('month').format('YYYY-MM-DD'),
      }
      let urlParams = '?' + vm.objToURLParams(params);
      vm.$emit('triggerLoader', true);
      await dispatch(REQUEST_BUDGET_DETAILS, urlParams)
      vm.$emit('triggerLoader', false);
    },

    async removeBudget () {
      let vm = this
      const { dispatch } = this.$store

      vm.$emit('triggerLoader', true);
      await dispatch(REQUEST_BUDGET_DELETE, { id: vm.selectedBudget.id })
      vm.$emit('triggerLoader', false);

      vm.isConfirmDeleteShow = false;
      vm.newArr = []
      vm.isEdit = false;
    },

    async getCategoryList () {
      const { dispatch } = this.$store
      let vm = this
      vm.$emit('triggerLoader', true);
      await dispatch(REQUEST_CATEGORY_LIST)
      vm.$emit('triggerLoader', false);
    },
    
  }
}
</script>
