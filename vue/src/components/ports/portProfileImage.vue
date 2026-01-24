<script>
export default {
  name: 'PortProfileImage',
}
</script>
<script setup>
defineProps({
  imageSrc: String,
})
</script>
<template>
  <div>
    <img :src="imageSrc" class="w-50 object-cover shadow-xl rounded-lg h-64 m-2 " />
  </div>
</template>

<style scoped></style>
