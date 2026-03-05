<script setup>
import { ref, computed, onMounted } from 'vue'
import ReservationCard from '@/components/reservation/ReservationCard.vue'
import Header from '@/components/general/header.vue'
import { useBookingStore } from '@/stores/bookingStore.js'

const reservations = ref([])
const bookingStore = useBookingStore()

onMounted(async () => {
  reservations.value = await bookingStore.getAllBookingsByUser()
})

const activeTab = ref('future') // 'future' | 'active' | 'past'

const futureReservations = computed(() => reservations.value.filter((r) => r.status === 'future'))
const activeReservations = computed(() => reservations.value.filter((r) => r.status === 'active'))
const pastReservations = computed(() => reservations.value.filter((r) => r.status === 'past'))

const displayedReservations = computed(() => {
  if (activeTab.value === 'future') return futureReservations.value
  if (activeTab.value === 'active') return activeReservations.value
  return pastReservations.value
})
</script>

<template>
  <Header />
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-4xl mx-auto px-4 py-12">
      <!-- Header -->
      <div class="mb-8">
        {{ $t('reservations.title') }}
        <h1 class="text-3xl font-bold text-slate-900"></h1>
        <p class="text-slate-500 mt-1 text-sm">{{ $t('reservations.subtitle') }}</p>
      </div>

      <div class="flex justify-center mb-8">
        <div class="bg-gray-100 rounded-xl p-1 flex gap-1">
          <button
            @click="activeTab = 'future'"
            :class="[
              'flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-colors',
              activeTab === 'future'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-700',
            ]"
          >
            {{ $t('reservations.tabs.future') }}

            <span
              v-if="futureReservations.length"
              class="bg-slate-900 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center"
              >{{ futureReservations.length }}</span
            >
          </button>

          <button
            @click="activeTab = 'active'"
            :class="[
              'flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-colors',
              activeTab === 'active'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-700',
            ]"
          >
            {{ $t('reservations.tabs.active') }}

            <span
              v-if="activeReservations.length"
              class="border border-green-500 text-green-600 text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center"
              >{{ activeReservations.length }}</span
            >
          </button>

          <button
            @click="activeTab = 'past'"
            :class="[
              'flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-colors',
              activeTab === 'past'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-700',
            ]"
          >
            {{ $t('reservations.tabs.past') }}
          </button>
        </div>
      </div>

      <div class="flex flex-col gap-4">
        <ReservationCard
          v-for="reservation in displayedReservations"
          :key="reservation.boatId + reservation.startDate"
          :port-name="reservation.portName"
          :start-date="reservation.startDate"
          :end-date="reservation.endDate"
          :total-cost="reservation.totalCost"
          :boat-id="reservation.boatId"
          :mooring-name="reservation.mooringName.label"
          :status="reservation.status"
          @view-details="() => {}"
          @contact-support="() => {}"
          @cancel="() => {}"
        />

        <div
          v-if="displayedReservations.length === 0"
          class="text-center text-slate-400 py-16 text-sm"
        >
          {{ $t('reservations.empty') }}
        </div>
      </div>
    </div>
  </div>
</template>
