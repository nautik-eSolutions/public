<script>
export default {
  name: 'editBoat',
}
</script>

<script setup>
import Header from '@/components/general/header.vue'
import Footer from '@/components/general/footer.vue'
import { useBoatStore } from '@/stores/boatStore.js'
import router from '@/router/index.js'
import EditBoatForm from '@/components/boat/editBoatForm.vue'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { Boat } from '@/model/Boat.js'

const params = useRoute().params
const boatStore = useBoatStore()
const mounted = ref(false);
const boat = ref(Boat)

onMounted(async () => {
  boat.value = await boatStore.getBoat(params.id);
  mounted.value = true;
})

function handleSubmit(form) {
  boatStore.editBoat(
    boat.value.id,
    form.name.$value,
    form.registryNumber.$value,
    form.length.$value,
    form.beam.$value,
    form.draft.$value,
  )
  router.push('/boats')
}
</script>

<template>
  <Header />
  <template v-if="mounted">
    <EditBoatForm :Boat="boat" v-on:submit="handleSubmit" />
  </template>
  <Footer />
</template>

<style scoped></style>
