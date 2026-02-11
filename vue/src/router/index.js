import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../views/landingPage.vue'
import SearchPage from '../views/searchPage.vue'
import PortPage from '@/views/portPage.vue'
import Boats from '@/views/boats.vue'
import bookings from '@/views/bookings.vue'
import addBoat from '@/views/addBoat.vue'
import login from '@/views/login.vue'
import { auth } from '@/main.js'
import register from '@/views/register.vue'
import Passwords from '../components/register/passwords.vue';
import EmailUserName from '@/components/register/emailUserName.vue'
import PersonalRegister from '@/views/personalRegister.vue'


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
    {
      path:'/register',
      name: 'register',
      component: register,
      children:[
        {
          path:"email-username",
          name:"emailUsername",
          component: EmailUserName
        },
        {
          path: "passwords",
          name: "passwords",
          component: Passwords

        }
      ]
    },
    {
      path:'/personal-register',
      name:'personal-register',
      component: PersonalRegister
    }
  ],
})



router.beforeEach( (to, from) => {

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return {
      path: '/login',

    }
  }
})

export default router
