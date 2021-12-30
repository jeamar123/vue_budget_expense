<template>
  <div class="flex flex-col flex-1">
    <!-- tbl-scroll-wrapper  -->
    <div 
      class="c-scrollbar overflow-y-auto"
      :class="[
        limitRows.length > 0 ? scrollClass : '',
        tblContainerClass,
      ]"
    >
      <table class="w-full">
        <thead v-if="!hideHeader">
          <tr>
            <th 
              v-for="(list) in data.columnNames"
              :key="list.index"
              class="text-sm font-semibold border-b border-gray-200 pb-3 text-left"
              :class="{
                'text-center': false
              }"
            >{{ list }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(rowValue, rowIndex) in limitRows" :key="rowValue.index">
            <td 
              v-for="colValue in rowValue" 
              :key="colValue.index"
              class="border-t border-gray-200 py-3 text-left"
              :class="{
                'text-center' : false
              }"
            >
              <!-- If type is normal string(s) -->
              <div 
                v-if="!colValue.type || colValue.type == '' || colValue.type == 'string'" 
                @click="$emit(colValue.event ? colValue.event : 'firstColumnClicked', rowIndex)"
              >
                <p class="text-sm mb-1 font-medium" :class="colValue.data[0].styleClass">
                  {{ colValue.data[0].value }}
                </p>
                <p v-if="colValue.data[1]" class="text-xs text-gray-500 font-light" :class="colValue.data[1].styleClass">
                  {{ colValue.data[1].value }}
                </p>
              </div>

              <!-- If type is status badge -->
              <div 
                v-if="colValue.type == 'status-badge'"
                class="rounded-2xl text-center py-1 text-xs text-white w-24 capitalize"
                :class="[
                  'bg-' + getStatusColor(colValue.value)
                ]"
              >
                {{ colValue.value }}
              </div>

              <!-- If type is button -->
              <div v-if="colValue.type == 'button'">
                <VButton
                  btnStyle="outline-primary"
                  btnClass="px-3 py-2 rounded-md"
                  @click="$emit(colValue.event ? colValue.event : 'clicked')"
                > 
                  {{ colValue.value }}
                </VButton>
              </div>
              
              <!-- If type is payment-method -->
              <div v-if="colValue.type == 'payment-method'" class="flex items-center text-sm font-semibold">
                {{ colValue.value }}
                <img v-if="colValue.icon == 'visa'" src="@/assets/images/visa.svg" alt="" class="w-10 ml-3">
                <img v-if="colValue.icon == 'dana'" src="@/assets/images/dana.svg" alt="" class="w-16 ml-3">
                <img v-if="colValue.icon == 'gopay'" src="@/assets/images/gopay.svg" alt="" class="w-16 ml-3">
              </div>

              <!-- If show action buttons -->
              <div v-if="colValue.type == 'actions'" class="flex w-full items-center">
                <a v-if="colValue.actions.indexOf('power') > -1" href="javascript:void(0)" @click="$emit('toggleCloseModal', rowIndex)" class="mr-3">
                  <img src="@/assets/images/power-icon.svg" alt="" class="w-6">
                </a>
                <a v-if="colValue.actions.indexOf('banned') > -1" href="javascript:void(0)" @click="$emit('toggleBannedModal', rowIndex)" class="mr-3">
                  <img src="@/assets/images/banned.svg" alt="" class="w-6">
                </a>
                <a v-if="colValue.actions.indexOf('unbanned') > -1" href="javascript:void(0)" @click="$emit('toggleReleaseModal', rowIndex)" class="mr-3">
                  <img src="@/assets/images/unbanned.svg" alt="" class="w-6">
                </a>
                <VButton
                  v-if="colValue.actions.indexOf('default') > -1"
                  btnStyle="outline-primary"
                  btnClass="px-4 py-2 rounded-md shadow-md"
                  @click="$emit('defaultBtnClicked', rowIndex)"
                > 
                  Lihat Detail
                </VButton>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="limitRows.length == 0 && errorPrompt" class="flex flex-col flex-1 items-center justify-center">
      <img v-if="!data.isNoSearchResults" src="@/assets/images/no-data.svg" alt="" class="w-3/12">
      <img v-if="data.isNoSearchResults" src="@/assets/images/search-no-data.svg" alt="" class="w-3/12">
      <h4 class="text-lg my-7">
        
        {{
          data.isNoSearchResults ? 
            'Pencarian kamu tidak ditemukan'
          :
            $route.name == 'Users' ? 
              data.userStatus && data.userStatus != '' ? 
                `Status ${ data.userStatus.charAt(0).toUpperCase() + data.userStatus.slice(1) } kosong` 
              :
                $route.params.status == 'all' ? 'Semua status pengguna kosong'
              :
                `Status ${ $route.params.status.charAt(0).toUpperCase() + $route.params.status.slice(1) } kosong` 
            : 
              'Semua status pengguna kosong'
        }}
      </h4>
    </div>
    <div v-if="pagination == true" class="flex items-center border-t border-gray-200 pt-5">
      <div class="flex text-c-black text-xs font-semibold">
        <span class="mr-1">Terlihat</span>
        <span class="mr-1">{{ paginationData.start }}-{{ paginationData.end }}</span> 
        <span class="mr-1">dari</span>
        <span>{{ paginationData.total }}</span>
      </div>
      <div class="flex-1 flex items-center justify-end">
        <div class="cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
            class="w-4"
            :class="{
              'text-gray-300 pointer-events-none' : paginationData.activePage == 1,
              'text-c-primary' : paginationData.activePage != 1,
            }"
            @click="prevPage"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </div>
        <!-- <div 
          v-if="paginationData.currentPage > paginationCount"
          class="font-bold px-1 h-5 cursor-pointer text-violet"
          @click="selectPage(1)"
        >1</div>
        <div 
          v-if="paginationData.currentPage > paginationCount"
          class="font-bold text-lg h-5 leading-none tracking-widest text-violet"
        >...</div> -->

        <!-- <div 
          v-for="list in paginateTotalPages" 
          :key="list.index" 
          class="font-bold px-1 mx-1 h-5 cursor-pointer"
          v-bind:class="{
            'text-violet' : list != paginationData.currentPage,
          }" 
          @click="selectPage(list)"
        >{{ list }}</div> -->
        <div 
          v-for="(list) in paginateTotalPages" 
          :key="list.index" 
          class="font-semibold px-1 mx-1 cursor-pointer text-c-primary text-xs"
          :class="{
            'text-c-black' : list == paginationData.activePage,
          }" 
          @click="selectPage(list)"
        >{{ list }}</div>

        <!-- <div 
          v-if="paginationData.totalPages > 10 && (paginationData.totalPages - paginationData.currentPage >= paginationData.totalPages % paginationCount)"
          class="font-bold text-lg h-5 leading-none tracking-widest text-violet"
        >...</div>
        <div 
          v-if="paginationData.totalPages > 10 && (paginationData.totalPages - paginationData.currentPage >= paginationData.totalPages % paginationCount)"
          class="font-bold px-1 h-5 cursor-pointer text-violet"
          @click="selectPage(paginationData.totalPages)"
        >{{ paginationData.totalPages }}</div> -->
        <div class="cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
            class="w-4"
            :class="{
              'text-gray-300 pointer-events-none' : paginationData.activePage == paginationData.maxPage,
              'text-c-primary' : paginationData.activePage != paginationData.maxPage,
            }"
            @click="nextPage"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { chunkArray } from '@/helpers/utils';
import VButton from '@/components/common/VButton';

export default {
  name: 'VDataTable',
  props: {
    data: {
      type: Object,
      default: () => {}
    },
    rows: {
      type: Number,
      default: 0
    },
    scrollClass: {
      type: String,
      default: ''
    },
    tblContainerClass: {
      type: String,
      default: ''
    },
    pagination: {
      type: Boolean,
      default: true
    },
    hideHeader: {
      type: Boolean,
      default: false
    },
    errorPrompt: {
      type: Boolean,
      default: true
    },
    userStatus: {
      type: String,
      default: ''
    },
  },
  components: {
   VButton
  },
  data(){
    return {
      paginationValues: {
        start: 1,
        end: 1,
        total: 1,
        activePage: 1,
        perPage: 1,
        maxPage: 1,
        maxPaginationCount: 10,
      }
    }
  },
  computed: {
    paginationData(){
      if(this.data.maxTotal == 0){
        return this.paginationValues;
      }else{
        return {
          start: this.data.activePage == 1 ? 1 : this.paginationValues.start,
          end: this.data.activePage == 1 ? (this.data.perPage > this.data.maxTotal ? this.data.maxTotal : this.data.perPage) : this.paginationValues.end,
          total: this.data.maxTotal,
          activePage: this.paginationValues.activePage,
          perPage: this.data.perPage,
          maxPage: (this.data.maxTotal / this.data.perPage < 1 ? 1 : Math.ceil(this.data.maxTotal / this.data.perPage)),
          maxPaginationCount: 10
        }
      }
    },
    limitRows(){
      let vm = this
      if(vm.rows != 0){
        return vm.data.values.slice(0,vm.rows)
      }else{
        return vm.data.values;
      }
    },
    paginateTotalPages: function() {
      let vm = this
      if(vm.paginationData.maxPage > vm.paginationData.maxPaginationCount){
        let pagiArr = [];
        let chunkArr = vm.chunkArray([...Array(vm.paginationData.maxPage).keys()], 10);
        pagiArr = chunkArr[chunkArr.findIndex(function(el) { return el.includes(vm.paginationData.activePage-1)})];
        pagiArr = pagiArr.map(v => v+1);
        if(pagiArr[pagiArr.length - 1] < vm.paginationData.maxPage){
          pagiArr.push( pagiArr[pagiArr.length - 1] + 1 );
        }
        return pagiArr;
      }else{
        return vm.paginationData.maxPage;
      }
    }
  },
  mounted(){
    // console.log(this.data);
  },
  methods: {
    chunkArray,

    getStatusColor(status){
      let statusColor
      switch (status) {
        case 'all':    statusColor = 'c-all';    break
        case 'blocklimit':
        case 'unregistered':    statusColor = 'gray-200 text-gray-800 hidden';    break
        case 'incomplete':    statusColor = 'c-incomplete';    break
        case 'pending':    statusColor = 'c-pending';    break
        case 'active':    statusColor = 'c-active';    break
        case 'reject':    
        case 'rejected':    statusColor = 'c-rejected';    break
        case 'freeze':    statusColor = 'c-freeze';    break
        case 'banned':    statusColor = 'c-banned';    break
        case 'closed':    statusColor = 'c-closed';    break
        default:
          // 
          break
      }
      return statusColor
    },

    prevPage(){
      let vm = this
      if(vm.paginationValues.activePage != 1){
        vm.paginationValues.activePage -= 1;

        vm.paginationValues.start = vm.paginationValues.start - vm.paginationData.perPage;
        vm.paginationValues.end = vm.paginationValues.activePage * vm.paginationData.perPage;
        vm.$emit('onPagechange', vm.paginationValues.activePage);
        vm.$forceUpdate();
      }
    },

    nextPage(){
      let vm = this
      
      if(vm.paginationValues.activePage != vm.paginationData.maxPage){
        vm.paginationValues.activePage += 1;

        vm.paginationValues.start = vm.paginationValues.start + vm.paginationData.perPage;
        vm.paginationValues.end = vm.paginationValues.activePage * vm.paginationData.perPage;
        if(vm.paginationValues.end > vm.paginationData.total){
          vm.paginationValues.end = vm.paginationData.total;
        }
        vm.$emit('onPagechange', vm.paginationValues.activePage);
        vm.$forceUpdate();
      }
    },

    selectPage(page){
      let vm = this
      vm.paginationValues.activePage = page;
      vm.paginationValues.start = (vm.paginationValues.activePage * vm.paginationData.perPage) - (vm.paginationData.perPage-1);
      vm.paginationValues.end = vm.paginationValues.activePage * vm.paginationData.perPage;
      if(vm.paginationValues.end > vm.paginationData.total){
        vm.paginationValues.end = vm.paginationData.total;
      }
      vm.$emit('onPagechange', vm.paginationValues.activePage);
      vm.$forceUpdate();
    },
  },
}
</script>
