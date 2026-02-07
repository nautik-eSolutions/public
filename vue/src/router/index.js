import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../views/landingPage.vue';
import SearchPage from '../views/searchPage.vue';
import PortPage from '@/views/portPage.vue'
import Boats from "@/views/boats.vue";
import bookings from "@/views/bookings.vue";
import AddBoats from "@/views/addBoats.vue";
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
      path:'/boats',
      name:'boats',
      component:Boats
    },
    {
      path:'/bookings',
      name:'booking',
      component:bookings
    },
    {
      path:'/add/AddBoats',
      name:'addBoats',
      component:AddBoats
    },
    {
      path:'/login',
      name:'login',
      component:login
    }
  ],
})

export default router
