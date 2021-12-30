<template>

  <div class="dashboard-container p-8 h-full flex flex-col">
    <div class="flex items-center justify-between mb-6">
      <div class="">
        <DateSelector 
          dateType="month"
          :value="selectedMonthYear"
          @onChange="dateChanged"
        />
      </div>
      <div class="">
        <VButton
          btnStyle="primary"
          btnClass="px-8 py-3 ml-2"
          @click="$router.push({ name: 'Transactions' })"
        > 
          Create Transaction
        </VButton>
      </div>
    </div>

    <div class="flex flex-1 gap-5 w-full">
      <div class="flex flex-col gap-5 w-1/6 min-w-200px">
        <div class="flex flex-1 flex-col gap-5">
          <ActiveBalance 
            :data="getSummaryData?.balance"
          />
          <PlannedAndActual 
            title="Total Income"
            :data="getSummaryData?.income"
          />
          <PlannedAndActual 
            title="Total Spent"
            :data="getSummaryData?.spent"
          />
        </div>

        <RecentTransactions 
          :data="getRecentTransactions"
        />

        <!-- <CategoryProgressBar 
          :data="getCategorySpentData.category_total"
          :legend="[getCategorySpentData.lastMonth, getCategorySpentData.thisMonth]"
        /> -->
      </div>
      <div class="flex flex-col gap-5 flex-1">
        <div class="flex flex-1 gap-5">
          <BudgetDonut 
            v-for="(list, index) in getBudgetData" 
            :key="list.index"
            :data="list"
            :barColor="budgetColors[index]"
          />

          <Card 
            v-for="list in (3 - getBudgetData.length)" 
            :key="list.index" 
            class="flex flex-col items-center justify-center flex-1 cursor-pointer opacity-100" 
            paddingClass="p-4"
            @click="$router.push({ name: 'Budgets' });"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-c-98C6FF mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 class="text-base text-c-98C6FF font-light">Add Budget</h3>
          </Card>
        </div>
        
        <SpentLineChart 
          :data="getSpentData"
          @filterChanged="getSpentByDate"
        />
      </div>
      <div class="flex w-300px">
        <!-- <RecentTransactions 
          :data="getRecentTransactions"
        /> -->

        <CategoryProgressBar 
          :data="getCategorySpentData.category_total"
        />
      </div>
    </div>
  </div>

</template>

<style lang="scss" scoped>
  .dashboard-container{
    height: 725px;
  }
</style>

<script>
import { mapState } from "vuex";
import { 
  REQUEST_EXPENSES_SUMMARY,
  REQUEST_EXPENSES_SPENT,
  REQUEST_EXPENSES_LIST,
} from '../store/modules/expenses'
import { REQUEST_CATEGORY_PERCENTAGE } from '../store/modules/category'
import { REQUEST_BUDGET_SUMMARY } from '../store/modules/budget'
import { 
  currencyFilter,
  objToURLParams 
} from '@/helpers/utils';


import Card from '@/components/common/Card'
import VButton from '@/components/common/VButton'

import DateSelector from '@/components/Dashboard/DateSelector'
import ActiveBalance from '@/components/Dashboard/ActiveBalance'
import PlannedAndActual from '@/components/Dashboard/PlannedAndActual'
import BudgetDonut from '@/components/Dashboard/BudgetDonut'
import CategoryProgressBar from '@/components/Dashboard/CategoryProgressBar'
import SpentLineChart from '@/components/Dashboard/SpentLineChart'
import RecentTransactions from '@/components/Dashboard/RecentTransactions'

export default {
  name: 'Dashboard',

  components: {
    Card,
    VButton,
    DateSelector,

    ActiveBalance,
    PlannedAndActual,
    BudgetDonut,
    CategoryProgressBar,
    SpentLineChart,
    RecentTransactions
  },

  data(){
    return {
      selectedMonthYear: new Date(),
      budgetColors: ['2F80ED', '2D9CDB', '56CCF2']
    }
  },

  computed: {
    ...mapState({
      user: (state) => state.auth.user,
      summary: (state) => state.expenses.summary,
      spentData: (state) => state.expenses.spentData,
      budgetData: (state) => state.budget.budgetData,
      items: (state) => state.expenses.items,
      spent_category: (state) => state.category.spent_category,
    }),    

    getSummaryData () {
      let vm = this
      return vm.summary;
    },
    
    getSpentData () {
      let vm = this
      let data = {
        labels: [],
        values: [],
      }
      vm.spentData.forEach(item => {
        data.labels.push(item.label);
        data.values.push(item.total);
      });
      return data;
    },

    getRecentTransactions () {
      let vm = this
      return vm.items;
    },

    getBudgetData () {
      let vm = this
      return vm.budgetData;
    },
    
    getCategorySpentData () {
      let vm = this
      console.log(vm.spent_category);
      return vm.spent_category;
    },
  },

  mounted () {
    this.onReady();
  },

  methods: {
    currencyFilter,
    objToURLParams,

    onReady () {
      this.getSummaryExpenses();
      this.getSpentByDate('daily');
      this.getExpensesList();
      this.getBudgetList();
      this.getCategorySpent();
    },

    dateChanged (ev) {
      let vm = this
      vm.selectedMonthYear = new Date(ev.start);
      vm.onReady();
    },

    async getSummaryExpenses () {
      const { dispatch } = this.$store
      let vm = this
      let params  = { 
        start: vm.$moment(vm.selectedMonthYear).startOf('month').format('YYYY-MM-DD'),
        end: vm.$moment(vm.selectedMonthYear).endOf('month').format('YYYY-MM-DD'),
      }
      let urlParams = '?' + vm.objToURLParams(params);
      vm.$emit('triggerLoader', true);
      await dispatch(REQUEST_EXPENSES_SUMMARY, urlParams)
      vm.$emit('triggerLoader', false);
    },

    async getSpentByDate (filterType) {
      const { dispatch } = this.$store
      let vm = this
      let params  = { 
        start: vm.$moment(vm.selectedMonthYear).startOf('month').format('YYYY-MM-DD'),
        end: vm.$moment(vm.selectedMonthYear).endOf('month').format('YYYY-MM-DD'),
        type: filterType
      }
      let urlParams = '?' + vm.objToURLParams(params);
      vm.$emit('triggerLoader', true);
      await dispatch(REQUEST_EXPENSES_SPENT, urlParams)
      vm.$emit('triggerLoader', false);
    },

    async getExpensesList () {
      const { dispatch } = this.$store
      let vm = this
      let params  = { 
        start: vm.$moment(vm.selectedMonthYear).startOf('month').format('YYYY-MM-DD'),
        end: vm.$moment(vm.selectedMonthYear).endOf('month').format('YYYY-MM-DD'),
        limitTo: 5,
      }
      let urlParams = '?' + vm.objToURLParams(params);
      vm.$emit('triggerLoader', true);
      await dispatch(REQUEST_EXPENSES_LIST, urlParams)
      vm.$emit('triggerLoader', false);
    },

    async getBudgetList () {
      const { dispatch } = this.$store
      let vm = this
      let params  = { 
        date: vm.$moment(vm.selectedMonthYear).startOf('month').format('YYYY-MM-DD'),
      }
      let urlParams = '?' + vm.objToURLParams(params);
      vm.$emit('triggerLoader', true);
      await dispatch(REQUEST_BUDGET_SUMMARY, urlParams)
      vm.$emit('triggerLoader', false);
    },
    
    async getCategorySpent () {
      const { dispatch } = this.$store
      let vm = this
      let params  = { 
        start: vm.$moment(vm.selectedMonthYear).startOf('month').format('YYYY-MM-DD'),
        end: vm.$moment(vm.selectedMonthYear).endOf('month').format('YYYY-MM-DD'),
        limitTo: 20,
      }
      let urlParams = '?' + vm.objToURLParams(params);
      vm.$emit('triggerLoader', true);
      await dispatch(REQUEST_CATEGORY_PERCENTAGE, urlParams)
      vm.$emit('triggerLoader', false);
    },
  }
}
</script>
