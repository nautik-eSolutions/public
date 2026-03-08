<script setup>
import Header from '@/components/general/header.vue'
import Footer from '@/components/general/footer.vue'
import Button from '@/volt/Button.vue'
import Splitter from '@/volt/Splitter.vue'
import { useRoute } from 'vue-router'
import { onMounted, ref, computed } from 'vue'
import { useBoatStore } from '@/stores/boatStore.js'
import router from '@/router/index.js'
import ReservationCard from '@/components/reservation/ReservationCard.vue'
import { useBookingStore } from '@/stores/bookingStore.js'

const boatStore = useBoatStore()
const bookingStore = useBookingStore()
const boat = ref()
const reservations = ref([])
const mounted = ref(false)
const activeTab = ref('future')

onMounted(async () => {
  const boatId = useRoute().params.id
  reservations.value = await bookingStore.getBookingsByBoat(boatId)
  boat.value = await boatStore.getBoat(boatId)
  console.log(boat)
  mounted.value = true
})

const futureReservations = computed(() => reservations.value.filter((r) => r.status === 'future'))
const activeReservations = computed(() => reservations.value.filter((r) => r.status === 'active'))
const pastReservations = computed(() => reservations.value.filter((r) => r.status === 'past'))

const displayedReservations = computed(() => {
  if (activeTab.value === 'future') return futureReservations.value
  if (activeTab.value === 'active') return activeReservations.value
  return pastReservations.value
})

function handleClick() {
  router.push('/boats/edit/' + boat.value.id)
}

function showReservationDetails(reservation) {
  console.log('Ver detalles:', reservation)
}

function handleCancelReservation(reservation) {
  console.log('Cancelar reserva:', reservation)
}
</script>

<template>
  <Header />
  <section class="min-h-screen py-8 bg-gray-50">
    <div class="max-w-7xl mx-auto px-8">
      <div class="flex flex-col gap-6">
        <template v-if="mounted">
          <div class="bg-principal-blue p-6 rounded-xl flex items-center justify-between shadow-lg">
            <div>
              <p class="text-blue-200 text-sm font-medium mb-1">{{ $t('boat.title') }}</p>
              <h1 class="font-bold text-3xl text-white">{{ boat.name }}</h1>
              <p class="text-blue-100 text-sm mt-1">{{ boat.registerNumber }}</p>
            </div>
            <Button
              icon="pi pi-pencil"
              @click="handleClick"
              class="p-button-rounded bg-white/20 hover:bg-white/30 text-white border-0 h-12 w-12"
              label=""
            />
          </div>
          <div class="bg-white rounded-xl shadow-xl border border-gray-200 p-8">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div class="bg-white rounded-xl p-8 border border-gray-200 shadow-xl">
                <p class="text-gray-600 text-lg font-semibold mb-3">{{ $t('boat.length') }}</p>
                <p class="text-5xl font-bold text-gray-900 mb-2">{{ boat.length }}</p>
                <p class="text-gray-500 text-base">metros</p>
              </div>
              <div class="bg-white rounded-xl p-8 border border-gray-200 shadow-xl">
                <p class="text-gray-600 text-lg font-semibold mb-3">{{ $t('boat.beam') }}</p>
                <p class="text-5xl font-bold text-gray-900 mb-2">{{ boat.beam }}</p>
                <p class="text-gray-500 text-base">metros</p>
              </div>
              <div class="bg-white rounded-xl p-8 border border-gray-200 shadow-xl">
                <p class="text-gray-600 text-lg font-semibold mb-3">{{ $t('boat.draft') }}</p>
                <p class="text-5xl font-bold text-gray-900 mb-2">{{ boat.draft }}</p>
                <p class="text-gray-500 text-base">metros</p>
              </div>
            </div>
            <div class="mt-8 pt-8 border-t border-gray-200">
              <div class="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div class="flex items-center gap-3">
                  <i class="pi pi-id-card text-gray-600 text-xl"></i>
                  <div>
                    <p class="text-sm text-gray-500 mb-1">Matrícula</p>
                    <p class="font-semibold text-gray-900 text-base">{{ boat.registerNumber }}</p>
                  </div>
                </div>
                <div class="flex items-center gap-3">
                  <i class="pi pi-calendar text-gray-600 text-xl"></i>
                  <div>
                    <p class="text-sm text-gray-500 mb-1">Estado</p>
                    <p class="font-semibold text-green-600 text-base">Activo</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <div class="mb-6">
              <h2 class="text-2xl font-bold text-slate-900 mb-2">
                {{ $t('boat.bookings') }}
              </h2>
              <p class="text-slate-500 text-sm">
                {{ $t('boat.bookingsSubtitle') }}
              </p>
            </div>

            <div class="flex justify-center mb-6">
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
                  {{ $t('reservations.tabs.future')  }}
                  <span
                    v-if="futureReservations.length"
                    class="bg-slate-900 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center"
                  >
                    {{ futureReservations.length }}
                  </span>
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
                  {{ $t('reservations.tabs.active') || 'Activas' }}
                  <span
                    v-if="activeReservations.length"
                    class="border border-green-500 text-green-600 text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center"
                  >
                    {{ activeReservations.length }}
                  </span>
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
                  {{ $t('reservations.tabs.past') || 'Pasadas' }}
                </button>
              </div>
            </div>

            <div class="flex flex-col gap-4">
              <ReservationCard
                v-for="reservation in displayedReservations"
                :key="reservation.id || reservation.boatName + reservation.startDate"
                :port-name="reservation.portName "
                :start-date="reservation.startDate "
                :end-date="reservation.endDate "
                :total-cost="reservation.totalCost "
                :boat-name="boat.name"
                :mooring-name="reservation.mooringName "
                :mooring-number="reservation.mooringNumber "
                :status="reservation.status"
                @view-details="showReservationDetails(reservation)"
                @cancel="handleCancelReservation(reservation)"
              />

              <div
                v-if="displayedReservations.length === 0"
                class="text-center text-slate-400 py-16 text-sm"
              >
                {{
                  $t('reservations.empty') || 'No hay reservas en esta categoría para este barco'
                }}
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </section>
  <Footer />
</template>

<style scoped></style>
