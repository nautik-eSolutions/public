<script>
export default {
  name: 'Header',
}
</script>

<script setup>
import { ref } from 'vue'
import Dialog from '@/volt/Dialog.vue'
import Button from '../../volt/Button.vue'
import router from '@/router/index.js'
import { useAuthStore } from '@/stores/authStore.js'
import Drawer from '@/volt/Drawer.vue'
import Splitter from '@/volt/Splitter.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { GoogleSignInButton } from 'vue3-google-signin'
import { faCalendarDays, faReceipt, faShip, faUsers } from '@fortawesome/free-solid-svg-icons'
import 'primeicons/primeicons.css'
import { useI18n } from 'vue-i18n'


const auth = useAuthStore()
const { t } = useI18n()
const visibleCard = ref(false)
const visibleDrawer = ref(false)
const greeting = ref()
if (auth.isAuthenticated) {
  greeting.value = t('header.greeting') + ' ' + auth.User.userName
}

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

<template>
  <header>
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
      <div class="flex gap-4">
        <template v-if="auth.isAuthenticated">
          <button
            @click="visibleDrawer = true"
            class="p-2 rounded-md hover:bg-gray-100 focus:outline-none"
            aria-label="Menú"
          >
            <i class="pi pi-bars text-2xl"></i>
          </button>
        </template>
        <RouterLink to="/">
          <div class="flex items-center gap-2">
            <img src="../../assets/logoWOletter.png" class="h-12 p-0 m-0" />
            <span id="logos" class="text-lg sm:text-2xl lg:text-3xl">NAUTIK</span>
          </div>
        </RouterLink>
      </div>
      <template v-if="!auth.isAuthenticated">
        <Button :label="$t('header.login')" icon="pi pi-sign-in" @click="visibleCard = true" />
      </template>
      <template v-else>
        <div class="flex gap-2">
          <span class="text-lg md:text-lg lg:text-2xl">{{ greeting }}</span>
        </div>
      </template>
    </nav>
    <Drawer
      v-model:visible="visibleDrawer"
      justify-center="justify-center"
      :header="$t('header.menu')"
    >
      <div class="flex flex-col justify-between h-full gap-8">
        <div class="flex flex-col h-full mb-4">
          <RouterLink to="/boats">
            <div class="flex items-center gap-3 hover:bg-sky-950 p-2 rounded-md cursor-pointer">
              <FontAwesomeIcon :icon="faShip" size="xl" />
              <span class="text-lg font-medium">{{ $t('header.myBoats') }}</span>
            </div>
          </RouterLink>
          <Splitter />
          <RouterLink to="/bookings">
            <div class="flex items-center gap-3 hover:bg-sky-950 p-2 rounded-md cursor-pointer">
              <FontAwesomeIcon :icon="faUsers" size="xl" />
              <span class="text-lg font-medium">{{ $t('header.myDocumentation') }}</span>
            </div>
          </RouterLink>
          <Splitter />
          <RouterLink to="/bookings">
            <div class="flex items-center gap-3 hover:bg-sky-950 p-2 rounded-md cursor-pointer">
              <FontAwesomeIcon :icon="faCalendarDays" size="xl" />
              <span class="text-lg font-medium">{{ $t('header.reservations') }}</span>
            </div>
          </RouterLink>
          <Splitter />
          <RouterLink to="/invoices">
            <div class="flex items-center gap-3 hover:bg-sky-950 p-2 rounded-md cursor-pointer">
              <FontAwesomeIcon :icon="faReceipt" size="xl" />
              <span class="text-lg font-medium">{{ $t('header.invoices') }}</span>
            </div>
          </RouterLink>
          <Splitter />
          <RouterLink to="/fixed-moorings">
            <div class="flex items-center gap-3 hover:bg-sky-950 p-2 rounded-md cursor-pointer">
              <FontAwesomeIcon :icon="faReceipt" size="xl" />
              <span class="text-lg font-medium">{{ $t('header.myMoorings') }}</span>
            </div>
          </RouterLink>
        </div>
        <Button
          :label="$t('header.logout')"
          @click="logout"
          icon="pi pi-sign-out"
          style="background-color: darkred"
        />
      </div>
    </Drawer>

    <Dialog v-model:visible="visibleCard" modal header=" " :style="{ width: '30rem' }">
      <div
        class="flex flex-col gap-3 py-2 px-2 justify-center content-center align-middle items-center"
      >
        <div
          class="logo flex flex-row justify-center gap-2 align-middle content-center items-center"
        >
          <img class="h-15" src="../../assets/logoWOletter.png" alt="logo" />
          <h1 class="text-3xl" id="logos">NAUTIK</h1>
        </div>
        <h1 class="text-header text-left text-3xl font-extrabold">
          {{ $t('header.dialog.tagline') }}
        </h1>
        <h1 class="text-s">
          {{ $t('header.dialog.subtitle') }}
        </h1>
        <div class="flex flex-col gap-4">
          <RouterLink to="/login">
            <Button style="border-radius: 10px" :label="$t('header.dialog.continueWithEmail')" />
          </RouterLink>
          <GoogleSignInButton @success="handleLoginSuccess"> </GoogleSignInButton>
          <Button
            style="border-radius: 10px"
            icon=" pi pi-facebook"
            :label="$t('header.dialog.facebook')"
          />
        </div>
      </div>
    </Dialog>

    <select v-model="locale" @change="changeLanguage">
      <option v-for="lang in availableLanguages" :key="lang.code" :value="lang.code">
        {{ lang.name }}
      </option>
    </select>
  </header>
</template>
<style scoped>
.text-header {
  font-weight: bold;
}
</style>
