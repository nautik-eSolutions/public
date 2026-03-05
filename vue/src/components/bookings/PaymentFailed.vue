<script setup>
import { ref } from 'vue'

const props = defineProps({
  booking: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['back-to-home'])

const summaryRows = [
  { icon: 'map-pin', label: 'Port', getValue: (b) => b.portName },
  { icon: 'anchor', label: 'Mooring', getValue: (b) => b.mooringName?.label },
  { icon: 'sailboat', label: 'Boat', getValue: (b) => b.boatName },
  { icon: 'calendar', label: 'Check-in', getValue: (b) => b.startDate },
  { icon: 'calendar', label: 'Check-out', getValue: (b) => b.endDate },
  { icon: 'credit-card', label: 'Total Paid', getValue: (b) => b.totalCost + ' €', bold: true },
]
</script>

<template>
  <div class="min-h-screen  flex items-start justify-center py-10 px-4">
    <div class="w-full max-w-5xl flex flex-col gap-5">
      <div class="flex flex-col items-center gap-3 pt-2">
        <div class="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-7 h-7 text-red-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </div>
        <h1 class="text-3xl font-bold text-gray-900">Payment Failed</h1>
        <p class="text-m text-gray-500 text-center">
          We couldn't process your payment. No charges were made.
        </p>
        <span
          class="text-s font-medium px-3 py-1 rounded-full border border-red-400 text-red-500 bg-red-50"
        >
          Transaction Unsuccessful
        </span>
      </div>

      <div class="bg-white rounded-xl border border-gray-200 p-5">
        <div class="flex items-center gap-2 mb-3 pb-3 border-b border-gray-100">
          <div class="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="5" r="3" />
              <line x1="12" y1="8" x2="12" y2="22" />
              <path d="M5 12H2a10 10 0 0 0 20 0h-3" />
            </svg>
          </div>
          <h2 class="text-m font-semibold text-gray-800">Booking Details</h2>
        </div>

        <div class="flex flex-col divide-y divide-gray-100">
          <div
            v-for="(row, i) in summaryRows"
            :key="i"
            class="flex items-center justify-between py-2.5 text-m"
          >
            <div class="flex items-center gap-2 text-gray-500">
              <svg
                v-if="row.icon === 'map-pin'"
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.75"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>

              <svg
                v-else-if="row.icon === 'clock'"
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.75"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>

              <svg
                v-else-if="row.icon === 'anchor'"
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.75"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="12" cy="5" r="3" />
                <line x1="12" y1="8" x2="12" y2="22" />
                <path d="M5 12H2a10 10 0 0 0 20 0h-3" />
              </svg>

              <svg
                v-else-if="row.icon === 'sailboat'"
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.75"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M22 18H2a4 4 0 0 0 4 4h12a4 4 0 0 0 4-4Z" />
                <path d="M21 18 12 2 3 18" />
                <path d="M12 2v16" />
              </svg>

              <svg
                v-else-if="row.icon === 'calendar'"
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.75"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>

              <svg
                v-else-if="row.icon === 'credit-card'"
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.75"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                <line x1="1" y1="10" x2="23" y2="10" />
              </svg>
              {{ row.label }}
            </div>
            <span
              class="text-right"
              :class="row.bold ? 'font-semibold text-gray-900 text-base' : 'text-gray-700'"
            >
              {{ row.getValue(booking) }}
            </span>
          </div>
        </div>
      </div>

      <div class="bg-green-50 border border-green-200 rounded-xl p-5 flex gap-3">
        <div class="mt-0.5 shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5 text-green-600"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
            <path d="m9 12 2 2 4-4" />
          </svg>
        </div>
        <div>
          <p class="text-m font-semibold text-gray-800 mb-1">No charges were made</p>
          <p class="text-s text-gray-600 leading-relaxed">
            Since the transaction was not completed, no money has been deducted from your account.
          </p>
        </div>
      </div>

      <div class="flex flex-wrap gap-2 justify-center pb-6">
        <button
          @click="emit('back-to-home')"
          class="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 text-m font-medium px-5 py-2.5 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back to Home
        </button>
      </div>
    </div>
  </div>
</template>
