<script>
export default {
  name: 'login',
}
</script>
<script setup>
import InputText from '@/volt/InputText.vue'
import Button from '@/volt/Button.vue'
import Password from '@/volt/Password.vue'
import { onMounted, onUnmounted, ref } from 'vue'
import useAuth from '@/stores/authStore.js'

const auth = useAuth()
const password = ref()
const email = ref()

function handleSubmit(){
  auth.loginUser(email.value,password.value)
}



</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div
      class="flex absolute bg-cover main-page h-full w-full align-middle justify-center items-center content-center"
    >
      <div
        class="bg-white/90 backdrop-blur-xs border border-white/20 p-8 md:p-12 shadow-xl rounded-2xl w-full max-w-xl mx-auto flex flex-col gap-8"
      >
        <div class="flex flex-col items-center gap-4">
          <div class="flex items-center">
            <img class="h-18" src="../assets/logo-nautik.svg" />
            <h1 id="logos" class="text-3xl">NAUTIK</h1>
          </div>
          <div class="flex flex-col items-center gap-2 w-full">
            <div
              class="text-surface-900 dark:text-surface-0 text-2xl font-bold leading-tight text-center w-full"
            >
              Bienvenido otra vez!
            </div>
            <div class="text-center w-full">
              <span class="text-surface-700 dark:text-surface-200 leading-normal"
                >No tienes una cuenta?</span
              >
              <a class="text-primary font-medium ml-1 cursor-pointer hover:text-primary-emphasis"
                >Créate una hoy!</a
              >
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-6 w-full">
          <div class="flex flex-col gap-2 w-full">
            <label
              for="email1"
              class="text-surface-900 dark:text-surface-0 font-medium leading-normal"
              >Email Address</label
            >
            <InputText
              id="email1"
              name="email1"
              type="text"
              v-model="email"
              placeholder="Email address"
              class="w-full px-3 py-2 shadow-sm rounded-lg"
            />
          </div>
          <div class="flex flex-col gap-2 w-full">
            <label
              for="password1"
              class="text-surface-900 dark:text-surface-0 font-medium leading-normal"
              >Password</label
            >

            <Password
              id="password1"
              name="password1"
              v-model="password"
              placeholder="Password"
              :toggleMask="true"
              :feedback="false"
              input-class="w-full!"
            />
          </div>

          <div
            class="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-3 sm:gap-0"
          >
            <div class="flex items-center gap-2">
              <label for="rememberme1" class="text-surface-900 dark:text-surface-0 leading-normal"
                >Remember me</label
              >
            </div>
            <a class="text-primary font-medium cursor-pointer hover:text-primary-emphasis"
              >Forgot your password?</a
            >
          </div>
        </div>
        <Button
          type="submit"
          label="Sign In"
          icon="pi pi-user"
          class="w-full py-2 rounded-lg flex justify-center items-center gap-2"
        >
          <template #icon>
            <i class="pi pi-user text-base! leading-normal!" />
          </template>
        </Button>
      </div>
    </div>
  </form>
</template>

<style scoped>
.main-page {
  background-image: url('../assets/layered-peaks-haikei (1).svg');
  object-fit: cover;
}
body {
  height: 100%;
  width: 100%;
}
</style>
