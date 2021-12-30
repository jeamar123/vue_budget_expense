
<template>
  <div 
    class="fixed bottom-3 z-50 flex flex-col items-center justify-center"
    :class="{ 
      'left-3 right-auto' : position == 'left',
      'right-3 left-auto' : position == 'right',
    }"
  >
  
    <div class="px-4 py-2 bg-white rounded-sm shadow-md border border-gray-400 w-72">
      <p class="mb-1 text-red-600 text-base font-medium">{{ title || 'Error' }}</p>
      <p class="font-normal text-sm">{{ message || 'Something went wrong.' }}</p>
    </div>

  </div>
</template>

<script>
export default {
  name: 'ErrorNotification',
  props: {
    title:  {
      type: String,
      default: 'Error'
    },
    message: {
      type: String,
      default: 'Something went wrong.'
    },
    position: {
      type: String,
      default: 'right'
    },
  },
}
</script>