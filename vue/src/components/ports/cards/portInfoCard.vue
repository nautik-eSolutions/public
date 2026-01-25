<script>
export default {
  name: 'PortInfoCard',
}
</script>
<script setup>
defineProps({
  title: String,
  services: Array,
})
</script>

<template>
  <div
    class="w-[45%] h-60  text-center justify-center content-center align-middle justify-items-center shadow-sm shadow-gray-400 rounded-4xl"
  >
    <div class="w-[80%] justify-center content-center align-middle">
      <h2 class="text-2xl">{{ title }}</h2>
      <div v-for="service in services">
        <p>{{ service }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
