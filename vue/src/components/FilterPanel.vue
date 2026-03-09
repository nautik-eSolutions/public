<script setup>
import { defineProps, defineEmits } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faPlugCircleXmark,
  faDroplet,
  faWifi,
  faShield,
  faTrash,
  faShower,
  faParking,
  faPlugCircleBolt,
} from '@fortawesome/free-solid-svg-icons'

const props = defineProps({
  filters: {
    type: Object,
    required: true,
  },
  maxPrice: {
    type: Number,
    default: 1000,
  },
})

const emit = defineEmits(['update:filters'])

const updateFilter = (key, value) => {
  emit('update:filters', { ...props.filters, [key]: value })
}

const updatePriceRange = (value) => {
  emit('update:filters', {
    ...props.filters,
    priceRange: [props.filters.priceRange.min, Number(value)],
  })
}
</script>

<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-4">
    <h3 class="text-lg font-bold text-gray-900 mb-4">{{ $t('search.filterPanel.title') }}</h3>

    <div class="mb-6">
      <h4 class="text-sm font-semibold text-gray-900 mb-3">
        {{ $t('search.filterPanel.services') }}
      </h4>
      <div class="flex flex-col gap-0.5">
        <label
          class="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
        >
          <input
            type="checkbox"
            :checked="filters.electricity16A"
            @change="updateFilter('electricity16A', $event.target.checked)"
            class="w-4 h-4 text-[#3b3bf5] border-gray-300 rounded"
          />
          <FontAwesomeIcon :icon="faPlugCircleBolt" size="sm" />
          <span class="text-sm text-gray-700">{{ $t('search.filterPanel.electricity16A') }}</span>
        </label>

        <label
          class="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
        >
          <input
            type="checkbox"
            :checked="filters.electricity32A"
            @change="updateFilter('electricity32A', $event.target.checked)"
            class="w-4 h-4 text-[#3b3bf5] border-gray-300 rounded"
          />
          <FontAwesomeIcon :icon="faPlugCircleBolt" size="sm" />
          <span class="text-sm text-gray-700">{{ $t('search.filterPanel.electricity32A') }}</span>
        </label>

        <label
          class="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
        >
          <input
            type="checkbox"
            :checked="filters.electricity63A"
            @change="updateFilter('electricity63A', $event.target.checked)"
            class="w-4 h-4 text-[#3b3bf5] border-gray-300 rounded"
          />
          <FontAwesomeIcon :icon="faPlugCircleBolt" size="sm" />
          <span class="text-sm text-gray-700">{{ $t('search.filterPanel.electricity63A') }}</span>
        </label>
        <label
          class="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
        >
          <input
            type="checkbox"
            :checked="filters.freshWater"
            @change="updateFilter('freshWater', $event.target.checked)"
            class="w-4 h-4 text-[#3b3bf5] border-gray-300 rounded"
          />
          <FontAwesomeIcon :icon="faDroplet" size="sm" />
          <span class="text-sm text-gray-700">{{ $t('search.filterPanel.freshWater') }}</span>
        </label>
        <label
          class="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
        >
          <input
            type="checkbox"
            :checked="filters.wifiPremium"
            @change="updateFilter('wifiPremium', $event.target.checked)"
            class="w-4 h-4 text-[#3b3bf5] border-gray-300 rounded"
          />
          <FontAwesomeIcon :icon="faWifi" size="sm" />
          <span class="text-sm text-gray-700">{{ $t('search.filterPanel.wifiPremium') }}</span>
        </label>

        <label
          class="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
        >
          <input
            type="checkbox"
            :checked="filters.security247"
            @change="updateFilter('security247', $event.target.checked)"
            class="w-4 h-4 text-[#3b3bf5] border-gray-300 rounded"
          />
          <FontAwesomeIcon :icon="faShield" size="sm" />
          <span class="text-sm text-gray-700">{{ $t('search.filterPanel.security247') }}</span>
        </label>

        <label
          class="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
        >
          <input
            type="checkbox"
            :checked="filters.wasteDisposal"
            @change="updateFilter('wasteDisposal', $event.target.checked)"
            class="w-4 h-4 text-[#3b3bf5] border-gray-300 rounded"
          />
          <FontAwesomeIcon :icon="faTrash" size="sm" />
          <span class="text-sm text-gray-700">{{ $t('search.filterPanel.wasteDisposal') }}</span>
        </label>
        <label
          class="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
        >
          <input
            type="checkbox"
            :checked="filters.showersAndLockers"
            @change="updateFilter('showersAndLockers', $event.target.checked)"
            class="w-4 h-4 text-[#3b3bf5] border-gray-300 rounded"
          />
          <FontAwesomeIcon :icon="faShower" size="sm" />
          <span class="text-sm text-gray-700">{{
            $t('search.filterPanel.showersAndLockers')
          }}</span>
        </label>
        <label
          class="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
        >
          <input
            type="checkbox"
            :checked="filters.parking"
            @change="updateFilter('parking', $event.target.checked)"
            class="w-4 h-4 text-[#3b3bf5] border-gray-300 rounded"
          />
          <FontAwesomeIcon :icon="faParking" size="sm" />
          <span class="text-sm text-gray-700">{{ $t('search.filterPanel.parking') }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<style scoped>
input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #3b3bf5;
  cursor: pointer;
  border: 3px solid white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

input[type='range']::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #3b3bf5;
  cursor: pointer;
  border: 3px solid white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
</style>
