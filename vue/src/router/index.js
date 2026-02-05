import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../views/landingPage.vue';
import SearchPage from '../views/searchPage.vue';
import PortPage from '@/views/portPage.vue'
import PersonalPage from "@/views/personalPage.vue";
import bookings from "@/views/bookings.vue";
import boats from "@/views/boats.vue";
import login from '@/views/login.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LandingPage
    },
    {
      path:'/search/:id/:portName/:length/:beam/:startDate/:endDate',
      name: 'search',
      component: SearchPage,
    },
    {
      path:'/port',
      name:'port',
      component:PortPage
    },
    {
      path:'/personal',
      name:'personal',
      component:PersonalPage
    },
    {
      path:'/bookings',
      name:'booking',
      component:bookings
    },
    {
      path:'/boats',
      name:'boats',
      component:boats
    },
    {
      path:'/login',
      name:'login',
      component:login
    }
  ],
})

export default router
