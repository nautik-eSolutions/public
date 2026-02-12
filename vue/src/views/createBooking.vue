<script setup>
import Header from '@/components/general/header.vue'
import Footer from '@/components/general/footer.vue'
import InputText from '@/volt/InputText.vue'
import Splitter from '@/volt/Splitter.vue'
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
          <div class="border border-gray-300 rounded-lg shadow-lg w-3/5">
            <div class="py-2 px-4">
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
          </div>
          <div class="border border-gray-300 rounded-lg shadow-lg w-2/5">
            <div class="p-4 flex flex-col gap-2">
              <h1 class="text-2xl text-center">Real club náutico de palma</h1>
              <Splitter />
              <div class="flex flex-col p-2">
                <h1 class="text-lg">Zona</h1>
                <h1 class="text-lg">Dimensiones</h1>
                <h1 class="text-lg">Llegada</h1>
                <h1 class="text-lg">Salida</h1>
                <h1 class="text-lg">Embarcación</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <Footer />
</template>

<style scoped></style>
