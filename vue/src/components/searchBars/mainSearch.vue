<script>
export default {
  name: 'MainSearch',
}
</script>

<template>
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
          <input type="text" placeholder="Añadir fecha" class="w-full text-sm outline-none mt-1" />
        </div>
        <div class="flex-1 p-2 border-b md:border-b-0 md:border-r border-gray-200">
          <label class="block text-xs uppercase">Salida</label>
          <input type="text" placeholder="Añadir fecha" class="w-full text-sm outline-none mt-1" />
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
</template>

<style scoped></style>
