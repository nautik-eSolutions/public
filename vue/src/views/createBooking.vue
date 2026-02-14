<script setup>
import Header from '@/components/general/header.vue'
import Footer from '@/components/general/footer.vue'
import InputText from '@/volt/InputText.vue'
import Splitter from '@/volt/Splitter.vue'
import { onMounted, ref } from 'vue'
import { usePortStore } from '@/stores/portStore.js'

const port =  ref();
const portStore = usePortStore()

onMounted(async()=>{
  port.value = await portStore.getPort(1)

});


</script>

<template>
  <Header />

  <section class="min-h-screen py-8">
    <div class="max-w-7xl mx-auto px-8">
      <div class="flex flex-col gap-6">
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
              <h1 class="text-2xl text-center">Real club náutico de palma</h1>
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
                  <h1 class="">Lujo relajado</h1>
                  <h1 class="">12m x 6m x 2m</h1>
                  <h1 class="">12/06/2026</h1>
                  <h1 class="">14/06/2026</h1>
                  <h1 class="">Sotavent</h1>
                </div>
              </div>
              <Splitter />
              <div class="flex justify-between p-2">
                <div class="flex flex-col text-sm">
                  <h1 class="">Precio amarre</h1>
                  <h1 class="">Servicios</h1>
                  <h1 class="">Comisión de reserva</h1>
                  <h1 class="">I.V.A</h1>
                  <h1 class="">Total</h1>
                </div>
                <div class="flex flex-col text-sm text-right">
                  <h1 class="">425,00 €</h1>
                  <h1 class="">45,00 €</h1>
                  <h1 class="">10,00 €</h1>
                  <h1 class="">100,80 €</h1>
                  <h1 class="">580,80 €</h1>
                </div>
              </div>
              <button class="bg-principal-blue text-white rounded-md shadow-lg p-2 text-center">
                Proceder al pago
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <Footer />
</template>

<style scoped></style>
