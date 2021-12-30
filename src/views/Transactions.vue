<template>

  <div class="p-8">
    <div class="flex items-center justify-between mb-8">
      <div class="">
        <DateSelector 
          dateType="date"
          :value="selectedDate"
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
          btnClass="px-8 py-3 ml-5"
          @click="toggleEditSave"
        > 
          {{ isEdit ? 'Save' : 'Update Transactions' }}
        </VButton>
      </div>
    </div>

    <Card class="max-w-5xl">
      <div class="flex items-center justify-between mb-5">
        <h3 class="text-c-gray">Transactions</h3>

        <div v-if="!isEdit" class="font-semibold">
          Total : {{ currencyFilter(total) }}
        </div>
      </div>
      
      <table class="w-full">
        <thead>
          <tr>
            <th class="px-5 py-3 bg-c-F6F6FB font-medium text-left w-40">Date</th>
            <th class="px-5 py-3 bg-c-F6F6FB font-medium text-left">Description</th>
            <th class="px-5 py-3 bg-c-F6F6FB font-medium text-left w-32">Amount</th>
            <th class="px-5 py-3 bg-c-F6F6FB font-medium text-left w-64">Category</th>
            <th class="px-5 py-3 bg-c-F6F6FB font-medium text-right w-20"></th>
          </tr>
        </thead>
        <tbody class="text-xs">
          <tr v-for="(list, index) in getExpenses" :key="list.index">
            <td class="pt-5 px-5">
              <div v-if="!isEdit" class="py-1">{{ $moment(list.date).format('MMM DD, YYYY') }}</div>

              <v-date-picker v-if="isEdit" :masks="datePickerMasks" v-model="editArr[index].date">
                <template v-slot="{ inputValue, togglePopover }">
                  <div @click="togglePopover()">
                    <InputGroup
                      inputClass="cursor-pointer py-1"
                      :value="inputValue"
                      readonly
                    />
                  </div>
                </template>
              </v-date-picker> 
            </td>
            <td class="pt-5 px-5">
              <div v-if="!isEdit" class="py-1">{{ list.description }}</div>
              <InputGroup
                v-if="isEdit"
                inputClass="py-1"
                v-model="editArr[index].description"
                :isError="showErrors && !editArr[index].description"
              />
            </td>
            <td class="pt-5 px-5">
              <div v-if="!isEdit" class="text-c-green py-1">{{ currencyFilter(list.amount) }}</div>
              <InputGroup
                v-if="isEdit"
                inputClass="text-c-green py-1"
                placeholder="0"
                v-model="editArr[index].amount"
                :isError="showErrors && !editArr[index].amount"
              />
            </td>
            <td class="pt-5 px-5">
              <div v-if="!isEdit && list.categoryName" class="bg-c-F2F2F2 text-xxs py-1 px-2 rounded inline-block">{{ list.categoryName }}</div>
              <div v-if="isEdit" class="category-drop-wrapper relative">
                <div class="relative" @click="toggleDrop(list, expenses, !list.isShowCategoryPicker)">
                  <InputGroup
                    inputClass="cursor-pointer outline-none py-1"
                    v-model="editArr[index].categoryName"
                    :isError="showErrors && !editArr[index].categoryName"
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
            <td class="pt-5 px-5 text-right">
              <a @click="selectedTransaction = list;isConfirmDeleteShow = true;" href="javascript:void(0)" class="underline text-c-red text-xxs">Remove</a>
            </td>
          </tr>
        </tbody>

        <!-- For Adding New Transactions -->
        <tbody class="text-xs" v-if="isEdit">
          <tr v-for="(list, index) in newArr" :key="list.index">
            <td class="pt-5 px-5">
              <v-date-picker :masks="datePickerMasks" v-model="list.date">
                <template v-slot="{ inputValue, togglePopover }">
                  <div @click="togglePopover()">
                    <InputGroup
                      inputClass="cursor-pointer py-1"
                      :value="inputValue"
                      readonly
                    />
                  </div>
                </template>
              </v-date-picker> 
            </td>
            <td class="pt-5 px-5">
              <InputGroup
                inputClass="py-1"
                v-model="list.description"
                :isError="showErrors && !list.description"
              />
            </td>
            <td class="pt-5 px-5">
              <InputGroup
                inputClass="text-c-green py-1"
                v-model="list.amount"
                :isError="showErrors && !list.amount"
              />
            </td>
            <td class="pt-5 px-5">
              <div class="category-drop-wrapper relative">
                <div class="relative" @click="toggleDrop(list, newArr, !list.isShowCategoryPicker)">
                  <InputGroup
                    inputClass="cursor-pointer outline-none py-1"
                    v-model="list.categoryName"
                    :isError="showErrors && !list.categoryName"
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
            <td class="pt-5 px-5 text-right">
              <a @click="removeRow(newArr, index)" href="javascript:void(0)" class="underline text-c-red text-xxs">Remove</a>
            </td>
          </tr>
        </tbody>
      </table>
    </Card>

    <div v-if="isEdit" class="flex justify-end max-w-5xl mt-5">
      <VButton
        btnStyle="primary"
        btnClass="px-8 py-3"
        @click="addNewRow"
      > 
        Add
      </VButton>
    </div>

    <VModal v-if="isConfirmDeleteShow" title="Confirm" @close="isConfirmDeleteShow = false" @confirm="removeTransaction">
      <template class="" v-slot:body>
        Are you sure you want to remove this transaction?
      </template>
    </VModal>
  </div>

</template>

<script>
import { mapState } from "vuex";
import { 
  REQUEST_EXPENSES_LIST,
  REQUEST_EXPENSES_DELETE,
  REQUEST_EXPENSES_BULK_ADD_UPDATE,
} from '../store/modules/expenses'
import { REQUEST_CATEGORY_LIST } from '../store/modules/category'
import { 
  checkForm, 
  currencyFilter,
  objToURLParams,
  checkOutsideClick,
  setValueInsideArrObj
} from '@/helpers/utils';

import Card from '@/components/common/Card'
import InputGroup from '@/components/common/InputGroup'
import VButton from '@/components/common/VButton'
import VModal from '@/components/common/VModal'

import DateSelector from '@/components/Dashboard/DateSelector'

export default {
  name: 'Expenses',

  components: {
    Card,
    InputGroup,
    VButton,
    VModal,
    DateSelector
  },

  data(){
    return {
      selectedDate: new Date(),
      datePickerMasks: {
        input: 'MMM DD, YYYY',
      },
      isEdit: false,
      editArr: [],
      saveArr: [],
      newArr: [],
      showErrors: false,
      isConfirmDeleteShow: false,
      selectedTransaction: {},
    }
  },

  computed: {
    ...mapState({
      expenses: (state) => state.expenses.items,
      total: (state) => state.expenses.total,
      user: (state) => state.auth.user,
      categories: (state) => state.category.items,
    }),

    getExpenses () {
      let vm = this
      vm.expenses.forEach(item => { 
        item.categoryName = item.categories[0]?.name || ''; 
        item.category = item.categories[0] || {}; 
      });
      return vm.expenses;
    },
  },

  mounted () {
    this.getExpensesList();
    this.getCategoryList();
    this.initClickOutsideListener();
  },

  methods: {
    currencyFilter,
    checkForm,
    objToURLParams,
    checkOutsideClick,
    setValueInsideArrObj,

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
      });
    },

    hideAllDropdowns () {
      let vm = this
      vm.setValueInsideArrObj(vm.expenses, 'isShowCategoryPicker', false);
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
      obj.categoryName = category.name;
      vm.hideAllDropdowns();
    },

    cancelEdit () {
      let vm = this
      vm.newArr = []
      vm.isEdit = false;
      vm.showErrors = false;
    },

    toggleEditSave () {
      let vm = this
      let submitArr = [];
      
      if(!vm.isEdit){ 
        vm.editArr = []; 
        vm.expenses.forEach(item => {
          vm.editArr.push({
            id: item.id,
            amount: item.amount,
            description: item.description,
            date: item.date,
            category: item.category,
            categories: item.categories,
            categoryName: item.categoryName,
          });
        });
        vm.isEdit = true;
        return false;  
      }

      vm.editArr.forEach(item => {
        let params = {
          id: item.id,
          date: this.$moment(item.date).format('YYYY-MM-DD'),
          amount: item.amount,
          description: item.description,
          category_ids: [item.category.id],
        }
        let check = vm.checkForm(params);
        if(check.errors){ vm.showErrors = true; return false; }
        submitArr.push(params);
      });

      vm.newArr.forEach(item => {
        let params = {
          date: this.$moment(item.date).format('YYYY-MM-DD'),
          amount: item.amount,
          description: item.description,
          category_ids: item.category ? [item.category.id] : null,
        }
        let check = vm.checkForm(params);
        if(check.errors){ vm.showErrors = true; return false; }
        submitArr.push(params);
      });
      
      if(vm.showErrors) return false; 
      vm.newArr = []
      vm.isEdit = false;      
      vm.saveTransactions(submitArr);
    },

    async saveTransactions (arr) {
      let vm = this
      const { dispatch } = this.$store
      vm.$emit('triggerLoader', true);
      await dispatch(REQUEST_EXPENSES_BULK_ADD_UPDATE, { transactions: arr })
      vm.$emit('triggerLoader', false);

      vm.newArr = []
      vm.isEdit = false;
    },

    addNewRow () {
      let vm = this
      vm.newArr.push({ date: new Date(vm.selectedDate) });
    },

    removeRow (arr, index) {
      arr.splice(index, 1);
    },

    async removeTransaction () {
      let vm = this
      const { dispatch } = this.$store

      vm.$emit('triggerLoader', true);
      await dispatch(REQUEST_EXPENSES_DELETE, { id: vm.selectedTransaction.id })
      vm.$emit('triggerLoader', false);

      vm.isConfirmDeleteShow = false;
      vm.newArr = []
      vm.isEdit = false;
    },

    dateChanged (ev) {
      let vm = this; 
      vm.selectedDate = new Date(ev.start);
      vm.getExpensesList();

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

    async getExpensesList () {
      const { dispatch } = this.$store
      let vm = this
      let params  = { 
        start: vm.$moment(vm.selectedDate).format('YYYY-MM-DD'),
        end: vm.$moment(vm.selectedDate).format('YYYY-MM-DD'),
      }
      let urlParams = '?' + vm.objToURLParams(params);
      vm.$emit('triggerLoader', true);
      await dispatch(REQUEST_EXPENSES_LIST, urlParams)
      vm.$emit('triggerLoader', false);
    },

    prevNextDate (opt) {
      let vm = this
      let date = null;
      if(opt == 'prev'){
        date = vm.$moment(vm.selectedDate).subtract(1, 'day');
      }
      if(opt == 'next'){
        date = vm.$moment(vm.selectedDate).add(1, 'day');
      }
      vm.selectedDate = new Date(date);
      vm.newArr = []
      vm.isEdit = false;

      vm.getExpensesList();
    }  
  }
}
</script>
