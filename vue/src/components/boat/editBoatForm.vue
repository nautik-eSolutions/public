<script>
export default {
  name: 'editBoatForm',
}
</script>

<script setup>
import { onMounted, ref } from 'vue'
import { defineForm, field, isValidForm } from 'vue-yup-form'
import * as yup from 'yup'
import { Boat } from '@/model/Boat.js'
const props = defineProps({
  Boat: Boat,
})
const submitted = ref(false)
const generateForm = () => {

    return defineForm({
      name: field(props.Boat.name, yup.string().required().max(10)),
      registryNumber: field(props.Boat.registerNumber, yup.string().required().max(10)),
      beam: field(props.Boat.beam, yup.string().required()),
      length: field(props.Boat.length, yup.string().required()),
      draft: field(props.Boat.draft, yup.string().required()),
    })

}
const form = generateForm()

const emits = defineEmits(['submit'])

const handleSubmit = () => {
  submitted.value = true
  if (!isValidForm(form)) {
  } else {
    emits('submit', form)
  }
}
</script>

<template>
  <div class="max-w-5xl mx-auto px-6 py-8">
    <!-- Back link -->
    <RouterLink to="/boats">
      <button
        class="text-blue-600 text-sm font-medium mb-6 hover:underline flex items-center gap-1"
      >
        <span>&lt;</span>
        <span>Volver</span>
      </button>
    </RouterLink>
    <!-- Title card -->
    <div class="bg-principal-blue text-white rounded-xl px-8 py-6 mb-6">
      <h1 class="text-2xl font-bold">Añadir barco</h1>
    </div>

    <!-- Form card -->
    <div class="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Nombre del barco -->
        <div class="grid grid-cols-3 gap-6 items-center">
          <label class="text-sm font-semibold text-gray-900">Nombre del barco</label>
          <input
            v-model.trim="form.name.$value"
            type="text"
            placeholder="Introduce el nombre del barco"
            class="col-span-2 px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <span class="text-red-500" v-if="submitted && form.name.$error">{{
            form.name.$error.message
          }}</span>
        </div>

        <!-- Matrícula -->
        <div class="grid grid-cols-3 gap-6 items-center">
          <label class="text-sm font-semibold text-gray-900">Matrícula</label>
          <input
            v-model.trim="form.registryNumber.$value"
            type="text"
            placeholder="Introduce la matrícula del barco"
            class="col-span-2 px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <span class="text-red-500" v-if="submitted && form.registryNumber.$error">{{
            form.registryNumber.$error.message
          }}</span>
        </div>

        <!-- Eslora -->
        <div class="grid grid-cols-3 gap-6 items-center">
          <label class="text-sm font-semibold text-gray-900">Eslora</label>
          <input
            v-model.trim="form.length.$value"
            type="text"
            placeholder="Introduce metros de eslora"
            class="col-span-2 px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <span class="text-red-500" v-if="submitted && form.length.$error">{{
            form.length.$error.message
          }}</span>
        </div>

        <!-- Manga -->
        <div class="grid grid-cols-3 gap-6 items-center">
          <label class="text-sm font-semibold text-gray-900">Manga</label>
          <input
            v-model.trim="form.beam.$value"
            type="text"
            placeholder="Introduce metros de manga"
            class="col-span-2 px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <span class="text-red-500" v-if="submitted && form.beam.$error">{{
            form.beam.$error.message
          }}</span>
        </div>

        <!-- Calado -->
        <div class="grid grid-cols-3 gap-6 items-center">
          <label class="text-sm font-semibold text-gray-900">Calado</label>
          <input
            v-model.trim="form.draft.$value"
            type="text"
            placeholder="Introduce metros de calado"
            class="col-span-2 px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <span class="text-red-500" v-if="submitted && form.draft.$error">{{
            form.draft.$error.message
          }}</span>
        </div>

        <!-- Seguro de embarcación -->

        <!-- Certificado de navegabilidad -->

        <!-- Certificado de registro -->

        <!-- Action buttons -->
        <div class="flex items-center justify-end gap-4 pt-4">
          <button
            type="button"
            @click="handleHelp"
            class="text-blue-600 font-semibold text-sm hover:underline"
          >
            Ayuda
          </button>

          <button
            type="button"
            @click="handleCancel"
            class="px-8 py-2.5 bg-gray-200 text-gray-700 font-semibold text-sm rounded-lg hover:bg-gray-300 transition-colors"
          >
            Cancelar
          </button>

          <button
            type="submit"
            class="px-8 py-2.5 bg-[#0a1e3d] text-white font-semibold text-sm rounded-lg hover:bg-principal-blue transition-colors"
          >
            Continuar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
