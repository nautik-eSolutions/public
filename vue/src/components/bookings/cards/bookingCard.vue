<script setup>
import Splitter from '@/volt/Splitter.vue'

const props = defineProps({
  PortName: '',
  StartDate: '',
  EndDate: '',
  TotalPrice: '',
})
</script>

<template>
  <section class="flex mt-4 gap-1 border border-principal-blue text-principal-blue py-2 px-3">
    <div class="flex flex-col justify-center w-3/10 text-center">
      <p class="text-xs">{{ $t('reservations.confirmation.port') }}</p>
      <p class="text-lg">{{ PortName }}</p>
    </div>
    <Splitter />
    <div class="flex flex-col justify-center w-3/12 text-center">
      <p class="text-xs">{{ $t('reservations.confirmation.arrival') }}</p>
      <p class="text-lg">{{ StartDate }}</p>
    </div>
    <Splitter />
    <div class="flex flex-col justify-center w-3/12 text-center">
      <p class="text-xs">{{ $t('reservations.confirmation.departure') }}</p>
      <p class="text-lg">{{ EndDate }}</p>
    </div>
    <Splitter />
    <div class="flex flex-col justify-center w-3/12 text-center">
      <p class="text-xs">{{ $t('reservations.confirmation.totalPrice') }}</p>
      <p class="text-lg">{{ TotalPrice }} €</p>
    </div>
  </section>
</template>

<style scoped></style>
