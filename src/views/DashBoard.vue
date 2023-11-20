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
  import CryptoJS from 'crypto-js';
  import Cookies from 'js-cookie';
  const router = useRouter();

  const getToken = async () => {
    try {
      const token = Cookies.get('hexToken');
      const bytes  = CryptoJS.AES.decrypt(token, import.meta.env.VITE_APP_AES);
      const originalToken = bytes.toString(CryptoJS.enc.Utf8);
      axios.defaults.headers.common.Authorization = originalToken;
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