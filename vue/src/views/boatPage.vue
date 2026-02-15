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

const boatStore = useBoatStore()
const boat = ref()
const mounted = ref(false)

onMounted(async () => {
  const boatId = useRoute().params.id
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
          <h1 class="font-bold text-2xl">Embarcación {{ boat.name }}</h1>
          <div class="bg-white border border-gray-200 shadow-sm p-4 h-2/5 w-full shrink-0">
            <div class="flex justify-between gap-2 w-full">
              <div class="flex p-2 gap-2 text-lg border border-gray-300 shadow-sm w-7/8">
                <div class="w-1/3 p-2 text-white bg-principal-blue">
                  <p class="text-xl text-center">Eslora : {{ boat.length }} m</p>
                </div>
                <div class="w-1/3 p-2 text-white bg-principal-blue">
                  <p class="text-xl text-center">Manga : {{ boat.beam }} m</p>
                </div>
                <div class="w-1/3 p-2 text-white bg-principal-blue">
                  <p class="text-xl text-center">Calado : {{ boat.draft }} m</p>
                </div>
              </div>
            <Button
              label="Edit"
              @click="handleClick"
              class="w-1/8"
            />
            </div>

          </div>
        </template>
        <Splitter />
        <template v-if="mounted">
          <section class="text-principal-blue">
            <h2 class="text-2xl">Reservas</h2>
            <BookingCard
            PortName="Real club nautic"
            StartDate="24/10/2026"
            EndDate="24/10/2026"
            TotalPrice="428,90"
            />
          </section>
        </template>
      </div>
    </div>
  </section>
  <Footer />
</template>

<style scoped></style>
