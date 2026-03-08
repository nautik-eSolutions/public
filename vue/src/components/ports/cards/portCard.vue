<!-- components/ports/cards/portCard.vue -->
<script>
export default {
  name: 'portCard',
  props: {
    id: [String, Number],
    portName: String,
    imgSrc: String,
  },
}
</script>

<template>
  <router-link
    :to="'/port/' + id"
    class="group relative block w-full h-64 rounded-2xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl"
  >
    <img :src="imgSrc" :alt="portName" class="absolute inset-0 w-full h-full object-cover shadow-lg" />

    <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

    <div class="absolute bottom-0 left-0 right-0 p-4 text-white">
      <h3 class="text-2xl font-bold drop-shadow-lg [text-shadow:1px_1px_2px_rgba(0,0,0,0.8)]">
        {{ portName }}
      </h3>
    </div>

    <div
      class="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300"
    ></div>
  </router-link>
</template>

<style scoped>

</style>
