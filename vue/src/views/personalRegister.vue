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

const userStore = useUserStore()
const submitted = ref(false)

const generateForm = () => {
  const password = field(
    '',
    yup
      .string()
      .label('Contraseña')
      .required('La contraseña es obligatoria')
      .min(8, 'La contraseña debe tener al menos 8 caracteres')
      .matches(/[a-z]/, 'Debe contener al menos una letra minúscula')
      .matches(/[A-Z]/, 'Debe contener al menos una letra mayúscula')
      .matches(/[0-9]/, 'Debe contener al menos un número'),
  )

  return defineForm({
    firstName: field(
      '',
      yup
        .string()
        .label('Nombre')
        .required('El nombre es obligatorio')
        .min(2, 'El nombre debe tener al menos 2 caracteres')
        .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'El nombre solo debe contener letras'),
    ),
    lastName: field(
      '',
      yup
        .string()
        .label('Apellidos')
        .required('Los apellidos son obligatorios')
        .min(2, 'Los apellidos deben tener al menos 2 caracteres')
        .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'Los apellidos solo deben contener letras'),
    ),
    birthDate: field(
      '',
      yup
        .date()
        .label('Fecha de nacimiento')
        .required('La fecha de nacimiento es obligatoria')
        .max(new Date(), 'La fecha no puede ser futura')
        .test('age', 'Debes ser mayor de 18 años', function (value) {
          const cutoff = new Date()
          cutoff.setFullYear(cutoff.getFullYear() - 18)
          return value <= cutoff
        }),
    ),
    idDocument: field(
      '',
      yup
        .string()
        .label('Documento de identidad')
        .required('El documento de identidad es obligatorio')
        .matches(/^[A-Z0-9]+$/, 'Formato de documento inválido')
        .min(6, 'El documento debe tener al menos 6 caracteres')
        .max(20, 'El documento no puede exceder 20 caracteres'),
    ),
    email: field(
      '',
      yup
        .string()
        .label('Correo electrónico')
        .required('El correo electrónico es obligatorio')
        .email('Debe ser un correo electrónico válido')
        .lowercase('El correo debe estar en minúsculas'),
    ),
    userName: field(
      '',
      yup
        .string()
        .label('Nombre de usuario')
        .required('El nombre de usuario es obligatorio')
        .min(4, 'El nombre de usuario debe tener al menos 4 caracteres')
        .max(20, 'El nombre de usuario no puede exceder 20 caracteres')
        .matches(/^[a-zA-Z0-9_]+$/, 'Solo letras, números y guiones bajos'),
    ),
    password,
    passwordValidation: field('', () =>
      yup
        .string()
        .label('Confirmación de contraseña')
        .required('Debes confirmar tu contraseña')
        .oneOf([password.$value], 'Las contraseñas no coinciden'),
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
          <h1 class="text-3xl font-bold text-gray-900 mb-2">Régistrate hoy</h1>
          <p class="text-gray-600">Disfruta de todas las ventajas de ser miembro</p>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div class="space-y-4">
            <h2 class="text-lg font-semibold text-gray-900 border-b pb-2">Información Personal</h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="flex flex-col gap-1.5">
                <label for="firstName" class="text-sm font-medium text-gray-700">
                  Nombre <span class="text-red-500">*</span>
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
                  Apellidos <span class="text-red-500">*</span>
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
                  Fecha de Nacimiento <span class="text-red-500">*</span>
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
                  Documento de Identidad <span class="text-red-500">*</span>
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
            <h2 class="text-lg font-semibold text-gray-900 border-b pb-2">Información de Cuenta</h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="flex flex-col gap-1.5">
                <label for="email" class="text-sm font-medium text-gray-700">
                  Correo Electrónico <span class="text-red-500">*</span>
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
                  Nombre de Usuario <span class="text-red-500">*</span>
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
                  Contraseña <span class="text-red-500">*</span>
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
                  Confirmar Contraseña <span class="text-red-500">*</span>
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
                <li>Mínimo 8 caracteres</li>
                <li>Al menos una letra mayúscula</li>
                <li>Al menos una letra minúscula</li>
                <li>Al menos un número</li>
              </ul>
            </div>
          </div>
          <div class="pt-4">
            <Button
              type="submit"
              label="Crear cuenta"
              class="w-full py-3 rounded-lg flex justify-center items-center gap-2 text-base font-semibold hover:opacity-90 transition"
            />
          </div>
          <div class="text-center text-sm text-gray-600">
            ¿Ya tienes una cuenta?
            <a href="/login" class="text-blue-600 hover:text-blue-700 font-medium">
              Inicia sesión aquí
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
