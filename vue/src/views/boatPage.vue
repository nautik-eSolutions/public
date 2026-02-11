<script setup>
import Header from '@/components/general/header.vue'
import Footer from '@/components/general/footer.vue'
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import { useBoatStore } from '@/stores/boatStore.js'

const boatStore = useBoatStore();
const boatId = useRoute().params.id;
const boat = ref();

onMounted(async ()=>{
  boat.value = boatStore.getBoat(boatId)
  console.log(boat.value)
})

</script>

<template>
  <Header />
  <section class="min-h-screen py-8">
    <div class="max-w-7xl mx-auto px-8">
      <div class="flex flex-col gap-6">
        <h1 id="logos" class="font-bold text-3xl">BARCOS</h1>
        <div class="bg-white rounded-xl border border-gray-200 shadow-sm p-4 h-2/5 w-full shrink-0">
          <div class="bg-principal-blue text-xl">
            {{boat.name}}
          </div>
        </div>
      </div>
    </div>
  </section>

  <Footer />
</template>

<style scoped></style>
