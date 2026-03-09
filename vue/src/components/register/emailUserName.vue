<script setup>
import InputText from '@/volt/InputText.vue'
import { ref } from 'vue'
import Button from '@/volt/Button.vue'
import router from '@/router/index.js'

const formData = ref({
  email: '',
  userName: '',
})

const emits = defineEmits(['submitEmailForm'])

function handleSubmit() {
  console.log(formData)
  emits('submitEmailForm', formData)
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div class="flex flex-col gap-6 w-full">
      <div class="flex flex-col gap-2 w-full">
        <label
          for="email1"
          class="text-surface-900 dark:text-surface-0 font-medium leading-normal"
          >{{ $t('auth.register.email') }}</label
        >

        <InputText
          id="email1"
          name="email1"
          type="text"
          v-model="formData.email"
          :placeholder="$t('auth.login.emailPlaceholder')"
          class="w-full px-3 py-2 shadow-sm rounded-lg"
        />
      </div>
      <div class="flex flex-col gap-2 w-full">
        <label
          for="password1"
          class="text-surface-900 dark:text-surface-0 font-medium leading-normal"
          >{{ $t('auth.register.userName') }}</label
        >

        <InputText
          id="userName"
          name="userName"
          v-model="formData.userName"
          :placeholder="$t('auth.register.userNamePlaceholder')"
          :toggleMask="true"
          :feedback="false"
          input-class="w-full!"
        />
      </div>

      <div
        class="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-3 sm:gap-0"
      ></div>
    </div>
    <Button
      :label="$t('common.continue')"
      type="submit"
      class="w-full py-2 rounded-lg flex justify-center items-center gap-2"
    >
    </Button>
  </form>
</template>

<style scoped></style>
