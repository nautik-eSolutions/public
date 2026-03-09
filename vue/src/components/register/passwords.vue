<script setup>
import Password from '@/volt/Password.vue'
import { ref } from 'vue'
import Button from '@/volt/Button.vue'

const firstPassword = ref()
const secondPassword = ref()

const emits = defineEmits(['submitPasswordForm'])
function handleSubmit() {
  if (firstPassword.value === secondPassword.value) {
    emits('submitPasswordForm', secondPassword)
  } else {
    console.log('error')
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div class="flex flex-col gap-6 w-full">
      <div class="flex flex-col gap-2 w-full">
        <label
          for="password1"
          class="text-surface-900 dark:text-surface-0 font-medium leading-normal"
          >{{ $t('auth.register.password') }}</label
        >
        <Password
          id="password1"
          name="password1"
          v-model="firstPassword"
          :placeholder="$t('auth.login.passwordPlaceholder')"
          :toggleMask="true"
          :feedback="false"
          input-class="w-full!"
        />
      </div>
      <div class="flex flex-col gap-2 w-full">
        <label
          for="password2"
          class="text-surface-900 dark:text-surface-0 font-medium leading-normal"
          >{{ $t('auth.register.confirmPassword') }}</label
        >

        <Password
          id="password2"
          name="password2"
          v-model="secondPassword"
          :placeholder="$t('auth.register.confirmPasswordPlaceholder')"
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
