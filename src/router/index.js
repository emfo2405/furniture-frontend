import { createRouter, createWebHistory } from 'vue-router'
import startView from '@/views/startView.vue'
import addView from '@/views/addView.vue'
import categoriesView from '@/views/categoriesView.vue'
import updateView from '@/views/updateCategoryView.vue'
import CreateUser from '@/views/createUser.vue'
import ProductsView from '@/views/productsView.vue'
import UpdateCategoryView from '@/views/updateCategoryView.vue'
import UpdateProductView from '@/views/updateProductView.vue'


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
    path: "/createuser",
    name: "createUser",
    component: CreateUser
  },
  {
    path: "/products/:categoryId",
    name: "products",
    component: ProductsView
  },
    {
    path: "/categories/:categoryId",
    name: "updateCategories",
    component: UpdateCategoryView
  },
      {
    path: "/products/:productId",
    name: "updateProducts",
    component: UpdateProductView
  }
  ],


})

export default router
