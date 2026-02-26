<script>
import Footer from '@/components/general/footer.vue'
import Header from '@/components/general/header.vue'
import PortSearchedBar from '@/components/searchBars/portSearchedBar.vue'
export default {
  name: 'SearchPage',
}
</script>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import Header from '@/components/general/header.vue'
import PortSearchedBar from '@/components/searchBars/portSearchedBar.vue'
import Footer from '@/components/general/footer.vue'
import DateTabs from '@/components/DateTabs.vue'
import FilterPanel from '@/components/FilterPanel.vue'
import MobileFiltersModal from '@/components/MobileFiltersModal.vue'
import ResultsHeader from '@/components/ResultsHeader.vue'
import EmptyState from '@/components/EmptyState.vue'
import PortBookingCard from '@/components/ports/cards/portBookingCard.vue'
import { MooringCategoryService } from '@/service/MooringCategoryService.js'
import { useFiltering } from '@/utils/UseFiltering.js'

const route = useRoute()
const router = useRouter()
const routeParams = route.params

const mooringCategories = ref([])
const sortBy = ref('recommended')
const showMobileFilters = ref(false)
const maxPrice = ref(1000)

const filters = ref({
  wifi: false,
  restaurantes: false,
  limpieza: false,
  priceRange: {
    min: 0,
    max: 100,
  },
})

const dateTabs = ref([
  { label: '28 feb.-7 mar.', price: 73, dates: ['2025-02-28', '2025-03-07'] },
  { label: '1 mar.-8 mar.', price: 53, dates: ['2025-03-01', '2025-03-08'] },
  { label: '2 mar.-9 mar.', price: 34, dates: ['2025-03-02', '2025-03-09'], active: true },
  { label: '3 mar.-10 mar.', price: 31, dates: ['2025-03-03', '2025-03-10'] },
  { label: '4 mar.-11 mar.', price: 34, dates: ['2025-03-04', '2025-03-11'] },
  { label: '5 mar.-12 mar.', price: 37, dates: ['2025-03-05', '2025-03-12'] },
])

function handleCardClick(data) {
  router.push(
    `/bookings/boat/${routeParams.boatName}/${routeParams.boatId}/port/${routeParams.portName}/category/${data.id}/dates/${routeParams.startDate}/${routeParams.endDate}`,
  )
}

function handleDateTabSelect(tab) {
  dateTabs.value.forEach((t) => (t.active = false))
  tab.active = true
}
const filteredAndSortedCategories = ref()
onMounted(async () => {
  mooringCategories.value = await MooringCategoryService.getMooringCategories(
    routeParams.id,
    routeParams.length,
    routeParams.beam,
    routeParams.draft,
    routeParams.startDate,
    routeParams.endDate,
  )
  if (mooringCategories.value.length > 0) {
    const calculatedMaxPrice = Math.max(
      ...mooringCategories.value.map((mc) => Math.round(mc.totalPrice)),
    )
    maxPrice.value = calculatedMaxPrice
    filters.value.priceRange[1] = calculatedMaxPrice
  }
  filteredAndSortedCategories.value = useFiltering(
    mooringCategories,
    filters,
    sortBy,
  ).filteredAndSorted
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

  <!-- <DateTabs :tabs="dateTabs" @select="handleDateTabSelect" /> -->

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
        :max-price="maxPrice"
        @update:filters="filters = $event"
      />
      <main class="max-w-7xl lg:w-3/4">
        <!--
        <ResultsHeader
          v-if="mooringCategories"
          :results-count="mooringCategories.length"
          :sort-by="sortBy"
          @update:sort-by="sortBy = $event"
        />
      -->
        <div class="space-y-4">
          <template v-if="mooringCategories">
            <template v-if="mooringCategories.length > 0">
              <PortBookingCard
                v-for="mc in mooringCategories"
                :key="mc.id"
                :id="mc.id"
                :portId="routeParams.id"
                :price="mc.totalPrice"
                :zoneName="mc.zoneName"
                :maxBeam="mc.maxBeam"
                :maxLength="mc.maxLength"
                :services="mc.services"
                @click="handleCardClick"
              />
            </template>
          </template>
          <EmptyState v-else />
        </div>
      </main>
    </div>
  </section>

  <Footer />
</template>
