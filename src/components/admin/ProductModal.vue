<template>
  <div tabindex="-1"
    class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
    ref="modal">
    <div class="relative w-full max-w-7xl max-h-full">
      <VForm class="relative bg-white rounded-lg shadow dark:bg-gray-700" ref="form"
        @submit="$emit('update-product', tempProduct)">
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <div class="flex items-center justify-between p-5 border-b rounded-t dark:border-gray-600">
          <h3 class="text-xl font-medium text-gray-900 dark:text-white">
            {{ props.isNew ? '新增' : '編輯' }}產品
          </h3>
          <button type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            @click="hideModal">
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <div class="p-6 flex select-none">
          <div class="w-1/3 pr-6 text-base leading-relaxed text-gray-500 dark:text-gray-400">
            <div class="mb-3">
              <label for="image">輸入圖片網址</label>
              <input type="text" id="image" placeholder="請輸入圖片連結" class="block w-full rounded text-black truncate"
                v-model="tempProduct.imageUrl" />
            </div>
            <div class="mb-3">
              <label for="customFile">或 上傳圖片
              </label>
              <div role="status" v-if="fileStatus">
                <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor" />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill" />
                </svg>
                <span class="sr-only">Loading...</span>
              </div>
              <input type="file" id="customFile" class="border border-[#6B7280] rounded w-full text-black" ref="fileInput"
                @change="uploadFile" />
            </div>
            <img :src="tempProduct.imageUrl" alt="" />
            <!-- 延伸技巧，多圖 -->
            <div class="mt-5" v-if="tempProduct.imagesUrl">
              <div v-for="(image, key) in tempProduct.imagesUrl" class="mb-3 flex" :key="key">
                <input type="url" name="images" class="rounded-s w-full text-black overflow-hidden truncate"
                  v-model="tempProduct.imagesUrl[key]" placeholder="請輸入連結" />
                <button type="button"
                  class="border border-red-700 whitespace-nowrap text-red-700 rounded-r px-3 py-2 -ml-[1px] z-10 cursor-pointer hover:text-white hover:bg-red-700"
                  @click="tempProduct.imagesUrl.splice(key, 1)">
                  移除
                </button>
              </div>
              <div v-if="tempProduct.imagesUrl[tempProduct.imagesUrl.length - 1] ||
                !tempProduct.imagesUrl.length
                ">
                <button
                  class="w-full text-blue-700 border border-blue-700 px-4 py-2 rounded hover:text-white hover:bg-blue-700"
                  @click="tempProduct.imagesUrl.push('')">
                  新增圖片
                </button>
              </div>
            </div>
          </div>
          <div class="w-2/3 pl-6 col-span-2 text-base leading-relaxed text-gray-500 dark:text-gray-400">
            <div class="mb-3">
              <label for="title">標題</label>
              <VField type="text" id="title" name="title" placeholder="請輸入標題" class="block w-full rounded text-black"
                v-model="tempProduct.title" label="標題" rules="required"></VField>
              <ErrorMessage name="title" class="text-red-700"></ErrorMessage>
            </div>
            <div class="flex mb-3">
              <div class="w-1/2 pr-3">
                <label for="category">分類</label>
                <VField type="text" id="category" name="category" placeholder="請輸入分類"
                  class="block w-full rounded text-black" v-model="tempProduct.category" label="分類" rules="required">
                </VField>
                <ErrorMessage name="category" class="text-red-700"></ErrorMessage>
              </div>
              <div class="w-1/2 pl-3">
                <label for="unit">單位</label>
                <VField type="text" id="unit" name="unit" placeholder="請輸入單位" class="block w-full rounded text-black"
                  v-model="tempProduct.unit" label="分類" rules="required"></VField>
                <ErrorMessage name="unit" class="text-red-700"></ErrorMessage>
              </div>
            </div>
            <div class="flex mb-3">
              <div class="w-1/2 pr-3">
                <label for="origin_price">原價</label>
                <VField type="number" id="origin_price" name="origin_price" placeholder="請輸入原價"
                  class="block w-full rounded text-black" v-model.number="tempProduct.origin_price" label="原價"
                  rules="required|numeric"></VField>
                <ErrorMessage name="origin_price" class="text-red-700"></ErrorMessage>
              </div>
              <div class="w-1/2 pl-3">
                <label for="price">售價</label>
                <VField type="number" id="price" name="price" class="block w-full rounded text-black" placeholder="請輸入售價"
                  v-model.number="tempProduct.price" label="原價" rules="required|numeric"></VField>
                <ErrorMessage name="price" class="text-red-700"></ErrorMessage>
              </div>
            </div>
            <hr>
            <div class="my-3">
              <label for="description">產品描述</label>
              <textarea type="text" class="block w-full rounded text-black" id="description" placeholder="請輸入產品描述"
                v-model="tempProduct.description"></textarea>
            </div>
            <div class="mb-3">
              <label for="content">說明內容</label>
              <textarea type="text" class="block w-full rounded text-black" id="content" placeholder="請輸入產品說明內容"
                v-model="tempProduct.content"></textarea>
            </div>
            <div class="mb-3">
              <div class="flex items-center text-black">
                <input type="checkbox" id="is_enabled" class="rounded mr-1" v-model="tempProduct.is_enabled"
                  true-value="1" false-value="0" />
                <label for="is_enabled">
                  是否啟用
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="flex items-center justify-end p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
          <button type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            確認</button>
          <button type="button"
            class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            @click="hideModal">
            取消
          </button>
        </div>
      </div>
    </VForm>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { Modal } from 'flowbite';
import axios from 'axios';

const modal = ref(null);
const tempModal = ref('');
const form = ref(null);

defineExpose({
  modal,
  tempModal,
  form,
})
onMounted(() => {
  tempModal.value = new Modal(modal.value);
})

// 傳入產品資料Props
const tempProduct = ref({});
const props = defineProps({
  product: {
    type: Object,
    default() { return {}; },
  },
  isNew: {
    type: Boolean,
    default: true,
  }
});
// 監聽props傳進來的product
watch(() => props.product, () => {
  tempProduct.value = { ...props.product };
  // 多圖預設值
  if (!tempProduct.value.imagesUrl) {
    tempProduct.value.imagesUrl = [];
  }
},{ deep: true })

// 隱藏modal
const hideModal = () => {
  tempModal.value.hide();
}

// 上傳圖片
const fileInput = ref(null);
const fileStatus = ref(false);
const uploadFile = async () => {
  try {
    fileStatus.value = true;
    const uploadedFile = fileInput.value.files[0];
    const formData = new FormData();
    formData.append('file-to-upload', uploadedFile);
    const api = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/admin/upload`;
    const res = await axios.post(api, formData);
    console.log(res);
    if (res.data.success) {
      fileStatus.value = false;
      tempProduct.value.imageUrl = res.data.imageUrl;
    }
    else {
      fileStatus.value = false;
    }
  } catch (error) {
    fileStatus.value = false;
    throw new Error(error);
  }
}
</script>

<style scoped></style>