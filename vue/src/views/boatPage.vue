<script setup>
import Header from '@/components/general/header.vue'
import Footer from '@/components/general/footer.vue'
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


function handleClick(){
  router.push("/boats/edit/"+boat.id)
}

</script>

<template>
  <Header />
  <section class="min-h-screen py-8">
    <div class="max-w-7xl mx-auto px-8">
      <div class="flex flex-col gap-6">
        <template v-if="mounted">
          <h1 id="logos" class="font-bold text-3xl">{{ boat.value.name }}</h1>
          <div
            class="bg-white rounded-xl border border-gray-200 shadow-sm p-4 h-2/5 w-full shrink-0"
          >
            <div class="flex flex-col justify-between gap-2 w-full">
              <div class="text-lg border border-gray-300 shadow-sm rounded-md">
                <h2 class="p-2">
                  Eslora : {{ boat.value.length }} m | Manga : {{ boat.value.beam }} m | Calado :
                  {{ boat.value.draft }} m
                </h2>
                <h2 class="p-2">Matricula : {{ boat.value.registerNumber }}</h2>
              </div>
                <Button @click="handleClick" class="bg-principal-blue p-2 text-white rounded-md"> Edit </Button>
            </div>
          </div>
        </template>
      </div>
    </div>
  </section>

  <Footer />
</template>

<style scoped></style>
