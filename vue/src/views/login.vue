<script>
export default {
  name: 'login',
}
</script>

<script setup>
import InputText from '@/volt/InputText.vue'
import Button from '@/volt/Button.vue'
import Password from '@/volt/Password.vue'
import { ref, shallowRef } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/stores/authStore'
import { defineForm, field, isValidForm } from 'vue-yup-form'
import * as yup from 'yup'

const auth = useAuthStore()
const { t } = useI18n()
const submitted = ref(false)

const generateForm = () => {
  return defineForm({
    email: field(
      '',
      yup
        .string()
        .email(t('auth.validation.emailInvalid'))
        .required(t('auth.validation.emailRequired')),
    ),
    password: field(
      '',
      yup
        .string()
        .required(t('auth.validation.passwordRequired'))
        .min(8, t('auth.validation.passwordMin'))
        .matches(/[A-Z]/, t('auth.validation.passwordUppercase'))
        .matches(/[0-9]/, t('auth.validation.passwordNumber')),
    ),
  })
}

const form = shallowRef(generateForm())

const handleSubmit = async () => {
  submitted.value = true

  if (!isValidForm(form.value)) {
    return
  }

  await auth.loginUser(form.value.email.$value, form.value.password.$value)
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
              {{ $t('auth.login.title') }}
            </div>
            <RouterLink to="/personal-register" class="text-blue-500 hover:text-blue-700">
              <div class="text-center w-full">
                <span class="text-surface-700 dark:text-surface-200 leading-normal">{{
                  $t('auth.login.noAccount')
                }}</span>
                <a class="font-medium ml-1 cursor-pointer hover:text-primary-emphasis">{{
                  $t('auth.login.createOne')
                }}</a>
              </div>
            </RouterLink>
          </div>
        </div>
        <div class="flex flex-col gap-6 w-full">
          <div class="flex flex-col gap-2 w-full">
            <label
              for="email1"
              class="text-surface-900 dark:text-surface-0 font-medium leading-normal"
              >{{ $t('auth.login.email') }}</label
            >
            <InputText
              id="email1"
              name="email1"
              type="text"
              v-model="form.email.$value"
              :placeholder="$t('auth.login.emailPlaceholder')"
              class="w-full px-3 py-2 shadow-sm rounded-lg"
              :class="{ 'border-red-500': submitted && form.email.$error }"
            />
            <span v-if="submitted && form.email.$error" class="text-red-600 text-sm mt-1">
              {{ form.email.$error.message }}
            </span>
          </div>

          <div class="flex flex-col gap-2 w-full">
            <label
              for="password1"
              class="text-surface-900 dark:text-surface-0 font-medium leading-normal"
            >
              {{ $t('auth.login.password') }}
            </label>
            <Password
              id="password1"
              name="password1"
              v-model="form.password.$value"
              :placeholder="$t('auth.login.passwordPlaceholder')"
              :toggleMask="true"
              :feedback="false"
              input-class="w-full!"
              :class="{ 'p-invalid': submitted && form.password.$error }"
            />
            <span v-if="submitted && form.password.$error" class="text-red-600 text-sm mt-1">
              {{ form.password.$error.message }}
            </span>
          </div>

          <div
            class="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-3 sm:gap-0"
          >
            <div class="flex items-center gap-2">
              <label
                for="rememberme1"
                class="text-surface-900 dark:text-surface-0 leading-normal"
                >{{ $t('auth.login.rememberMe') }}</label
              >
            </div>
            <a class="text-primary font-medium cursor-pointer hover:text-primary-emphasis">
              {{ $t('auth.login.forgotPassword') }}
            </a>
          </div>
        </div>
        <Button
          type="submit"
          :label="$t('auth.login.submit')"
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
