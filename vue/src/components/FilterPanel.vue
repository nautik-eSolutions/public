<script setup>
import { defineProps, defineEmits } from 'vue'

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
    <h3 class="text-lg font-bold text-gray-900 mb-4">Filtros</h3>
    <div class="mb-6">
      <h4 class="text-sm font-semibold text-gray-900 mb-3">Servicios</h4>
      <div class="space-y-2">
        <label class="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            :checked="filters.wifi"
            @change="updateFilter('wifi', $event.target.checked)"
            class="w-4 h-4 text-[#3b3bf5] border-gray-300 rounded"
          />
          <span class="text-sm text-gray-700">Wifi</span>
        </label>
        <label class="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            :checked="filters.restaurantes"
            @change="updateFilter('restaurantes', $event.target.checked)"
            class="w-4 h-4 text-[#3b3bf5] border-gray-300 rounded"
          />
          <span class="text-sm text-gray-700">Restaurantes</span>
        </label>
        <label class="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            :checked="filters.limpieza"
            @change="updateFilter('limpieza', $event.target.checked)"
            class="w-4 h-4 text-[#3b3bf5] border-gray-300 rounded"
          />
          <span class="text-sm text-gray-700">Limpieza</span>
        </label>
      </div>
    </div>
    <div class="mb-6">
      <h4 class="text-sm font-semibold text-gray-900 mb-3">
        Precio: {{ filters.priceRange[0] }}€ - {{ filters.priceRange[1] }}€
      </h4>
      <input
        type="range"
        :value="filters.priceRange[1]"
        @input="updatePriceRange($event.target.value)"
        :min="filters.priceRange[0]"
        :max="maxPrice"
        class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#3b3bf5]"
      />
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
