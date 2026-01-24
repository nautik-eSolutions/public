import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../views/landingPage.vue';
import SearchPage from '../views/searchPage.vue';
import PortPage from '@/views/portPage.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LandingPage
    },
    {
      path:'/search',
      name: 'search',
      component: SearchPage
    },
    {
      path:'/port',
      name:'port',
      component:PortPage
    }
  ],
})

export default router
