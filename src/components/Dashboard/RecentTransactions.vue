<template>
  <!--  min-w-300px -->
  <Card class="flex-1" paddingClass="p-4">
    <h3 class="text-c-gray text-xs flex-1 mb-3">Recent Transactions</h3>

    <div class="h-48 c-scrollbar pr-2 -mr-2">
      <div 
        class="flex gap-3 items-center pr-3 py-3 border-b border-transparent" 
        :class="{'border-c-E1E8E4' : index != 4}" 
        v-for="(list, index) in data" 
        :key="list.index"
      >
        <!-- <div class="">
          <svg class="h-5 w-5 text-c-98C6FF" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
          </svg>
        </div> -->
        <div class="flex-1">
          <div class="flex items-center justify-between mb-1">
            <h5 class="text-xxs font-medium mr-1">
              {{ 
                list.description.length > 22 ? 
                  list.description.substring(0,22) + ".." 
                :
                  list.description
              }}
            </h5>
            <span class="text-xxs font-normal">- {{ currencyFilter(list.amount) }}</span>
            <!-- <span class="text-xxs font-normal">{{ $moment(list.date).format('MMM DD') }}</span> -->
          </div>
          <!-- <div class="flex items-center justify-between">
            <p class="text-xxxs font-normal mr-1">{{ list.categories[0]?.name || '' }}</p>
            <span class="text-sm font-normal">- {{ currencyFilter(list.amount) }}</span>
          </div> -->
        </div>
      </div>
    </div>

    <div class="text-center ">
      <VButton
        btnStyle="default"
        btnClass="underline text-xxxs"
        @click="$router.push({ name: 'Transactions' })"
      > 
        See more
      </VButton>
    </div>
  </Card>

</template>

<script>
import Card from '@/components/common/Card'
import VButton from '@/components/common/VButton'

import { 
  currencyFilter,
} from '@/helpers/utils';


export default {
  name: 'RecentTransactions',

  props: {
    data: {
      type: Array,
      default: () => []
    }
  },

  components: {
    Card,
    VButton,
  },

  data(){
    return {
      chartKey: 0,
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

  }
}
</script>
