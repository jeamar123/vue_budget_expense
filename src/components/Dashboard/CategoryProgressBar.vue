<template>
  <!-- h-275px  -->
  <Card class="w-full" paddingClass="p-4">
    <div class="flex items-center mb-3">
      <div class="flex-1">
        <h3 class="text-c-gray text-xs">Most Spent by Category</h3>
      </div>
      <div class="">
        <svg @click="isCategoryShowAmount = !isCategoryShowAmount" class="cursor-pointer" width="11" height="13" viewBox="0 0 11 13" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M1 0.5C1.19891 0.5 1.38968 0.579018 1.53033 0.71967C1.67098 0.860322 1.75 1.05109 1.75 1.25V2.82575C2.37403 2.1892 3.14982 1.72198 4.00431 1.46809C4.85879 1.21419 5.76384 1.18199 6.63421 1.3745C7.50458 1.56702 8.31162 1.97792 8.97932 2.5685C9.64701 3.15908 10.1534 3.9099 10.4508 4.75025C10.4868 4.84382 10.5038 4.94367 10.5006 5.0439C10.4974 5.14413 10.4741 5.24271 10.4322 5.33379C10.3902 5.42488 10.3305 5.50663 10.2564 5.57421C10.1823 5.64178 10.0954 5.69381 10.0008 5.72722C9.90626 5.76063 9.80597 5.77473 9.70587 5.7687C9.60576 5.76267 9.50789 5.73663 9.41803 5.69211C9.32817 5.6476 9.24815 5.58551 9.1827 5.50953C9.11726 5.43355 9.06771 5.34521 9.037 5.24975C8.8106 4.60986 8.41484 4.04339 7.89189 3.61068C7.36893 3.17798 6.73838 2.89526 6.06742 2.79266C5.39646 2.69006 4.71024 2.77141 4.08187 3.02806C3.4535 3.2847 2.90653 3.70701 2.49925 4.25H4.75C4.94891 4.25 5.13968 4.32902 5.28033 4.46967C5.42098 4.61032 5.5 4.80109 5.5 5C5.5 5.19891 5.42098 5.38968 5.28033 5.53033C5.13968 5.67098 4.94891 5.75 4.75 5.75H1C0.801088 5.75 0.610322 5.67098 0.46967 5.53033C0.329018 5.38968 0.25 5.19891 0.25 5V1.25C0.25 1.05109 0.329018 0.860322 0.46967 0.71967C0.610322 0.579018 0.801088 0.5 1 0.5ZM1.006 7.29275C1.09888 7.25995 1.19731 7.24576 1.29567 7.251C1.39403 7.25623 1.49039 7.2808 1.57926 7.32328C1.66813 7.36576 1.74776 7.42534 1.8136 7.4986C1.87944 7.57186 1.93021 7.65737 1.963 7.75025C2.1894 8.39014 2.58516 8.95661 3.10811 9.38932C3.63107 9.82202 4.26162 10.1047 4.93258 10.2073C5.60354 10.3099 6.28976 10.2286 6.91813 9.97194C7.5465 9.7153 8.09347 9.29299 8.50075 8.75H6.25C6.05109 8.75 5.86032 8.67098 5.71967 8.53033C5.57902 8.38968 5.5 8.19891 5.5 8C5.5 7.80109 5.57902 7.61032 5.71967 7.46967C5.86032 7.32902 6.05109 7.25 6.25 7.25H10C10.1989 7.25 10.3897 7.32902 10.5303 7.46967C10.671 7.61032 10.75 7.80109 10.75 8V11.75C10.75 11.9489 10.671 12.1397 10.5303 12.2803C10.3897 12.421 10.1989 12.5 10 12.5C9.80109 12.5 9.61032 12.421 9.46967 12.2803C9.32902 12.1397 9.25 11.9489 9.25 11.75V10.1742C8.62597 10.8108 7.85018 11.278 6.99569 11.5319C6.14121 11.7858 5.23616 11.818 4.36579 11.6255C3.49542 11.433 2.68838 11.0221 2.02068 10.4315C1.35299 9.84092 0.84661 9.0901 0.54925 8.24975C0.516445 8.15687 0.502257 8.05844 0.507495 7.96008C0.512734 7.86172 0.537296 7.76536 0.579779 7.67649C0.622263 7.58762 0.681836 7.50799 0.755096 7.44215C0.828356 7.37631 0.913868 7.32554 1.00675 7.29275H1.006Z" fill="black"/>
        </svg>
      </div>
    </div>

    <div class="overflow-y-auto h-540px c-scrollbar pr-2 -mr-2">
      <div v-for="(list, index, indexNum) in data" :key="list.index" class="mb-3">
        <h5 for="" class="text-xxs font-medium mb-2px">{{ index }}</h5>
        <div class="w-full relative">
          <div 
            class="rounded-sm h-4 w-full absolute top-0 left-0 bg-gray-100"
          >
            <span class="absolute mt-4px mr-3px top-0 right-1 text-xxs whitespace-nowrap ">
              {{
                !isCategoryShowAmount ? 
                  `${parseFloat(list.percentage).toFixed(2)}%`
                : 
                  currencyFilter(list.value)
              }}
            </span>
          </div>
          <div 
            class="rounded-sm h-4 relative" 
            :style="{
              'width': (parseFloat(list.percentage).toFixed(2)) + '%',  
              'background-color': bgBlueColors[indexNum]
            }"
          >
            <!-- <span class="absolute mt-4px mr-3px top-0 right-1 text-xxs whitespace-nowrap ">
              {{
                !isCategoryShowAmount ? 
                  `${parseFloat(list.percentage).toFixed(2)}%`
                : 
                  currencyFilter(list.value)
              }}
            </span> -->
          </div>
          
        </div>
      </div>
    </div>

    <!-- <div class="flex gap-4 items-center justify-end pt-3"> -->
      <!-- <div class="flex items-center gap-2">
        <h5 class="text-xxxs font-medium capitalize">{{ legend[0] || '' }}</h5>
        <div class="h-2 w-6 bg-c-2D9CDB"></div>
      </div> -->
      <!-- <div class="flex items-center gap-2">
        <h5 class="text-xxs font-medium capitalize">{{ legend[1] || '' }}</h5>
        <div class="h-2 w-6 bg-c-54A0FF"></div>
      </div> -->
    <!-- </div> -->
  </Card>

</template>

<script>
import Card from '@/components/common/Card'
import { bgBlueColors } from '@/config/settings'

import { 
  currencyFilter,
} from '@/helpers/utils';


export default {
  name: 'CategoryProgressBar',

  props: {
    data: {
      type: Object,
      default: () => {}
    },
  },

  components: {
    Card,
  },

  data(){
    return {
      isCategoryShowAmount: true,
      bgBlueColors: bgBlueColors
    }
  },

  created(){
    console.log(this.bgBlueColors);
  },

  computed: {
    getData () {
      return this.data;
    }
  },

  methods: {
    currencyFilter,

  }
}
</script>
