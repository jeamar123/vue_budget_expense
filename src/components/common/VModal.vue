<template>
  <transition name="modal">
    <div class="modal-mask fixed top-0 left-0 h-full w-full bg-black bg-opacity-30 z-50">
      <div class="modal-wrapper flex h-full items-center justify-center">
        <div 
          class="modal-container bg-white px-4 pt-5 pb-5 w-full rounded-md relative my-auto"
          :class="[
            'max-w-' + size
          ]"
        >
          <!-- <a href="javascript:void(0)" @click="$emit('close')" class="absolute top-4 right-4">
            <img src="@/assets/images/close.svg" alt="" class="w-5 h-5">
          </a> -->

          <div class="modal-header mb-3 pb-3">
            <slot name="header">
              <h3 class="font-semibold text-xl">{{ title }}</h3>
            </slot>
          </div>

          <div class="modal-body mb-5">
            <slot name="body">
              <p>modal body</p>
            </slot>
          </div>

          <div v-if="showFooterBtns" class="modal-footer">
            <slot name="footer">
              <div class="flex justify-end pt-5">
                <VButton
                  @click="$emit('close')"
                  btnStyle="normal"
                  btnClass="px-8 py-3 mx-1 text-c-primary underline"
                >
                  Cancel
                </VButton>
                <VButton
                  :btnStyle="confirmBtnStyle"
                  btnClass="px-8 py-3 mx-1 rounded-lg "
                  @click="$emit('confirm')"
                >
                  {{ confirmBtnLabel }}
                </VButton>
              </div>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import VButton from '@/components/common/VButton';
export default {
  name: 'VModal',
  components:{
    VButton
  },
  props: {
    title:  {
      type: String,
      default: 'Modal Title'
    },
    confirmBtnStyle: {
      type: String,
      default: 'primary'
    },
    size: {
      type: String,
      default: 'lg'
    },
    confirmBtnLabel: {
      type: String,
      default: 'Confirm'
    },
    showFooterBtns: {
      type: Boolean,
      default: true
    },
  }
}
</script>