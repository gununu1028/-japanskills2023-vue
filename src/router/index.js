import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
// ここから追記
import LoginView from '../views/LoginView.vue'
import FieldView from '../views/FieldView.vue'
// ここまで追記

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  // ここから追記
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/field',
    name: 'field',
    component: FieldView
  },
  // ここまで追記
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
