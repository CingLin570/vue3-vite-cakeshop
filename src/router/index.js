import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/AdminLogin.vue')
    },
    {
      path: '/admin',
      name: 'dashboard',
      component: () => import('../views/DashBoard.vue'),
      children: [
        {
          path: '',
          name: 'adminProducts',
          component: () => import('../views/admin/AdminProducts.vue'),
        },
      ]
    },
  ]
})

export default router
