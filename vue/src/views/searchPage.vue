<script>
import Footer from '@/components/general/footer.vue'
import Header from '@/components/general/header.vue'
import PortSearchedBar from '@/components/searchBars/portSearchedBar.vue'
import { ref } from 'vue'
import ServicesCheckbox from '@/components/checkbox/servicesCheckbox.vue'
import PortCardBooking from '@/components/ports/cards/portCardBooking.vue'
export default {
  name: 'SearchPage',
}
</script>
<script setup>
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import Header from '@/components/general/header.vue'
import PortSearchedBar from '@/components/searchBars/portSearchedBar.vue'
import ServicesCheckbox from '@/components/checkbox/servicesCheckbox.vue'
import PortCardBooking from '@/components/ports/cards/portCardBooking.vue'
import Footer from '@/components/general/footer.vue'
import { MooringCategoryService } from '@/service/MooringCategoryService.js'
import MooringCategoryCard from '@/components/bookings/cards/MooringCategoryCard.vue'

const routeParams = useRoute().params
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

const mooringCategories = ref()

onMounted(async () => {
  mooringCategories.value = await MooringCategoryService.getMooringCategories(
    routeParams.id,
    routeParams.length,
    routeParams.beam,
    routeParams.startDate,
    routeParams.endDate,
  )


})
console.log(mooringCategories)
</script>
<template>
  <Header />
  <PortSearchedBar
    :portName="routeParams.portName"
    :length="routeParams.length"
    :beam="routeParams.beam"
    :startDate="routeParams.startDate"
    :endDate="routeParams.endDate"
  />

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
          <template v-if="mooringCategories">
            <div v-for="mc in mooringCategories" :key="mc.id">
              <MooringCategoryCard
                :price="mc.price"
                :zoneName="mc.zoneName"
                :zoneDescription="mc.zoneDescription"
              />
            </div>
          </template>
        </div>
      </div>
    </div>
  </section>
  <Footer />
</template>

<style scoped></style>
