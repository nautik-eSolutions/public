<script>
export default {
  name: 'PortCardBooking',
}
</script>
<script setup>
defineProps({
  portName: String,
  startingNightPrice: Number,
  totalPrice: Number,
  imgSrc: String,
})
</script>
<template>
  <div class="flex flex-row bg-gray-100 w-[100%] rounded-2xl shadow">
    <div class="w-[50%] p-5">
      <img class="w-full object-contain rounded" :src="imgSrc" />
    </div>
    <div class="p-5 flex flex-col justify-around gap-2">
      <h2 class="text-3xl ">{{ portName }}</h2>
      <h2 class="text-3xl ">{{ totalPrice }} €</h2>
      <h3>{{ startingNightPrice }} € /noche</h3>

      <button class="bg-[#1F3550] text-white h-8 rounded shadow">Reservar</button>
    </div>
  </div>
</template>

<style scoped></style>
