<script setup>
import { onMounted, ref, shallowRef } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import Header from '../components/general/header.vue'
import Footer from '../components/general/footer.vue'
import { usePortsStore } from '@/stores/portsStore.js'
import AutoComplete from '@/volt/AutoComplete.vue'
import { useFixedMooringStore } from '@/stores/fixedMooringStore.js'
import { defineForm, field } from 'vue-yup-form'

const showModal = ref(false)
const generateForm = defineForm({
  fields: {
    port: field().required().number(),
    mooringNumber: field().required().string().max(20).min(1),
    observations: field().required().string().max(255).min(1),
  },
})

const form = shallowRef(generateForm())
const submitted = ref(false)
const fixedMooringStore = useFixedMooringStore();
const portsStore = usePortsStore()
const ports = ref()
const filteredPorts = ref()

const searchPort = (event) => {
  setTimeout(() => {
    if (!event.query.trim().length) {
      filteredPorts.value = [...ports.value]
    } else {
      filteredPorts.value = ports.value.filter((port) => {
        return port.name.toLowerCase().includes(event.query.toLowerCase())
      })
    }
  }, 250)
}

  

onMounted(async () => {
  ports.value = await portsStore.getPorts()
})
async function submitRequest () {
  showModal.value = false
  submitted.value = true
  if(!isValid(form.value)){

    return 
  }else{
    await fixedMooringStore.createFixedMooringRequest(form.value)
  }
  
  
}
</script>
<template>
  <div class="min-h-screen bg-gray-50">
    <Header />

    <main class="max-w-7xl mx-auto h-screen px-4 sm:px-6 lg:px-8 py-8">
      <div class="bg-principal-blue rounded-xl shadow-sm p-8 flex flex-col sm:flex-row  justify-between ">
        <div class="mb-6">
          <h1 class="text-3xl font-bold text-white">Solicitudes de amarre fijo</h1>
        </div>
        <div class="bottom-8 right-8">
          <button
            @click="showModal = true"
            class="bg-white text-principal-blue font-semibold py-3 px-6 rounded-lg shadow-lg flex items-center gap-3 transition-colors"
          >
            <font-awesome-icon :icon="faPlusCircle" class="text-xl" />
            <span>Añadir solicitud</span>
          </button>
        </div>
      </div>
    </main>
      
    <Footer />

    <Transition name="modal">
      <div
        v-if="showModal"
        class="fixed inset-0 bg-dark backdrop-blur-lg backdrop-brightness-50 bg-opacity-10 flex items-center justify-center z-50 p-4"
        @click.self="showModal = false"
      >
        <div class="bg-white rounded-xl shadow-xl max-w-md w-full p-8" @click.stop>
          <h2 class="text-2xl font-bold text-gray-900 mb-6">Nueva Solicitud de Amarre Fijo</h2>

          <form @submit.prevent="submitRequest" class="space-y-6">
            <div v-if="ports">
              <AutoComplete
                v-model="form.port.$value"
                optionLabel="name"
                :suggestions="filteredPorts"
                @complete="searchPort"
                placeholder="Selecciona un puerto"
                class="w-full"
              />
              <span
                  class="text-red-500 text-sm min-h-[20px]"
                  v-if="submitted && form.port.$error"
                >
                  {{ form.port.$error.message }}
                </span>
            </div>

            <div>
              <label for="numeroAmarre" class="text-sm font-medium text-gray-700 mb-2">
                Número de Amarre
              </label>
              <input
                id="numeroAmarre"
                v-model.trim="form.mooringNumber.$value"
                type="text"
                placeholder="Ej: A-125"
                class="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none"
                required
              />
              <span
                  class="text-red-500 text-sm min-h-[20px]"
                  v-if="submitted && form.mooringNumber.$error"
                >
                  {{ form.mooringNumber.$error.message }}
                </span>
            </div>

            <div>
              <label for="observations" class="text-sm font-medium text-gray-700 mb-2">
                Observaciones
              </label>
              <textarea
                id="observations"
                v-model="form.observations.$value"
                placeholder="Escribe tus observaciones aquí"
                class="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none"
              />
              <span
                  class="text-red-500 text-sm min-h-[20px]"
                  v-if="submitted && form.observations.$error"
                >
                  {{ form.observations.$error.message }}
                </span>
              </div>  

            <div class="flex gap-3 pt-4">
              <button
                type="button"
                @click="showModal = false"
                class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 hover:cursor-pointer font-medium"
              >
                Cancelar
              </button>
              <button
                type="submit"
                class="flex-1 px-4 py-2 bg-principal-blue text-white rounded-lg hover:cursor-pointer font-medium"
              >
                Enviar Solicitud
              </button>
            </div>
          </form>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
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

.modal-enter-active .bg-white,
.modal-leave-active .bg-white {
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .bg-white,
.modal-leave-to .bg-white {
  transform: scale(0.95);
  opacity: 0;
}
</style>
