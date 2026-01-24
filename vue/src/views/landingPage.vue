<script>
export default {
  name: 'LandingPage',
}
</script>
<script setup>
import { ref } from 'vue'
import Footer from '../components/general/footer.vue'
import Header from '../components/general/header.vue'
import portCard from '../components/portCard.vue'
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
  <Header/>
    <section class="max-w-6xl mx-auto px-4 mb-12">
      <div class="bg-[#0f172a] rounded-2xl p-8 md:p-12 shadow-xl">
        <h1 class="text-white text-3xl md:text-4xl mb-8">
          Reserva amarres con <span id="logos" class="">NAUTIK</span>
        </h1>
        <div
          class="bg-white rounded-lg rounded-r-3xl p-1 flex flex-col md:flex-row shadow-sm overflow-hidden text-slate-900 h-14"
        >
          <div class="flex-1 p-2 border-b md:border-b-0 md:border-r border-gray-200">
            <label class="block text-xs uppercase">Puerto</label>
            <input
              type="text"
              placeholder="Busca un destino"
              class="w-full text-sm outline-none mt-1"
            />
          </div>
          <div class="flex-1 p-2 border-b md:border-b-0 md:border-r border-gray-200">
            <label class="block text-xs uppercase">Llegada</label>
            <input
              type="text"
              placeholder="Añadir fecha"
              class="w-full text-sm outline-none mt-1"
            />
          </div>
          <div class="flex-1 p-2 border-b md:border-b-0 md:border-r border-gray-200">
            <label class="block text-xs uppercase">Salida</label>
            <input
              type="text"
              placeholder="Añadir fecha"
              class="w-full text-sm outline-none mt-1"
            />
          </div>
          <div class="w-full md:w-24 p-2 border-b md:border-b-0 md:border-r border-gray-200">
            <label class="block text-xs uppercase">Eslora</label>
            <input type="text" placeholder="Metros" class="w-full text-sm outline-none mt-1" />
          </div>
          <div class="w-full md:w-24 p-2">
            <label class="block text-xs uppercase">Manga</label>
            <input type="text" placeholder="Metros" class="w-full text-sm outline-none mt-1" />
          </div>
          <button
            class="bg-[#3b3bf5] hover:bg-blue-700 text-white py-3 px-6 rounded-r-3xl md:rounded-l-none md:ml-1 transition-colors"
          >
            Buscar
          </button>
        </div>
      </div>
    </section>

    <section class="mt-5 max-w-6xl  px-4 pb-20">
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
          <div v-for="(columna, idx) in faqColumnas" :key="idx" class="flex flex-col">
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
  <Footer/>
</template>

<style scoped></style>
