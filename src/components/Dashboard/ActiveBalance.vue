<template>

  <Card paddingClass="p-4">
    <h1 class="text-2xl mb-3 font-medium">{{ currencyFilter(data) }}</h1>
    <h3 class="text-c-gray text-xs">Active Balance</h3>
  </Card>

</template>

<script>
import Card from '@/components/common/Card'

import { 
  currencyFilter,
} from '@/helpers/utils';


export default {
  name: 'ActiveBalance',

  props: {
    data: {
      type: Number,
      default: 0
    }
  },

  components: {
    Card,
  },

  data(){
    return {
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
