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

const images = computed(() => port.value?.images ?? [])

const zones = computed(() => {
  if (!port.value?.zones) return []
  const z = port.value.zones
  return Array.isArray(z[0]) ? z[0] : z
})

const ventuskyUrl = computed(() => {
  if (!port.value?.latitude || !port.value?.longitude) return null
  return `https://embed.ventusky.com/?p=${port.value.latitude};${port.value.longitude};6&l=gust`
})

onMounted(async () => {
  const id = useRoute().params.id
  port.value = await portStore.getPort(id)
  mounted.value = true
})
</script>

<template>
  <Header />

  <main class="min-h-screen bg-gray-50">

    <template v-if="port">
      <div class="max-w-6xl mx-auto px-6 pt-6">
        <div class="relative rounded-2xl overflow-hidden bg-principal-blue shadow-lg">
          <div class="relative h-64 md:h-[380px]">
            <img
              :src="images[activeImage]"
              :alt="`${port.name} imagen ${activeImage + 1}`"
              class="w-full h-full object-cover transition-opacity duration-500"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"
            />

            <div class="absolute bottom-6 left-6 text-white">
              <p class="text-xs uppercase tracking-widest opacity-60 mb-1">{{ port.city }}</p>
              <h1 class="text-3xl md:text-4xl font-bold drop-shadow-lg">{{ port.name }}</h1>
            </div>

            <template v-if="images.length > 1">
              <button
                @click="activeImage = (activeImage - 1 + images.length) % images.length"
                class="absolute left-3 top-1/2 -translate-y-1/2 bg-white/15 hover:bg-white/35 text-white rounded-full w-9 h-9 flex items-center justify-center backdrop-blur-sm transition-all duration-200 text-lg"
              >

              </button>
              <button
                @click="activeImage = (activeImage + 1) % images.length"
                class="absolute right-3 top-1/2 -translate-y-1/2 bg-white/15 hover:bg-white/35 text-white rounded-full w-9 h-9 flex items-center justify-center backdrop-blur-sm transition-all duration-200 text-lg"
              >
              </button>
              <div class="absolute bottom-5 right-6 flex gap-1.5 items-center">
                <button
                  v-for="(_, i) in images"
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
            v-if="images.length > 1"
            class="flex gap-2 overflow-x-auto px-4 py-2.5 bg-white/5 backdrop-blur-sm"
          >
            <img
              v-for="(url, i) in images"
              :key="i"
              :src="url"
              :alt="`Miniatura ${i + 1}`"
              @click="activeImage = i"
              class="h-12 w-18 object-cover rounded-lg cursor-pointer flex-shrink-0 ring-2 transition-all duration-200"
              :class="
                i === activeImage
                  ? 'ring-white opacity-100'
                  : 'ring-transparent opacity-50 hover:opacity-80'
              "
            />
          </div>
        </div>
      </div>

      <div class="max-w-6xl mx-auto px-6 mt-4">
        <div class="bg-principal-blue rounded-xl overflow-hidden shadow-sm">
          <div class="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            <div class="px-6 py-4 text-center text-white">
              <p class="text-2xl font-bold">{{ port.totalMoorings }}</p>
              <p class="text-xs uppercase tracking-widest opacity-50 mt-1">
                {{ $t('port.moorings') }}
              </p>
            </div>
            <div class="px-6 py-4 text-center text-white">
              <p class="text-2xl font-bold">
                <template v-if="port.maxLength"
                  >{{ port.maxLength
                  }}<span class="text-sm font-normal opacity-60"> m</span></template
                >
                <span v-else class="opacity-30 text-lg">—</span>
              </p>
              <p class="text-xs uppercase tracking-widest opacity-50 mt-1">
                {{ $t('port.maxLength') }}
              </p>
            </div>
            <div class="px-6 py-4 text-center text-white">
              <p class="text-2xl font-bold">
                <template v-if="port.maxBeam"
                  >{{ port.maxBeam
                  }}<span class="text-sm font-normal opacity-60"> m</span></template
                >
                <span v-else class="opacity-30 text-lg">—</span>
              </p>
              <p class="text-xs uppercase tracking-widest opacity-50 mt-1">
                {{ $t('port.maxBeam') }}
              </p>
            </div>
            <div class="px-6 py-4 text-center text-white">
              <p class="text-2xl font-bold">
                <template v-if="port.maxDraft"
                  >{{ port.maxDraft
                  }}<span class="text-sm font-normal opacity-60"> m</span></template
                >
                <span v-else class="opacity-30 text-lg">—</span>
              </p>
              <p class="text-xs uppercase tracking-widest opacity-50 mt-1">
                {{ $t('port.maxDraft') }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">

        <div class="lg:col-span-2 flex flex-col gap-6">
          <div
            v-if="port.description"
            class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
          >
            <div class="h-1 bg-principal-blue" />
            <div class="p-6">
              <h2 class="text-xs font-semibold text-principal-blue uppercase tracking-widest mb-3">
                {{ $t('port.about') }}
              </h2>
              <p class="text-gray-600 leading-relaxed text-sm">{{ port.description }}</p>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div class="h-1 bg-principal-blue" />
            <div class="p-6">
              <h2 class="text-xs font-semibold text-principal-blue uppercase tracking-widest mb-4">
                {{ $t('port.contactInfo') }}
              </h2>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div v-if="port.address" class="flex items-start gap-3">
                  <div class="bg-blue-50 rounded-lg p-2 flex-shrink-0 mt-0.5">
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
                    <p class="text-xs text-gray-400 uppercase tracking-wide mb-0.5">
                      {{ $t('port.address') }}
                    </p>
                    <p class="text-sm font-medium text-gray-800">{{ port.address }}</p>
                    <p class="text-xs text-gray-400">{{ port.city }}</p>
                  </div>
                </div>

                <div v-if="port.phoneNumber" class="flex items-start gap-3">
                  <div class="bg-blue-50 rounded-lg p-2 flex-shrink-0 mt-0.5">
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
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p class="text-xs text-gray-400 uppercase tracking-wide mb-0.5">
                      {{ $t('port.phone') }}
                    </p>
                    <p class="text-sm font-medium text-gray-800">{{ port.phoneNumber }}</p>
                  </div>
                </div>

                <div v-if="port.email" class="flex items-start gap-3">
                  <div class="bg-blue-50 rounded-lg p-2 flex-shrink-0 mt-0.5">
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
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p class="text-xs text-gray-400 uppercase tracking-wide mb-0.5">
                      {{ $t('port.email') }}
                    </p>
                    <p class="text-sm font-medium text-gray-800">{{ port.email }}</p>
                  </div>
                </div>

                <div v-if="port.vhfChannel && port.vhfChannel !== 0" class="flex items-start gap-3">
                  <div class="bg-blue-50 rounded-lg p-2 flex-shrink-0 mt-0.5">
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
                        d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"
                      />
                    </svg>
                  </div>
                  <div>
                    <p class="text-xs text-gray-400 uppercase tracking-wide mb-0.5">
                      {{ $t('port.vhf') }}
                    </p>
                    <p class="text-sm font-medium text-gray-800">
                      {{ $t('port.vhfChannel') }} {{ port.vhfChannel }}
                    </p>
                  </div>
                </div>

                <div v-if="port.openingHours" class="flex items-start gap-3">
                  <div class="bg-blue-50 rounded-lg p-2 flex-shrink-0 mt-0.5">
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
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p class="text-xs text-gray-400 uppercase tracking-wide mb-0.5">
                      {{ $t('port.openingHours') }}
                    </p>
                    <p class="text-sm font-medium text-gray-800">{{ port.openingHours }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div
            v-if="zones.length"
            class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
          >
            <div class="h-1 bg-principal-blue" />
            <div class="p-6">
              <div class="flex items-center justify-between mb-5">
                <h2 class="text-xs font-semibold text-principal-blue uppercase tracking-widest">
                  {{ $t('port.mooringZones') }}
                </h2>
                <span
                  class="text-xs bg-blue-50 text-principal-blue font-semibold px-3 py-1 rounded-full border border-blue-100"
                >
                  {{ zones.length }}
                  {{ zones.length !== 1 ? $t('port.zonesPlural') : $t('port.zonesSingular') }}
                </span>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div
                  v-for="zone in zones"
                  :key="zone.id ?? zone.name"
                  class="group flex items-start gap-4 p-4 rounded-lg border border-gray-100 hover:border-blue-200 hover:bg-blue-50/40 transition-all duration-200"
                >
                  <div
                    class="w-9 h-9 rounded-lg bg-principal-blue/10 group-hover:bg-principal-blue/20 flex items-center justify-center flex-shrink-0 transition-colors duration-200 mt-0.5"
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
                    <p class="font-semibold text-gray-800 text-sm">{{ zone.name }}</p>
                    <p v-if="zone.description" class="text-xs text-gray-500 mt-0.5 truncate">
                      {{ zone.description }}
                    </p>
                    <p class="text-xs text-gray-400 mt-1">
                      {{ zone.mooring_categories?.length ?? 0 }}
                      {{
                        (zone.mooring_categories?.length ?? 0) !== 1
                          ? $t('port.categoriesPlural')
                          : $t('port.categories')
                      }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div class="flex flex-col gap-6">

          <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div class="bg-principal-blue px-5 py-4 flex items-center gap-2">
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
                {{ $t('port.portFile') }}
              </h2>
            </div>

            <ul class="divide-y divide-gray-50">
              <li class="flex items-center justify-between px-5 py-3">
                <span class="text-xs text-gray-400 uppercase tracking-wide">{{
                  $t('port.city')
                }}</span>
                <span class="text-sm font-semibold text-gray-700">{{ port.city }}</span>
              </li>
              <li class="flex items-center justify-between px-5 py-3">
                <span class="text-xs text-gray-400 uppercase tracking-wide">{{
                  $t('port.zones')
                }}</span>
                <span class="text-sm font-semibold text-gray-700">{{ zones.length }}</span>
              </li>
              <li class="flex items-center justify-between px-5 py-3">
                <span class="text-xs text-gray-400 uppercase tracking-wide">{{
                  $t('port.moorings')
                }}</span>
                <span class="text-sm font-semibold text-gray-700">{{ port.totalMoorings }}</span>
              </li>
              <li
                v-if="port.vhfChannel && port.vhfChannel !== 0"
                class="flex items-center justify-between px-5 py-3"
              >
                <span class="text-xs text-gray-400 uppercase tracking-wide">{{
                  $t('port.vhf')
                }}</span>
                <span class="text-sm font-semibold text-gray-700"
                  >{{ $t('port.vhfChannel') }} {{ port.vhfChannel }}</span
                >
              </li>
              <li class="flex items-center justify-between px-5 py-3">
                <span class="text-xs text-gray-400 uppercase tracking-wide">{{
                  $t('port.gasStation')
                }}</span>
                <span
                  :class="port.gasStation ? 'text-green-600' : 'text-gray-400'"
                  class="text-sm font-semibold flex items-center gap-1"
                >
                  <svg
                    v-if="port.gasStation"
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  {{ port.gasStation ? $t('port.available') : $t('port.notAvailable') }}
                </span>
              </li>
              <li class="flex items-center justify-between px-5 py-3">
                <span class="text-xs text-gray-400 uppercase tracking-wide">{{
                  $t('port.travelLift')
                }}</span>
                <span
                  :class="port.travelLift ? 'text-green-600' : 'text-gray-400'"
                  class="text-sm font-semibold flex items-center gap-1"
                >
                  <svg
                    v-if="port.travelLift"
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  {{ port.travelLift ? $t('port.available') : $t('port.notAvailable') }}
                </span>
              </li>
            </ul>

            <div class="px-5 pt-4 pb-5 border-t border-gray-100">
              <p class="text-xs text-gray-400 uppercase tracking-wide mb-3">
                {{ $t('port.admittedVessels') }}
              </p>
              <div class="grid grid-cols-3 gap-2">
                <div class="bg-blue-50 rounded-lg p-3 text-center border border-blue-100/50">
                  <p class="text-xs text-gray-400 mb-1">{{ $t('port.eslora') }}</p>
                  <p class="text-sm font-bold text-principal-blue">
                    {{ port.maxLength ? `${port.maxLength} m` : '—' }}
                  </p>
                </div>
                <div class="bg-blue-50 rounded-lg p-3 text-center border border-blue-100/50">
                  <p class="text-xs text-gray-400 mb-1">{{ $t('port.manga') }}</p>
                  <p class="text-sm font-bold text-principal-blue">
                    {{ port.maxBeam ? `${port.maxBeam} m` : '—' }}
                  </p>
                </div>
                <div class="bg-blue-50 rounded-lg p-3 text-center border border-blue-100/50">
                  <p class="text-xs text-gray-400 mb-1">{{ $t('port.calado') }}</p>
                  <p class="text-sm font-bold text-principal-blue">
                    {{ port.maxDraft ? `${port.maxDraft} m` : '—' }}
                  </p>
                </div>
              </div>
            </div>
          </div>


          <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div class="bg-principal-blue px-5 py-4 flex items-center gap-2">
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
                {{ $t('port.currentWeather') }}
              </h2>
            </div>

            <div
              style="
                display: block !important;
                position: relative !important;
                max-width: 177.887vh !important;
                margin: auto !important;
                padding: 0 !important;
                border: 0 !important;
              "
            >
              <div
                style="
                  display: block !important;
                  position: relative !important;
                  width: 100% !important;
                  height: 0 !important;
                  box-sizing: content-box !important;
                  margin: 0 !important;
                  border: 0 !important;
                  padding: 0 0 56.215% !important;
                  left: 0 !important;
                  top: 0 !important;
                  right: 0 !important;
                  bottom: 0 !important;
                "
              >
                <iframe
                  :src="ventuskyUrl"
                  style="
                    display: block !important;
                    position: absolute !important;
                    left: 0 !important;
                    top: 0 !important;
                    width: 100% !important;
                    height: 100% !important;
                    margin: 0 !important;
                    padding: 0 !important;
                    border: 0 !important;
                    right: auto !important;
                    bottom: auto !important;
                  "
                  loading="lazy"
                ></iframe>
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
