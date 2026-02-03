<script>
export default {
  name: 'PortProfileHero',
}
</script>
<script setup>
defineProps({
  portName:String,
  images:Array,
  mooringsNumber:Number,
  length:Number,
  draft:Number,
  chanel:Number,
  servicesOffered:Array,
  nearbyCommerce:Array,
  weatherInformation:Array
})
</script>
<template>
  <section class="max-w-6xl mx-auto px-4 mb-12">
    <div class="bg-[#0f172a] rounded-2xl p-8 md:p-12 shadow-xl">
      <h1 class="text-white text-3xl md:text-4xl mb-8">
      {{portName}}
      </h1>
    </div>
  </section>
</template>

<style scoped></style>
