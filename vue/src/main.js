import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import axiosInstance from '@/plugins/axios.js'
import PrimeVue from 'primevue/config'
const app = createApp(App)

app.config.globalProperties.$axios = axiosInstance;

app.use(router)
app.use(PrimeVue)
app.mount('#app')
