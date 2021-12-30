<template>

  <Card paddingClass="p-4">
    <h3 class="text-c-gray text-xs mb-3">{{ title }}</h3>
    <div class="flex items-center mb-1">
      <label class="min-w-50px max-w-16 w-1/4 font-medium text-xxs text-c-primary">Planned</label>
      <span class="font-medium flex-1">{{ currencyFilter(data?.planned) }}</span>
      <span class="w-6"></span>
    </div>
    <div class="flex items-center">
      <label class="min-w-50px max-w-16 w-1/4 font-medium text-xxs text-c-primary">Actual</label>
      <span class="font-medium text-sm xl:text-lg flex-1">{{ currencyFilter(data?.actual) }}</span>
      <span class="w-6 flex justify-end">
        <svg class="text-c-3384C6" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.5 9.83333L9 12.3333L11.5 9.83333ZM9 12.3333L6.5 9.83333L9 12.3333ZM9 12.3333V5.66667V12.3333ZM9 16.5C8.01509 16.5 7.03982 16.306 6.12987 15.9291C5.21993 15.5522 4.39314 14.9997 3.6967 14.3033C3.00026 13.6069 2.44781 12.7801 2.0709 11.8701C1.69399 10.9602 1.5 9.98491 1.5 9C1.5 8.01509 1.69399 7.03982 2.0709 6.12987C2.44781 5.21993 3.00026 4.39314 3.6967 3.6967C4.39314 3.00026 5.21993 2.44781 6.12987 2.0709C7.03982 1.69399 8.01509 1.5 9 1.5C10.9891 1.5 12.8968 2.29018 14.3033 3.6967C15.7098 5.10322 16.5 7.01088 16.5 9C16.5 10.9891 15.7098 12.8968 14.3033 14.3033C12.8968 15.7098 10.9891 16.5 9 16.5Z" stroke="#3384C6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>

      </span>
    </div>
  </Card>

</template>

<script>
import Card from '@/components/common/Card'

import { 
  currencyFilter,
} from '@/helpers/utils';


export default {
  name: 'PlannedAndActual',

  props: {
    data: {
      type: Object,
      default: () => {}
    },
    title: {
      type: String,
      default: 'Title'
    },
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
