import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import axiosInstance from '@/plugins/axios.js'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import Lara  from '@primeuix/themes/lara'
import { definePreset } from '@primeuix/themes'
const app = createApp(App)
app.config.globalProperties.$axios = axiosInstance;


app.use(router)

app.use(PrimeVue, {
  unstyled: true,
})



app.mount('#app')
