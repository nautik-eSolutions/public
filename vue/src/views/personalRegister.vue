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
//email = monds@corp.com
//password = 747281231

const userStore = useUserStore()
const submitted = ref(false)

const generateForm = () => {
  const password = field('', yup.string().label('Password').required())

  return defineForm({
    firstName: field('', yup.string().required()),
    lastName: field('', yup.string().required()),
    birthDate: field('', yup.date().required()),
    idDocument: field('', yup.string().required()),
    email: field('', yup.string().required()),
    password,
    passwordValidation: field('', () =>
      yup
        .string()
        .label('Confirm password')
        .required()
        .oneOf([password.$value], ({ label }) => `${label} does not match`),
    ),
    userName: field('', yup.string().required()),
  })
}

const form = shallowRef(generateForm())

const handleSubmit = async () => {
  submitted.value = true

  if (!isValidForm(form.value)) {
  } else {
    await userStore.registerUser(form)
  }
}
</script>

<template>
  <div
    class="max-w-6xl mx-auto px-4 pb-20 h-[100vh] flex align-middle items-center justify-center content-center"
  >
    <div class="rounded-md text-white shadow-2xl">
      <div class="bg-white rounded-xl flex flex-col border gap-4 border-gray-200 shadow-sm p-8">
        <h1 class="text-3xl font-bold text-black">
          Régistrate hoy y disfruta de todas las ventajas
        </h1>
        <form @submit.prevent="handleSubmit" class="space-y-6 flex align-items justify-center">
          <div
            class="w-full flex flex-row gap-2 items-center align-middle justify-around flex-wrap"
          >
            <div class="flex flex-col gap-0.5 w-1/3">
              <label for="firstName" class="text-black">Nombre</label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                v-model.trim="form.firstName.$value"
                class="w-full border p-1.5 px-2 text-black outline-none border-gray-300 rounded-lg"
              />
              <span class="text-red-500" v-if="submitted && form.firstName.$error">{{
                form.firstName.$error.message
              }}</span>
            </div>
            <div class="flex flex-col gap-0.5 w-1/3">
              <label for="lastName" class="text-black">Apellidos</label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                v-model.trim="form.lastName.$value"
                class="w-full border p-1.5 px-2 text-black outline-none border-gray-300 rounded-lg"
              />
              <span class="text-red-500" v-if="submitted && form.lastName.$error">{{
                form.lastName.$error.message
              }}</span>
            </div>
            <div class="flex flex-col gap-0.5 w-1/3">
              <label for="idDocument" class="text-black">Documento de identidad</label>
              <input
                type="text"
                name="idDocument"
                id="idDocument"
                v-model.trim="form.idDocument.$value"
                class="w-full border p-1.5 px-2 text-black outline-none border-gray-300 rounded-lg"
              />
              <span class="text-red-500" v-if="submitted && form.idDocument.$error">{{
                form.idDocument.$error.message
              }}</span>
            </div>
            <div class="flex flex-col gap-0.5 w-1/3">
              <label for="birthDate" class="text-black">Fecha de nacimiento</label>
              <input
                type="date"
                name="birthDate"
                id="birthDate"
                v-model.trim="form.birthDate.$value"
                class="w-3/7 border p-1.5 px-2 text-center text-black outline-none border-gray-300 rounded-lg"
              />
              <span class="text-red-500" v-if="submitted && form.birthDate.$error">{{
                form.birthDate.$error.message
              }}</span>
            </div>
            <div class="flex flex-col gap-0.5 w-1/3">
              <label for="email" class="text-black">Correo electrónico</label>
              <input
                type="text"
                name="email"
                id="email"
                v-model.trim="form.email.$value"
                class="w-full border p-1.5 px-2 text-black outline-none border-gray-300 rounded-lg"
              />
              <span class="text-red-500" v-if="submitted && form.email.$error">{{
                form.email.$error.message
              }}</span>
            </div>
            <div class="flex flex-col gap-0.5 w-1/3">
              <label for="userName" class="text-black">Nombre de usuario</label>
              <input
                type="text"
                name="userName"
                id="userName"
                v-model.trim="form.userName.$value"
                class="w-full border p-1.5 px-2 text-black outline-none border-gray-300 rounded-lg"
              />
              <span class="text-red-500" v-if="submitted && form.userName.$error">{{
                form.userName.$error.message
              }}</span>
            </div>
            <div class="flex flex-col gap-0.5 w-1/3">
              <label for="password" class="text-black">Contraseña</label>
              <input
                type="password"
                name="password"
                id="password"
                v-model.trim="form.password.$value"
                class="w-full border p-1.5 px-2 text-black outline-none border-gray-300 rounded-lg"
              />
              <span class="text-red-500" v-if="submitted && form.password.$error">{{
                form.password.$error.message
              }}</span>
            </div>
            <div class="flex flex-col gap-0.5 w-1/3">
              <label for="passwordValidation" class="text-black">Repita la contraseña</label>
              <input
                type="text"
                name="passwordValidation"
                id="passwordValidation"
                v-model.trim="form.passwordValidation.$value"
                class="w-full border p-1.5 px-2 text-black outline-none border-gray-300 rounded-lg"
              />
              <span class="text-red-500" v-if="submitted && form.passwordValidation.$error">{{
                form.passwordValidation.$error.message
              }}</span>
            </div>

            <div class="w-10/12 my-12">
              <Button
                type="submit"
                label="Enviar registro"
                class="w-2/6 py-2 rounded-lg flex justify-center items-center gap-2"
              >
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
