<template>
  <div class="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
    <div class="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
      <h1 class="font-black text-center text-[32px]/[1.2] mb-5">請先登入</h1>
      <div class="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
        <VForm class="px-5 py-7" v-slot="{ meta }" @submit="login">
          <label for="inputEmail" class="font-semibold text-sm text-gray-600 pb-1 block">電子信箱</label>
          <VField type="email" name="username" class="border rounded-lg px-4 py-3 mt-1 w-full" placeholder="電子信箱"
            id="inputEmail" required autofocus autocomplete="email" label="電子信箱" rules="required|email"
            v-model="user.username" />
          <ErrorMessage name="username" class="text-red-700" />
          <label for="inputPassword" class="font-semibold text-sm text-gray-600 pb-1 block mt-5">密碼</label>
          <VField type="password" name="password" class="border rounded-lg px-4 py-3 mt-1 w-full" id="inputPassword"
            placeholder="密碼" required autocomplete="password" label="密碼" rules="required" v-model="user.password" />
          <ErrorMessage name="password" class="text-red-700" />
          <button type="submit"
            class="transition duration-200 mt-5 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
            :class="{ 'disabled': !meta.valid }" :disabled="!meta.valid">
            <span class="inline-block mr-2">登入</span>
          </button>
        </VForm>
      </div>
    </div>
  </div>
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

<style lang="scss" scoped>
.disabled {
  background: #BFDBFE;

  &:hover {
    box-shadow: none;
  }
}
</style>