import { createRouter, createWebHistory } from 'vue-router'
import ContactosView from "@/views/ContactosView.vue";

const routes = [
  {
    path: '/',
    name: 'contactos',
    component: ContactosView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
