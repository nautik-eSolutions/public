<script>
export default {
  name: 'portCard',
  props: {
    portName:String,
    imgSrc:String
  },
}
</script>

<template>
  <div
    class="group relative rounded-2xl overflow-hidden border-8 border-[#0f172a] shadow-lg"
  >
    <img
      :src="imgSrc"
      :alt="portName"
      class="w-full object-cover rounded-l h-64"
    />
    <div class="bg-[#0f172a] p-3 absolute bottom-0 w-full">
      <h3 class="text-white text-xl">{{ portName }}</h3>
    </div>
  </div>
</template>

<style scoped></style>
