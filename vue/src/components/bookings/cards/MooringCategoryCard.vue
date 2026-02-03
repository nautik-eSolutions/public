<script>
export default {
  name: 'MooringCategoryCard',
}
</script>
<script setup>
defineProps({
  zoneName: '',
  zoneDescription: '',
  price: ''

})
</script>
<template>
  <div class="flex flex-row bg-gray-100 w-[100%] rounded-2xl shadow">

    <div class="p-5 flex flex-col justify-around gap-2">
      <h2 class="text-3xl">{{ zoneName }}</h2>
      <h1 class="text-xl">{{zoneDescription}}</h1>
      <h2 class="text-3xl">{{ price }} €</h2>
      <button class="bg-secondary-blue text-white h-8 rounded shadow">Reservar</button>
    </div>
  </div>
</template>

<style scoped></style>
