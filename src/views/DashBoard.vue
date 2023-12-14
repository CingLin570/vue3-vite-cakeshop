<template>
  <SideBarComponent ref="sidebar"></SideBarComponent>
  <div class="main relative ml-[300px] transition-[spacing]">
    <NavbarComponent @navbar-toggle="navbarToggle"></NavbarComponent>
    <router-view/>
  </div>
</template>

<script setup>
  import SideBarComponent from '@/components/admin/SideBarComponent.vue';
  import NavbarComponent from '@/components/admin/NavbarComponent.vue';
  import { ref } from 'vue';
  import { useRouter } from 'vue-router'
  import axios from 'axios';
  import CryptoJS from 'crypto-js';
  import Cookies from 'js-cookie';
  const router = useRouter();

  const getToken = async () => {
    try {
      const token = Cookies.get('hexToken');
      if(!token) {
        router.push('/login');
      }
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

  // navbar 收合
  const sidebar = ref(null);
  const navbarToggle = () => {
    sidebar.value.sidebar.classList.toggle('active');
  }
</script>

<style lang="scss" scoped>
.active {
  transform: translateX(-301px);
  &+.main{
    margin-left: 0px;
  }
}
</style>