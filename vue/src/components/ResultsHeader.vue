<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  resultsCount: {
    type: Number,
    required: true,
  },
  sortBy: {
    type: String,
    default: 'recommended',
  },
})

const emit = defineEmits(['update:sortBy'])

const handleSort = (value) => {
  emit('update:sortBy', value)
}
</script>

<template>
  <div class="flex items-center justify-between mb-6">
    <p class="text-gray-700">
      <span class="font-bold text-gray-900">{{ resultsCount }}</span>
      {{ $t('search.resultsHeader.results') }}
      <span class="text-gray-500">{{ $t('search.resultsHeader.orderedBy') }}</span>
    </p>

    <div class="relative">
      <select
        :value="sortBy"
        @change="handleSort($event.target.value)"
        class="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 text-sm font-medium text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3b3bf5] focus:border-transparent cursor-pointer"
      >
        <option value="recommended">{{ $t('search.resultsHeader.bestOption') }}</option>
        <option value="price_low">{{ $t('search.resultsHeader.lowestPrice') }}</option>
        <option value="price_high">{{ $t('search.resultsHeader.highestPrice') }}</option>
        <option value="distance">{{ $t('search.resultsHeader.distance') }}</option>
      </select>
      <div
        class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
      >
        <i class="pi pi-chevron-down text-xs"></i>
      </div>
    </div>
  </div>
</template>
