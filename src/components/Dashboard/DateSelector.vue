<template>

  <div class="date-picker-container flex items-center">
    <div @click="prevNextDate('prev')" class="cursor-pointer pr-1">
      <svg class="" width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 15L1 8L8 1" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
    <span class="flex-1 text-lg ml-2 mr-3">{{ $moment(selectedDate).format(getDateFormat) }}</span>

    <div v-if="getDateType == 'month'" class="mr-2 relative month-drop-wrapper">
      <svg @click="isShowMonthPicker = !isShowMonthPicker" class="cursor-pointer" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 4.25V1.25V4.25ZM11 4.25V1.25V4.25ZM4.25 7.25H11.75H4.25ZM2.75 14.75H13.25C13.6478 14.75 14.0294 14.592 14.3107 14.3107C14.592 14.0294 14.75 13.6478 14.75 13.25V4.25C14.75 3.85218 14.592 3.47064 14.3107 3.18934C14.0294 2.90804 13.6478 2.75 13.25 2.75H2.75C2.35218 2.75 1.97064 2.90804 1.68934 3.18934C1.40804 3.47064 1.25 3.85218 1.25 4.25V13.25C1.25 13.6478 1.40804 14.0294 1.68934 14.3107C1.97064 14.592 2.35218 14.75 2.75 14.75Z" stroke="#252631" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>

      <MonthPicker 
        v-if="isShowMonthPicker"
        @monthClicked="monthSelected"
        :value="selectedDate"
        :isInline="false"
        containerClass="top-2 -left-7 "
      />
    </div>

    <div v-if="getDateType == 'day'" class="mr-2 relative">
      <v-date-picker 
        v-model="selectedDate" 
        :update-on-input="false"
        @dayclick="datepickerChanged"
      >
        <template class="-left-4" v-slot="{ togglePopover }">
          <svg @click="togglePopover()" class="cursor-pointer" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 4.25V1.25V4.25ZM11 4.25V1.25V4.25ZM4.25 7.25H11.75H4.25ZM2.75 14.75H13.25C13.6478 14.75 14.0294 14.592 14.3107 14.3107C14.592 14.0294 14.75 13.6478 14.75 13.25V4.25C14.75 3.85218 14.592 3.47064 14.3107 3.18934C14.0294 2.90804 13.6478 2.75 13.25 2.75H2.75C2.35218 2.75 1.97064 2.90804 1.68934 3.18934C1.40804 3.47064 1.25 3.85218 1.25 4.25V13.25C1.25 13.6478 1.40804 14.0294 1.68934 14.3107C1.97064 14.592 2.35218 14.75 2.75 14.75Z" stroke="#252631" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </template>
      </v-date-picker>
    </div>

    <div @click="prevNextDate('next')" class="cursor-pointer pl-1">
      <svg class="" width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 1L8 8L1 15" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
  </div>

</template>

<script>
import MonthPicker from '@/components/common/MonthPicker'

import { 
  checkOutsideClick,
} from '@/helpers/utils';


export default {
  name: 'DateSelector',

  props: {
    dateType: {
      type: String,
      default: 'date' // date, month
    },
    value:{
      type: Date,
      default: new Date()
    },
  },

  components: {
    MonthPicker
  },

  data(){
    return {
      selectedDate: new Date(),
      isShowMonthPicker: false,
    }
  },

  mounted(){
    this.initClickOutsideListener();
  },

  computed: {
    getSelectedDate () {
      let vm = this
      vm.selectedDate = vm.value;
      return vm.selectedDate;
    },

    getDateType () {
      let vm = this
      let type = 'date';
      switch (vm.dateType) {
        case 'date':
          type = 'day';
          break;
        case 'month':
          type = 'month';
          break;
        default:
          break;
      }
      return type;
    },

    getDateFormat () {
      let vm = this
      let format = 'MMMM YYYY';
      switch (vm.dateType) {
        case 'date':
          format = 'MMMM DD, YYYY';
          break;
        case 'month':
          format = 'MMMM YYYY';
          break;
        default:
          break;
      }
      return format;
    },
  },

  methods: {
    checkOutsideClick,

    prevNextDate (opt) {
      let vm = this
      let date = null;
      if(opt == 'prev'){
        date = vm.$moment(vm.selectedDate).subtract(1, vm.getDateType);
      }
      if(opt == 'next'){
        date = vm.$moment(vm.selectedDate).add(1, vm.getDateType);
      }
      vm.selectedDate = new Date(date);

      vm.$emit('onChange', { 
        start: new Date(vm.$moment(vm.selectedDate).startOf(vm.getDateType)), 
        end: new Date(vm.$moment(vm.selectedDate).endOf(vm.getDateType)), 
      });      
    },

    monthSelected (ev) {
      let vm = this
      vm.selectedDate = new Date(this.$moment(ev.start).startOf(vm.getDateType));
      vm.isShowMonthPicker = false;
      vm.$emit('onChange', { 
        start: new Date(vm.$moment(vm.selectedDate).startOf(vm.getDateType)), 
        end: new Date(vm.$moment(vm.selectedDate).endOf(vm.getDateType)), 
      }); 
    },

    /*
      * For ShowHide Toggle Event Listeners
      */
    initClickOutsideListener ()	{
      let vm = this

      // If no parent class found on click, close all dropdowns
      window.addEventListener("click", function(e){
        let checkMonthDrop = vm.checkOutsideClick(e, '.month-drop-wrapper');
        if(!checkMonthDrop){
          vm.isShowMonthPicker = false;
        }
      });
    },

    datepickerChanged () {
      let vm = this; 
      vm.$emit('onChange', { 
        start: new Date(vm.$moment(vm.selectedDate).startOf(vm.getDateType)), 
        end: new Date(vm.$moment(vm.selectedDate).endOf(vm.getDateType)), 
      }); 
    },
  }
}
</script>
