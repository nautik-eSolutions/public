import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../views/landingPage.vue';
import SearchPage from '../views/searchPage.vue';
import PortPage from '@/views/portPage.vue'
import PersonalPage from "@/views/personalPage.vue";
import ConfirReserv from "@/views/confirReserv.vue";
import FormAddBoat from "@/views/FormAddBoat.vue";


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
      component: SearchPage
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
      path:'/reserv',
      name:'reservation',
      component:ConfirReserv
    },
    {
      path:'/addBarco',
      name:'addBarco',
      component:FormAddBoat
    }
  ],
})

export default router
