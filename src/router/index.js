import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'start',
      component: () => import('../views/StartView.vue')
    },
    {
      path: '/select',
      name: 'select',
      component: () => import('../views/SelectView.vue')
    }, // ここのカンマを忘れないように
    // ここから追加
    {
      path: '/field',
      name: 'field',
      component: () => import('../views/FieldView.vue')
    },
    {
      path: '/clear',
      name: 'clear',
      component: () => import('../views/ClearView.vue')
    }
    // ここまで追加
  ]
})

export default router
