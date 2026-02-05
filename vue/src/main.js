import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import axiosInstance from '@/plugins/axios.js'
import PrimeVue from 'primevue/config'
import { createPinia } from 'pinia'

const pinia = createPinia()
const app = createApp(App)


app.config.globalProperties.$axios = axiosInstance;
app.use(router)
app.use(PrimeVue, {
  unstyled: true,
})
app.use(pinia);


app.mount('#app')
