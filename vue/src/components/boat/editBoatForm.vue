<script>
export default {
  name: 'editBoatForm',
}
</script>

<script setup>
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { defineForm, field, isValidForm } from 'vue-yup-form'
import * as yup from 'yup'
import { Boat } from '@/model/Boat.js'
const props = defineProps({
  Boat: Boat,
})
const submitted = ref(false)
const generateForm = () => {
  return defineForm({
    name: field(props.Boat.name, yup.string().required().max(15)),
    registryNumber: field(props.Boat.registerNumber, yup.string().required().max(15)),
    beam: field(props.Boat.beam, yup.number().required()),
    length: field(props.Boat.length, yup.number().required()),
    draft: field(props.Boat.draft, yup.number().required()),
  })
}
const form = generateForm()

const emits = defineEmits(['submit'])

const { t } = useI18n()

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
    <RouterLink to="/boats">
      <button
        class="text-blue-600 text-sm font-medium mb-6 hover:underline flex items-center gap-1"
      >
        <span>&lt;</span>
        <span>{{ $t('common.back') }}</span>
      </button>
    </RouterLink>

    <div class="bg-principal-blue text-white rounded-xl px-8 py-6 mb-6">
      <h1 class="text-2xl font-bold">{{ $t('boat.form.editTitle') }}</h1>
    </div>

    <div class="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div class="grid grid-cols-3 gap-6 items-center">
          <label class="text-sm font-semibold text-gray-900">{{ $t('boat.form.name') }}</label>
          <input
            v-model.trim="form.name.$value"
            type="text"
            :placeholder="$t('boat.form.namePlaceholder')"
            class="col-span-2 px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <span class="text-red-500" v-if="submitted && form.name.$error">{{
            form.name.$error.message
          }}</span>
        </div>

        <div class="grid grid-cols-3 gap-6 items-center">
          <label class="text-sm font-semibold text-gray-900">{{ $t('boat.form.registry') }}</label>
          <input
            v-model.trim="form.registryNumber.$value"
            type="text"
            :placeholder="$t('boat.form.registryPlaceholder')"
            class="col-span-2 px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <span class="text-red-500" v-if="submitted && form.registryNumber.$error">{{
            form.registryNumber.$error.message
          }}</span>
        </div>

        <div class="grid grid-cols-3 gap-6 items-center">
          <label class="text-sm font-semibold text-gray-900">{{ $t('boat.length') }}</label>
          <input
            v-model.trim="form.length.$value"
            type="number"
            step="0.01"
            :placeholder="$t('boat.form.lengthPlaceholder')"
            class="col-span-2 px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <span class="text-red-500" v-if="submitted && form.length.$error">{{
            form.length.$error.message
          }}</span>
        </div>

        <div class="grid grid-cols-3 gap-6 items-center">
          <label class="text-sm font-semibold text-gray-900">{{ $t('boat.beam') }}</label>
          <input
            v-model.trim="form.beam.$value"
            type="number"
            step="0.01"
            :placeholder="$t('boat.form.beamPlaceholder')"
            class="col-span-2 px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <span class="text-red-500" v-if="submitted && form.beam.$error">{{
            form.beam.$error.message
          }}</span>
        </div>

        <div class="grid grid-cols-3 gap-6 items-center">
          <label class="text-sm font-semibold text-gray-900">{{ $t('boat.draft') }}</label>
          <input
            v-model.trim="form.draft.$value"
            type="number"
            step="0.01"
            :placeholder="$t('boat.form.draftPlaceholder')"
            class="col-span-2 px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <span class="text-red-500" v-if="submitted && form.draft.$error">{{
            form.draft.$error.message
          }}</span>
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
            {{ $t('common.continue') }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
