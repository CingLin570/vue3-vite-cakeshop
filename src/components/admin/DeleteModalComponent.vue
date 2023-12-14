<template>
  <div id="popup-modal" tabindex="-1"
    class="fixed top-0 left-0 right-0 z-50 hidden p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
    ref="modal">
    <div class="relative w-full max-w-md max-h-full">
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <button type="button"
          class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          @click="hideModal">
          <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
          </svg>
          <span class="sr-only">Close modal</span>
        </button>
        <div class="p-6 text-center">
          <font-awesome-icon :icon="['fa', 'circle-exclamation']" class="text-red-600 w-12 h-12 mb-3"/>
          <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            確認刪除【{{ temItem.title }}】{{ temItem.type }}?
          </h3>
          <button type="button"
            class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
            @click="$emit('delete-item', temItem)">
            確認
          </button>
          <button type="button"
            class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            @click="hideModal">
              取消
            </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { Modal } from 'flowbite';
// 綁定modal
const modal = ref(null);
const tempModal = ref('');
defineExpose({
  modal,
  tempModal
})
onMounted(() => {
  tempModal.value = new Modal(modal.value);
})
// 傳入Props
const temItem = ref({});
const props = defineProps({
  item: {
    type: Object,
    default() { return {}; },
  }
});
watch(props, () => {
  temItem.value = { ...props.item };
},
  {
    deep: true
  })
const hideModal = () => {
  tempModal.value.hide();
}
</script>