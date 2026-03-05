<script setup>
import Footer from '@/components/general/footer.vue'
import Header from '@/components/general/header.vue'
import Paymentsuccess from '@/components/bookings/Paymentsuccess.vue'
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { useBookingStore } from '@/stores/bookingStore.js'

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
const pageBookings = () => {
  router.push('/bookings')
}
const downloadInvoice = async () => {
  try {
    const orderNumber = params.query.order
    const resp = await bookingStore.getInvoice(orderNumber)
    console.log(resp)
    const blob = resp.data
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `invoice-${orderNumber}.pdf`)
    document.body.appendChild(link)
    link.click()
    link.remove()
    window.URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Error:', error)
  }
}
</script>

<template>
  <Header />
  <Paymentsuccess
    v-if="booking"
    :booking="booking"
    @back-to-home="backToHome"
    @view-bookings="pageBookings"
    @download-invoice="downloadInvoice"
  />

  <Footer />
</template>

<style scoped></style>
