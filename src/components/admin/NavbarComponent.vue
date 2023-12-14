<template>
  <div class="w-full sticky top-0 border-b select-none bg-white">
    <div class="flex">
      <a href="#" class="p-4 inline-block border-r" @click.prevent="$emit('navbar-toggle')">
        <font-awesome-icon :icon="['fas', 'up-right-and-down-left-from-center']" size="lg" class="block"/>
      </a>
    </div>
  </div>
</template>
