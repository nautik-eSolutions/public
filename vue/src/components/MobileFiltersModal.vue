<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
  filters: {
    type: Object,
    required: true,
  },
  maxPrice: {
    type: Number,
    default: 1000,
  },
})

const emit = defineEmits(['update:show', 'update:filters', 'apply'])

const close = () => {
  emit('update:show', false)
}

const updateFilter = (key, value) => {
  emit('update:filters', { ...props.filters, [key]: value })
}

const updatePriceRange = (value) => {
  emit('update:filters', {
    ...props.filters,
    priceRange: [props.filters.priceRange[0], Number(value)],
  })
}

const applyFilters = () => {
  emit('apply')
  close()
}
</script>

<template>
  <Transition name="modal">
    <div
      v-if="show"
      class="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end"
      @click="close"
    >
      <div @click.stop class="bg-white w-full rounded-t-2xl p-6 max-h-[80vh] overflow-y-auto">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-bold text-gray-900">Filtros</h3>
          <button @click="close" class="text-gray-500 hover:text-gray-700">
            <i class="pi pi-times text-xl"></i>
          </button>
        </div>
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
            class="w-full accent-[#3b3bf5]"
          />
        </div>

        <button
          @click="applyFilters"
          class="w-full bg-[#3b3bf5] text-white py-3 rounded-lg font-semibold hover:bg-[#2f2fcc] transition-colors"
        >
          Aplicar filtros
        </button>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

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
