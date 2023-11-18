<template>
  <SideBarComponent></SideBarComponent>
  <div>
    Dashboard
  </div>
</template>

<script setup>
  import SideBarComponent from '@/components/admin/SideBarComponent.vue';
  import { useRouter } from 'vue-router'
  import axios from 'axios';
  const router = useRouter();

  const getToken = async () => {
    try {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
      axios.defaults.headers.common.Authorization = token;
      const api = `${import.meta.env.VITE_APP_API}api/user/check`;
      const res = await axios.post(api);
      if (!res.data.success) {
        router.push('/login');
      }
    } catch (error) {
      throw new Error(error);
    }
  }
  getToken();
</script>

<style scoped></style>