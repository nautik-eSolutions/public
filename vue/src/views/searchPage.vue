<script>
import Footer from '@/components/general/footer.vue'
import Header from '@/components/general/header.vue'
import PortSearchedBar from '@/components/searchBars/portSearchedBar.vue'
import { ref } from 'vue'
import ServicesCheckbox from '@/components/checkbox/servicesCheckbox.vue'
export default {
  name: 'SearchPage',
  components: { ServicesCheckbox, PortSearchedBar, Header, Footer },
  setup() {
    const services = ref([
      {
        name: 'Wifi',
      },
      {
        name: 'Restaurantes',
      },
      {
      name: 'Limpieza'
      }
    ])
    return { services }
  },
}
</script>

<template>
  <Header />
  <PortSearchedBar />

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
          <div class="flex flex-row bg-gray-100 w-[100%] rounded-2xl shadow">
            <div class="w-[50%] p-5">
              <img
                class="w-full object-contain rounded"
                src="https://mallorcacaprice.com/wp-content/uploads/2024/10/fira-marinera-port-andratx.webp"
              />
            </div>
            <div class="p-5 flex flex-col justify-around gap-2">
              <h2 class="text-3xl">Port Adriano</h2>
              <h3>64,75€ /noche</h3>
              <button class="bg-[#1F3550] text-white h-8 rounded shadow">Reservar</button>
            </div>
          </div>
          <div class="flex flex-row bg-gray-100 w-[100%] rounded-2xl shadow">
            <div class="w-[50%] p-5">
              <img
                class="w-full object-contain rounded"
                src="https://mallorcacaprice.com/wp-content/uploads/2024/10/fira-marinera-port-andratx.webp"
              />
            </div>
            <div class="p-5 flex flex-col justify-around gap-2">
              <h2 class="text-3xl">Port Adriano</h2>
              <h3>64,75€ /noche</h3>
              <button class="bg-[#1F3550] text-white h-8 rounded shadow">Reservar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <Footer />
</template>

<style scoped></style>
