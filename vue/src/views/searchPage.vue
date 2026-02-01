<script>
import Footer from '@/components/general/footer.vue'
import Header from '@/components/general/header.vue'
import PortSearchedBar from '@/components/searchBars/portSearchedBar.vue'
import { ref } from 'vue'
import ServicesCheckbox from '@/components/checkbox/servicesCheckbox.vue'
import PortCardBooking from '@/components/ports/cards/portCardBooking.vue'
export default {
  name: 'SearchPage',
  components: { PortCardBooking, ServicesCheckbox, PortSearchedBar, Header, Footer },
  setup() {
    const services = ref([
      {
        name: 'Wifi',
      },
      {
        name: 'Restaurantes',
      },
      {
        name: 'Limpieza',
      },
    ])
    const ports = ref([
      {
        portName: 'Port Adriano',
        startingNightPrice: '67,75',
        totalPrice: '127,00',
        imgSrc:
          'https://mallorcacaprice.com/wp-content/uploads/2024/10/fira-marinera-port-andratx.webp',
      },
      {
        portName: 'Portocolom',
        startingNightPrice: '78,75',
        totalPrice: '148,45',

        imgSrc:
          'https://e00-elmundo.uecdn.es/assets/multimedia/imagenes/2019/10/08/15705370670358_640x0.jpg',
      },
      {
        portName: 'Palafrugell',
        startingNightPrice: '48,75',
        totalPrice: '98,00',

        imgSrc:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_Vj4SL-DMFfqVRCja2-eHMIKZ0Z2ssolQGQ&s',
      },
    ])
    return { services, ports }
  },
}
</script>
<script setup>

import { useRoute } from 'vue-router'

const routeParams =  useRoute().params;

console.log(routeParams)
</script>
<template>
  <Header />
  <PortSearchedBar
    :portName="routeParams.portName"
    :length="routeParams.length"
    :beam="routeParams.beam"
    :startDate="routeParams.startDate"
    :endDate="routeParams.endDate"/>

  <section class="max-w-6xl mx-auto px-4 mb-12">
    <div class="flex flex-col">
      <h2 class="font-bold text-2xl m-2">Resultados</h2>
      <div class="flex flex-row gap-4">
        <div class="w-[25%] flex flex-col gap-3">
          <div v-for="service in services">
            <ServicesCheckbox :service="service.name" />
          </div>
        </div>
        <div class="w-[75%] flex flex-col gap-5">
          <div v-for="port in ports">
           <!-- <PortCardBooking
              :totalPrice="port.totalPrice"
              :imgSrc="port.imgSrc"
              :portName="port.portName"
              :startingNightPrice="port.startingNightPrice"
            /> -->
          </div>
        </div>
      </div>
    </div>
  </section>
  <Footer />
</template>

<style scoped></style>
