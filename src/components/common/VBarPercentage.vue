<template>
  <div class="">
    <div class="flex items-center justify-end mb-2">
      <svg @click="isShowTotal = !isShowTotal" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    </div>
    <div v-for="(list, index) in data.percentage.labels" :key="list.index" class="mb-2">
      <label for="" class="text-xs mb-1 flex justify-between ">{{ list }} 
        <span v-if="list != 'No data yet'">
          <span v-if="!isShowTotal" >{{ getPercentage(data.percentage.values[index]) }}%</span>
          <span v-if="isShowTotal">{{ currencyFilter(data.totals.values[index]) }}</span>
        </span>
      </label>
      <div class="w-full bg-gray-100 rounded-sm h-3 relative">
        <div 
          class="rounded-sm h-3"
          :style="{
            'background-color': list == 'No data yet' ? '#f5f5f5' : bgColors[index],
            'width': getPercentage(data.percentage.values[index]) + '%'
          }"
        >
        </div>
      </div>
    </div>
  </div>
  
</template>

<script>
import { bgColors } from '@/config/settings'
import { 
  currencyFilter,
} from '@/helpers/utils';

export default {
  name: "VBarPercentage",

  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },

  data(){
    return  {
      bgColors: bgColors,
      isShowTotal: false,
    }
  },

  computed: {
    getTotal () {
      let total = 0;
      this.data.percentage.values.forEach((item) => {
        total += item
      });
      return total;
    },
    
  },

  mounted () {

  },

  methods: {
    currencyFilter,

    getPercentage (value) {
      return ((value / this.getTotal) * 100).toFixed(2);
    }
  },
};
</script>