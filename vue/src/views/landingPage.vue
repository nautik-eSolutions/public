<script>
export default {
  name: 'LandingPage',
}
</script>
<script setup>
import { computed, defineAsyncComponent, onMounted, ref } from 'vue'
import Footer from '../components/general/footer.vue'
import portCard from '../components/ports/cards/portCard.vue'
import router from '@/router/index.js'
import Header from '@/components/general/header.vue'
import PortMainSearch from '@/components/searchBars/portMainSearch.vue'
import { usePortsStore } from '@/stores/portsStore.js'
import { useBoatsStore } from '@/stores/boatsStore.js'
import { auth } from '@/main.js'
import { Carousel, Slide, Navigation } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'
import { useI18n } from 'vue-i18n'
import { landingSchema } from '@/utils/schemas.js'

const ports = ref()
const boats = ref()

const portsStore = usePortsStore()
const boatsStore = useBoatsStore()
const { tm } = useI18n()
onMounted(async () => {
  ports.value = await portsStore.getPorts()

  if (auth.isAuthenticated) {
    boats.value = await boatsStore.getBoats()
  }
})

function handleSubmit(formData) {
  const isAuth = auth.isAuthenticated
  const boat = isAuth ? formData.value.boat : null

  router.push({
    name: 'search',
    params: {
      id: formData.value.port.id,
      portName: formData.value.port.name,
    },
    query: {
      boatName: boat?.name ?? undefined,
      boatId: boat?.id ?? undefined,
      length: isAuth ? boat?.length : formData.value.length,
      beam: isAuth ? boat?.beam : formData.value.beam,
      draft: isAuth ? boat?.draft : formData.value.draft,
      startDate: new Date(formData.value.dates.at(0)).toLocaleDateString().replaceAll('/', '-'),
      endDate: new Date(formData.value.dates.at(1)).toLocaleDateString().replaceAll('/', '-'),
    },
  })
}

const puertos = ref([
  {
    nombre: "Port d'Andratx",
    imagen:
      'https://mallorcacaprice.com/wp-content/uploads/2024/10/fira-marinera-port-andratx.webp',
    clase: 'h-64',
    id: 10,
  },
  {
    nombre: 'Porto Colom',
    imagen:
      'https://e00-elmundo.uecdn.es/assets/multimedia/imagenes/2019/10/08/15705370670358_640x0.jpg',
    clase: 'h-64',
    id: 9,
  },
  {
    nombre: "Marina Cala D'Or",
    imagen: 'https://www.yachtdigest.com/wp-content/uploads/2024/03/marina-de-cala-dor-01.jpg',
    clase: 'h-80',
    id: 11,
  },
  {
    nombre: 'Port Adriano',
    imagen:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_Vj4SL-DMFfqVRCja2-eHMIKZ0Z2ssolQGQ&s',
    clase: 'h-80',
    id: 12,
  },
])
const faqItems = ref(tm('landing.faq.items'))

const primeraColumna = computed(() => faqItems.value.filter((_, index) => index % 2 === 0))
const segundaColumna = computed(() => faqItems.value.filter((_, index) => index % 2 !== 0))

const openItems = ref(new Set())

const toggleItem = (item) => {
  if (openItems.value.has(item)) {
    openItems.value.delete(item)
  } else {
    openItems.value.add(item)
  }
  openItems.value = new Set(openItems.value)
}
const test = import.meta.env.VITE_WEB_URL
const isOpen = (item) => openItems.value.has(item)


const script = document.createElement('script')
script.type = 'application/ld+json'
script.textContent = JSON.stringify(landingSchema)
document.head.appendChild(script)
</script>

<template>
  <Header />
  <template v-if="ports">
    <PortMainSearch :ports="ports" :boats="boats" v-on:submit="handleSubmit" />
  </template>
  <section class="max-w-7xl mx-auto px-4 mb-12">
    <div
      class="relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden bg-cover object-cover bg-center shadow-2xl"
      style="
        background-image: url('https://images.unsplash.com/photo-1503634192480-e77a6436f075?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
      "
    >
      <div
        class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent rounded-3xl"
      ></div>
      <div
        class="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6"
      >
        <h1
          class="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight drop-shadow-2xl [text-shadow:2px_2px_4px_rgba(0,0,0,0.5)]"
        >
          {{ $t('landing.hero.title') }}
        </h1>
        <p
          class="text-lg md:text-xl mt-4 font-light drop-shadow-lg [text-shadow:1px_1px_2px_rgba(0,0,0,0.5)]"
        >
          {{ $t('landing.hero.subtitle') }}
        </p>
      </div>
    </div>
  </section>
  <section class="max-w-7xl mx-auto p-4">
    <h2 class="text-3xl md:text-4xl font-bold text-slate-900 mb-8">
      {{ $t('landing.featuredPorts') }}
    </h2>
    <Carousel
      :items-to-show="3"
      :items-to-scroll="1"
      :autoplay="4000"
      :wrap-around="true"
      :pause-autoplay-on-hover="true"
      :transition="500"
      class="rounded-2xl"
    >
      <Slide v-for="puerto in puertos" :key="puerto.id" class="h-80">
        <portCard :id="puerto.id" :portName="puerto.nombre" :imgSrc="puerto.imagen" class="mx-2" />
      </Slide>

      <template #addons>
        <Navigation />
      </template>
    </Carousel>
  </section>

  <section class="max-w-7xl mx-auto px-4 py-16">
    <div class="p-8 md:p-12 bg-white rounded-2xl shadow-lg">
      <h2 class="text-4xl text-slate-900 mb-12">{{ $t('landing.faq.title') }}</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
        <div class="flex flex-col gap-4">
          <div v-for="(item, idx) in primeraColumna" :key="'col1-' + idx" class="faq-card">
            <button
              @click="toggleItem(item)"
              class="w-full flex justify-between items-center p-5 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 text-left"
              :class="{ 'rounded-b-none border-b-0': isOpen(item) }"
            >
              <span class="text-lg font-medium text-slate-900 pr-4">{{ item.question }}</span>
              <svg
                class="w-5 h-5 text-[#3b3bf5] transform transition-transform duration-300 flex-shrink-0"
                :class="{ 'rotate-180': isOpen(item) }"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <transition
              enter-active-class="transition-all duration-300 ease-out"
              enter-from-class="opacity-0 max-h-0"
              enter-to-class="opacity-100 max-h-96"
              leave-active-class="transition-all duration-200 ease-in"
              leave-from-class="opacity-100 max-h-96"
              leave-to-class="opacity-0 max-h-0"
            >
              <div v-if="isOpen(item)" class="overflow-hidden">
                <div
                  class="p-5 bg-gray-50 border border-t-0 border-gray-200 rounded-b-xl text-gray-700"
                >
                  {{ item.answer }}
                </div>
              </div>
            </transition>
          </div>
        </div>

        <div class="flex flex-col gap-4">
          <div v-for="(item, idx) in segundaColumna" :key="'col2-' + idx" class="faq-card">
            <button
              @click="toggleItem(item)"
              class="w-full flex justify-between items-center p-5 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 text-left"
              :class="{ 'rounded-b-none border-b-0': isOpen(item) }"
            >
              <span class="text-lg font-medium text-slate-900 pr-4">{{ item.question }}</span>
              <svg
                class="w-5 h-5 text-[#3b3bf5] transform transition-transform duration-300 flex-shrink-0"
                :class="{ 'rotate-180': isOpen(item) }"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <transition
              enter-active-class="transition-all duration-300 ease-out"
              enter-from-class="opacity-0 max-h-0"
              enter-to-class="opacity-100 max-h-96"
              leave-active-class="transition-all duration-200 ease-in"
              leave-from-class="opacity-100 max-h-96"
              leave-to-class="opacity-0 max-h-0"
            >
              <div v-if="isOpen(item)" class="overflow-hidden">
                <div
                  class="p-5 bg-gray-50 border border-t-0 border-gray-200 rounded-b-xl text-gray-700"
                >
                  {{ item.answer }}
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </section>

  <Footer />
</template>

<style scoped></style>
