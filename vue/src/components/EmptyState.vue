<script setup>
defineProps({
  message: {
    type: String,
    default: 'Intenta ajustar los filtros para ver más opciones',
  },
})
</script>

<template>
  <div class="text-center py-12">
    <i class="pi pi-inbox text-6xl text-gray-400 mb-4"></i>
    <h3 class="text-lg font-semibold text-gray-900 mb-2">No hay resultados</h3>
    <p class="text-gray-600">{{ message }}</p>
  </div>
</template>
