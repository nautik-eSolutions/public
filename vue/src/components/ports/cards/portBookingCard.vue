<script>
export default {
  name: 'PortBookingCard',
}
</script>
<script setup>
defineProps({
  fromPrice: Number,
})
</script>
<template>
  <div
    class="bg-principal-blue rounded-3xl text-white w-[45%] h-60 text-center justify-center content-center align-middle justify-items-center shadow-sm shadow-gray-400"
  >
    <div class="w-[80%] justify-center content-center align-middle">
      <h2 class="text-xl">Desde</h2>
      <h3 class="text-4xl">{{ fromPrice }}€/noche</h3>
      <p class="text-xs">Precios ajustados al dia de 22/08</p>
      <button class="bg-white text-principal-blue rounded-xl mt-4 h-8 w-[40%]">Reserva</button>
    </div>
  </div>
</template>

<style scoped></style>
