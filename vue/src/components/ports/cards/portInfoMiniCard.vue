<script>
export default {
  name: 'PortInfoMiniCard',
}
</script>
<script setup>
defineProps({
  informationName: String,
  informationNumber: Number,
})
</script>
<template>
  <div class="rounded-xl shadow-sm shadow-gray-400 w-40 h-20 flex flex-col justify-center content-center align-middle">
    <div class="w-auto">
      <p class="text-xl text-center">{{ informationNumber }}</p>
    </div>
    <div>
      <p class="text-s text-center ">{{ informationName }}</p>
    </div>
  </div>
</template>

<style scoped></style>
