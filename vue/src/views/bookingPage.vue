<script setup>
import Header from '@/components/general/header.vue'
import Footer from '@/components/general/footer.vue'
import Button from '@/volt/Button.vue'
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref, computed } from 'vue'
import { useBookingStore } from '@/stores/bookingStore.js'

const route = useRoute()
const router = useRouter()
const bookingStore = useBookingStore()

const isLoading = ref(true)
const showCancelDialog = ref(false)


const reservation = computed(() => {
  const id = parseInt(route.params.id)
  const booking = bookingStore.Bookings?.find(b => b.id === id)
  console.log(booking)
  return booking
})

onMounted(async () => {
  if (!bookingStore.bookings?.length) {
    await bookingStore.getAllBookingsByUser()
  }
  isLoading.value = false
})

const numberOfDays = computed(() => {
  if (!reservation.value) return 0
  const start = new Date(reservation.value.startDate)
  const end = new Date(reservation.value.endDate)
  const diffTime = Math.abs(end - start)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
})

const pricePerDay = computed(() => {
  if (!reservation.value || numberOfDays.value === 0) return 0
  return (reservation.value.totalCost / numberOfDays.value).toFixed(2)
})

function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function goBack() {
  router.back()
}

function openCancelDialog() {
  showCancelDialog.value = true
}

function goToBoat() {
  if (reservation.value?.boatId) {
    router.push(`/boats/${reservation.value.boatId}`)
  }
}
</script>

<template>
  <Header />
  <section class="min-h-screen py-8 bg-white">
    <div class="max-w-5xl mx-auto px-8">
      <div v-if="isLoading" class="flex justify-center items-center py-20">
        <i class="pi pi-spin pi-spinner text-4xl text-principal-blue"></i>
      </div>

      <template v-else-if="reservation">
        <button
          @click="goBack"
          class="text-blue-600 text-sm font-medium mb-6 hover:underline flex items-center gap-2"
        >
          <i class="pi pi-arrow-left"></i>
          <span>Volver a reservas</span>
        </button>

        <div class="flex flex-col gap-6">
          <div class="bg-principal-blue p-6 rounded-xl flex items-center justify-between shadow-lg">
            <div>
              <p class="text-blue-200 text-sm font-medium mb-1">Reserva</p>
              <h1 class="font-bold text-3xl text-white">{{ reservation.portName }}</h1>
              <p class="text-blue-100 text-sm mt-1">
                Reserva {{ reservation.id }} · {{ formatDate(reservation.startDate) }}
              </p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="bg-white rounded-xl p-8 border border-gray-200 shadow-xl">
              <p class="text-gray-600 text-lg font-semibold mb-3">Precio Total</p>
              <p class="text-5xl font-bold text-gray-900 mb-2">{{ reservation.totalCost }}€</p>
              <p class="text-gray-500 text-base">{{ pricePerDay }}€ por día</p>
            </div>
            <div class="bg-white rounded-xl p-8 border border-gray-200 shadow-xl">
              <p class="text-gray-600 text-lg font-semibold mb-3">Duración</p>
              <p class="text-5xl font-bold text-gray-900 mb-2">{{ numberOfDays }}</p>
              <p class="text-gray-500 text-base">{{ numberOfDays === 1 ? 'día' : 'días' }}</p>
            </div>
            <div class="bg-white rounded-xl p-8 border border-gray-200 shadow-xl">
              <p class="text-gray-600 text-lg font-semibold mb-3">Amarre</p>
              <p v-if="reservation.mooringNumber" class="text-5xl font-bold text-gray-900 mb-2">
                {{ reservation.mooringNumber.number }}
              </p>
              <p v-else class="text-2xl font-bold text-gray-500 mb-2">
                Disponible 24h antes
              </p>
              <p class="text-gray-500 text-base">
                {{ reservation.mooringNumber?.zoneName || reservation.zoneName || 'Sin zona' }}
              </p>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-xl border border-gray-200 p-8">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Detalles de la reserva</h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div class="space-y-6">
                <div>
                  <h3 class="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wide">
                    Entrada
                  </h3>
                  <div class="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div class="flex items-center gap-3">
                      <i class="pi pi-calendar text-gray-600 text-2xl"></i>
                      <div>
                        <p class="font-bold text-gray-900 text-lg">
                          {{ formatDate(reservation.startDate) }}
                        </p>
                        <p class="text-gray-500 text-sm">A partir de las 14:00</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 class="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wide">
                    Salida
                  </h3>
                  <div class="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div class="flex items-center gap-3">
                      <i class="pi pi-calendar text-gray-600 text-2xl"></i>
                      <div>
                        <p class="font-bold text-gray-900 text-lg">
                          {{ formatDate(reservation.endDate) }}
                        </p>
                        <p class="text-gray-500 text-sm">Antes de las 12:00</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="space-y-6">
                <div>
                  <h3 class="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wide">
                    Puerto
                  </h3>
                  <div class="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div class="flex items-center gap-3">
                      <i class="pi pi-map-marker text-gray-600 text-2xl"></i>
                      <div>
                        <p class="font-bold text-gray-900 text-lg">{{ reservation.portName }}</p>
                        <p class="text-gray-500 text-sm">
                          {{ reservation.mooringNumber?.zoneName || reservation.zoneName  }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 class="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wide">
                    Barco
                  </h3>
                  <div class="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-3">
                        <i class="pi pi-send text-gray-600 text-2xl"></i>
                        <div>
                          <p class="font-bold text-gray-900 text-lg">
                            Barco {{ reservation.boatName }}
                          </p>
                          <p class="text-gray-500 text-sm">ID: {{ reservation.boatId }}</p>
                        </div>
                      </div>
                      <button
                        v-if="reservation.boatId"
                        @click="goToBoat"
                        class="text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        Ver barco →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              v-if="reservation.mooringNumber?.zone_description || reservation.zoneDescription"
              class="mt-8 pt-8 border-t border-gray-200"
            >
              <h3 class="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wide">
                Sobre la zona
              </h3>
              <p class="text-gray-700 text-base leading-relaxed">
                {{ reservation.mooringNumber?.zone_description || reservation.zoneDescription }}
              </p>
            </div>


          </div>
        </div>
      </template>

      <div v-else class="text-center py-20">
        <p class="text-gray-500 text-lg">Reserva no encontrada</p>
      </div>
    </div>
  </section>
  <Footer />
</template>

<style scoped></style>