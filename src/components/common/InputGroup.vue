<template>
  <div 
    class="relative"
    :class="[containerClass]"
  >
    <input
      v-if="type == 'input'"
      :type="inputType"
      class="w-full outline-none border-b "
      :class="[
        inputClass,
        leftIcon ? 'pl-12' : '',
        isError ? 'border-c-red focus:border-c-red' : 'border-c-D1D5DB',
      ]"
      :placeholder="placeholder"
      @click="$emit('inputClicked')"
      :value.prop="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      v-bind="$attrs"
    />

    <textarea
      v-if="type == 'textarea'"
      class="text-sm w-full outline-none border border-gray-300 rounded-xl py-3 px-4 focus:border-blue-800"
      :class="[
        inputClass,
        isError ? 'border-c-red' : '',
      ]"
      :placeholder="placeholder"
      v-bind="$attrs"
      style="resize:none"
      :value.prop="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script>
import {
  isObject
} from '@/helpers/utils';
export default {
  name: "InputGroup",
  props: {
    type: {
      type: String,
      default: 'input' // input | select | textarea
    },
    inputType: {
      type: String,
      default: 'text' // text | password | email
    },
    modelValue: {
      type: [String, Object, Number],
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    leftIcon: {
      type: String,
      default: "",
    },
    leftIconClass: {
      type: String,
      default: "",
    },
    rightIcon: {
      type: String,
      default: "",
    },
    rightIconClass: {
      type: String,
      default: "",
    },
    onIconClick: {
      type: Function
    },
    inputClass: {
      type: [String, Object],
      default: ''
    },
    selectDropClass: {
      type: [String, Object],
      default: ''
    },
    containerClass: {
      type: [String, Object],
      default: ''
    },
    isError: {
      type: Boolean,
      default: false,
    },
    isRequired: {
      type: Boolean,
      default: false,
    },
    options:  {
      type: Object,
      default: () => {}
    },
    showSelectDrop: {
      type: Boolean,
      default: false,
    },
    keyValue: {
      type: String,
      default: ''
    },
    noBorder: {
      type: Boolean,
      default: false
    },

  },
  data(){
    return  {

    }
  },
  created(){

},
  computed: {
    
  },
  methods: {
    isObject,

  },
};
</script>
