<template>
  <div 
    class="bg-white shadow-c-primary rounded-md p-5 pb-2 w-60 z-50"
    :class="[
      {
        'absolute': !isInline
      },
      containerClass
    ]"
  >
    <div class="flex items-center w-full mb-4">
      <div class="">
        <svg width="8" height="15" viewBox="0 0 8 15" fill="none" xmlns="http://www.w3.org/2000/svg"
          class="mx-auto h-5 w-5 cursor-pointer"
          @click="prevYear"
        >
          <path d="M6.69992 13.2032L1.33325 7.5121L6.69992 1.82104" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>

      </div>
      <div class="flex-1 text-center font-medium">{{ paginationYear }}</div>
      <div class="">
        <svg width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg"
          class="mx-auto h-5 w-5 cursor-pointer"
          @click="nextYear"
        >
          <path d="M1.90002 1.06494L7.26669 6.756L1.90002 12.4471" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>

      </div>
    </div>
    <div class="grid grid-cols-4 w-full">
      <div 
        v-for="(list, index) in monthsShortArr"
        :key="list.index"
        class="flex items-center justify-center text-center cursor-pointer h-7 mb-3 hover:bg-c-primary hover:text-white rounded-sm"
        :class="{
          'bg-c-primary text-white' : (getSelectedDate.activeMonth == index + 1) && (paginationYear == getSelectedDate.activeYear),
        }"
        @click="selectMonth(index)"
      >{{ list }}</div>
    </div>

     <!-- 'opacity-50 border-none cursor-not-allowed pointer-events-none' : (index + 1 > monthToday) && (paginationYear == yearToday) -->
  </div>
</template>

<script>
export default {
  name: 'MonthPicker',
  components:{
  },
  props: {
    maxDate: {
      type: Date,
      default: new Date()
    },
    value:{
      type: Date,
      default: new Date()
    },
    isInline:{
      type: Boolean,
      default: false
    },
    containerClass:{
      type: String,
      default: ''
    },
  },
  data(){
    return  {
      monthsArr: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      monthsShortArr: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      monthToday: Number(this.$moment().format('M')),
      dayToday: Number(this.$moment().format('D')),
      yearToday: Number(this.$moment().format('YYYY')),
      dateToday: this.$moment(),
      paginationYear: Number(this.$moment().format('YYYY'))
    }
  },
  computed: {
    getSelectedDate(){
      return {
        activeMonth: Number(this.$moment(this.value).format('M')),
        activeDate: this.$moment(this.value),
        activeYear: Number(this.$moment(this.value).format('YYYY')),
      }
    }
  },
  created(){
    this.paginationYear = this.getSelectedDate.activeYear;
  },
  methods:  {
    selectMonth(month){
      let vm = this
      vm.getSelectedDate.activeMonth = month + 1;
      vm.$emit('monthClicked', { 
        monthShort: vm.$moment(vm.getSelectedDate.activeMonth, 'M').format('MMM'), 
        monthLong: vm.$moment(vm.getSelectedDate.activeMonth, 'M').format('MMMM'), 
        monthNumber: vm.getSelectedDate.activeMonth, 
        start: new Date(vm.$moment(vm.getSelectedDate.activeMonth +', '+ vm.paginationYear, 'M, YYYY').startOf('month')), 
        end: new Date(vm.$moment(vm.getSelectedDate.activeMonth +', '+ vm.paginationYear, 'M, YYYY').endOf('month')), 
      });
    },
    nextYear(){
      let vm = this
      vm.paginationYear += 1;
    },
    prevYear(){
      let vm = this
      vm.paginationYear -= 1
    },
  }
}
</script>