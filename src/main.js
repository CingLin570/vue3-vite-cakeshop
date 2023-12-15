import './style.css'
import { createApp } from 'vue'
// 引入 VeeValidate 元件跟功能
import {
  Field, Form, ErrorMessage, defineRule, configure,
} from 'vee-validate';
// 引入 VeeValidate 的驗證規則
import AllRules from '@vee-validate/rules';
// 引入 VeeValidate 的 i18n 功能
import { localize, setLocale } from '@vee-validate/i18n';
// 引入 VeeValidate 的繁體中文語系檔
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';
import fields from './fields/zh_TW.json';
// 引入 vue-loading-overlay
import Loading from 'vue3-loading-overlay'
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css'
// import the fontawesome core
import { library } from '@fortawesome/fontawesome-svg-core'
// import font awesome icon component
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// import specific icons
import { faUpRightAndDownLeftFromCenter, faArrowRightFromBracket, faCircleExclamation, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons'
/* add icons to the library */
library.add(faUpRightAndDownLeftFromCenter, faArrowRightFromBracket, faCircleExclamation, faEye, faEyeSlash, faAngleLeft, faAngleRight)

import { createPinia } from 'pinia'
import axios from 'axios'
import VueAxios from 'vue-axios'

import App from './App.vue'
import router from './router'

// 使用 Object.keys 將 AllRules 轉為陣列並使用 forEach 迴圈將驗證規則加入 VeeValidate
Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule]);
});

// 將當前 VeeValidate 的語系設定為繁體中文
configure({
  generateMessage: localize({
    zh_TW: {
      fields,
      messages: zhTW.messages,
    },
  }),
  validateOnInput: true,
});
setLocale('zh_TW');

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueAxios, axios)

// 掛載 Global 的 VeeValidate 元件
app.component('VField', Field);
app.component('VForm', Form);
app.component('ErrorMessage', ErrorMessage);
app.component('LoadingComponent', Loading)
// 註冊 font-awesome
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app')
