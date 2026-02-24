<script>
export default {
  name: 'PortMainSearch',
}
</script>
<script setup>
import { onMounted, ref, watch, computed } from 'vue'
import AutoComplete from '@/volt/AutoComplete.vue'
import { Form } from '@primevue/forms'
import DatePicker from '@/volt/DatePicker.vue'
import { auth } from '@/main.js'
import Boats from '@/views/boats.vue'
import Select from 'primevue/select'
import Splitter from '@/volt/Splitter.vue'

const props = defineProps({
  ports: Array,
  boats: Array,
})

const formData = ref({
  port: '',
  boat: '',
  dates: '',
  length: '',
  beam: '',
})

const today = new Date()
today.setHours(0, 0, 0, 0)

const minDate = ref(today)
const maxDate = ref(null)

const filteredPorts = ref()
const filteredBoats = ref()

const searchPort = (event) => {
  setTimeout(() => {
    if (!event.query.trim().length) {
      filteredPorts.value = [...props.ports]
    } else {
      filteredPorts.value = props.ports.filter((port) => {
        return port.name.toLowerCase().includes(event.query.toLowerCase())
      })
    }
  }, 250)
}

const searchBoat = (event) => {
  setTimeout(() => {
    if (!event.query.trim().length) {
      filteredBoats.value = [...props.boats]
    } else {
      filteredBoats.value = props.boats.filter((boat) => {
        return boat.name.toLowerCase().includes(event.query.toLowerCase())
      })
    }
  }, 250)
}

watch(
  () => formData.value.dates,
  (newDates) => {
    if (newDates && Array.isArray(newDates) && newDates.length === 2) {
      if (newDates[1] && newDates[0] && newDates[1] < newDates[0]) {
        formData.value.dates = [newDates[0], null]
      }
    }
  },
  { deep: true },
)

const emit = defineEmits(['submit'])

function handleSubmit() {
  emit('submit', formData)
}
</script>

<template>
  <section class="max-w-7xl mx-auto px-4 mb-12">
    <div class="bg-gradient-to-br from-[#0f172a] to-[#1e293b] rounded-2xl p-8 md:p-12 shadow-2xl">
      <h1 class="text-white text-3xl md:text-4xl font-bold mb-8">
        Reserva amarres con <span id="logos">NAUTIK</span>
      </h1>

      <form @submit.prevent="handleSubmit">
        <div class="flex content-center justify-center gap-1.5 w-full">
          <div class="bg-white rounded-tl-2xl rounded-bl-2xl w-4/5 px-2 py-1 shadow-lg">
            <div class="hidden md:flex items-end gap-2">
              <div class="flex-1 px-4 py-2">
                <label class="block text-xs font-semibold uppercase text-gray-600 mb-2">
                  Puerto
                </label>
                <template v-if="ports">
                  <AutoComplete
                    v-model="formData.port"
                    optionLabel="name"
                    :suggestions="filteredPorts"
                    @complete="searchPort"
                    placeholder="Selecciona un puerto"
                    class="w-full"
                  />
                </template>
              </div>
              <Splitter />
              <div class="flex-1 px-4 py-2">
                <label class="block text-xs font-semibold uppercase text-gray-600 mb-2">
                  Fechas
                </label>
                <DatePicker
                  v-model="formData.dates"
                  selectionMode="range"
                  :manualInput="false"
                  :minDate="minDate"
                  placeholder="Selecciona fechas"
                  dateFormat="dd/mm/yy"
                  class="w-full"
                />
              </div>
              <template v-if="!auth.isAuthenticated">
                <div class="w-32 px-4 py-2">
                  <label class="block text-xs font-semibold uppercase text-gray-600 mb-2">
                    Eslora (m)
                  </label>
                  <input
                    v-model="formData.length"
                    type="number"
                    step="0.1"
                    min="0"
                    placeholder="0.0"
                    class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#3b3bf5] focus:border-transparent transition"
                  />
                </div>
                <div class="w-32 px-4 py-2">
                  <label class="block text-xs font-semibold uppercase text-gray-600 mb-2">
                    Manga (m)
                  </label>
                  <input
                    v-model="formData.beam"
                    type="number"
                    step="0.1"
                    min="0"
                    placeholder="0.0"
                    class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#3b3bf5] focus:border-transparent transition"
                  />
                </div>
              </template>
              <template v-if="auth.isAuthenticated && boats">
                <template v-if="boats.length >= 1">
                  <div class="w-2/6">
                    <label class="search-label text-gray-450 text-xs">BARCO</label>
                    <Select
                      v-model="formData.boat"
                      :options="boats"
                      optionLabel="name"
                      placeholder="Selecciona tu embarcación"
                      class="w-full"
                      :pt="{
                        root: 'w-full flex items-center content-center py-2',
                        label:'text-gray-400 px-1',
                        input:
                          'w-full border-none outline-none bg-white outline-none text-base text-gray-900 cursor-pointer p-0',
                        trigger: 'flex items-center outline-none justify-center text-gray-500 w-4',
                        panel: 'bg-white rounded-lg shadow-lg mt-2',
                        list: 'p-2 bg-white rounded-lg mt-2',
                        option:
                          'px-4 py-3 rounded-md cursor-pointer text-gray-900 hover:bg-gray-100 transition-colors duration-150',
                        emptyMessage: 'px-4 py-3 text-gray-300',
                      }"
                    />
                  </div>
                </template>
                <template v-else>
                  <div class="search-field">
                    <label class="search-label">Barco</label>
                    <router-link
                      to="/boats/add"
                      class="flex items-center justify-center gap-2 w-full px-4 py-2 bg-gray-50 border-2 border-dashed border-gray-400 rounded-lg text-[#3b3bf5] text-base font-semibold transition-all duration-200 hover:bg-blue-50 hover:border-[#3b3bf5] hover:text-[#2929d4] hover:-translate-y-0.5 active:translate-y-0 no-underline cursor-pointer"
                    >
                      <svg
                        class="w-5 h-5 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                      <span>Añadir mi primer barco</span>
                    </router-link>
                  </div>
                </template>
              </template>
            </div>

            <div class="flex md:hidden flex-col gap-4">
              <div class="px-4 py-2">
                <label class="block text-xs font-semibold uppercase text-gray-600 mb-2">
                  Puerto
                </label>
                <template v-if="ports">
                  <AutoComplete
                    v-model="formData.port"
                    optionLabel="name"
                    :suggestions="filteredPorts"
                    @complete="searchPort"
                    placeholder="Selecciona un puerto"
                    class="w-full"
                  />
                </template>
              </div>
              <div class="px-4 py-2">
                <label class="block text-xs font-semibold uppercase text-gray-600 mb-2">
                  Fechas
                </label>
                <DatePicker
                  v-model="formData.dates"
                  selectionMode="range"
                  :manualInput="false"
                  :minDate="minDate"
                  placeholder="Selecciona fechas"
                  dateFormat="dd/mm/yy"
                  class="w-full"
                />
              </div>
              <template v-if="!auth.isAuthenticated">
                <div class="grid grid-cols-2 gap-4 px-4 py-2">
                  <div>
                    <label class="block text-xs font-semibold uppercase text-gray-600 mb-2">
                      Eslora (m)
                    </label>
                    <input
                      v-model="formData.length"
                      type="number"
                      step="0.1"
                      min="0"
                      placeholder="0.0"
                      class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#3b3bf5] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label class="block text-xs font-semibold uppercase text-gray-600 mb-2">
                      Manga (m)
                    </label>
                    <input
                      v-model="formData.beam"
                      type="number"
                      step="0.1"
                      min="0"
                      placeholder="0.0"
                      class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#3b3bf5] focus:border-transparent"
                    />
                  </div>
                </div>
              </template>
              <template v-if="auth.isAuthenticated && boats">
                <template v-if="auth.isAuthenticated && boats.length >= 1">
                  <div class="mobile-field">
                    <label class="search-label">Barco</label>
                    <div class="relative">
                      <select v-model="formData.boat" class="search-select">
                        <option value="" disabled selected>Selecciona tu embarcación</option>
                        <option v-for="boat in boats" :key="boat.id || boat.name" :value="boat">
                          {{ boat.name }}
                        </option>
                      </select>
                      <div class="select-icon">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </template>
                <template v-else>
                  <div class="mobile-field">
                    <label class="search-label">Barco</label>
                    <router-link
                      to="/boats/add"
                      class="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-gray-50 border-2 border-dashed border-gray-400 rounded-lg text-[#3b3bf5] text-base font-semibold transition-all duration-200 hover:bg-blue-50 hover:border-[#3b3bf5] hover:text-[#2929d4] active:scale-95 no-underline"
                    >
                      <svg
                        class="w-5 h-5 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                      <span>Añadir mi primer barco</span>
                    </router-link>
                  </div>
                </template>
              </template>
            </div>
          </div>
          <button
            type="submit"
            class="bg-[#3b3bf5] hover:bg-[#2929d4] text-white font-semibold py-3 px-8 rounded-tr-full rounded-br-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            Buscar
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<style lang="scss" scoped>
#logos {
  color: white;
}
::v-deep(.p-autocomplete) {
  width: 100%;

  .p-autocomplete-input {
    width: 100%;
    background-color: white;
    color: #1e293b;
    outline: none;
    border: 1px solid #d1d5db;
    border-radius: 0.5rem;
    padding: 0.5rem 0.75rem;
    font-size: 0.875rem;
    transition: all 0.2s;

    &:focus {
      border-color: #3b3bf5;
      ring: 2px;
      ring-color: #3b3bf5;
    }

    &::placeholder {
      color: #9ca3af;
    }
  }

  .p-autocomplete-dropdown {
    background-color: white;
  }
}

::v-deep(.p-autocomplete-overlay) {
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);

  .p-autocomplete-option {
    padding: 0.75rem;
    transition: background-color 0.2s;

    &:hover {
      background-color: #f3f4f6;
    }

    &.p-focus {
      background-color: #eff6ff;
      color: #3b3bf5;
    }
  }
}

::v-deep(.p-datepicker) {
  width: 100%;

  input {
    width: 100%;
    background-color: white;
    color: #1e293b;
    outline: none;
    border: 1px solid #d1d5db;
    border-radius: 0.5rem;
    padding: 0.5rem 0.75rem;
    font-size: 0.875rem;
    transition: all 0.2s;

    &:focus {
      border-color: #3b3bf5;
      ring: 2px;
      ring-color: #3b3bf5;
    }

    &::placeholder {
      color: #9ca3af;
    }
  }
}

::v-deep(.p-datepicker-overlay) {
  border-radius: 0.75rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

::v-deep([data-pc-name='select']) {
  width: 100%;
  position: relative;
  [data-pc-section='input'] {
    width: 100%;
    background-color: white;
    color: #1e293b;
    border: 1px solid #d1d5db;
    border-radius: 0.5rem;
    padding: 0.5rem 2rem 0.5rem 0.75rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    cursor: pointer;
    transition: all 0.2s;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &:hover {
      border-color: #9ca3af;
    }
    &:focus,
    .p-focus & {
      border-color: #3b3bf5;
      box-shadow: 0 0 0 2px rgba(59, 59, 245, 0.2);
      outline: none;
    }
  }
  [data-pc-section='trigger'] {
    position: absolute;
    right: 0.5rem;
    top: 50%;
    transform: translateY(-50%);
    color: #6b7280;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.5rem;
    height: 1.5rem;
    cursor: pointer;
    pointer-events: none;
  }
  [data-pc-section='panel'] {
    background-color: white;
    border-radius: 0.5rem;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    border: 1px solid #e5e7eb;
    margin-top: 0.25rem;
    max-height: 300px;
    overflow-y: auto;
    z-index: 1000;
  }

  [data-pc-section='list'] {
    padding: 0.5rem;
  }
  [data-pc-section='item'] {
    padding: 0.75rem 1rem;
    border-radius: 0.375rem;
    cursor: pointer;
    color: #1e293b;
    transition: all 0.15s;
    font-size: 0.875rem;

    &:hover {
      background-color: #f3f4f6;
    }

    &[data-p-highlight='true'] {
      background-color: #eff6ff;
      color: #3b3bf5;
      font-weight: 500;
    }
  }
  [data-pc-section='emptyMessage'] {
    padding: 0.75rem 1rem;
    color: #6b7280;
    text-align: center;
  }
}

select {
  background-image: none;
}
</style>
