<script>


  export default {
    name:'addBoat'
  }

</script>

<script setup>

import AddBoatForm from "@/components/boat/addBoatForm.vue";
import Header from "@/components/general/header.vue";
import Footer from "@/components/general/footer.vue";
function handleSubmit(formData){

}

</script>

<template>
  <Header/>
  <AddBoatForm v-on:submit="handleSubmit"/>
  <Footer/>
</template>

<style scoped>

</style>