<script>
export default {
  name: 'register',
}
</script>
<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/userStore.js'
import router from '@/router/index.js'

const userStore = useUserStore()

function handleEmailForm(formData) {
  userStore.createUser(formData.value.email, formData.value.userName)
  router.push('/register/passwords')
}
function handlePasswordForm(password) {
  userStore.register(password.value)
  router.push('/personal-register')
}
</script>

<template>
  <form @submit.prevent>
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
              {{ $t('auth.register.title') }}
            </div>
          </div>
        </div>
        <router-view
          @submitEmailForm="handleEmailForm"
          @submitPasswordForm="handlePasswordForm"
        ></router-view>
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
