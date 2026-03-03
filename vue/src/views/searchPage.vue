<script setup>
import { useRoute, useRouter } from 'vue-router'
import { computed, onMounted, ref, watch } from 'vue'
import { MooringCategoryService } from '@/service/MooringCategoryService.js'
import { useFiltering } from '@/utils/UseFiltering.js'
import Footer from '@/components/general/footer.vue'
import EmptyState from '@/components/EmptyState.vue'
import PortBookingCard from '@/components/ports/cards/portBookingCard.vue'
import MobileFiltersModal from '@/components/MobileFiltersModal.vue'
import FilterPanel from '@/components/FilterPanel.vue'
import PortSearchedBar from '@/components/searchBars/portSearchedBar.vue'
import Header from '@/components/general/header.vue'

const route = useRoute()
const router = useRouter()
const routeParams = route.params

const mooringCategories = ref([])
const sortBy = ref('recommended')
const showMobileFilters = ref(false)

const maxPrice = computed(() => {
  if (!mooringCategories.value || mooringCategories.value.length === 0) {
    return 1000
  }
  const prices = mooringCategories.value.map((mc) => mc.totalPrice).filter((p) => !isNaN(p))
  return prices.length > 0 ? Math.max(...prices) : 1000
})

const minPrice = computed(() => {
  if (!mooringCategories.value || mooringCategories.value.length === 0) {
    return 0
  }
  const prices = mooringCategories.value.map((mc) => mc.totalPrice).filter((p) => !isNaN(p))
  return prices.length > 0 ? Math.min(...prices) : 0
})

const filters = ref({
  wifi: false,
  restaurantes: false,
  limpieza: false,
})

const { filteredAndSorted } = useFiltering(mooringCategories, filters, sortBy)

function handleCardClick(data) {
  router.push(
    `/bookings/boat/${routeParams.boatName}/${routeParams.boatId}/port/${routeParams.portName}/category/${data.id}/dates/${routeParams.startDate}/${routeParams.endDate}`,
  )
}

onMounted(async () => {
  mooringCategories.value = await MooringCategoryService.getMooringCategories(
    routeParams.id,
    routeParams.length,
    routeParams.beam,
    routeParams.draft,
    routeParams.startDate,
    routeParams.endDate,
  )
  console.log(mooringCategories
  )
})
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
    <div class="flex flex-col lg:flex-row gap-6">
      <aside class="hidden lg:block w-full lg:w-1/4">
        <FilterPanel :filters="filters" :max-price="maxPrice" @update:filters="filters = $event" />
      </aside>

      <button
        @click="showMobileFilters = true"
        class="lg:hidden fixed bottom-4 right-4 bg-[#3b3bf5] text-white px-6 py-3 rounded-full shadow-lg z-50 flex items-center gap-2 hover:bg-[#2f2fcc] transition-colors"
      >
        <i class="pi pi-filter text-lg"></i>
        Filtros
      </button>

      <MobileFiltersModal
        v-model:show="showMobileFilters"
        :filters="filters"
        @update:filters="filters = $event"
      />

      <main class="max-w-7xl lg:w-3/4">
        <div class="space-y-4">
          <template v-if="filteredAndSorted && filteredAndSorted.length > 0">
            <PortBookingCard
              v-for="mc in filteredAndSorted"
              :key="mc.id"
              :id="mc.id"
              :portId="routeParams.id"
              :price="mc.totalPrice"
              :zoneName="mc.zoneName"
              :maxBeam="mc.maxBeam"
              :maxLength="mc.maxLength"
              :services="mc.services"
              :description="mc.description"
              @click="handleCardClick"
            />
          </template>
          <EmptyState v-else />
        </div>
      </main>
    </div>
  </section>

  <Footer />
</template>
