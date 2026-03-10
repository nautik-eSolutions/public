<script>
export default {
  name: 'AddBoatForm',
}
</script>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { defineForm, field, isValidForm } from 'vue-yup-form'
import * as yup from 'yup'
import InputText from 'primevue/inputtext'

const submitted = ref(false)

const generateForm = () => {
  return defineForm({
    name: field('', yup.string().required().max(15)),
    registryNumber: field('', yup.string().required().max(15)),
    beam: field('', yup.number().required().max(20)),
    length: field('', yup.number().required().max(100)),
    draft: field('', yup.number().required().max(20)),
    boatType: field(''),
  })
}

const form = generateForm()

const { t } = useI18n()

const boatTypes = computed(() => [
  t('boat.form.boatTypePlaceholder'),
  t('boat.form.boatTypeMotor'),
  t('boat.form.boatTypeSail'),
])

const emits = defineEmits(['submit'])

function handleSubmit() {
  submitted.value = true
  if (!isValidForm(form)) {
  } else {
    emits('submit', form)
  }
}
</script>

<template>
  <div class="max-w-5xl mx-auto px-6 py-8">
    <RouterLink to="/boats">
      <button
        class="text-blue-600 text-sm font-medium mb-6 hover:underline flex items-center gap-1"
      >
        <span>&lt;</span>
        <span>{{ $t('common.back') }}</span>
      </button>
    </RouterLink>
    <div class="bg-principal-blue text-white rounded-xl px-8 py-6 mb-6">
      <h1 class="text-2xl font-bold">{{ $t('boat.form.addTitle') }}</h1>
    </div>

    <!-- Form card -->
    <div class="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div class="grid grid-cols-3 gap-6 items-start">
          <label for="boat-name" class="text-sm font-semibold text-gray-900"
            >Nombre del barco</label
          >
          <div class="col-span-2 flex flex-col gap-2 w-full">
            <InputText
              id="boat-name"
              name="boat-name"
              type="text"
              v-model="form.name.$value"
              placeholder="Introduce el nombre del barco"
              class="w-full placeholder-gray px-3 py-2 shadow-sm rounded-lg"
              :class="{ 'border-red-500': submitted && form.name.$error }"
            />
            <span v-if="submitted && form.name.$error" class="text-red-600 text-sm mt-1">
              {{ form.name.$error.message }}
            </span>
          </div>
        </div>

        <div class="grid grid-cols-3 gap-6 items-start">
          <label for="registry-number" class="text-sm font-semibold text-gray-900">Matrícula</label>
          <div class="col-span-2 flex flex-col gap-2 w-full">
            <InputText
              id="registry-number"
              name="registry-number"
              type="text"
              v-model="form.registryNumber.$value"
              placeholder="Introduce la matrícula del barco"
              class="w-full px-3 py-2 shadow-sm rounded-lg"
              :class="{ 'border-red-500': submitted && form.registryNumber.$error }"
            />
            <span v-if="submitted && form.registryNumber.$error" class="text-red-600 text-sm mt-1">
              {{ form.registryNumber.$error.message }}
            </span>
          </div>
        </div>

        <div class="grid grid-cols-3 gap-6 items-start">
          <label for="boat-type" class="text-sm font-semibold text-gray-900">Tipo de barco</label>
          <div class="col-span-2 flex flex-col gap-2 w-full">
            <select
              id="boat-type"
              v-model.trim="form.boatType.$value"
              placeholder="Selecciona un tipo"
              class="w-full border-1 border-principal-blue outline-none px-3 py-2 shadow-sm rounded-lg"
            >
              <option v-for="type in boatTypes" :key="type" :value="type">{{ type }}</option>
            </select>
          </div>
        </div>

        <div class="grid grid-cols-3 gap-6 items-start">
          <label for="length" class="text-sm font-semibold text-gray-900">Eslora</label>
          <div class="col-span-2 flex flex-col gap-2 w-full">
            <InputText
              id="length"
              name="length"
              type="number"
              v-model.number="form.length.$value"
              placeholder="Introduce metros de eslora"
              class="w-full px-3 py-2 shadow-sm rounded-lg"
              :class="{ 'border-red-500': submitted && form.length.$error }"
            />
            <span v-if="submitted && form.length.$error" class="text-red-600 text-sm mt-1">
              {{ form.length.$error.message }}
            </span>
          </div>
        </div>

        <div class="grid grid-cols-3 gap-6 items-start">
          <label for="beam" class="text-sm font-semibold text-gray-900">Manga</label>
          <div class="col-span-2 flex flex-col gap-2 w-full">
            <InputText
              id="beam"
              name="beam"
              type="number"
              v-model.number="form.beam.$value"
              placeholder="Introduce metros de manga"
              class="w-full px-3 py-2 shadow-sm rounded-lg"
              :class="{ 'border-red-500': submitted && form.beam.$error }"
            />
            <span v-if="submitted && form.beam.$error" class="text-red-600 text-sm mt-1">
              {{ form.beam.$error.message }}
            </span>
          </div>
        </div>

        <div class="grid grid-cols-3 gap-6 items-start">
          <label for="draft" class="text-sm font-semibold text-gray-900">Calado</label>
          <div class="col-span-2 flex flex-col gap-2 w-full">
            <InputText
              id="draft"
              name="draft"
              type="number"
              v-model.number="form.draft.$value"
              placeholder="Introduce metros de calado"
              class="w-full px-3 py-2 shadow-sm rounded-lg"
              :class="{ 'border-red-500': submitted && form.draft.$error }"
            />
            <span v-if="submitted && form.draft.$error" class="text-red-600 text-sm mt-1">
              {{ form.draft.$error.message }}
            </span>
          </div>
        </div>

        <div class="flex items-center justify-end gap-4 pt-4">
          <button
            type="button"
            @click="handleHelp"
            class="text-blue-600 font-semibold text-sm hover:underline"
          >
            {{ $t('boat.form.help') }}
          </button>

          <button
            type="button"
            @click="handleCancel"
            class="px-8 py-2.5 bg-gray-200 text-gray-700 font-semibold text-sm rounded-lg hover:bg-gray-300 transition-colors"
          >
            {{ $t('boat.form.cancel') }}
          </button>

          <button
            type="submit"
            class="px-8 py-2.5 bg-[#0a1e3d] text-white font-semibold text-sm rounded-lg hover:bg-principal-blue transition-colors"
          >
            {{ $t('boat.form.submit') }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>