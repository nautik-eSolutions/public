<script>
export default {
  name: 'register',
}
</script>
<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/userStore.js'
import InputText from '@/volt/InputText.vue'
import Header from '@/components/general/header.vue'
import Button from '@/volt/Button.vue'
//email = monds@corp.com
//password = 747281231

const userStore = useUserStore()

const formData = ref({
  firstName: String,
  lastName: String,
  birthDate: '',
  idDocument: '',
  idType: '',
})
</script>

<template>
  <form @submit.prevent>
    <Header />
    <div class="max-w-6xl mx-auto px-4 pb-20">
      <div class="rounded-md text-white shadow-2xl">
        <div class="bg-white rounded-xl flex flex-col border gap-4 border-gray-200 shadow-sm p-8">
          <h1 class="text-2xl text-black">Información personal</h1>
          <form class="space-y-6 flex align-items justify-center">
            <div
              class="w-full flex flex-row gap-2 items-center align-middle justify-around flex-wrap"
            >
              <div class="flex flex-col gap-0.5 w-1/3">
                <label for="firstName" class="text-black">Nombre</label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  v-model="formData.firstName">
                  class="w-full border p-1.5 px-2 text-black outline-none border-gray-300 rounded-lg"
                />
              </div>
              <div class="flex flex-col gap-0.5 w-1/3">
                <label for="firstName" class="text-black">Apellidos</label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  v-model="formData.lastName"
                  class="w-full border p-1.5 px-2 text-black outline-none border-gray-300 rounded-lg"
                />
              </div>
              <div class="flex flex-col gap-0.5 w-1/3">
                <label for="firstName" class="text-black">Documento de identidad</label>
                <input
                  type="text"
                  name="idDocument"
                  id="idDocument"
                  v-model="formData.idDocument"
                  class="w-full border p-1.5 px-2 text-black outline-none border-gray-300 rounded-lg"
                />
              </div>
              <div class="flex flex-col gap-0.5 w-1/3">
                <label for="firstName" class="text-black">Fecha de nacimiento</label>
                <input
                  type="date"
                  name="birthDate"
                  id="birthDate"
                  v-model="formData.birthDate"
                  class="w-3/7 border p-1.5 px-2 text-center text-black outline-none border-gray-300 rounded-lg"
                />
              </div>
              <div class="w-10/12 my-12">
                <Button
                  type="submit"
                  label="Enviar registro"
                  class="w-2/6 py-2  rounded-lg flex justify-center items-center gap-2"
                >
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </form>
</template>

<style scoped></style>
