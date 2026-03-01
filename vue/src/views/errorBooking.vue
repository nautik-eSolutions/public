<script setup>
import Footer from '@/components/general/footer.vue'
import ReservationConfirmation from '@/components/user/reservationConfirmation.vue'
import Header from '@/components/general/header.vue'
import PaymentFailed from '@/components/bookings/PaymentFailed.vue'
import { useRoute, useRouter } from 'vue-router'
import { useBookingStore } from '@/stores/bookingStore.js'
import { onMounted, ref } from 'vue'

const router = useRouter()
const params = useRoute()
const bookingStore = useBookingStore()

const booking = ref()

onMounted(async () => {
  console.log(params.query.order)
  booking.value = await bookingStore.getBookingByOrder(params.query.order)
  console.log(booking.value)
})

const backToHome = () => {
  router.push('/')
}
</script>

<template>
  <Header />
  <PaymentFailed :booking="booking" @back-to-home="backToHome" />

  <Footer />
</template>

<style scoped></style>
