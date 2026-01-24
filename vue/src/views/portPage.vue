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

  },
})
</script>
<template>
  <Header />
  <PortProfileHero />
  <Footer />
</template>

<style scoped></style>
