<script>
export default {
  name: 'boatInfo',
}
</script>

<script setup>
import router from '@/router/index.js'
import { faEye, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { ref } from 'vue'

const props = defineProps({
  name: String,
  registerNumber: String,
  length: Number,
  bream: Number,
  draft: Number,
  boatId: Number,
})

const emit = defineEmits(['delete'])

const showDeleteDialog = ref(false)

function handleClick() {
  router.push('/boats/' + props.boatId)
}

function openDeleteDialog() {
  showDeleteDialog.value = true
}

function closeDeleteDialog() {
  showDeleteDialog.value = false
}

function confirmDelete() {
  emit('delete', props.boatId)
  showDeleteDialog.value = false
}
</script>

<template>
  <div
    class="grid grid-cols-8 gap-4 items-center justify-center align-middle bg-gray-50 rounded-lg p-3"
  >
    <div class="text-sm font-medium text-gray-900 text-center">{{ name }}</div>
    <div class="text-sm font-medium text-gray-900 text-center">{{ registerNumber }}</div>
    <div class="text-sm font-medium text-gray-900 text-center">{{ length }} m</div>
    <div class="text-sm font-medium text-gray-900 text-center">{{ bream }} m</div>
    <div class="text-sm font-medium text-gray-900 text-center">{{ draft }} m</div>
    <div class="flex justify-center">
      <div
        @click="handleClick"
        class="cursor-pointer text-center rounded-md flex align-middle content-center items-center justify-center bg-principal-blue h-8 w-8 hover:bg-blue-700 transition-colors"
      >
        <FontAwesomeIcon :icon="faEye" class="text-white" />
      </div>
    </div>
    <div class="flex justify-center">
      <div
        @click="openDeleteDialog"
        class="cursor-pointer text-center rounded-md flex align-middle content-center items-center justify-center bg-red-500 h-8 w-8 hover:bg-red-600 transition-colors"
      >
        <FontAwesomeIcon :icon="faTrash" class="text-white" />
      </div>
    </div>
  </div>

  <div
    v-if="showDeleteDialog"
    class="fixed inset-0 bg-gray-900/40  flex items-center justify-center z-50"
    @click.self="closeDeleteDialog"
  >
    <div class="bg-white rounded-xl shadow-xl p-6 max-w-md w-full mx-4">
      <div class="flex items-center gap-3 mb-4">
        <div class="bg-red-100 rounded-full p-3">
          <FontAwesomeIcon :icon="faTrash" class="text-red-600 text-xl" />
        </div>
        <h2 class="text-xl font-bold text-gray-900">Eliminar barco</h2>
      </div>

      <p class="text-gray-600 mb-6">
        ¿Estás seguro de que deseas eliminar el barco <strong>{{ name }}</strong
        >? Esta acción no se puede deshacer.
      </p>

      <div class="flex gap-3 justify-end">
        <button
          @click="closeDeleteDialog"
          class="px-6 py-2.5 bg-gray-200 text-gray-700 font-semibold text-sm rounded-lg hover:bg-gray-300 transition-colors"
        >
          Cancelar
        </button>
        <button
          @click="confirmDelete"
          class="px-6 py-2.5 bg-red-500 text-white font-semibold text-sm rounded-lg hover:bg-red-600 transition-colors"
        >
          Eliminar
        </button>
      </div>
    </div>
  </div>
</template>
