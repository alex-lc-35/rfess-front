import { createRouter, createWebHistory } from 'vue-router'

// Définir vos composants pour les routes
import HomePage from '@/pages/HomePage.vue'
import MapPage from '@/pages/MapPage.vue'
import TestPage from '@/pages/TestPage.vue'
import FormPage from '@/pages/FormPage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/carte',
    name: 'MapPage',
    component: MapPage,
  },
  {
    path: '/test',
    name: 'TestPage',
    component: TestPage,
  },
  {
    path: '/form',
    name: 'FormPage',
    component: FormPage,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
