<script>
export default {
  name: 'Header',
}
</script>

<script setup>
import Dialog from '@/volt/Dialog.vue'

import { InputText } from 'primevue'

import Button from '../../volt/Button.vue'
import { ref } from 'vue'
import router from '@/router/index.js'

const visible = ref(false)

function login(){
  router.push("login")
}


</script>

<template>
  <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
    <div class="flex items-center gap-2">
      <img src="../../assets/logoWOletter.png" class="h-12 p-0 m-0" />
      <span id="logos" class="text-3xl">NAUTIK</span>
    </div>

    <Button label="Log in" @click="visible = true" />
  </nav>
  <Dialog v-model:visible="visible" modal header=" " :style="{ width: '30rem' }">
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
        <Button style="border-radius: 10px"  label="Continuar con correo electrónico" @click="login" />
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
