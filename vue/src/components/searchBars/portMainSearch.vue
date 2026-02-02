<script>
export default {
  name: 'PortMainSearch',
}
</script>
<script setup>
import { onMounted, ref } from 'vue'
import { AutoComplete } from 'primevue'
import { Form } from '@primevue/forms'
import { DatePicker } from 'primevue'

const props = defineProps({
  ports: Array,
})

const formData = ref({
  port: '',
  length: '',
  beam: '',
  startDate: '',
  endDate: '',
})

const filteredPorts = ref()
const selectedPort = ref()

const search = (event) => {
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

const emit = defineEmits(['submit'])

function handleSubmit() {
  emit('submit', formData)
}
</script>

<template>
  <section class="max-w-6xl mx-auto px-4 mb-12">
    <div class="bg-[#0f172a] rounded-2xl p-8 md:p-12 shadow-xl">
      <h1 class="text-white text-3xl md:text-4xl mb-8">
        Reserva amarres con <span id="logos" class="">NAUTIK</span>
      </h1>
      <form @submit.prevent="handleSubmit">
        <div
          class="bg-white rounded-lg rounded-r-3xl p-1 flex md:flex-row shadow-sm text-slate-900 h-14"
        >
          <div class="flex-1 p-2 border-b md:border-b-0 md:border-r border-gray-200">
            <template v-if="ports">
              <AutoComplete
                v-model="formData.port"
                optionLabel="name"
                :suggestions="filteredPorts"
                @complete="search"
                class=""
              />
            </template>
          </div>
          <div class="flex-1 p-2 border-b md:border-b-0 md:border-r border-gray-200">
            <label class="block text-xs uppercase">Llegada</label>
            <DatePicker
              v-model="formData.startDate"

              placeholder="Añadir fecha"
              class="w-full bg-white text-sm outline-none mt-1"
            />
          </div>
          <div class="flex-1 p-2 border-b md:border-b-0 md:border-r border-gray-200">
            <label class="block text-xs uppercase">Salida</label>
            <DatePicker
              v-model="formData.endDate"

              placeholder="Añadir fecha"
              class="w-full bg-white text-sm outline-none mt-1"
            />
          </div>
          <div class="w-full md:w-24 p-2 border-b md:border-b-0 md:border-r border-gray-200">
            <label class="block text-xs uppercase">Eslora</label>
            <input
              v-model="formData.length"
              type="number"
              placeholder="Metros"
              class="w-full text-sm outline-none mt-1"
            />
          </div>
          <div class="w-full md:w-24 p-2">
            <label class="block text-xs uppercase">Manga</label>
            <input
              v-model="formData.beam"
              type="text"
              placeholder="Metros"
              class="w-full text-sm outline-none mt-1"
            />
          </div>
          <button
            type="submit"
            class="bg-[#3b3bf5] hover:bg-blue-700 text-white py-3 px-6 rounded-r-3xl md:rounded-l-none md:ml-1 transition-colors"
          >
            Buscar
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<style scoped></style>
