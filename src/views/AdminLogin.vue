<template>
  <section class="min-h-screen flex flex-col justify-center items-center">
      <form class="w-1/3" @submit.prevent="login">
        <h1 class="text-center text-[32px]/[1.2] font-black">請先登入</h1>
        <div class="mb-2">
          <label for="inputEmail" class="block">Email address</label>
          <input type="email"
          name="email"
          id="inputEmail"
          placeholder="Email address"
          required
          autofocus
          autocomplete="email"
          class="w-full px-4 py-2 border rounded"
          v-model="user.username">
        </div>
      <div class="mb-2">
        <label for="inputPassword" class="block">Password</label>
          <input type="password"
          name="password"
          id="inputPassword"
          placeholder="Password"
          required
          autocomplete="password"
          class="w-full px-4 py-2 border rounded"
          v-model="user.password">
        </div>
        <div class="text-center">
          <button class="transition duration-200 mt-5 bg-blue-500 hover:bg-blue-600
          focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500
          focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm
          hover:shadow-md font-semibold text-center inline-block"
          type="submit">
            登入
          </button>
        </div>
    </form>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'
import axios from 'axios';
const router = useRouter();
const user = ref({
  username: '',
  password: '',
});
// login
const login = async () => {
  try {
    const api = `${import.meta.env.VITE_APP_API}admin/signin`;
    const res = await axios.post(api, user.value);
    if(res.data.success) {
      const { token, expired } = res.data;
      document.cookie = `hexToken=${token}; expires=${new Date(expired)}`;
      router.push({
        name: 'dashboard',
      })
    }
  } catch (error) {
    throw new Error(error);
  }
}

</script>

<style scoped></style>