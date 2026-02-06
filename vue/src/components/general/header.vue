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
import useAuth from '@/stores/authStore.js'
import Avatar from '@/volt/Avatar.vue'
import Drawer from '@/volt/Drawer.vue'

const auth = useAuth()
const visibleCard = ref(false)
const visibleDrawer = ref(false)
const greeting = ref();
if (auth.isAuthenticated) {
  greeting.value = 'Hola ' + auth.User.userName
}

function logout() {
  visibleDrawer.value = false
  auth.logout()
}
function redirectToLogin() {
  router.push('/login')
}
</script>

<template>
  <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
    <div class="flex items-center gap-2">
      <img src="../../assets/logoWOletter.png" class="h-12 p-0 m-0" />
      <span id="logos" class="text-3xl">NAUTIK</span>
    </div>
    <template v-if="!auth.isAuthenticated">
      <Button label="Log in" @click="visibleCard = true" />
    </template>
    <template v-else>
      <div class="flex gap-2">
        <Avatar icon="pi pi-user" size="large" @click="visibleDrawer = true" />
      </div>
    </template>
  </nav>
  <Drawer v-model:visible="visibleDrawer" :header="greeting">
    <p></p>
    <Button label="Log out" @click="logout" style="background-color: darkred" />
  </Drawer>

  <Dialog v-model:visible="visibleCard" modal header=" " :style="{ width: '30rem' }">
    <div
      class="flex flex-col gap-3 py-2 px-2 justify-center content-center align-middle items-center"
    >
      <div class="logo flex flex-row justify-center gap-2 align-middle content-center items-center">
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
        <Button
          style="border-radius: 10px"
          label="Continuar con correo electrónico"
          @click="redirectToLogin"
        />
        <Button style="border-radius: 10px" icon=" pi pi-google" label="Google" />
        <Button style="border-radius: 10px" icon=" pi pi-facebook" label="Facebook" />
      </div>
    </div>
  </Dialog>
</template>
<style scoped>
.text-header {
  font-weight: bold;
}
</style>
