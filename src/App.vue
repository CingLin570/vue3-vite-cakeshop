<template>
  <ToastMessages></ToastMessages>
  <RouterView />
</template>

<script setup>
import ToastMessages from '@/components/admin/ToastMessages.vue';
import { RouterView } from 'vue-router'
import { provide } from 'vue';
import emitter from '@/methods/emitter';

// mitt使用
provide('emitter', emitter);
</script>

<style scoped>
</style>
