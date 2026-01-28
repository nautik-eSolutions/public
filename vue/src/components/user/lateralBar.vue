<script>
export default {
  name: 'lateralBar',
}
</script>

<script setup>
defineProps({
  userName: String,
  srcImageUrl: String,
})
</script>

<template>
  <div class="flex flex-col justify-between h-full w-full bg-principal-blue text-white rounded-2xl p-6">
    <div class="flex flex-col gap-8">
      <div class="flex flex-col items-center gap-3">
        <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center">
          <!-- falta svg -->

        </div>
        <h3 class="text-sm font-medium">{{ userName }}</h3>
      </div>

      <div class="flex flex-col gap-5 mb-4">
        <div class="flex items-center gap-3 cursor-pointer">
          <!-- falta svg -->
          <span class="text-sm font-medium">Mis barcos</span>
        </div>

        <div class="flex items-center gap-3 cursor-pointer">
          <!-- falta svg -->

          <span class="text-sm font-medium">Reservas</span>
        </div>

        <div class="flex items-center gap-3 cursor-pointer">
          <!-- falta svg -->
          <span class="text-sm font-medium">Facturas</span>
        </div>
      </div>
    </div>

    <div class="flex flex-col gap-4 border-t border-white/20 pt-4">
      <div class="flex items-center gap-3 cursor-pointer">
       <!-- falta svg -->
        <span class="text-sm font-medium">Configuración</span>
      </div>

      <div class="flex items-center gap-3 cursor-pointer">
        <!-- falta svg -->

        <span class="text-sm font-medium">Ayuda</span>
      </div>

      <div class="flex items-center gap-3 cursor-pointer">
        <!-- falta svg -->

        <span class="text-sm font-medium">Log Out</span>
      </div>
    </div>
  </div>
</template>