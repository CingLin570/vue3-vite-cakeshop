<template>
  <nav>
    <ul class="flex justify-center select-none mb-3">
      <li>
        <button type="button"
          class="mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100 p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-primary-700 hover:text-white"
          href="#" @click.prevent="updatePage(props.page.current_page - 1)"
          :disabled="!props.page.has_pre" :class="{ 'disabled' : !props.page.has_pre }">
          <font-awesome-icon :icon="['fas', 'angle-left']" />
        </button>
      </li>
      <li v-for="page in props.page.total_pages" :key="page">
        <button type="button"
          class="mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100 p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-primary-700 hover:text-white"
          href="#" :class="{ 'bg-primary-700 text-white': page === props.page.current_page }"
          @click.prevent="updatePage(page)">{{ page }}</button>
      </li>
      <li>
        <button type="button"
          class="mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100 p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-primary-700 hover:text-white"
          href="#" :class="{ 'disabled' : !props.page.has_next }"
          :disabled="!props.page.has_next"
          @click.prevent="updatePage(props.page.current_page + 1)">
          <font-awesome-icon :icon="['fas', 'angle-right']" />
        </button>
      </li>
    </ul>
  </nav>
</template>

<script setup>
const props = defineProps({
  page: {
    type: Object
  }
})
const emit = defineEmits(['emit-pages']);
const updatePage = (page) => {
  emit('emit-pages', page);
}
</script>

<style scoped lang="scss">
.disabled {
  background-color: transparent;
  color: #E5E7EB;
}
</style>