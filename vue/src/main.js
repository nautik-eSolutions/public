import './assets/main.css'
import GoogleSignInPlugin from 'vue3-google-signin'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import axiosInstance from '@/plugins/axios.js'
import PrimeVue from 'primevue/config'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { useAuthStore } from '@/stores/authStore.js'
import { i18n } from '@/plugins/i18n.js'

const pinia = createPinia()
const app = createApp(App)
const googleClient = import.meta.env.VITE_GOOGLE_CLIENT_ID

pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(i18n)

app.config.globalProperties.$axios = axiosInstance;

export const auth = useAuthStore()

app.use(GoogleSignInPlugin,{
  clientId:googleClient
})

app.use(router)

app.use(PrimeVue, {
  unstyled: true,
})



app.mount('#app')
