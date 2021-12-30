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
          {{ isEdit ? 'Save' : 'Update Income' }}
        </VButton>
      </div>
    </div>

    <Card class="max-w-5xl">
      <div class="flex items-center justify-between mb-5">
        <h3 class="text-c-gray">Income</h3>
      </div>
      
      <table class="w-full">
        <thead>
          <tr>
            <th class="pr-5 py-3 text-left w-40 text-base font-semibold">Total</th>
            <th class="px-5 py-3"></th>
            <th class="pl-5 py-3 text-right w-40 text-base font-semibold">{{ currencyFilter(totalIncome) }}</th>
            <th v-if="isEdit" class="px-5 py-3 text-right w-28"></th>
          </tr>
        </thead>
        <tbody class="font-medium">
          <tr v-for="(list, index) in incomes" :key="list.index">
            <td class="py-4 pr-5 border-t border-transparent" :class="{ 'border-c-EBEBEB' : !isEdit }">
              <div v-if="!isEdit">{{ $moment(list.date).format('MMM DD, YYYY') }}</div>

              <v-date-picker v-if="isEdit" :masks="datePickerMasks" v-model="editArr[index].date">
                <template v-slot="{ inputValue, togglePopover }">
                  <div @click="togglePopover()">
                    <InputGroup
                      inputClass="cursor-pointer "
                      :value="inputValue"
                      readonly
                    />
                  </div>
                </template>
              </v-date-picker> 
            </td>
            <td class="py-4 px-5 border-t border-transparent" :class="{ 'border-c-EBEBEB' : !isEdit }">
              <div v-if="!isEdit">{{ list.description }}</div>
              <InputGroup
                v-if="isEdit"
                inputClass=""
                v-model="editArr[index].description"
                :isError="showErrors && !editArr[index].description"
              />
            </td>
            <td class="py-4 pl-5 border-t border-transparent text-right" :class="{ 'border-c-EBEBEB' : !isEdit }">
              <div v-if="!isEdit">{{ currencyFilter(list.amount) }}</div>
              <InputGroup
                v-if="isEdit"
                inputClass=" text-right"
                v-model="editArr[index].amount"
                :isError="showErrors && !editArr[index].amount"
              />
            </td>
            <td v-if="isEdit" class="py-4 px-5 border-t border-transparent text-right" :class="{ 'border-c-EBEBEB' : !isEdit }">
              <a @click="selectedIncome = list;isConfirmDeleteShow = true;" href="javascript:void(0)" class="underline text-c-red text-xxs">Remove</a>
            </td>
          </tr>
        </tbody>

        <!-- For Adding New Income -->
        <tbody class="font-medium" v-if="isEdit">
          <tr v-for="(list, index) in newArr" :key="list.index">
            <td class="py-4 pr-5 border-t border-transparent" :class="{ 'border-c-EBEBEB' : !isEdit }">
              <v-date-picker :masks="datePickerMasks" v-model="list.date">
                <template v-slot="{ inputValue, togglePopover }">
                  <div @click="togglePopover()">
                    <InputGroup
                      inputClass="cursor-pointer"
                      :value="inputValue"
                      readonly
                    />
                  </div>
                </template>
              </v-date-picker> 
            </td>
            <td class="py-4 px-5 border-t border-transparent" :class="{ 'border-c-EBEBEB' : !isEdit }">
              <InputGroup
                inputClass=""
                v-model="list.description"
                :isError="showErrors && !list.description"
              />
            </td>
            <td class="py-4 pl-5 border-t border-transparent text-right" :class="{ 'border-c-EBEBEB' : !isEdit }">
              <InputGroup
                inputClass="text-c-green"
                v-model="list.amount"
                :isError="showErrors && !list.amount"
              />
            </td>
            <td class="py-4 px-5 border-t border-transparent text-right" :class="{ 'border-c-EBEBEB' : !isEdit }">
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


    <VModal v-if="isConfirmDeleteShow" title="Confirm" @close="isConfirmDeleteShow = false" @confirm="removeIncome">
      <template class="" v-slot:body>
        Are you sure you want to remove this income?
      </template>
    </VModal>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { 
  REQUEST_INCOME_LIST,
  REQUEST_INCOME_DELETE,
  REQUEST_INCOME_BULK_ADD_UPDATE
} from '../store/modules/income'
import { 
  checkForm, 
  currencyFilter,
  objToURLParams,
  checkOutsideClick,
  setValueInsideArrObj,
} from '@/helpers/utils';

import Card from '@/components/common/Card'
import VButton from '@/components/common/VButton'
import InputGroup from '@/components/common/InputGroup'
import VModal from '@/components/common/VModal'

import DateSelector from '@/components/Dashboard/DateSelector'

export default {
  name: 'Income',

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
      editArr: [],
      saveArr: [],
      newArr: [],
      showErrors: false,
      isConfirmDeleteShow: false,
      selectedIncome: {},
    }
  },

  computed: {
    ...mapState({
      incomes: (state) => state.income.items,
      totalIncome: (state) => state.income.totalIncome,
      user: (state) => state.auth.user,
    }),
  },

  mounted () {
    this.getIncomeList();
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

        let checkMonthDrop = vm.checkOutsideClick(e, '.month-drop-wrapper');
        if(!checkMonthDrop){
          vm.isShowMonthPicker = false;
        }
      });
    },

    hideAllDropdowns () {
      let vm = this
      vm.setValueInsideArrObj(vm.incomes, 'isShowCategoryPicker', false);
    },

    dateChanged (ev) {
      let vm = this
      vm.selectedMonthYear = new Date(ev.start);
      vm.newArr = []
      vm.isEdit = false;
      vm.getIncomeList();
    },

    monthSelected (ev) {
      let vm = this
      vm.selectedMonthYear = new Date(this.$moment(ev.start).startOf('month'));
      vm.isShowMonthPicker = false;
      vm.getIncomeList();
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
        vm.incomes.forEach(item => {
          vm.editArr.push({
            id: item.id,
            amount: item.amount,
            description: item.description,
            date: item.date,
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
        }
        let check = vm.checkForm(params);
        if(check.errors){ vm.showErrors = true; return false; }
        submitArr.push(params);
      });
      if(vm.showErrors) return false; 
      vm.newArr = []
      vm.isEdit = false;
      vm.saveIncomes(submitArr);
    },

    async saveIncomes (arr) {
      let vm = this
      const { dispatch } = this.$store
      vm.$emit('triggerLoader', true);
      await dispatch(REQUEST_INCOME_BULK_ADD_UPDATE, { incomes: arr })
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
    
    async getIncomeList () {
      const { dispatch } = this.$store
      let vm = this
      let params  = { 
        start: vm.$moment(vm.selectedMonthYear).startOf('month').format('YYYY-MM-DD'),
        end: vm.$moment(vm.selectedMonthYear).endOf('month').format('YYYY-MM-DD'),
      }
      let urlParams = '?' + vm.objToURLParams(params);
      vm.$emit('triggerLoader', true);
      await dispatch(REQUEST_INCOME_LIST, urlParams)
      vm.$emit('triggerLoader', false);
    },

    async removeIncome () {
      let vm = this
      const { dispatch } = this.$store

      vm.$emit('triggerLoader', true);
      await dispatch(REQUEST_INCOME_DELETE, { id: vm.selectedIncome.id })
      vm.$emit('triggerLoader', false);

      vm.isConfirmDeleteShow = false;
      vm.newArr = []
      vm.isEdit = false;
    },
  }
}
</script>
