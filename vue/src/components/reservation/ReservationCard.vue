<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faLocationDot,
  faCalendarDays,
  faEye,
  faXmark,
  faSailboat,
} from '@fortawesome/free-solid-svg-icons'

defineProps({
  portName: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  totalCost: { type: Number, required: true },
  boatName: { type: String, required: true },
  status: {},
})

defineEmits(['view-details'])
</script>

<template>
  <div
    class="bg-white rounded-2xl border border-gray-200 p-6 flex justify-between items-start gap-4"
  >
    <div class="flex flex-col gap-1">
      <div class="flex items-center gap-3 mb-1">
        <span class="text-slate-900 font-semibold text-lg">{{ portName }}</span>
      </div>

      <div class="flex items-center gap-2 text-slate-600 text-sm">
        <FontAwesomeIcon :icon="faSailboat" class="w-4 h-4 shrink-0" />
        <span>{{ boatName }}</span>
      </div>

      <div class="flex items-center gap-2 text-slate-600 text-sm">
        <FontAwesomeIcon :icon="faCalendarDays" class="w-4 h-4 shrink-0" />
        <span>{{ startDate }} – {{ endDate }}</span>
      </div>
    </div>

    <div class="flex flex-col items-end gap-2 shrink-0">
      <button
        @click="$emit('view-details')"
        class="flex items-center gap-2 bg-principal-blue text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors"
      >
        <FontAwesomeIcon :icon="faEye" class="w-4 h-4" />
        {{ $t('reservations.card.viewDetails') }}
      </button>
    </div>
  </div>
</template>
