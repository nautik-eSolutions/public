<script setup>
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faCalendarDays,
  faSailboat,
  faLocationDot,
  faAnchor,
  faEuroSign,
  faXmark,
  faMapMarkerAlt,
  faClock,
} from '@fortawesome/free-solid-svg-icons'

const props = defineProps({
  reservation: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['close'])

const { t } = useI18n()
const isOpen = ref(false)

onMounted(() => {
  setTimeout(() => {
    isOpen.value = true
  }, 10)
})

const statusConfig = computed(() => {
  const configs = {
    future: {
      label: t('reservations.card.statusFuture'),
    },
    active: {
      label: t('reservations.card.statusActive'),
    },
    past: {
      label: t('reservations.card.statusCompleted'),
    },
  }
  return configs[props.reservation.status] || configs.future
})

function formatDate(dateString) {
  if (!dateString) return '-'
  const date = new Date(dateString)
  return date.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

function formatDateTime(dateString) {
  if (!dateString) return '-'
  const date = new Date(dateString)
  return date.toLocaleString('es-ES', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function handleBackdropClick(event) {
  if (event.target === event.currentTarget) {
    closeModal()
  }
}

function closeModal() {
  isOpen.value = false
  setTimeout(() => {
    emit('close')
  }, 300)
}
</script>

<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ease-out"
    :class="isOpen ? 'backdrop-blur-md bg-black/40' : 'backdrop-blur-0 bg-black/0'"
    @click="handleBackdropClick"
  >
    <div
      class="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transition-all duration-300 ease-out"
      :class="isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'"
      @click.stop
    >
      <div class="border-b border-gray-200 p-6 sticky top-0 bg-white z-10 rounded-t-2xl">
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <h2 class="text-2xl font-bold text-gray-900 mb-2">
              {{ $t('reservations.detail.title') }} {{ reservation.portName }}
            </h2>
            <p v-if="reservation.zoneDescription" class="text-gray-600 text-lg leading-relaxed">
              {{ reservation.zoneDescription }}
            </p>
          </div>
          <button
            @click="closeModal"
            class="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-2 transition-colors ml-4 flex-shrink-0"
          >
            <FontAwesomeIcon :icon="faXmark" size="lg" />
          </button>
        </div>
      </div>
      <div class="p-6">
        <div class="space-y-6">
          <div class="border border-gray-200 rounded-xl p-5" v-if="reservation.mooringName">
            <div class="flex items-center gap-3 text-gray-600 mb-1">
              <FontAwesomeIcon :icon="faMapMarkerAlt" class="text-principal-blue" size="sm" />
              <div class="text-xs uppercase tracking-wide font-semibold">
                {{ $t('reservations.detail.zone') }}
              </div>
            </div>
            <div class="font-semibold text-gray-900 text-lg ml-7">
              {{ reservation.mooringName }}
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="border border-gray-200 rounded-xl p-5">
              <div class="flex items-center gap-3 text-principal-blue mb-1">
                <FontAwesomeIcon :icon="faSailboat" class="text-principal-blue" size="sm" />
                <div class="text-xs uppercase tracking-wide font-semibold">
                  {{ $t('reservations.detail.boat') }}
                </div>
              </div>
              <div class="font-semibold text-gray-900 text-lg ml-7">{{ reservation.boatName }}</div>
            </div>

            <div class="border border-gray-200 rounded-xl p-5">
              <div class="flex items-center gap-3 text-principal-blue mb-1">
                <FontAwesomeIcon :icon="faAnchor" class="text-principal-blue" size="sm" />
                <div class="text-xs uppercase tracking-wide font-semibold">
                  {{ $t('reservations.detail.mooring') }}
                </div>
              </div>
              <div class="font-semibold text-principal-blue text-lg ml-7">
                <span v-if="reservation.mooringNumber"> #{{ reservation.mooringNumber }} </span>
                <span v-else class="text-sm text-principal-blue font-normal">
                  {{ $t('reservations.detail.mooringPending') }}
                </span>
              </div>
            </div>
          </div>
          <div class="border border-gray-200 rounded-xl p-5">
            <div class="flex items-center gap-3 text-principal-blue mb-4">
              <FontAwesomeIcon :icon="faCalendarDays" class="text-gray-400" size="sm" />
              <div class="text-xs uppercase tracking-wide font-semibold">
                {{ $t('reservations.detail.stayPeriod') }}
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 ml-7">
              <div>
                <div class="text-xs text-principal-blue mb-1 uppercase tracking-wide">
                  {{ $t('reservations.detail.checkIn') }}
                </div>
                <div class="font-semibold text-gray-900 text-lg">
                  {{ formatDate(reservation.startDate) }}
                </div>
              </div>
              <div>
                <div class="text-xs text-principal-blue mb-1 uppercase tracking-wide">
                  {{ $t('reservations.detail.checkOut') }}
                </div>
                <div class="font-semibold text-gray-900 text-lg">
                  {{ formatDate(reservation.endDate) }}
                </div>
              </div>
            </div>
          </div>
          <div class="border border-gray-200 rounded-xl p-5">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3 text-principal-blue">
                <FontAwesomeIcon :icon="faEuroSign" class="text-gray-400" size="sm" />
                <div class="text-xs uppercase tracking-wide font-semibold">
                  {{ $t('reservations.detail.totalCost') }}
                </div>
              </div>
              <div class="text-3xl font-bold text-gray-900">
                {{ reservation.totalCost?.toFixed(2) }}€
              </div>
            </div>
          </div>
          <div class="border border-gray-200 rounded-xl p-4" v-if="reservation.createdAt">
            <div class="flex items-center gap-3">
              <div class="text-sm text-principal-blue">
                {{ $t('reservations.detail.bookedOn') }}
                <span class="font-medium text-gray-900">{{
                  formatDateTime(reservation.createdAt)
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="border-t border-gray-200 px-6 py-4 rounded-b-2xl flex justify-end gap-3 sticky bottom-0 bg-white"
      >
        <button
          @click="closeModal"
          class="px-6 py-2.5 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
        >
          {{ $t('common.close') }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.space-y-6 > * + * {
  margin-top: 1.5rem;
}

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f9fafb;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}
</style>
