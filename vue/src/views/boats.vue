<script>

export default {
  name: 'PersonalPage',
}
</script>

<script setup>
import Header from '@/components/general/header.vue'
import Footer from '@/components/general/footer.vue'
import BoatInfo from '@/components/boat/boatInfo.vue'
import HeaderBoat from '@/components/boat/headerBoats.vue'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { onMounted, ref } from 'vue'
import { useBoatsStore } from '@/stores/boatsStore.js'


const boatsStore = useBoatsStore();
const boats = ref()

onMounted(async ()=>{
  boats.value = await boatsStore.getBoats()
  console.log(boats.value)
})
</script>

<template>
  <Header />
  <section class="min-h-screen py-8">
    <div class="max-w-7xl mx-auto px-8">
      <div class="flex flex-col gap-6">
        <h1 id="logos" class="font-bold text-3xl ">BARCOS</h1>
        <div class="bg-white rounded-xl border border-gray-200 shadow-sm p-4 h-2/5 w-full shrink-0">
          <header-boat />

          <div class="flex-1 h-full">
            <div v-for="boat in boats" class="mt-4">
              <boat-info
                :name="boat.name"
                :registerNumber="boat.registerNumber"
                :length="boat.length"
                :bream="boat.beam"
                :draft="boat.draft"
                :boatId="boat.id"
              />
            </div>
          </div>
        </div>
        <div class="flex flex-row-reverse">
          <RouterLink to="/boats/add">
            <div class="text-white bg-principal-blue flex items-center rounded-lg gap-2 p-2">
              <FontAwesomeIcon :icon="faPlusCircle" size="lg" />
              <span class="text-md font-medium">Añadir barco</span>
            </div>
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
  <Footer />
</template>
