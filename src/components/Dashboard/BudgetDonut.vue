<template>

  <Card class="flex flex-col flex-1" paddingClass="p-4">
    <h3 class="text-c-gray text-xs mb-3">{{ data?.name || 'Category' }} Budget</h3>
    <div class="mx-auto w-9/12 relative mb-5 flex-1">
      <div class="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
        <h3 class="text-lg text-center mb-1 font-medium">{{ currencyFilter(data.remaining) }}</h3>
        <p class="text-center text-xs text-c-primary font-medium">Remaining</p>
      </div>
      <VChart
        type="doughnut"
        :data="getData"
        :colors="['#D2E5F3', '#'+barColor]"
        style="max-height: 175px;max-width: 175px;"
        class="mx-auto w-full h-full"
      />
    </div>
    <div class="flex gap-2">
      <div class="flex-1 text-center">
        <div class="h-2 bg-c-D2E5F3 mb-2 w-10 mx-auto"></div>
        <p class="text-center text-xs mb-2 text-c-primary font-medium">Budget</p>
        <h3 class="text-base text-center font-medium">{{ currencyFilter(data.budget) }}</h3>
      </div>
      <div class="flex-1 text-center">
        <div 
          class="h-2 mb-2 w-10 mx-auto" 
          :class="[
            'bg-c-' + barColor
          ]"
        ></div>
        <p class="text-center text-xs mb-2 text-c-primary font-medium">Total Spent</p>
        <h3 class="text-base text-center font-medium">{{ currencyFilter(data.spent) }}</h3>
      </div>
    </div>
  </Card>

</template>

<script>
import Card from '@/components/common/Card'
import VChart from '@/components/common/VChart'

import { 
  currencyFilter,
} from '@/helpers/utils';


export default {
  name: 'BudgetDonut',

  props: {
    data: {
      type: Object,
      default: () => {}
    },
    barColor: {
      type: String,
      default: '2F80ED'
    }
  },

  components: {
    Card,
    VChart,
  },

  data(){
    return {
      chartKey: 0,
      budgetColors: ['D2E5F3', '2D9CDB', '56CCF2']
    }
  },

  created(){
    
  },

  computed: {
    getData () {
      let vm = this
      let donutData = {
        labels: ['Budget','Total Spent'],
        values: [vm.data.remaining, vm.data.spent],
      }
      return donutData;
    }
  },

  methods: {
    currencyFilter,

  }
}
</script>
