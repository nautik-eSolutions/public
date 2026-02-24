<script setup>
defineProps({
  portName: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  totalCost: { type: Number, required: true },
  boatId: { type: String, required: true },
  mooringName: { type: String, required: true },
  status: { type: String, required: true }, // 'future' | 'active' | 'past'
})

defineEmits(['view-details', 'contact-support', 'cancel'])
</script>

<template>
  <div class="bg-white rounded-2xl border border-gray-200 p-6 flex justify-between items-start gap-4">
    <!-- Left: Info -->
    <div class="flex flex-col gap-1">
      <div class="flex items-center gap-3 mb-1">
        <span class="text-slate-900 font-semibold text-lg">{{ portName }}</span>
        <span
          v-if="status === 'future'"
          class="text-xs font-medium px-3 py-1 rounded-full"
          style="background-color: #f3e8ff; color: #9333ea;"
        >Próxima</span>
        <span
          v-else-if="status === 'active'"
          class="text-xs font-medium px-3 py-1 rounded-full"
          style="background-color: #d1fae5; color: #059669;"
        >Activa</span>
        <span
          v-else
          class="text-xs font-medium px-3 py-1 rounded-full"
          style="background-color: #f1f5f9; color: #64748b;"
        >Pasada</span>
      </div>

      <!-- Mooring -->
      <div class="flex items-center gap-2 text-slate-600 text-sm">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 3h14M12 3v18M5 21h14" />
        </svg>
        <span>{{ mooringName }}</span>
      </div>

      <!-- Location -->
      <div class="flex items-center gap-2 text-slate-600 text-sm">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 21c-4-4-6-7.5-6-10a6 6 0 1 1 12 0c0 2.5-2 6-6 10z" />
          <circle cx="12" cy="11" r="2" fill="currentColor" stroke="none"/>
        </svg>
        <span>{{ portName }}</span>
      </div>

      <!-- Dates -->
      <div class="flex items-center gap-2 text-slate-600 text-sm">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
          <line x1="16" y1="2" x2="16" y2="6"/>
          <line x1="8" y1="2" x2="8" y2="6"/>
          <line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
        <span>{{ startDate }} – {{ endDate }}</span>
      </div>
    </div>

    <!-- Right: Actions -->
    <div class="flex flex-col items-end gap-2 shrink-0">
      <button
        @click="$emit('view-details')"
        class="flex items-center gap-2 bg-slate-900 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
          <path stroke-linecap="round" stroke-linejoin="round" d="M1.5 12S5 5 12 5s10.5 7 10.5 7S19 19 12 19 1.5 12 1.5 12z"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
        Ver detalles
      </button>

      <button
        @click="$emit('contact-support')"
        class="flex items-center gap-2 border border-gray-200 text-slate-700 text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
        Contactar soporte
      </button>

      <button
        v-if="status !== 'past'"
        @click="$emit('cancel')"
        class="flex items-center gap-1 text-red-500 text-sm font-medium hover:text-red-600 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"/>
          <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
        Cancelar
      </button>
    </div>
  </div>
</template>
