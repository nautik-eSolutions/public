<script>
export default {
  name: 'PortSearchedBar',
}
</script>
<script setup>
  defineProps({
    portName:'',
    startDate:'',
    endDate:'',
    length:'',
    beam:''
  })
</script>
<template>
  <section class="max-w-6xl mx-auto px-4 mb-12">
    <div class="bg-[#0f172a] rounded-2xl p-8 md:p-12 shadow-xl">
      <div class="flex flex-row gap-4 align-middle justify-center text-white">
        <div class="flex-col w-[30%] justify-center align-middle">
          <p class="text-sm text-center text-white">Destino</p>
          <div class="bg-secondary-blue rounded-md flex justify-center align-middle">
            <p class="w-[95%] h-7 rounded-xl outline-0 text-center align-middle items-center justify-center" >{{portName}}</p>
          </div>
        </div>
        <div class="flex-col w-[11%] justify-center align-middle">
          <p class="text-sm text-center text-white">Eslora</p>
          <div class="bg-secondary-blue rounded-md flex justify-center">
            <p  class="w-[90%] h-7 rounded-xl outline-0 text-center">{{length}}</p>
          </div>
        </div>
        <div class="flex-col w-[11%] justify-center align-middle">
          <p class="text-sm text-center text-white">Manga</p>
          <div class="bg-secondary-blue rounded-md flex justify-center">
            <p class="w-[90%] h-7 rounded-xl outline-0 text-center">{{beam}}</p>
          </div>
        </div>
        <div class="flex-col w-[17%] justify-center align-middle">
          <p class="text-sm text-center text-white">Llegada</p>
          <div class="flex justify-center w-[100%] bg-secondary-blue rounded-md">
            <p class="w-[75%] h-7 rounded-xl text-center">{{startDate}}</p>
          </div>
        </div>
        <div class="flex-col w-[17%] justify-center align-middle">
          <p class="text-sm text-center text-white">Salida</p>
          <div class="flex justify-center w-[100%] bg-secondary-blue rounded-md">
            <p class="w-[75%] h-7 rounded-xl text-center" >{{endDate}}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
