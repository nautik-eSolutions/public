<script>


  export default {
    name:'addBoat'
  }

</script>

<script setup>

import AddBoatForm from "@/components/boat/addBoatForm.vue";
import Header from "@/components/general/header.vue";
import Footer from "@/components/general/footer.vue";
import { useBoatStore } from '@/stores/boatStore.js'
import router from '@/router/index.js'

const boatStore = useBoatStore();

function handleSubmit(form){
  console.log(form.name.$value);
  boatStore.saveBoat(
   form.name.$value,
    form.registryNumber.$value,
    form.length.$value,
    form.beam.$value,
    form.draft.$value,
    form.boatType.$value

  );
  router.push("/boats")

}

</script>

<template>
  <Header/>
  <AddBoatForm v-on:submit="handleSubmit"/>
  <Footer/>
</template>

<style scoped>

</style>