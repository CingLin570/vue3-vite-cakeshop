<template>
  <div
    class="sidebar select-none z-10 fixed top-0 bottom-0 lg:left-0 p-2 w-[300px] overflow-y-auto text-center bg-brown-700 flex flex-col transition-transform"
    ref="sidebar">
    <div class="text-gray-100 text-xl">
      <div class="p-2.5 mt-1 flex items-center">
        <h1 class="font-bold text-gray-200 text-[24px] ml-3">後臺管理</h1>
        <i class="bi bi-x cursor-pointer ml-28 lg:hidden" onclick="openSidebar()"></i>
      </div>
      <div class="my-2 bg-brown-500 h-[1px]"></div>
    </div>
    <div class="mt-3 cursor-pointer text-white">

    </div>
    <div class="mt-3  cursor-pointer text-white">
    </div>
    <div class="mt-3 cursor-pointer text-white">
    </div>
    <div class="mt-3 cursor-pointer text-white">
    </div>
    <div class="my-4 bg-brown-500 h-[1px]"></div>
    <div class="my-4 bg-brown-500 h-[1px] mt-auto"></div>
    <button type="button"
      class="p-2.5 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
      @click="logout">
      <span class="material-icons-outlined">logout</span>
      <span class="text-[15px] ml-4 text-gray-200 font-bold">登出</span>
    </button>
  </div>
</template>


<script setup></script>

<style scoped></style>