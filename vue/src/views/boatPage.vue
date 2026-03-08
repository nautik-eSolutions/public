<script setup>
import Header from '@/components/general/header.vue'
import Footer from '@/components/general/footer.vue'
import Button from '@/volt/Button.vue'
import Splitter from '@/volt/Splitter.vue'
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import { useBoatStore } from '@/stores/boatStore.js'
import router from '@/router/index.js'
import BookingCard from '@/components/bookings/cards/bookingCard.vue'
import { getBoat } from '@/service/BoatService.js'
import { useBookingStore } from '@/stores/bookingStore.js'

const boatStore = useBoatStore()
const bookingStore = useBookingStore()
const boat = ref()
const reservas = ref()
const mounted = ref(false)

onMounted(async () => {
  const boatId = useRoute().params.id
  reservas.value = await bookingStore.getBookingsByBoat(boatId)
  boat.value = await boatStore.getBoat(boatId)

  mounted.value = true
})

function handleClick() {
  router.push('/boats/edit/' + boat.value.id)
}
</script>

<template>
  <Header />
  <section class="min-h-screen py-8">
    <div class="max-w-7xl mx-auto px-8">
      <div class="flex flex-col gap-6">
        <template v-if="mounted">
          <div class="bg-principal-blue p-4 rounded-lg flex items-center justify-between">
            <h1 class="font-bold text-2xl text-white">{{ $t('boat.title') }} {{ boat.name }}</h1>
            <Button
              icon="pi pi-eye"
              @click="handleClick"
              class="p-button-rounded p-button-text text-white"
            />
          </div>
          <div class="bg-white border border-gray-200 shadow-sm p-4 h-2/5 w-full shrink-0">
            <div class="flex p-2 gap-2 text-lg border border-gray-300 shadow-sm w-full">
              <div class="w-1/3 p-2 text-white bg-principal-blue">
                <p class="text-xl text-center">{{ $t('boat.lenth') }} : {{ boat.length }} m</p>
              </div>
              <div class="w-1/3 p-2 text-white bg-principal-blue">
                <p class="text-xl text-center">{{ $t('boat.beam') }} : {{ boat.beam }} m</p>
              </div>
              <div class="w-1/3 p-2 text-white bg-principal-blue">
                <p class="text-xl text-center">{{ $t('boat.draft') }} : {{ boat.draft }} m</p>
              </div>
            </div>
          </div>
        </template>
        <Splitter />
        <template v-if="mounted">
          <section class="text-principal-blue">
            <h2 class="text-2xl">{{ $t('boat.bookings') }}</h2>
            <div v-for="reserva in reservas" :key="reserva.id">
              <BookingCard
                :PortName="reserva.port_name"
                :StartDate="reserva.start_date"
                :EndDate="reserva.end_date"
                :TotalPrice="reserva.total_cost"
              />
            </div>
          </section>
        </template>
      </div>
    </div>
  </section>
  <Footer />
</template>

<style scoped></style>
