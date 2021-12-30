<template>

  <Card class="h-275px flex flex-col" paddingClass="p-4">
    <div class="flex items-center mb-3">
      <h3 class="text-c-gray text-xs flex-1">Spent</h3>
      <div class="flex items-center gap-3">
        <div @click="selectFilter('daily')" class="text-xxs font-medium text-opacity-20 text-c-black cursor-pointer" :class="{ 'text-opacity-100 underline': filterType == 'daily' }">Daily</div>
        <div @click="selectFilter('weekly')" class="text-xxs font-medium text-opacity-20 text-c-black cursor-pointer" :class="{ 'text-opacity-100 underline': filterType == 'weekly' }">Weekly</div>
        <div @click="selectFilter('monthly')" class="text-xxs font-medium text-opacity-20 text-c-black cursor-pointer" :class="{ 'text-opacity-100 underline': filterType == 'monthly' }">Monthly</div>
      </div>
    </div>

    <div class="relative flex-1">
      <VChart type="line" :data="getData" class="" />
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
  name: 'SpentLineChart',

  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },

  components: {
    Card,
    VChart,
  },

  data(){
    return {
      chartKey: 0,
      filterType: 'daily'
    }
  },

  created(){
    
  },

  computed: {
    getData () {
      return this.data;
    }
  },

  methods: {
    currencyFilter,

    selectFilter (type) {
      let vm = this
      vm.filterType = type;

      vm.$emit('filterChanged', vm.filterType);
    }
  }
}
</script>
