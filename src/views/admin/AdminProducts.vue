<template>
  <LoadingComponent :active="isLoading"></LoadingComponent>
  <div class="flex justify-end mt-5 mx-5 select-none">
    <button
      class="text-white bg-primary-700 hover:bg-primary-700-hover focus:ring-4 focus:outline-none focus:ring-primary-700-focus rounded-lg text-sm px-5 py-2.5 text-center"
      type="button" @click="openModal(true)">
      新增
    </button>
  </div>
  <div class="overflow-x-auto overflow-y-hidden rounded-lg border border-gray-200 shadow-md m-5">
    <table class="w-full border-collapse bg-white text-left text-gray-500 whitespace-nowrap">
      <thead class="bg-gray-50">
        <tr>
          <th scope="col" class="px-6 py-4 font-medium text-gray-900">分類</th>
          <th scope="col" class="px-6 py-4 font-medium text-gray-900">產品名稱</th>
          <th scope="col" class="px-6 py-4 font-medium text-gray-900">原價</th>
          <th scope="col" class="px-6 py-4 font-medium text-gray-900">售價</th>
          <th scope="col" class="px-6 py-4 font-medium text-gray-900">是否啟用</th>
          <th scope="col" class="px-6 py-4 font-medium text-gray-900">編輯</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-100 border-t border-gray-100">
        <tr class="hover:bg-gray-50" v-for="item in products" :key="item.id">
          <th class="px-6 py-4 font-normal text-gray-900">
            <div>
              <div class="font-medium text-gray-700">{{ item.category }}</div>
            </div>
          </th>
          <td class="px-6 py-4">
            {{ item.title }}
          </td>
          <td class="px-6 py-4">
            {{ item.origin_price }}
          </td>
          <td class="px-6 py-4">{{ item.price }}</td>
          <td class="px-6 py-4">
            <div class="flex gap-2">
              <span class="text-green-600" v-if="item.is_enabled">啟用</span>
              <span class="text-gray-500" v-else>未啟用</span>
            </div>
          </td>
          <td class="px-6 py-4">
            <div class="flex gap-4">
              <button type="button" class="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
                刪除
              </button>
              <button type="button" class="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
              @click="openModal(false, item)">
                編輯
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <ProductModal ref="card" @update-product="updateProduct" :product="tempProduct" :isNew="isNewProduct"></ProductModal>
</template>

<script setup>
import ProductModal from '@/components/admin/ProductModal.vue';
import { ref } from 'vue';
import axios from 'axios';

const products = ref([]);
const pagination = ref({});
const tempProduct = ref({});

const isLoading = ref(false);

// 取得產品
const getProduct = async () => {
  try {
    isLoading.value = true;
    const api = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/admin/products`;
    const res = await axios.get(api);
    if (res.data.success) {
      isLoading.value = false;
      products.value = res.data.products;
      pagination.value = res.data.pagination;
    }
  } catch (error) {
    isLoading.value = false;
    throw new Error(error);
  }
}
getProduct();

const card = ref(null);
const isNewProduct = ref(false);
const openModal = (isNew, item) => {
  if (isNew) {
    // card.value.form.resetForm();
    tempProduct.value = {};
  } else {
    tempProduct.value = { ...item };
  }
  isNewProduct.value = isNew;
  // console.log(card.value.form.resetForm());
  card.value.tempModal.show();
}

const updateProduct = async (item) => {
  try {
    isLoading.value = true;
    tempProduct.value = item;
    let api = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/admin/product`;
    let httpMethod = 'post';
    // 編輯
    if (!isNewProduct.value) {
      api = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/admin/product/${item.id}`;
      httpMethod = 'put';
    }
    const res = await axios[httpMethod](api, { data: tempProduct.value });
    if (res.data.success) {
      isLoading.value = false;
      card.value.tempModal.hide();
      getProduct();
    }
  } catch (error) {
    isLoading.value = false;
    throw new Error(error);
  }
}
</script>

<style scoped></style>