<script setup>
import { ref } from 'vue'
import Dialog from '@/volt/Dialog.vue'
import Button from '../../volt/Button.vue'
import router from '@/router/index.js'
import { useAuthStore } from '@/stores/authStore.js'
import { GoogleSignInButton } from 'vue3-google-signin'
import 'primeicons/primeicons.css'

const auth = useAuthStore()
const visibleCard = ref(false)
const greeting = ref()

if (auth.isAuthenticated) {
  greeting.value = 'Hola ' + auth.User.userName
}

function logout() {
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
    </nav>

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
          Todo tu mundo náutico, a un solo inicio de sesión.
        </h1>
        <h1 class="text-s">
          Controla los precios, organiza tus viajes más fácilmente y haz tus reservas más rápido
        </h1>
        <div class="flex flex-col gap-4">
          <RouterLink to="/login">
            <Button style="border-radius: 10px" label="Continuar con correo electrónico" />
          </RouterLink>
          <GoogleSignInButton @success="handleLoginSuccess"> </GoogleSignInButton>
          <Button style="border-radius: 10px" icon=" pi pi-facebook" label="Facebook" />
        </div>
      </div>
    </Dialog>
  </header>
</template>

<style scoped>
.text-header {
  font-weight: bold;
}
</style>
