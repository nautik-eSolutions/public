<script>
export default {
  name: 'PortInfoCard',
}
</script>
<script setup>
defineProps(
  {
    title:String,
    services:Array
  }
)
</script>

<template>
  <div class="w-60 rounded-md">
    <h2 class="text-2xl">{{title}}</h2>
    <div v-for="service in services">
      <p>{{service.name}}</p>
    </div>
  </div>

</template>

<style scoped></style>
