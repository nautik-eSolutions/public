<script>
import Footer from '@/components/general/footer.vue'
import Header from '@/components/general/header.vue'
export default {
  name: 'SearchPage',
  components: { Header, Footer },
}
</script>

<template>
  <Header />
  <section class="max-w-6xl mx-auto px-4 mb-12">
    <div class="bg-[#0f172a] rounded-2xl p-8 md:p-12 shadow-xl">
      <div class="flex flex-row gap-4 align-middle justify-center text-white">
        <div class="flex-col w-[30%] justify-center align-middle">
          <p class="text-sm text-center text-white">Destino</p>
          <input type="search" class="bg-[#1F3550] w-[100%] h-9 rounded-xl" />
        </div>
        <div class="flex-col w-[11%] justify-center align-middle">
          <p class="text-sm text-center text-white">Eslora</p>
          <input type="search" class="bg-[#1F3550] w-[100%] h-9 rounded-xl" />
        </div>
        <div class="flex-col w-[11%] justify-center align-middle">
          <p class="text-sm text-center text-white">Eslora</p>
          <input type="search" class="bg-[#1F3550] w-[100%] h-9 rounded-xl" />
        </div>
        <div class="flex-col w-[17%] justify-center align-middle">
          <p class="text-sm text-center text-white">Llegada</p>
          <input type="date" class="bg-[#1F3550] w-[100%] h-9 rounded-xl text-center" />
        </div>
        <div class="flex-col w-[17%] justify-center align-middle">
          <p class="text-sm text-center text-white">Salida</p>
          <input type="date" class="bg-[#1F3550] w-[100%] h-9 rounded-xl text-center" />
        </div>
      </div>
    </div>
  </section>
  <section class="max-w-6xl mx-auto px-4 mb-12">
    <div class="flex flex-col">
      <h2 class="font-bold text-2xl m-2">Resultados</h2>
      <div class="flex flex-row gap-4">
        <div class="w-[25%] flex flex-col gap-3">
          <div class="flex justify-start gap-2 h-8 w-[100%] shadow rounded border">
            <input id="filter" class="mx-3" type="checkbox" />
            <label for="filter">Wifi</label>
          </div>
          <div class="flex justify-start gap-2 h-8 w-[100%] shadow rounded border">
            <input id="filter" class="mx-3" type="checkbox" />
            <label for="filter">Duchas</label>
          </div>
          <div class="flex justify-start gap-2 h-8 w-[100%] shadow rounded border">
            <input id="filter" class="mx-3" type="checkbox" />
            <label for="filter">Restaurantes cerca</label>
          </div>
        </div>
        <div class="w-[75%] flex flex-col gap-5">
          <div class="flex flex-row bg-gray-100 w-[100%] rounded-2xl shadow">
            <div class="w-[50%] p-5">
              <img
                class="w-full object-contain rounded"
                src="https://mallorcacaprice.com/wp-content/uploads/2024/10/fira-marinera-port-andratx.webp"
              />
            </div>
            <div class="p-5 flex flex-col justify-around gap-2">
              <h2 class="text-3xl">Port Adriano</h2>
              <h3>64,75€ /noche</h3>
              <button class="bg-[#1F3550] text-white h-8 rounded shadow">Reservar</button>
            </div>
          </div>
          <div class="flex flex-row bg-gray-100 w-[100%] rounded-2xl shadow">
            <div class="w-[50%] p-5">
              <img
                class="w-full object-contain rounded"
                src="https://mallorcacaprice.com/wp-content/uploads/2024/10/fira-marinera-port-andratx.webp"
              />
            </div>
            <div class="p-5 flex flex-col justify-around gap-2">
              <h2 class="text-3xl">Port Adriano</h2>
              <h3>64,75€ /noche</h3>
              <button class="bg-[#1F3550] text-white h-8 rounded shadow">Reservar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <Footer/>
</template>

<style scoped></style>
