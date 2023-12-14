<template>
  <div class="absolute top-0 right-0 mt-5 z-10">
    <ToastComponent v-for="(msg, key) in messages" :key="key"
      :msg="msg"></ToastComponent>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue';
import ToastComponent from '@/components/admin/ToastComponent.vue';

const emitter = inject('emitter');
const messages = ref([]);

emitter.on('push-message', (message) => {
  const { style = 'green-500', title, content } = message;
  messages.value.push({ style, title, content });
})
</script>

<style scoped></style>