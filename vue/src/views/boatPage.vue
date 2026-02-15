<script setup>
import Header from '@/components/general/header.vue'
import Footer from '@/components/general/footer.vue'
import Button from '@/volt/Button.vue'
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import { useBoatStore } from '@/stores/boatStore.js'
import router from '@/router/index.js'

const boatStore = useBoatStore()
const boat = ref()
const mounted = ref(false)

onMounted(async () => {
  const boatId = useRoute().params.id
  boat.value = await boatStore.getBoat(boatId)
  console.log(boat)
  mounted.value = true
})

function handleClick() {
  router.push('/boats/edit/' + boat.value.id)
}
</script>

<template>
  <Header />
  <section class="min-h-screen py-8">
    <div class="max-w-7xl mx-auto px-8">
      <div class="flex flex-col gap-6">
        <template v-if="mounted">
          <h1 id="logos" class="font-bold text-3xl">{{ boat.name }}</h1>
          <div
            class="bg-white rounded-xl border border-gray-200 shadow-sm p-4 h-2/5 w-full shrink-0"
          >
            <div class="flex justify-between gap-2 w-full">
              <div
                class="flex p-2 gap-2 text-lg border border-gray-300 shadow-sm rounded-md w-7/8"
              >
                <div class="w-1/3 p-2 text-white bg-principal-blue rounded-lg">
                  <p class="text-xl text-center">Eslora : {{ boat.length }} m</p>
                </div>
                <div class="w-1/3 p-2 text-white bg-principal-blue rounded-lg">
                  <p class="text-xl text-center">Manga : {{ boat.beam }} m</p>
                </div>
                <div class="w-1/3 p-2 text-white bg-principal-blue rounded-lg">
                  <p class="text-xl text-center">Calado : {{ boat.draft }} m</p>
                </div>
              </div>
              <Button
                @click="handleClick"
                class="bg-principal-blue p-2 text-white rounded-md w-1/8"
              >
                Edit
              </Button>
            </div>
          </div>
        </template>
      </div>
    </div>
  </section>
  <Footer />
</template>

<style scoped></style>
