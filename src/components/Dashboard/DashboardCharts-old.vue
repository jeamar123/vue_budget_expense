<template>

  <div class="">
    <div class="flex gap-x-5 gap-y-5 mb-5">
      <div class="flex flex-col flex-1 gap-y-5">
        <div 
          v-if="type != 'year' && type != ''"
          class="grid grid-cols-3 gap-3"
          :class="{
            'grid-cols-4': type != 'today' && type != 'custom'
          }"
        >
          <Card class="bg-white rounded-lg shadow-sm py-4 px-4 flex flex-col">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-black" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
            </svg>
            <h4 class="text-lg text-c-black font-light flex items-center mb-3">
              Balance
            </h4>
            <h1 class="text-2xl text-black font-medium">{{ currencyFilter(summary.balance || 0) }}</h1>
          </Card>
          <Card class="bg-white rounded-lg shadow-sm py-4 px-4 flex flex-col">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-black" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
            </svg>
            <h4 class="text-lg text-c-black font-light flex items-center mb-3">
              Spent
            </h4>
            <h1 
              class="text-2xl text-black font-medium"
              :class="{ 
                'text-c-red' : (type == 'month' && (summary.spent > summary.income)) || type != 'month' && (summary.spent > summary.budget) 
              }"
            >{{ currencyFilter(summary.spent || 0) }}</h1>
          </Card>
          <Card v-if="type == 'month'" class="bg-white rounded-lg shadow-sm py-4 px-4 flex flex-col">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-black" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
            </svg>
            <h4 class="text-lg text-c-black font-light flex items-center mb-3">
              Income
            </h4>
            <h1 class="text-2xl text-black font-medium">{{ currencyFilter(summary.income || 0) }}</h1>
          </Card>
          <Card v-if="type != 'month'" class="bg-white rounded-lg shadow-sm py-4 px-4 flex flex-col">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-black" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
            </svg>
            <h4 class="text-lg text-c-black font-light flex items-center mb-3">
              Budget
            </h4>
            <h1 class="text-2xl text-black font-medium">{{ currencyFilter(summary.budget || 0) }}</h1>
          </Card>
          <Card v-if="type != 'today' && type != 'custom'" class="bg-white rounded-lg shadow-sm py-4 px-4 flex flex-col">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-black" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
            </svg>
            <h4 class="text-lg text-c-black font-light flex items-center mb-3">
              {{
                type == 'week' ? 'Daily' : 
                type == 'month' ? 'Weekly' : ''
              }} 
              Average
            </h4>
            <h1 class="text-2xl text-black font-medium">{{ currencyFilter(summary.average || 0) }}</h1>
          </Card>
        </div>
        
        <Card v-if="type != 'today' && type != 'custom'" class="flex flex-col flex-1 py-8 px-10">
          <h3 class="text-lg text-black mb-5">
            {{
              type == 'week' || type == '' ? 'Daily Spent' : 
              type == 'month' ? 'Weekly Spent' : 
              type == 'year' ? 'Monthly Spent' : ''
            }} 
          </h3>
          <div class="flex-1">
            <VChart v-if="type == ''" id="daily-pick-line-chart" type="line" :data="getDailyData" />
            <VChart v-if="type == 'week'" id="daily-week-line-chart" type="line" :data="getDailyData" />
            <VChart v-if="type == 'month'" id="weekly-line-chart" type="line" :data="getWeeklyData" />
            <VChart v-if="type == 'year'" id="monthly-line-chart" type="line" :data="getMonthlyData" />
          </div>
        </Card>

        <Card v-if="type == 'month' || type == 'year'" class="flex flex-col flex-1 py-8 px-10" style="min-height:300px;">
          <h3 class="text-lg text-black mb-5">Daily Spent</h3>
          <div class="flex-1">
            <VChart
              id="daily-line-chart"
              type="line"
              :data="getDailyData"
            />
          </div>
        </Card>
      </div>

      <div class="w-3/12">
        <!-- v-if="getCategoryData.values.length > 0" -->
        <CategoryDonut 
          :data="getCategoryData"
        />
      </div>  
    </div>
  </div>

</template>

<script>
import Card from '@/components/common/Card'
import VChart from '@/components/common/VChart'
import CategoryDonut from '@/components/Dashboard/CategoryDonut'
import { currencyFilter } from '@/helpers/utils';

export default {
  name: 'DashboardCharts',

  props: {
    type: {
      type: String,
      default: 'today'
    },
    summary: {
      type: Object,
      default: () => {}
    },
    category_values: {
      type: Object,
      default: () => {}
    },
    dailySpent: {
      type: Array,
      default: () => []
    },
    weeklySpent: {
      type: Array,
      default: () => []
    },
    monthlySpent: {
      type: Array,
      default: () => []
    },
  },

  components: {
    Card,
    VChart,
    CategoryDonut
  },

  data(){
    return {
     
    }
  },

  computed: {
    getCategoryData () {
      let vm = this
      let totals = { labels: [], values: [] }
      let percentage = { labels: [], values: [] }
      let total = 0;
      if(vm.category_values.category_total){
        let obj = vm.category_values.category_total;
        Object.keys(obj).forEach(key => {
          totals.labels.push(key);
          totals.values.push(obj[key].value);
          percentage.labels.push(key);
          percentage.values.push(obj[key].percentage);
          total += obj[key].value;
        });
      }
      if(total == 0){
        totals.labels.push('No data yet');
        totals.values.push(1);
        percentage.labels.push('No data yet');
        percentage.values.push(1);
      }
      return {
        totals,
        percentage,
      };
    },

    getDailyData () {
      let vm = this
      let data = { labels: [], values: [] }
      if(vm.dailySpent){
        vm.dailySpent.forEach(item => {
          data.labels.push(item.label);
          data.values.push(item.total);
        });
      }
      return data;
    },

    getWeeklyData () {
      let vm = this
      let data = { labels: [], values: [] }
      if(vm.weeklySpent){
        vm.weeklySpent.forEach(item => {
          data.labels.push(item.label);
          data.values.push(item.total);
        });
      }
      return data;
    },

    getMonthlyData () {
      let vm = this
      let data = { labels: [], values: [] }
      if(vm.monthlySpent){
        vm.monthlySpent.forEach(item => {
          data.labels.push(item.label);
          data.values.push(item.total);
        });
      }
      return data;
    },
  },

  created(){

  },

  methods: {
    currencyFilter,

    onReady () {

    },


  }
}
</script>
