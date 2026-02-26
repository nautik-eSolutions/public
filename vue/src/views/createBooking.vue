<script setup>
import Header from '@/components/general/header.vue'
import Footer from '@/components/general/footer.vue'
import InputText from '@/volt/InputText.vue'
import Splitter from '@/volt/Splitter.vue'
import { onMounted, ref } from 'vue'
import { usePortStore } from '@/stores/portStore.js'
import { useBookingStore } from '@/stores/bookingStore.js'
import { useRoute } from 'vue-router'
import { useBoatsStore } from '@/stores/boatsStore.js'
import { useBoatStore } from '@/stores/boatStore.js'

const bookingStore = useBookingStore()
const boatStore = useBoatStore()
const mooringCategory = ref()
const mounted = ref(false)
const boat = ref();

const params = useRoute().params

onMounted(async () => {
  mooringCategory.value = await bookingStore.getMooringCategory(
    params.mooringCategoryId,
    params.startDate,
    params.endDate,
  )
  boat.value = await boatStore.getBoat(params.boatId)
  mounted.value = true
})

/*

function handleSubmit(){
  console.log("---",boat.value)
  console.log("----",mooringCategory.value)
  bookingStore.createBooking(mooringCategory.value.id, mooringCategory.value.startDate, mooringCategory.value.endDate, boat.value.id)
}

 */

async function handleSubmit() {
  try {
    const paymentData = await bookingStore.initPayment(
        mooringCategory.value.id,
        mooringCategory.value.startDate,
        mooringCategory.value.endDate,
        boat.value.id
    )
    const form = document.createElement('form')
    form.method = 'POST'
    form.action = paymentData.url
    form.target = '_self'

    const addField = (name, value) => {
      const input = document.createElement('input')
      input.type = 'hidden'
      input.name = name
      input.value = value
      form.appendChild(input)
    }
    addField('Ds_SignatureVersion', paymentData.dsSignatureVersion)
    addField('Ds_MerchantParameters', paymentData.dsMerchantParameters)
    addField('Ds_Signature', paymentData.dsSignature)

    document.body.appendChild(form)
    form.submit()
  } catch (error) {
    console.log('Error:', error)
  }
}




</script>

<template>
  <Header />

  <section class="min-h-screen py-8">
    <div class="max-w-7xl mx-auto px-8">
      <div class="flex flex-col gap-6">
        <template v-if="mounted">
          <div class="bg-principal-blue text-white rounded-md shadow-md">
            <p class="py-2 px-4 text-3xl">Completar reserva</p>
          </div>
          <div class="w-full flex gap-2 rounded-md">
            <div class="border border-gray-300 py-5 px-3 rounded-lg shadow-lg w-3/5">
              <div class="py- px-4">
                <h1 class="text-xl">Dirección de facturación</h1>
              </div>
              <div class="p-4 flex flex-col gap-6">
                <div class="flex flex-col">
                  <label for="address">Domicilio</label>
                  <InputText id="address" />
                </div>
                <div class="flex gap-2 justify-between">
                  <div class="flex flex-col">
                    <label for="city">Ciudad</label>
                    <InputText id="city" />
                  </div>
                  <div class="flex flex-col">
                    <label for="country">País</label>
                    <InputText id="country" />
                  </div>
                </div>
              </div>
              <div class="py-2 px-4">
                <h1 class="text-xl">Información de contacto</h1>
                <div class="flex flex-col">
                  <label for="email">Correo electrónico</label>
                  <InputText id="email" />
                </div>
                <div class="flex flex-col w-1/2">
                  <label for="email">Telefóno</label>
                  <InputText id="email" />
                </div>
              </div>
            </div>
            <div class="border border-gray-300 rounded-lg shadow-lg w-2/5">
              <div class="p-4 flex flex-col gap-2">
                <h1 class="text-2xl text-center">{{ mooringCategory.portName }}</h1>
                <Splitter />
                <div class="flex justify-between p-2">
                  <div class="flex flex-col text-sm">
                    <h1 class="">Zona</h1>
                    <h1 class="">Dimensiones</h1>
                    <h1 class="">Llegada</h1>
                    <h1 class="">Salida</h1>
                    <h1 class="">Embarcación</h1>
                  </div>
                  <div class="flex flex-col text-sm text-right">
                    <h1 class="">{{ mooringCategory.zoneName }}</h1>
                    <h1 class="">
                      {{ mooringCategory.maxLength }}m x {{ mooringCategory.maxBeam }}m x 2m
                    </h1>
                    <h1 class="">{{ mooringCategory.startDate }}</h1>
                    <h1 class="">{{ mooringCategory.endDate }}</h1>
                    <h1 class="">{{boat.name}}</h1>
                  </div>
                </div>
                <Splitter />
                <div class="flex justify-between p-2">
                  <div class="flex flex-col text-sm">
                    <h1 class="">Precio amarre</h1>
                    <h1 class="">I.V.A</h1>
                    <h1 class="">Total</h1>
                  </div>
                  <div class="flex flex-col text-sm text-right">
                    <h1 class="">{{ Math.round(mooringCategory.basePrice).toFixed(2) }} €</h1>
                    <h1 class="">{{Math.round( mooringCategory.tax ).toFixed(2)}} €</h1>
                    <h1 class="">{{Math.round(mooringCategory.totalPrice).toFixed(2) }} €</h1>
                  </div>
                </div>
                <button @click="handleSubmit" class=" bg-principal-blue text-white rounded-md shadow-lg p-2 text-center">
                  Proceder al pago
                </button>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </section>

  <Footer />
</template>

<style scoped></style>
