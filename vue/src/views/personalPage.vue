<script>
export default {
  name: 'PersonalPage',
}
</script>

<script setup>
import LateralBar from "@/components/user/lateralBar.vue";
import Header from "@/components/general/header.vue";
import Footer from "@/components/general/footer.vue";
import BoatInfo from "@/components/boat/boatInfo.vue";
import HeaderBoat from "@/components/boat/headerBoats.vue";
</script>

<template>
  <Header/>
  <section class="min-h-screen py-8">
    <div class="max-w-7xl mx-auto px-8">
      <div class="flex gap-6">
        <div class="w-56 flex-shrink-0">
          <lateral-bar user-name="Pedro"/>
        </div>

        <div class="bg-white rounded-xl border border-gray-200 shadow-sm p-4 w-full">
          <header-boat/>

        <div class="flex-1">
          <boat-info
              name="F30RD"
              registerNumber="7-PM-1-293-23"
              length="15.32"
              bream="4.54"
              draft="0.96"
          />

          <div v-for="boat in boats" :key="boat.id" class="mt-4">
            <boat-info
                :name="boat.name"
                :registerNumber="boat.registerNumber"
                :length="boat.length"
                :bream="boat.bream"
                :draft="boat.draft"
            />
          </div>
        </div>
        </div>
      </div>
    </div>
  </section>
  <Footer/>
</template>