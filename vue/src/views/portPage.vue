<script setup>
import Header from '@/components/general/header.vue'
import Footer from '@/components/general/footer.vue'
import { usePortStore } from '@/stores/portStore.js'
import { useRoute } from 'vue-router'
import { onMounted, ref, computed } from 'vue'

const portStore = usePortStore()
const port = ref(null)
const mounted = ref(false)
const activeImage = ref(0)

const weather = ref(null)
const weatherLoading = ref(false)
const weatherError = ref(false)



onMounted(async () => {
  const id = useRoute().params.id
  port.value = await portStore.getPort(id)
  mounted.value = true
})
</script>

<template>
  <Header />

  <main class="min-h-screen bg-gray-50">
   <!-- cargando con la ruedecita -->
    <div v-if="!mounted" class="flex items-center justify-center py-32 text-gray-400 gap-3">
      <svg class="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
      </svg>
      <span class="text-sm tracking-wide">Cargando puerto...</span>
    </div>

    <template v-else-if="port">

      <section class="relative w-full bg-principal-blue overflow-hidden">
        <template v-if="port.hasImages">
          <div class="relative h-72 md:h-[440px]">
            <img
              :src="port.imageUrls[activeImage]"
              :alt="`${port.name} imagen ${activeImage + 1}`"
              class="w-full h-full object-cover transition-opacity duration-500"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"
            />
            <div class="absolute bottom-8 left-8 text-white">
              <p class="text-xs uppercase tracking-widest opacity-60 mb-1">{{ port.city }}</p>
              <h1 class="text-4xl md:text-5xl font-bold drop-shadow-lg">{{ port.name }}</h1>
            </div>
            <template v-if="port.imageUrls.length > 1">
              <button
                @click="
                  activeImage = (activeImage - 1 + port.imageUrls.length) % port.imageUrls.length
                "
                class="absolute left-4 top-1/2 -translate-y-1/2 bg-white/15 hover:bg-white/35 text-white rounded-full w-10 h-10 flex items-center justify-center backdrop-blur-sm transition-all duration-200 text-xl"
              >
                ‹
              </button>
              <button
                @click="activeImage = (activeImage + 1) % port.imageUrls.length"
                class="absolute right-4 top-1/2 -translate-y-1/2 bg-white/15 hover:bg-white/35 text-white rounded-full w-10 h-10 flex items-center justify-center backdrop-blur-sm transition-all duration-200 text-xl"
              >
                ›
              </button>
              <div class="absolute bottom-6 right-8 flex gap-2 items-center">
                <button
                  v-for="(_, i) in port.imageUrls"
                  :key="i"
                  @click="activeImage = i"
                  class="rounded-full transition-all duration-200"
                  :class="
                    i === activeImage ? 'w-5 h-2 bg-white' : 'w-2 h-2 bg-white/40 hover:bg-white/70'
                  "
                />
              </div>
            </template>
          </div>
          <div
            v-if="port.imageUrls.length > 1"
            class="flex gap-2 overflow-x-auto px-6 py-3 bg-white border-b border-gray-100"
          >
            <img
              v-for="(url, i) in port.imageUrls"
              :key="i"
              :src="url"
              :alt="`Miniatura ${i + 1}`"
              @click="activeImage = i"
              class="h-14 w-20 object-cover rounded cursor-pointer flex-shrink-0 ring-2 transition-all duration-200"
              :class="
                i === activeImage
                  ? 'ring-principal-blue opacity-100'
                  : 'ring-transparent opacity-50 hover:opacity-100'
              "
            />
          </div>
        </template>

        <div v-else class="py-16 px-8 md:px-14 text-white">
          <p class="text-xs uppercase tracking-widest opacity-60 mb-2">{{ port.city }}</p>
          <h1 class="text-5xl font-bold">{{ port.name }}</h1>
        </div>
      </section>

      <section class="bg-principal-blue">
        <div class="max-w-6xl mx-auto px-6">
          <div
            class="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10 border-t border-white/10"
          >
            <div class="px-6 py-5 text-center text-white">
              <p class="text-2xl font-bold">{{ port.totalMoorings }}</p>
              <p class="text-xs uppercase tracking-widest opacity-50 mt-1">Amarres</p>
            </div>
            <div class="px-6 py-5 text-center text-white">
              <p class="text-2xl font-bold">
                <template v-if="port.maxLength"
                  >{{ port.maxLength
                  }}<span class="text-sm font-normal opacity-60"> m</span></template
                >
                <span v-else class="opacity-30 text-lg">—</span>
              </p>
              <p class="text-xs uppercase tracking-widest opacity-50 mt-1">Eslora máx.</p>
            </div>
            <div class="px-6 py-5 text-center text-white">
              <p class="text-2xl font-bold">
                <template v-if="port.maxBeam"
                  >{{ port.maxBeam
                  }}<span class="text-sm font-normal opacity-60"> m</span></template
                >
                <span v-else class="opacity-30 text-lg">—</span>
              </p>
              <p class="text-xs uppercase tracking-widest opacity-50 mt-1">Manga máx.</p>
            </div>
            <div class="px-6 py-5 text-center text-white">
              <p class="text-2xl font-bold">
                <template v-if="port.maxDraft"
                  >{{ port.maxDraft
                  }}<span class="text-sm font-normal opacity-60"> m</span></template
                >
                <span v-else class="opacity-30 text-lg">—</span>
              </p>
              <p class="text-xs uppercase tracking-widest opacity-50 mt-1">Calado máx.</p>
            </div>
          </div>
        </div>
      </section>


      <div class="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">

        <div class="lg:col-span-2 flex flex-col gap-6">

          <div
            v-if="port.description"
            class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
          >
            <div class="h-1 bg-principal-blue" />
            <div class="p-6">
              <h2 class="text-xs font-semibold text-principal-blue uppercase tracking-widest mb-3">
                Sobre el puerto
              </h2>
              <p class="text-gray-600 leading-relaxed">{{ port.description }}</p>
            </div>
          </div>

          <div v-if="port.address" class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 class="text-xs font-semibold text-principal-blue uppercase tracking-widest mb-4">
              Ubicación
            </h2>
            <div class="flex items-start gap-4">
              <div class="bg-blue-50 rounded-lg p-2.5 flex-shrink-0">
                <svg
                  class="w-5 h-5 text-principal-blue"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div>
                <p class="text-gray-800 font-medium">{{ port.address }}</p>
                <p class="text-sm text-gray-400 mt-0.5">{{ port.city }}</p>
              </div>
            </div>
          </div>
          <div
            v-if="port.zones?.length"
            class="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
          >
            <div class="flex items-center justify-between mb-5">
              <h2 class="text-xs font-semibold text-principal-blue uppercase tracking-widest">
                Zonas de amarre
              </h2>
              <span
                class="text-xs bg-blue-50 text-principal-blue font-semibold px-3 py-1 rounded-full border border-blue-100"
              >
                {{ port.zones.length }} zona{{ port.zones.length !== 1 ? 's' : '' }}
              </span>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div
                v-for="zone in port.zones"
                :key="zone.id ?? zone.name"
                class="group flex items-center gap-4 p-4 rounded-lg border border-gray-100 hover:border-blue-200 hover:bg-blue-50/40 transition-all duration-200"
              >
                <div
                  class="w-9 h-9 rounded-lg bg-principal-blue/10 group-hover:bg-principal-blue/20 flex items-center justify-center flex-shrink-0 transition-colors duration-200"
                >
                  <svg
                    class="w-4 h-4 text-principal-blue"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                    />
                  </svg>
                </div>
                <div class="min-w-0">
                  <p class="font-semibold text-gray-800 truncate text-sm">{{ zone.name }}</p>
                  <p class="text-xs text-gray-400 mt-0.5">
                    {{ zone.mooring_categories?.length ?? 0 }} categoría{{
                      (zone.mooring_categories?.length ?? 0) !== 1 ? 's' : ''
                    }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-col gap-6">
          <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div class="bg-principal-blue px-6 py-4 flex items-center gap-2">
              <svg
                class="w-4 h-4 text-white/70"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                />
              </svg>
              <h2 class="text-xs font-semibold uppercase tracking-widest text-white/80">
                Tiempo actual
              </h2>
            </div>
            <div class="p-6">
              <div v-else-if="weather" class="flex flex-col gap-5">
                <div class="flex items-center gap-4">
                  <div>
                  </div>
                </div>
                <div class="grid grid-cols-2 gap-2 pt-4 border-t border-gray-100">
                  <div class="bg-gray-50 rounded-lg p-3">
                  </div>
                  <div class="bg-gray-50 rounded-lg p-3">
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div class="bg-principal-blue px-6 py-4 flex items-center gap-2">
              <svg
                class="w-4 h-4 text-white/70"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h2 class="text-xs font-semibold uppercase tracking-widest text-white/80">
                Ficha del puerto
              </h2>
            </div>

            <ul class="divide-y divide-gray-50">
              <li class="flex items-center justify-between px-6 py-3.5">
                <span class="text-xs text-gray-400 uppercase tracking-wide">Ciudad</span>
                <span class="text-sm font-semibold text-gray-700">{{ port.city }}</span>
              </li>
              <li v-if="port.address" class="flex items-start justify-between px-6 py-3.5 gap-4">
                <span class="text-xs text-gray-400 uppercase tracking-wide flex-shrink-0"
                  >Dirección</span
                >
                <span class="text-sm font-semibold text-gray-700 text-right">{{
                  port.address
                }}</span>
              </li>
              <li class="flex items-center justify-between px-6 py-3.5">
                <span class="text-xs text-gray-400 uppercase tracking-wide">Zonas</span>
                <span class="text-sm font-semibold text-gray-700">{{
                  port.zones?.length ?? 0
                }}</span>
              </li>
              <li class="flex items-center justify-between px-6 py-3.5">
                <span class="text-xs text-gray-400 uppercase tracking-wide">Amarres</span>
                <span class="text-sm font-semibold text-gray-700">{{ port.totalMoorings }}</span>
              </li>
            </ul>

            <div class="px-6 pt-4 pb-5 border-t border-gray-100">
              <p class="text-xs text-gray-400 uppercase tracking-wide mb-3">
                Embarcaciones admitidas
              </p>
              <div class="grid grid-cols-3 gap-2">
                <div class="bg-blue-50 rounded-lg p-3 text-center border border-blue-100/50">
                  <p class="text-xs text-gray-400 mb-1">Eslora</p>
                  <p class="text-sm font-bold text-principal-blue">
                    {{ port.maxLength ? `${port.maxLength} m` : '—' }}
                  </p>
                </div>
                <div class="bg-blue-50 rounded-lg p-3 text-center border border-blue-100/50">
                  <p class="text-xs text-gray-400 mb-1">Manga</p>
                  <p class="text-sm font-bold text-principal-blue">
                    {{ port.maxBeam ? `${port.maxBeam} m` : '—' }}
                  </p>
                </div>
                <div class="bg-blue-50 rounded-lg p-3 text-center border border-blue-100/50">
                  <p class="text-xs text-gray-400 mb-1">Calado</p>
                  <p class="text-sm font-bold text-principal-blue">
                    {{ port.maxDraft ? `${port.maxDraft} m` : '—' }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </main>

  <Footer />
</template>

<style scoped></style>
