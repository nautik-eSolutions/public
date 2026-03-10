
<template>
  <header>
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
      <div class="flex items-center gap-6">
        <RouterLink to="/" class="flex items-center gap-2">
          <img src="../../assets/logoWOletter.png" class="h-12 p-0 m-0" />
          <span id="logos" class="text-lg sm:text-2xl lg:text-3xl">NAUTIK</span>
        </RouterLink>

        <nav v-if="auth.isAuthenticated" class="hidden sm:flex items-center gap-4 ml-4">
          <RouterLink
            to="/boats"
            class="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-lg font-medium"
          >
            Mis barcos
          </RouterLink>
          <RouterLink
            to="/bookings"
            class="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-lg font-medium"
          >
            Reservas
          </RouterLink>
        </nav>
      </div>

      <div class="flex items-center gap-4">
        <template v-if="!auth.isAuthenticated">
          <Button label="Log in" icon="pi pi-sign-in" @click="visibleCard = true" />
        </template>
        <template v-else>
          <span class="text-lg md:text-lg lg:text-2xl">{{ greeting }}</span>
          <Button
            icon="pi pi-sign-out"
            @click="logout"
            class="p-button-rounded p-button-text"
            style="color: darkred"
          />
        </template>
      </div>
      <select
        v-model="locale"
        @change="changeLanguage"
        class="mx-2 px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white"
      >
        <option v-for="lang in availableLanguages" :key="lang.code" :value="lang.code">
          {{ lang.name }}
        </option>
      </select>

      <template v-if="!auth.isAuthenticated">
        <Button :label="$t('header.login')" icon="pi pi-sign-in" @click="visibleCard = true" />
      </template>
      <template v-else>
        <div class="flex gap-2">
          <span class="text-lg md:text-lg lg:text-2xl">
            {{ $t('header.greeting') }} {{ auth.User?.userName }}
          </span>
        </div>
      </template>
    </nav>

    </header>
</template>

<script setup>
import { defineOptions, ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/stores/authStore.js'
import { useRouter } from 'vue-router'
import Dialog from '@/volt/Dialog.vue'
import Button from '../../volt/Button.vue'
import Drawer from '@/volt/Drawer.vue'
import Splitter from '@/volt/Splitter.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { GoogleSignInButton } from 'vue3-google-signin'
import { faCalendarDays, faReceipt, faShip, faUsers } from '@fortawesome/free-solid-svg-icons'
import 'primeicons/primeicons.css'

defineOptions({ name: 'Header' })

const auth = useAuthStore()
const router = useRouter()
const { t, locale } = useI18n()

const visibleCard = ref(false)
const visibleDrawer = ref(false)

const languageModules = import.meta.glob('@/locales/*.json', { eager: true })
const availableLanguages = Object.keys(languageModules)
  .map((path) => {
    const match = path.match(/\/([^/]+)\.json$/)
    return match ? match[1] : null
  })
  .filter(Boolean)
  .map((code) => ({
    code,
    name:
      code === 'es'
        ? 'Español'
        : code === 'en'
          ? 'English'
          : code === 'de'
            ? 'Deutsch'
            : code === 'fr'
              ? 'Français'
              : code === 'pt'
                ? 'Português'
                : code,
  }))

const changeLanguage = () => {
  localStorage.setItem('locale', locale.value)
}

onMounted(() => {
  const saved = localStorage.getItem('locale')
  if (saved && availableLanguages.some((l) => l.code === saved)) {
    locale.value = saved
  }
})

function logout() {
  visibleDrawer.value = false
  auth.logout()
}

const handleLoginSuccess = (response) => {
  const { credential } = response
  auth.oAuthLogin(credential)
}

function redirectToLogin() {
  router.push('/login')
}
</script>


<style scoped>
.text-header {
  font-weight: bold;
}
</style>
