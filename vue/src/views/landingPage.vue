<script>
export default {
  name: 'LandingPage',
}
</script>
<script setup>
import { defineAsyncComponent, onMounted, onUnmounted, ref } from 'vue'
import Footer from '../components/general/footer.vue'
import portCard from '../components/ports/cards/portCard.vue'
import { PortService } from '@/service/PortService.js'
import router from '@/router/index.js'
import PrimeVue from 'primevue/config'
import useAuth  from '../stores/authStore.js'

const auth =  useAuth()

const ports = ref()

onMounted(async () => {
  ports.value = await PortService.getPorts()
})

const Header = defineAsyncComponent(() => import('../components/general/header.vue'))
const PortMainSearch = defineAsyncComponent(()=>import('@/components/searchBars/portMainSearch.vue'))

function handleSubmit(formData) {
  const portId = formData.value.port.id
  const portName = formData.value.port.name
  const length = formData.value.length
  const beam = formData.value.beam
  const startDate = new Date(formData.value.dates.at(0)).toLocaleDateString().replaceAll('/', '-')
  const endDate = new Date(formData.value.dates.at(1)).toLocaleDateString().replaceAll('/', '-')

  router.push({
    name: 'search',
    params: {
      id: portId,
      portName: portName,
      length: length,
      beam: beam,
      startDate: startDate,
      endDate: endDate,
    },
  })
}

const puertos = ref([
  {
    nombre: 'Port d’Andratx',
    imagen:
      'https://mallorcacaprice.com/wp-content/uploads/2024/10/fira-marinera-port-andratx.webp',
    clase: 'h-64',
  },
  {
    nombre: 'Porto Colom',
    imagen:
      'https://e00-elmundo.uecdn.es/assets/multimedia/imagenes/2019/10/08/15705370670358_640x0.jpg',
    clase: 'h-64',
  },
  {
    nombre: 'Marina Cala D’Or',
    imagen: 'https://www.yachtdigest.com/wp-content/uploads/2024/03/marina-de-cala-dor-01.jpg',
    clase: 'h-80',
  },
  {
    nombre: 'Port Adriano',
    imagen:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_Vj4SL-DMFfqVRCja2-eHMIKZ0Z2ssolQGQ&s',
    clase: 'h-80',
  },
])
const faqColumnas = ref([
  [
    'Como funciona Nautik ?',
    'Cuando hay que hacer el check in ?',
    'Se puede desgravar el I.V.A de la re...',
    'Que pasa si no llevo la documentación ?',
  ],
  [
    'Necesito pasaporte si vengo de ...',
    'Como me hago fijo?',
    'Puedo utilizar los servicios sin ser ...',
    'Hay amarres para hidroavión?',
  ],
])
</script>

<template>
  <Header />
  <template v-if="ports">
    <PortMainSearch :ports="ports" v-on:submit="handleSubmit" />
  </template>
  <section class="max-w-6xl mx-auto px-4 pb-20">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div v-for="puerto in puertos">
        <portCard :img-src="puerto.imagen" :portName="puerto.nombre" />
      </div>
    </div>
  </section>

  <section class="max-w-6xl mx-auto px-4 py-16">
    <div class="p-8 md:p-12 bg-white">
      <h2 class="text-4xl text-slate-900 mb-12">F & Q</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-4">
        <div v-for="(columna, index) in faqColumnas" :key="index" class="flex flex-col">
          <button
            v-for="pregunta in columna"
            :key="pregunta"
            class="flex justify-between items-center w-full py-4 border-b border-gray-200 text-left hover:bg-gray-50 transition-colors"
          >
            <span class="text-lg text-slate-900">{{ pregunta }}</span>
          </button>
        </div>
      </div>
    </div>
  </section>

  <Footer />
</template>

<style  lang="scss" scoped>


</style>
