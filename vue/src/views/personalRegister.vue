<script>
export default {
  name: 'register',
}
</script>

<script setup>
import { ref, shallowRef } from 'vue'
import { useUserStore } from '@/stores/userStore.js'
import InputText from '@/volt/InputText.vue'
import Header from '@/components/general/header.vue'
import Button from '@/volt/Button.vue'
import { defineForm, field, isValidForm } from 'vue-yup-form'
import * as yup from 'yup'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const userStore = useUserStore()
const submitted = ref(false)

const generateForm = () => {
  const password = field(
    '',
    yup
      .string()
      .label(t('auth.register.password'))
      .required(t('auth.validation.passwordRequired'))
      .min(8, t('auth.validation.passwordMin'))
      .matches(/[a-z]/, t('auth.validation.passwordLowercase'))
      .matches(/[A-Z]/, t('auth.validation.passwordUppercase'))
      .matches(/[0-9]/, t('auth.validation.passwordNumber')),
  )

  return defineForm({
    firstName: field(
      '',
      yup
        .string()
        .label(t('auth.register.firstName'))
        .required(t('auth.validation.firstNameRequired'))
        .min(2, t('auth.validation.firstNameMin'))
        .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, t('auth.validation.firstNameLetters')),
    ),
    lastName: field(
      '',
      yup
        .string()
        .label(t('auth.register.lastName'))
        .required(t('auth.validation.lastNameRequired'))
        .min(2, t('auth.validation.lastNameMin'))
        .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, t('auth.validation.lastNameLetters')),
    ),
    birthDate: field(
      '',
      yup
        .date()
        .label(t('auth.register.birthDate'))
        .required(t('auth.validation.birthDateRequired'))
        .max(new Date(), t('auth.validation.birthDateFuture'))
        .test('age', t('auth.validation.birthDateAge'), function (value) {
          const cutoff = new Date()
          cutoff.setFullYear(cutoff.getFullYear() - 18)
          return value <= cutoff
        }),
    ),
    idDocument: field(
      '',
      yup
        .string()
        .label(t('auth.register.idDocument'))
        .required(t('auth.validation.idDocumentRequired'))
        .matches(/^[A-Z0-9]+$/, t('auth.validation.idDocumentFormat'))
        .min(6, t('auth.validation.idDocumentMin'))
        .max(20, t('auth.validation.idDocumentMax')),
    ),
    email: field(
      '',
      yup
        .string()
        .label(t('auth.register.email'))
        .required(t('auth.validation.emailRequired'))
        .email(t('auth.validation.emailValid'))
        .lowercase(),
    ),
    userName: field(
      '',
      yup
        .string()
        .label(t('auth.register.username'))
        .required(t('auth.validation.usernameRequired'))
        .min(4, t('auth.validation.usernameMin'))
        .max(20, t('auth.validation.usernameMax'))
        .matches(/^[a-zA-Z0-9_]+$/, t('auth.validation.usernameFormat')),
    ),
    password,
    passwordValidation: field('', () =>
      yup
        .string()
        .label(t('auth.register.confirmPassword'))
        .required(t('auth.validation.confirmPasswordRequired'))
        .oneOf([password.$value], t('auth.validation.passwordsMismatch')),
    ),
  })
}

const form = shallowRef(generateForm())

const handleSubmit = async () => {
  submitted.value = true

  if (!isValidForm(form.value)) {
    const firstError = document.querySelector('.text-red-500')
    if (firstError) {
      firstError.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  } else {
    try {
      await userStore.registerUser(form)
    } catch (error) {
      console.error('Error al registrar usuario:', error)
    }
  }
}
</script>

<template>
  <div class="min-h-screen main-page flex items-center justify-center px-4 py-12 bg-gray-50">
    <div class="w-full max-w-4xl">
      <div class="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
        <div class="mb-8 text-center">
          <h1 class="text-3xl font-bold text-gray-900 mb-2">
            {{ $t('auth.register.title') }}
          </h1>
          <p class="text-gray-600">
            {{ $t('auth.register.subtitle') }}
          </p>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div class="space-y-4">
            <h2 class="text-lg font-semibold text-gray-900 border-b pb-2">
              {{ $t('auth.register.personalInfo') }}
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="flex flex-col gap-1.5">
                <label for="firstName" class="text-sm font-medium text-gray-700">
                  {{ $t('auth.register.firstName') }}
                  <span class="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  v-model.trim="form.firstName.$value"
                  placeholder="Juan"
                  class="w-full border p-2.5 px-3 text-gray-900 outline-none border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  :class="{ 'border-red-500': submitted && form.firstName.$error }"
                />
                <span
                  class="text-red-500 text-sm min-h-[20px]"
                  v-if="submitted && form.firstName.$error"
                >
                  {{ form.firstName.$error.message }}
                </span>
              </div>
              <div class="flex flex-col gap-1.5">
                <label for="lastName" class="text-sm font-medium text-gray-700">
                  {{ $t('auth.register.lastName') }}
                  <span class="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  v-model.trim="form.lastName.$value"
                  placeholder="Pérez García"
                  class="w-full border p-2.5 px-3 text-gray-900 outline-none border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  :class="{ 'border-red-500': submitted && form.lastName.$error }"
                />
                <span
                  class="text-red-500 text-sm min-h-[20px]"
                  v-if="submitted && form.lastName.$error"
                >
                  {{ form.lastName.$error.message }}
                </span>
              </div>
              <div class="flex flex-col gap-1.5">
                <label for="birthDate" class="text-sm font-medium text-gray-700">
                  {{ $t('auth.register.birthDate') }}
                  <span class="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="birthDate"
                  id="birthDate"
                  v-model.trim="form.birthDate.$value"
                  class="w-full border p-2.5 px-3 text-gray-900 outline-none border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  :class="{ 'border-red-500': submitted && form.birthDate.$error }"
                />
                <span
                  class="text-red-500 text-sm min-h-[20px]"
                  v-if="submitted && form.birthDate.$error"
                >
                  {{ form.birthDate.$error.message }}
                </span>
              </div>
              <div class="flex flex-col gap-1.5">
                <label for="idDocument" class="text-sm font-medium text-gray-700">
                  {{ $t('auth.register.idDocument') }}
                  <span class="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="idDocument"
                  id="idDocument"
                  v-model.trim="form.idDocument.$value"
                  placeholder="12345678A"
                  class="w-full border p-2.5 px-3 text-gray-900 outline-none border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition uppercase"
                  :class="{ 'border-red-500': submitted && form.idDocument.$error }"
                />
                <span
                  class="text-red-500 text-sm min-h-[20px]"
                  v-if="submitted && form.idDocument.$error"
                >
                  {{ form.idDocument.$error.message }}
                </span>
              </div>
            </div>
          </div>
          <div class="space-y-4">
            <h2 class="text-lg font-semibold text-gray-900 border-b pb-2">
              {{ $t('auth.register.accountInfo') }}
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="flex flex-col gap-1.5">
                <label for="email" class="text-sm font-medium text-gray-700">
                  {{ $t('auth.register.email') }}
                  <span class="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  v-model.trim="form.email.$value"
                  placeholder="correo@ejemplo.com"
                  class="w-full border p-2.5 px-3 text-gray-900 outline-none border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  :class="{ 'border-red-500': submitted && form.email.$error }"
                />
                <span
                  class="text-red-500 text-sm min-h-[20px]"
                  v-if="submitted && form.email.$error"
                >
                  {{ form.email.$error.message }}
                </span>
              </div>
              <div class="flex flex-col gap-1.5">
                <label for="userName" class="text-sm font-medium text-gray-700">
                  {{ $t('auth.register.username') }}
                  <span class="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="userName"
                  id="userName"
                  v-model.trim="form.userName.$value"
                  placeholder="usuario123"
                  class="w-full border p-2.5 px-3 text-gray-900 outline-none border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  :class="{ 'border-red-500': submitted && form.userName.$error }"
                />
                <span
                  class="text-red-500 text-sm min-h-[20px]"
                  v-if="submitted && form.userName.$error"
                >
                  {{ form.userName.$error.message }}
                </span>
              </div>
              <div class="flex flex-col gap-1.5">
                <label for="password" class="text-sm font-medium text-gray-700">
                  {{ $t('auth.register.password') }}
                  <span class="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  v-model.trim="form.password.$value"
                  placeholder="••••••••"
                  class="w-full border p-2.5 px-3 text-gray-900 outline-none border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  :class="{ 'border-red-500': submitted && form.password.$error }"
                />
                <span
                  class="text-red-500 text-sm min-h-[20px]"
                  v-if="submitted && form.password.$error"
                >
                  {{ form.password.$error.message }}
                </span>
              </div>
              <div class="flex flex-col gap-1.5">
                <label for="passwordValidation" class="text-sm font-medium text-gray-700">
                  {{ $t('auth.register.confirmPassword') }}
                  <span class="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  name="passwordValidation"
                  id="passwordValidation"
                  v-model.trim="form.passwordValidation.$value"
                  placeholder="••••••••"
                  class="w-full border p-2.5 px-3 text-gray-900 outline-none border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  :class="{ 'border-red-500': submitted && form.passwordValidation.$error }"
                />
                <span
                  class="text-red-500 text-sm min-h-[20px]"
                  v-if="submitted && form.passwordValidation.$error"
                >
                  {{ form.passwordValidation.$error.message }}
                </span>
              </div>
            </div>
            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p class="text-sm font-medium text-blue-900 mb-2">Requisitos de la contraseña:</p>
              <ul class="text-sm text-blue-800 space-y-1 list-disc list-inside">
                <li>
                  {{ $t('auth.register.passwordReqMin') }}
                </li>
                <li>
                  {{ $t('auth.register.passwordReqUpper') }}
                </li>
                <li>
                  {{ $t('auth.register.passwordReqLower') }}
                </li>
                <li>
                  {{ $t('auth.register.passwordReqNumber') }}
                </li>
              </ul>
            </div>
          </div>
          <div class="pt-4">
            <Button
              type="submit"
              :label="$t('auth.register.submit')"
              class="w-full py-3 rounded-lg flex justify-center items-center gap-2 text-base font-semibold hover:opacity-90 transition"
            />
          </div>
          <div class="text-center text-sm text-gray-600">
            {{ $t('auth.register.hasAccount') }}

            <a href="/login" class="text-blue-600 hover:text-blue-700 font-medium">
              {{ $t('auth.register.loginHere') }}
            </a>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
input[type='date']::-webkit-calendar-picker-indicator {
  cursor: pointer;
}
</style>
