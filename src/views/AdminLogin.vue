<template>
  <LoadingComponent :active="isLoading"></LoadingComponent>
  <div class="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
    <div class="mx-auto w-[calc(100%-2rem)] md:w-[600px]">
      <h1 class="font-black text-center text-[32px]/[1.2] mb-5">請先登入</h1>
      <div class="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
        <VForm class="px-5 py-7" v-slot="{ meta }" @submit="login">
          <label for="inputEmail" class="font-semibold text-sm text-gray-600 pb-1 block">電子信箱</label>
          <VField type="email" name="username" class="rounded-lg focus:border-primary-700 focus:shadow-primary-700 focus:ring-primary-700-focus px-4 py-3 mt-1 w-full" placeholder="電子信箱"
            id="inputEmail" required autofocus autocomplete="email" label="電子信箱" rules="required|email"
            v-model="user.username" />
          <ErrorMessage name="username" class="text-red-700" />
          <label for="inputPassword" class="font-semibold text-sm text-gray-600 pb-1 block mt-5">密碼</label>
          <div class="relative">
            <VField :type="passwordType" name="password" class="rounded-lg focus:border-primary-700 focus:shadow-primary-700 focus:ring-primary-700-focus pl-4 pr-10 py-3 mt-1 w-full" id="inputPassword"
              placeholder="密碼" required autocomplete="current-password" label="密碼" rules="required" v-model="user.password" />
              <font-awesome-icon :icon="['far', 'eye']"  class="absolute right-4 p-2.5 mt-2.5 -ml-4" v-if="isPassword" @click="changePassword"/>
              <font-awesome-icon :icon="['far', 'eye-slash']" class="absolute right-4 p-2.5 mt-2.5 -ml-4" v-else @click="changePassword"/>
          </div>
          <ErrorMessage name="password" class="text-red-700" />
          <button type="submit"
            class="transition duration-200 mt-5 bg-primary-700 hover:bg-primary-700-hover focus:bg-primary-700-focus focus:shadow-sm focus:ring-4 focus:ring-primary-700-focus focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
            :class="{ 'disabled': !meta.valid }" :disabled="!meta.valid">
            <span class="inline-block mr-2">登入</span>
          </button>
        </VForm>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue';
import { useRouter } from 'vue-router'
import axios from 'axios';
import CryptoJS from 'crypto-js';
import Cookies from 'js-cookie';

const router = useRouter();
const user = ref({
  username: '',
  password: '',
});
const isLoading = ref(false);

// 密碼狀態切換
const isPassword = ref(true);
const passwordType = ref('password')
const changePassword = () => {
  isPassword.value = !isPassword.value;
  passwordType.value = isPassword.value ? 'password' : 'text';
}
// login
const emitter = inject('emitter');
const message = ref(null);
const login = async () => {
  try {
    const token = Cookies.get('hexToken');
    isLoading.value = true;
    if(!token) {
      Cookies.remove('hexToken');
    }
    const api = `${import.meta.env.VITE_APP_API}admin/signin`;
    const res = await axios.post(api, user.value);
    if(res.data.success) {
      isLoading.value = false;
      const { token, expired } = res.data;
      const tokenAES = CryptoJS.AES.encrypt(token, import.meta.env.VITE_APP_AES).toString();
      document.cookie = `hexToken=${tokenAES}; expires=${new Date(expired)}`;
      router.push({
        name: 'adminProducts',
      })
      emitter.emit('push-message', {
        style: 'green-500',
        title: '登入成功',
      })
    } else {
      isLoading.value = false;
      message.value = res.data.error.message;
      emitter.emit('push-message', {
        style: 'red-500',
        title: '登入失敗',
        content: res.data.error.message
      })
    }
  } catch (error) {
    isLoading.value = false;
    emitter.emit('push-message', {
      style: 'green-500',
      title: '登入失敗',
    })
    throw new Error(error);
  }
}

</script>

<style lang="scss" scoped>
.disabled {
  opacity: 0.5;

  &:hover {
    box-shadow: none;
  }
}
</style>