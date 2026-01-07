import { createRouter, createWebHistory } from 'vue-router'
import startView from '@/views/startView.vue'
import addView from '@/views/addView.vue'
import categoriesView from '@/views/categoriesView.vue'
import updateView from '@/views/updateView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{
    path: "/",
    name: "start",
    component: startView
  },
  {
    path: "/categories",
    name: "categories",
    component: categoriesView
  }, 
  {
    path: "/add",
    name: "add",
    component: addView
  },
  {
    path: "/update",
    name: "update",
    component: updateView
  }
  ],


})

export default router
