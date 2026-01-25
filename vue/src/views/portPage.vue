<script>
export default {
  name: 'PortPage',
}
</script>
<script setup>
import Header from '@/components/general/header.vue'
import Footer from '@/components/general/footer.vue'
import PortProfileHero from '@/components/ports/portProfileHero.vue'
import { ref } from 'vue'
import PortProfileImage from '@/components/ports/portProfileImage.vue'
import PortInfoMiniCard from '@/components/ports/cards/portInfoMiniCard.vue'
import PortInfoCard from '@/components/ports/cards/portInfoCard.vue'
import PortBookingCard from '@/components/ports/cards/portBookingCard.vue'
import WeatherCard from '@/components/weather/weatherCard.vue'

const port = ref({
  portName: "Marina Cala D'Or",
  images: [
    'https://mallorcacaprice.com/wp-content/uploads/2024/10/fira-marinera-port-andratx.webp',
    'https://e00-elmundo.uecdn.es/assets/multimedia/imagenes/2019/10/08/15705370670358_640x0.jpg',
    'https://www.yachtdigest.com/wp-content/uploads/2024/03/marina-de-cala-dor-01.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_Vj4SL-DMFfqVRCja2-eHMIKZ0Z2ssolQGQ&s',
  ],
  mooringsNumber: 499,
  length: 12.9,
  draft: 4.9,
  chanel: 9,
  servicesOffered: ['Restaurantes', 'Gasolinera', 'Agua', 'Wifi'],
  nearbyCommerce: ['Restaurante Botavara', 'Mercadona'],
  weatherInformation: {
    windVelocity: 15,
    windDirection: 323,
    weather: 'Nublado',
    waveHeight: 1.87,
    waveDirection: 277,
    airTemperature: 15,
    windTemperature: 16,
  },
})

const servicesOffered = ref({
  name: 'Tipos de amarres',
  services: ['Popa al muelle', 'Lineas de amarre'],
})
</script>
<template>
  <Header />
  <PortProfileHero
    :portName="port.portName"
    :images="port.images"
    :mooringsNumber="port.mooringsNumber"
    :length="port.length"
    :draft="port.draft"
    :chanel="port.chanel"
    :servicesOffered="port.servicesOffered"
    :nearbyCommerce="port.nearbyCommerce"
    :weatherInformation="port.weatherInformation"
  />
  <div class="max-w-6xl mx-auto px-4 mb-12">

    <div class="flex flex-row flex-wrap justify-around">
      <div v-for="image in port.images">
        <portProfileImage :imageSrc="image" />
      </div>
    </div>

    <div class="mt-8 w-full flex flex-row justify-around">
      <port-info-mini-card information-name="Amarres" :information-number="port.mooringsNumber" />
      <port-info-mini-card information-name="Eslora" :information-number="port.length" />
      <port-info-mini-card information-name="Calado" :information-number="port.draft" />
      <port-info-mini-card information-name="Canal VHF" :information-number="port.chanel" />
    </div>

    <div class="mt-8 w-full flex flex-row flex-wrap justify-between gap-4">
      <port-info-card :title="servicesOffered.name" :services="servicesOffered.services" />
      <port-info-card :title="servicesOffered.name" :services="servicesOffered.services" />
      <port-info-card :title="servicesOffered.name" :services="servicesOffered.services" />
      <port-booking-card fromPrice="156,00"/>
    </div>

    <div class="mt-8 w-full flex justify-center justify-items-center">
      <WeatherCard/>
    </div>
  </div>

  <Footer />
</template>

<style scoped></style>
