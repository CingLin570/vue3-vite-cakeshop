<template>
  <div
    class="sidebar select-none z-10 fixed top-0 bottom-0 lg:left-0 p-2 w-[300px] overflow-y-auto text-center bg-primary-700 flex flex-col transition-transform"
    ref="sidebar">
    <div class="text-gray-100 text-xl">
      <div class="p-2.5 mt-1 flex items-center">
        <h1 class="font-bold text-gray-200 text-[24px]">後臺管理</h1>
        <i class="bi bi-x cursor-pointer ml-28 lg:hidden" onclick="openSidebar()"></i>
      </div>
      <div class="my-2 bg-primary-500 h-[1px]"></div>
    </div>
    <div class="mt-3 cursor-pointer text-white">
      <router-link :to="{ name: 'adminProducts' }" class="block text-left py-2.5 pl-2.5 pr-4 text-[15px] text-gray-200 font-bold rounded-md duration-300 hover:bg-primary-700-hover">產品管理</router-link>
    </div>
    <div class="mt-3  cursor-pointer text-white">
    </div>
    <div class="mt-3 cursor-pointer text-white">
    </div>
    <div class="mt-3 cursor-pointer text-white">
    </div>
    <div class="my-4 bg-primary-500 h-[1px]"></div>
    <div class="my-4 bg-primary-500 h-[1px] mt-auto"></div>
    <button type="button"
      class="p-2.5 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-primary-700-hover active:bg-primary-700-focus text-white"
      @click="logout">
      <span class="text-[15px] ml-4 text-gray-200 font-bold">登出</span>
    </button>
  </div>
</template>


<script setup></script>

<style scoped></style>