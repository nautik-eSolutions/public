<script>
export default {
  name: 'PortBookingCard',
}
</script>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faBolt,
  faDroplet,
  faWifi,
  faShield,
  faTrash,
  faShower,
  faParking,
  faPlugCircleBolt,
} from '@fortawesome/free-solid-svg-icons'
import Splitter from '@/volt/Splitter.vue'
const props = defineProps({
  id: [String, Number],
  portId: [String, Number],
  zoneName: String,
  portName: String,
  price: Number,
  maxBeam: Number,
  maxLength: Number,
  services: {
    type: Array,
    default: () => [],
  },
  description: String,
})

defineEmits(['click'])
function hasService(serviceName) {
  return props.services?.some((service) => service.name === serviceName)
}
function getServiceLabel(serviceName) {
  const labels = {
    Electricity16A: 'Electricidad 16A',
    Electricity32A: 'Electricidad 32A',
    Electricity63A: 'Electricidad 63A',
    FreshWater: 'Agua Dulce',
    WiFiPremium: 'WiFi Premium',
    Security247: 'Seguridad 24/7',
    WasteDisposal: 'Gestión Residuos',
    ShowersAndLockers: 'Duchas y Taquillas',
    Parking: 'Aparcamiento',
  }
  return labels[serviceName] || serviceName
}
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
        <h3
          class="text-md font-bold border-b-2 border-b-gray-200 text-gray-900 mb-3 group-hover:text-principal-blue transition-colors"
        >
          {{ description }}
        </h3>
        <div class="grid grid-cols-2 gap-3 mb-4">
          <div class="flex items-center gap-2 text-sm text-gray-600">
            <i class="pi pi-arrows-h text-principal-blue"></i>
            <span
              ><strong>{{ $t('searchBar.length') }}:</strong> {{ maxLength }}m</span
            >
          </div>
          <div class="flex items-center gap-2 text-sm text-gray-600">
            <i class="pi pi-arrows-v text-principal-blue"></i>
            <span
              ><strong>{{ $t('searchBar.beam') }}:</strong> {{ maxBeam }}m</span
            >
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3 mt-2" v-if="services && services.length > 0">
          <div
            v-if="hasService('Electricity16A')"
            class="flex items-center gap-2 text-sm text-gray-600"
          >
            <FontAwesomeIcon :icon="faPlugCircleBolt" />
            <span>{{ getServiceLabel('Electricity16A') }}</span>
          </div>
          <div
            v-if="hasService('Electricity32A')"
            class="flex items-center gap-2 text-sm text-gray-600"
          >
            <FontAwesomeIcon :icon="faPlugCircleBolt" />
            <span>{{ getServiceLabel('Electricity32A') }}</span>
          </div>
          <div
            v-if="hasService('Electricity63A')"
            class="flex items-center gap-2 text-sm text-gray-600"
          >
            <FontAwesomeIcon :icon="faPlugCircleBolt" />
            <span>{{ getServiceLabel('Electricity63A') }}</span>
          </div>
          <div
            v-if="hasService('FreshWater')"
            class="flex items-center gap-2 text-sm text-gray-600"
          >
            <FontAwesomeIcon :icon="faDroplet" />
            <span>{{ getServiceLabel('FreshWater') }}</span>
          </div>
          <div
            v-if="hasService('WiFiPremium')"
            class="flex items-center gap-2 text-sm text-gray-600"
          >
            <FontAwesomeIcon :icon="faWifi" />
            <span>{{ getServiceLabel('WiFiPremium') }}</span>
          </div>
          <div
            v-if="hasService('Security247')"
            class="flex items-center gap-2 text-sm text-gray-600"
          >
            <FontAwesomeIcon :icon="faShield" />
            <span>{{ getServiceLabel('Security247') }}</span>
          </div>
          <div
            v-if="hasService('WasteDisposal')"
            class="flex items-center gap-2 text-sm text-gray-600"
          >
            <FontAwesomeIcon :icon="faTrash" class="text-gray-600" />
            <span>{{ getServiceLabel('WasteDisposal') }}</span>
          </div>
          <div class="flex items-center gap-2 text-sm text-gray-600">
            <i class="pi pi-bolt text-principal-blue"></i>
            <span
              ><strong>{{ $t('portCard.power') }}:</strong> {{ electricPower }}A</span
            >
          </div>
          <div
            v-if="hasService('ShowersAndLockers')"
            class="flex items-center gap-2 text-sm text-gray-600"
          >
            <FontAwesomeIcon :icon="faShower" />
            <span>{{ getServiceLabel('ShowersAndLockers') }}</span>
          </div>
          <div class="flex items-center gap-2 text-sm">
            <FontAwesomeIcon :icon="faFaucet" size="xl" />
            <span :class="waterAvailable ? 'text-gray-600' : 'text-gray-400'"
              ><strong>{{ $t('portCard.water') }}</strong></span
            >
          </div>
          <div v-if="hasService('Parking')" class="flex items-center gap-2 text-sm text-gray-600">
            <FontAwesomeIcon :icon="faParking" class="text-slate-700" />
            <span>{{ getServiceLabel('Parking') }}</span>
          </div>
          <div class="flex items-center gap-2 text-sm col-span-2">
            <FontAwesomeIcon :icon="faTrashCan" />
            <span :class="wasteCollection ? 'text-gray-600' : 'text-gray-400'"
              ><strong>{{ $t('portCard.wasteCollection') }}</strong></span
            >
          </div>
        </div>
      </div>

      <div class="flex flex-col items-end justify-center ml-6 pl-6 border-l border-gray-200">
        <div class="text-right mb-3">
          <p class="text-sm text-gray-600 mb-1">Precio total</p>
          <p class="text-3xl font-bold text-gray-900">{{ Math.round(price).toFixed(2) }}€</p>
        </div>
        <button
          class="bg-principal-blue hover:bg-[#2929d4] text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2"
        >
          <i class="pi pi-calendar"></i>
          <span>{{ $t('portCard.bookButton') }}</span>
        </button>
      </div>
    </div>
  </div>

      </div>
    </div>
  </div>
</template>

<style scoped></style>
