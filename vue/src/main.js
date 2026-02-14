import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import axiosInstance from '@/plugins/axios.js'
import PrimeVue from 'primevue/config'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { useAuthStore } from '@/stores/authStore.js'
import { createI18n } from 'vue-i18n'


const i18n = createI18n({
  locale: 'ja',
  fallbackLocale: 'en',
  messages: {
    en: {
      message: {
        hello: 'hello world'
      }
    },
    ja: {
      message: {
        hello: 'こんにちは、世界'
      }
    }
  }
})

const pinia = createPinia()
const app = createApp(App)

pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(i18n)

app.config.globalProperties.$axios = axiosInstance;

export const auth = useAuthStore()

app.use(router)

app.use(PrimeVue, {
  unstyled: true,
})



app.mount('#app')
