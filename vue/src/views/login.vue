<script setup>
import InputText from '@/volt/InputText.vue'
import Button from '@/volt/Button.vue'
import Password from '@/volt/Password.vue'
import { onMounted, ref } from 'vue'
import { AuthService } from '@/service/AuthService.js'

const password = ref()
const email = ref()
const token = ref();
onMounted(async () => {
  token.value = await AuthService.loginUser('monds@corp.com', '747281231')
  console.log(token)
})
</script>

<template>
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
</template>

<style scoped>
.main-page {
  --s: 73px; /* control the size*/
  --c1: #e9eaf7;
  --c2: #05203d;

  --_g:
    var(--c2) 6% 14%, var(--c1) 16% 24%, var(--c2) 26% 34%, var(--c1) 36% 44%, var(--c2) 46% 54%,
    var(--c1) 56% 64%, var(--c2) 66% 74%, var(--c1) 76% 84%, var(--c2) 86% 94%;
  background:
    radial-gradient(100% 100% at 100% 0, var(--c1) 4%, var(--_g), #0008 96%, #0000),
    radial-gradient(100% 100% at 0 100%, #0000, #0008 4%, var(--_g), var(--c1) 96%) var(--c1);
  background-size: var(--s) var(--s);
}
body {
  height: 100%;
  width: 100%;
}
</style>
