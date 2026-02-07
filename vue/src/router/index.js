import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../views/landingPage.vue'
import SearchPage from '../views/searchPage.vue'
import PortPage from '@/views/portPage.vue'
import Boats from '@/views/boats.vue'
import bookings from '@/views/bookings.vue'
import addBoat from '@/views/addBoat.vue'
import login from '@/views/login.vue'
import useAuthStore from '@/stores/authStore.js'




const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LandingPage,
    },
    {
      path: '/search/:id/:portName/:length/:beam/:startDate/:endDate',
      name: 'search',
      component: SearchPage,
    },
    {
      path: '/port',
      name: 'port',
      component: PortPage,
    },
    {
      path: '/boats',
      name: 'boats',
      component: Boats,
    },
    {
      path: '/boats/add',
      name: addBoat,
      component: addBoat,
      meta: { requiresAuth: true },
    },

    {
      path: '/bookings',
      name: 'booking',
      component: bookings,
    },

    {
      path: '/login',
      name: 'login',
      component: login,
    },
  ],
})



router.beforeEach( (to, from) => {
  const auth = useAuthStore();

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return {
      path: '/login',

    }
  }
})

export default router
