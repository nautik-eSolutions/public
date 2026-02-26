<script>
export default {
  name: 'PortBookingCard',
}
</script>

<script setup>
import Chip from 'primevue/chip'
import { faFaucet, faShip, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
defineProps({
  id: [String, Number],
  portId: [String, Number],
  zoneName: String,
  portName: String,
  price: Number,
  maxBeam: Number,
  maxLength: Number,
  electricPower: {
    type: Number,
    default: 16, // Amperios
  },
  waterAvailable: {
    type: Boolean,
    default: true,
  },
  wasteCollection: {
    type: Boolean,
    default: true,
  },
  services: {
    type: Array,
    default: () => ['Wifi', 'Duchas', 'Seguridad'],
  },
})

defineEmits(['click'])

const serviceIcons = {
  Wifi: 'pi pi-wifi',
  Restaurantes: 'pi pi-shopping-bag',
  Limpieza: 'pi pi-sparkles',
  Duchas: 'pi pi-sun',
  Seguridad: 'pi pi-shield',
  Parking: 'pi pi-car',
  Lavandería: 'pi pi-replay',
  'Bar/Cafetería': 'pi pi-coffee',
}

const getServiceIcon = (service) => serviceIcons[service] || 'pi pi-check'
</script>

<template>
  <div
    @click="$emit('click', { id, zoneName, price })"
    class="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-all duration-200 cursor-pointer hover:border-principal-blue group"
  >
    <div class="flex items-center justify-between">
      <div class="flex-1">
        <h3
          class="text-xl font-bold text-gray-900 mb-3 group-hover:text-principal-blue transition-colors"
        >
          {{ zoneName }}
        </h3>

        <div class="grid grid-cols-2 gap-3 mb-4">
          <div class="flex items-center gap-2 text-sm text-gray-600">
            <i class="pi pi-arrows-h text-principal-blue"></i>
            <span><strong>Eslora:</strong> {{ maxLength }}m</span>
          </div>
          <div class="flex items-center gap-2 text-sm text-gray-600">
            <i class="pi pi-arrows-v text-principal-blue"></i>
            <span><strong>Manga:</strong> {{ maxBeam }}m</span>
          </div>
          <div class="flex items-center gap-2 text-sm text-gray-600">
            <i class="pi pi-bolt text-principal-blue"></i>
            <span><strong>Potencia:</strong> {{ electricPower }}A</span>
          </div>
          <div class="flex items-center gap-2 text-sm">
            <FontAwesomeIcon :icon="faFaucet" size="xl" />
            <span :class="waterAvailable ? 'text-gray-600' : 'text-gray-400'"
              ><strong>Agua</strong></span
            >
          </div>
          <div class="flex items-center gap-2 text-sm col-span-2">
            <FontAwesomeIcon :icon="faTrashCan" />
            <span :class="wasteCollection ? 'text-gray-600' : 'text-gray-400'"
              ><strong>Recogida de residuos</strong></span
            >
          </div>
        </div>
      </div>

      <div class="flex flex-col items-end justify-center ml-6 pl-6 border-l border-gray-200">
        <div class="text-right mb-3">
          <p class="text-sm text-gray-600 mb-1">Precio total</p>
          <p class="text-3xl font-bold text-gray-900">{{ Math.round(price).toFixed(2)}}€</p>
        </div>
        <button
          class="bg-principal-blue hover:bg-[#2929d4] text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2"
        >
          <i class="pi pi-calendar"></i>
          <span>Reservar</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
:deep(.p-chip) {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #eff6ff;
  color: #1e40af;
  padding: 0.375rem 0.875rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s;
}

:deep(.p-chip:hover) {
  background-color: #dbeafe;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

:deep(.p-chip .p-chip-icon) {
  font-size: 0.875rem;
  color: #1e40af;
}

:deep(.p-chip .p-chip-label) {
  font-size: 0.875rem;
  line-height: 1.25;
  font-weight: 500;
}
</style>
