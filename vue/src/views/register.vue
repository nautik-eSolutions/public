<script>
export default {
  name: 'register',
}
</script>
<script setup>
import InputText from '@/volt/InputText.vue'
import Button from '@/volt/Button.vue'
import Password from '@/volt/Password.vue'
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore.js'

const auth = useAuthStore()
const password = ref()
const email = ref()
//email = monds@corp.com
//password = 747281231
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
              Registráte
            </div>
          </div>
        </div>
        <router-view></router-view>
        <RouterLink to="/register/passwords">
          <Button
            label="Continuar"
            class="w-full py-2 rounded-lg flex justify-center items-center gap-2"
          >
          </Button>
        </RouterLink>
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
