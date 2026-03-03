<script setup>
import Header from '@/components/general/header.vue'
import Footer from '@/components/general/footer.vue'
import InputText from '@/volt/InputText.vue'
import Splitter from '@/volt/Splitter.vue'
import { onMounted, ref, shallowRef } from 'vue'
import { useRoute } from 'vue-router'
import { useBookingStore } from '@/stores/bookingStore.js'
import { useBoatStore } from '@/stores/boatStore.js'
import { defineForm, field, isValidForm } from 'vue-yup-form'
import * as yup from 'yup'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faPlug,
  faDroplet,
  faWifi,
  faShield,
  faTrash,
  faShower,
  faParking,
  faExclamationCircle,
} from '@fortawesome/free-solid-svg-icons'

const bookingStore = useBookingStore()
const boatStore = useBoatStore()
const mooringCategory = ref()
const mounted = ref(false)
const boat = ref()
const params = useRoute().params
const isSubmitting = ref(false)
const submitted = ref(false)

// Generate form with vue-yup-form
const generateForm = () => {
  return defineForm({
    address: field(
      '',
      yup
        .string()
        .required('El domicilio es obligatorio')
        .min(5, 'El domicilio debe tener al menos 5 caracteres'),
    ),
    city: field(
      '',
      yup
        .string()
        .required('La ciudad es obligatoria')
        .min(2, 'La ciudad debe tener al menos 2 caracteres'),
    ),
    country: field(
      '',
      yup
        .string()
        .required('El país es obligatorio')
        .min(2, 'El país debe tener al menos 2 caracteres'),
    ),
    email: field(
      '',
      yup
        .string()
        .required('El correo electrónico es obligatorio')
        .email('El correo electrónico no es válido'),
    ),
    phone: field(
      '',
      yup
        .string()
        .required('El teléfono es obligatorio')
        .matches(/^\+?[\d\s\-()]{9,}$/, 'El teléfono no es válido'),
    ),
  })
}

const form = shallowRef(generateForm())

onMounted(async () => {
  mooringCategory.value = await bookingStore.getMooringCategory(
    params.mooringCategoryId,
    params.startDate,
    params.endDate,
  )
  boat.value = await boatStore.getBoat(params.boatId)
  mounted.value = true
})

const handleSubmit = async () => {
  submitted.value = true

  if (!isValidForm(form.value)) {
    return
  }

  isSubmitting.value = true

  try {
    const paymentData = await bookingStore.initPayment(
      mooringCategory.value.id,
      mooringCategory.value.startDate,
      mooringCategory.value.endDate,
      boat.value.id,
    )

    const paymentForm = document.createElement('form')
    paymentForm.method = 'POST'
    paymentForm.action = paymentData.url
    paymentForm.target = '_self'

    const addField = (name, value) => {
      const input = document.createElement('input')
      input.type = 'hidden'
      input.name = name
      input.value = value
      paymentForm.appendChild(input)
    }

    addField('Ds_SignatureVersion', paymentData.dsSignatureVersion)
    addField('Ds_MerchantParameters', paymentData.dsMerchantParameters)
    addField('Ds_Signature', paymentData.dsSignature)

    document.body.appendChild(paymentForm)
    paymentForm.submit()
  } catch (error) {
    console.error('Error:', error)
    alert('Ha ocurrido un error al procesar el pago. Por favor, inténtelo de nuevo.')
  } finally {
    isSubmitting.value = false
  }
}

function hasService(serviceName) {
  return mooringCategory.value?.services?.some((service) => service.name === serviceName)
}

function formatDate(dateString) {
  if (!dateString) return '-'
  const parts = dateString.split('-')
  if (parts.length === 3) {
    const day = parts[0]
    const month = parts[1] - 1
    const year = parts[2]
    const date = new Date(year, month, day)
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })
  }
  return dateString
}
</script>

<template>
  <Header />

  <section class="min-h-screen py-8 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <template v-if="mounted">
        <div class="bg-principal-blue text-white rounded-xl shadow-md mb-6">
          <h1 class="py-4 px-6 text-2xl md:text-3xl font-bold">Completar reserva</h1>
        </div>

        <div class="bg-white rounded-xl shadow-md p-6 mb-6">
          <div class="mb-4">
            <h2 class="text-2xl font-bold text-gray-900 mb-2">{{ mooringCategory.portName }}</h2>
            <p class="text-gray-600 text-sm" v-if="mooringCategory.zoneDescription">
              {{ mooringCategory.zoneDescription }}
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div class="flex items-start gap-3">
              <div>
                <div class="text-xs text-gray-500 uppercase tracking-wide">Zona</div>
                <div class="font-semibold text-gray-900">{{ mooringCategory.zoneName }}</div>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <div>
                <div class="text-xs text-gray-500 uppercase tracking-wide">Embarcación</div>
                <div class="font-semibold text-gray-900">{{ boat.name }}</div>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <div>
                <div class="text-xs text-gray-500 uppercase tracking-wide">Estancia</div>
                <div class="font-semibold text-gray-900 text-sm">
                  {{ formatDate(mooringCategory.startDate) }} -
                  {{ formatDate(mooringCategory.endDate) }}
                </div>
              </div>
            </div>
          </div>

          <div v-if="mooringCategory.services && mooringCategory.services.length > 0">
            <h3 class="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
              Servicios incluidos
            </h3>
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              <div
                v-if="hasService('Electricity16A')"
                class="flex items-center gap-2 text-sm text-gray-600"
              >
                <FontAwesomeIcon :icon="faPlug" class="text-gray-600" size="sm" />
                <span>Electricidad 16A</span>
              </div>
              <div
                v-if="hasService('Electricity32A')"
                class="flex items-center gap-2 text-sm text-gray-600"
              >
                <FontAwesomeIcon :icon="faPlug" class="text-gray-600" size="sm" />
                <span>Electricidad 32A</span>
              </div>
              <div
                v-if="hasService('Electricity63A')"
                class="flex items-center gap-2 text-sm text-gray-600"
              >
                <FontAwesomeIcon :icon="faPlug" class="text-gray-600" size="sm" />
                <span>Electricidad 63A</span>
              </div>
              <div
                v-if="hasService('FreshWater')"
                class="flex items-center gap-2 text-sm text-gray-600"
              >
                <FontAwesomeIcon :icon="faDroplet" class="text-gray-600" size="sm" />
                <span>Agua Dulce</span>
              </div>
              <div
                v-if="hasService('WiFiPremium')"
                class="flex items-center gap-2 text-sm text-gray-600"
              >
                <FontAwesomeIcon :icon="faWifi" class="text-gray-600" size="sm" />
                <span>WiFi Premium</span>
              </div>
              <div
                v-if="hasService('Security247')"
                class="flex items-center gap-2 text-sm text-gray-600"
              >
                <FontAwesomeIcon :icon="faShield" class="text-gray-600" size="sm" />
                <span>Seguridad 24/7</span>
              </div>
              <div
                v-if="hasService('WasteDisposal')"
                class="flex items-center gap-2 text-sm text-gray-600"
              >
                <FontAwesomeIcon :icon="faTrash" class="text-gray-600" size="sm" />
                <span>Gestión Residuos</span>
              </div>
              <div
                v-if="hasService('ShowersAndLockers')"
                class="flex items-center gap-2 text-sm text-gray-600"
              >
                <FontAwesomeIcon :icon="faShower" class="text-gray-600" size="sm" />
                <span>Duchas y Taquillas</span>
              </div>
              <div
                v-if="hasService('Parking')"
                class="flex items-center gap-2 text-sm text-gray-600"
              >
                <FontAwesomeIcon :icon="faParking" class="text-gray-700" size="sm" />
                <span>Aparcamiento</span>
              </div>
            </div>
          </div>
        </div>

        <form @submit.prevent="handleSubmit">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div class="lg:col-span-2">
              <div class="bg-white border border-gray-200 rounded-xl shadow-md p-6">
                <div class="mb-6">
                  <h2 class="text-xl font-bold text-gray-900 mb-4">Dirección de facturación</h2>

                  <div class="mb-4">
                    <label for="address" class="block text-sm font-medium text-gray-700 mb-1">
                      Domicilio <span class="text-red-500">*</span>
                    </label>
                    <InputText
                      id="address"
                      v-model="form.address.$value"
                      :class="[
                        'border border-gray-300 rounded-lg w-full',
                        { 'border-red-500': submitted && form.address.$error },
                      ]"
                      placeholder="Calle, número, piso, puerta..."
                    />
                    <span v-if="submitted && form.address.$error" class="text-red-500 text-xs mt-1">
                      {{ form.address.$error.message }}
                    </span>
                  </div>

                  <div class="flex flex-col sm:flex-row gap-4">
                    <div class="flex-1">
                      <label for="city" class="block text-sm font-medium text-gray-700 mb-1">
                        Ciudad <span class="text-red-500">*</span>
                      </label>
                      <InputText
                        id="city"
                        v-model="form.city.$value"
                        :class="[
                          'border border-gray-300 rounded-lg w-full',
                          { 'border-red-500': submitted && form.city.$error },
                        ]"
                        placeholder="Madrid"
                      />
                      <span v-if="submitted && form.city.$error" class="text-red-500 text-xs mt-1">
                        {{ form.city.$error.message }}
                      </span>
                    </div>

                    <div class="flex-1">
                      <label for="country" class="block text-sm font-medium text-gray-700 mb-1">
                        País <span class="text-red-500">*</span>
                      </label>
                      <InputText
                        id="country"
                        v-model="form.country.$value"
                        :class="[
                          'border border-gray-300 rounded-lg w-full',
                          { 'border-red-500': submitted && form.country.$error },
                        ]"
                        placeholder="España"
                      />
                      <span
                        v-if="submitted && form.country.$error"
                        class="text-red-500 text-xs mt-1"
                      >
                        {{ form.country.$error.message }}
                      </span>
                    </div>
                  </div>
                </div>

                <Splitter class="my-6" />

                <div>
                  <h2 class="text-xl font-bold text-gray-900 mb-4">Información de contacto</h2>

                  <div class="mb-4">
                    <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
                      Correo electrónico <span class="text-red-500">*</span>
                    </label>
                    <InputText
                      id="email"
                      type="email"
                      v-model="form.email.$value"
                      :class="[
                        'border border-gray-300 rounded-lg w-full',
                        { 'border-red-500': submitted && form.email.$error },
                      ]"
                      placeholder="tucorreo@ejemplo.com"
                    />
                    <span v-if="submitted && form.email.$error" class="text-red-500 text-xs mt-1">
                      {{ form.email.$error.message }}
                    </span>
                  </div>

                  <div>
                    <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">
                      Teléfono <span class="text-red-500">*</span>
                    </label>
                    <InputText
                      id="phone"
                      type="tel"
                      v-model="form.phone.$value"
                      :class="[
                        'border border-gray-300 rounded-lg w-full',
                        { 'border-red-500': submitted && form.phone.$error },
                      ]"
                      placeholder="+34 600 000 000"
                    />
                    <span v-if="submitted && form.phone.$error" class="text-red-500 text-xs mt-1">
                      {{ form.phone.$error.message }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div class="lg:col-span-1">
              <div
                class="bg-white border border-gray-200 rounded-xl shadow-md p-6 lg:sticky lg:top-4"
              >
                <h2 class="text-xl font-bold text-gray-900 mb-4">Resumen del precio</h2>

                <div class="space-y-3 mb-4">
                  <div class="flex justify-between text-sm">
                    <span class="text-gray-600">Precio base</span>
                    <span class="font-medium text-gray-900">
                      {{ Math.round(mooringCategory.basePrice).toFixed(2) }}€
                    </span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span class="text-gray-600">I.V.A. (21%)</span>
                    <span class="font-medium text-gray-900">
                      {{ Math.round(mooringCategory.tax).toFixed(2) }}€
                    </span>
                  </div>
                </div>

                <Splitter class="my-4" />

                <div class="flex justify-between items-center mb-6">
                  <span class="text-lg font-bold text-gray-900">Total</span>
                  <span class="text-2xl font-bold text-principal-blue">
                    {{ Math.round(mooringCategory.totalPrice).toFixed(2) }}€
                  </span>
                </div>

                <button
                  type="submit"
                  :disabled="isSubmitting"
                  class="w-full bg-principal-blue text-white rounded-lg shadow-lg p-3 text-center font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span v-if="!isSubmitting">Proceder al pago</span>
                  <span v-else>Procesando...</span>
                </button>

                <div class="mt-6 pt-6 border-t border-gray-200">
                  <div class="flex items-start gap-2 text-xs text-gray-500">
                    <FontAwesomeIcon
                      :icon="faExclamationCircle"
                      class="text-gray-400 mt-0.5 flex-shrink-0"
                      size="sm"
                    />
                    <p class="leading-relaxed">
                      Al completar esta reserva, aceptas nuestras condiciones de uso y política de
                      privacidad. El usuario es responsable de verificar las condiciones del puerto
                      y la disponibilidad del amarre. No nos hacemos responsables de cambios en las
                      condiciones climáticas, del puerto o de cualquier circunstancia que impida el
                      uso del amarre reservado. La cancelación de la reserva está sujeta a las
                      políticas de cancelación del puerto.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </template>
    </div>
  </section>

  <Footer />
</template>

<style scoped>
.space-y-3 > * + * {
  margin-top: 0.75rem;
}

/* Placeholders más claros */
:deep(input::placeholder) {
  color: #d1d5db; /* gray-300 */
  opacity: 1;
}

:deep(input::-webkit-input-placeholder) {
  color: #d1d5db;
}

:deep(input::-moz-placeholder) {
  color: #d1d5db;
  opacity: 1;
}

:deep(input:-ms-input-placeholder) {
  color: #d1d5db;
}

/* Asegurar que los inputs tengan borde gris claro por defecto */
:deep(input) {
  border: 1px solid #d1d5db; /* gray-300 */
  border-radius: 0.375rem; /* rounded-lg equivalente */
  padding: 0.5rem 0.75rem;
  outline: none;
  transition: border-color 0.2s;
}

:deep(input:focus) {
  ring: 2px solid #bfdbfe;
}

:deep(input.border-red-500) {
  border-color: #ef4444;
}
</style>