<script setup>
import InputText from '@/volt/InputText.vue'
import { ref } from 'vue'

const email = ref();
const userName = ref();

</script>

<template>
  <div class="flex flex-col gap-6 w-full">
    <div class="flex flex-col gap-2 w-full">
      <label for="email1" class="text-surface-900 dark:text-surface-0 font-medium leading-normal"
        >Correo electrónico</label
      >
      <InputText
        id="email1"
        name="email1"
        type="text"
        v-model="email"
        placeholder="Correo electrónico"
        class="w-full px-3 py-2 shadow-sm rounded-lg"
      />
    </div>
    <div class="flex flex-col gap-2 w-full">
      <label for="password1" class="text-surface-900 dark:text-surface-0 font-medium leading-normal"
        >Nombre de usuario</label
      >

      <InputText
        id="userName"
        name="userName"
        v-model="userName"
        placeholder="Nombre de usuario"
        :toggleMask="true"
        :feedback="false"
        input-class="w-full!"
      />
    </div>

    <div
      class="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-3 sm:gap-0"
    ></div>
  </div>
</template>

<style scoped></style>
