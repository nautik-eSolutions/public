<script>
export default {
  name: 'AddBoatForm',
}
</script>

<script setup>
import { ref } from 'vue'

const formData = ref({
  boatName: '',
  registration: '',
  boatType: '',
  eslora: '',
  manga: '',
  calado: '',
  insurance: null,
  navigationCertificate: null,
  registrationCertificate: null
})

const boatTypes = [
  'Tipo de barco',
  'Motor',
  'Vela',
  'Catamarán',
  'Neumática'
]

const handleFileUpload = (field, event) => {
  const file = event.target.files[0]
  if (file) {
    formData.value[field] = file
  }
}

const handleSubmit = () => {
  console.log('Form submitted:', formData.value)
}

const handleCancel = () => {
  console.log('Form cancelled')
}

const handleHelp = () => {
  console.log('Help requested')
}
</script>

<template>
  <div class="max-w-5xl mx-auto px-6 py-8">
    <!-- Back link -->
    <button class="text-blue-600 text-sm font-medium mb-6 hover:underline flex items-center gap-1">
      <span>&lt;</span>
      <span>Volver</span>
    </button>

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
              v-model="formData.boatName"
              type="text"
              placeholder="Introduce el nombre del barco"
              class="col-span-2 px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <!-- Matrícula -->
        <div class="grid grid-cols-3 gap-6 items-center">
          <label class="text-sm font-semibold text-gray-900">Matrícula</label>
          <input
              v-model="formData.registration"
              type="text"
              placeholder="Introduce la matrícula del barco"
              class="col-span-2 px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <!-- Tipo de barco -->
        <div class="grid grid-cols-3 gap-6 items-center">
          <label class="text-sm font-semibold text-gray-900">Tipo de barco</label>
          <select
              v-model="formData.boatType"
              class="col-span-2 px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
              style="background-image: url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27currentColor%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e'); background-repeat: no-repeat; background-position: right 0.75rem center; background-size: 1.25em 1.25em; padding-right: 2.5rem;"
          >
            <option v-for="type in boatTypes" :key="type" :value="type">{{ type }}</option>
          </select>
        </div>

        <!-- Eslora -->
        <div class="grid grid-cols-3 gap-6 items-center">
          <label class="text-sm font-semibold text-gray-900">Eslora</label>
          <input
              v-model="formData.eslora"
              type="text"
              placeholder="Introduce metros de eslora"
              class="col-span-2 px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <!-- Manga -->
        <div class="grid grid-cols-3 gap-6 items-center">
          <label class="text-sm font-semibold text-gray-900">Manga</label>
          <input
              v-model="formData.manga"
              type="text"
              placeholder="Introduce metros de manga"
              class="col-span-2 px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <!-- Calado -->
        <div class="grid grid-cols-3 gap-6 items-center">
          <label class="text-sm font-semibold text-gray-900">Calado</label>
          <input
              v-model="formData.calado"
              type="text"
              placeholder="Introduce metros de calado"
              class="col-span-2 px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <!-- Seguro de embarcación -->
        <div class="grid grid-cols-3 gap-6 items-center">
          <label class="text-sm font-semibold text-gray-900">Seguro de embarcación</label>
          <div class="col-span-2 relative">
            <input
                type="text"
                :value="formData.insurance?.name || 'Introduce la póliza de seguro'"
                readonly
                class="w-full px-4 py-2.5 pr-10 border border-gray-300 rounded-lg text-sm text-gray-400 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                @click="$refs.insuranceInput.click()"
            />
            <input
                ref="insuranceInput"
                type="file"
                class="hidden"
                @change="handleFileUpload('insurance', $event)"
            />
            <svg class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"/>
            </svg>
          </div>
        </div>

        <!-- Certificado de navegabilidad -->
        <div class="grid grid-cols-3 gap-6 items-start">
          <label class="text-sm font-semibold text-gray-900 pt-2">Certificado de navegabilidad</label>
          <div class="col-span-2 relative">
            <input
                type="text"
                :value="formData.navigationCertificate?.name || 'Certificado de navegabilidad'"
                readonly
                class="w-full px-4 py-2.5 pr-10 border border-gray-300 rounded-lg text-sm text-gray-400 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                @click="$refs.navCertInput.click()"
            />
            <input
                ref="navCertInput"
                type="file"
                class="hidden"
                @change="handleFileUpload('navigationCertificate', $event)"
            />
            <svg class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"/>
            </svg>
          </div>
        </div>

        <!-- Certificado de registro -->
        <div class="grid grid-cols-3 gap-6 items-center">
          <label class="text-sm font-semibold text-gray-900">Certificado de registro</label>
          <div class="col-span-2 relative">
            <input
                type="text"
                :value="formData.registrationCertificate?.name || 'Certificado de registro'"
                readonly
                class="w-full px-4 py-2.5 pr-10 border border-gray-300 rounded-lg text-sm text-gray-400 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                @click="$refs.regCertInput.click()"
            />
            <input
                ref="regCertInput"
                type="file"
                class="hidden"
                @change="handleFileUpload('registrationCertificate', $event)"
            />
            <svg class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"/>
            </svg>
          </div>
        </div>

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