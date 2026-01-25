<script>
export default {
  name: 'WeatherCard',
}
</script>
<script setup>
defineProps({
  weatherInformation: Array,
})
</script>
<template>
  <div
    class="rounded-3xl w-full h-auto text-center justify-center content-center align-middle justify-items-center shadow-sm shadow-gray-400"
  >
    <div class="w-[80%] justify-center content-center align-middle flex flex-col p-4 m-3">
      <h2 class="text-3xl">Previsión meteorológica</h2>
      <div class="h-[80%] flex flex-row justify-between">
        <div class="w-[50%] flex flex-col gap-8">
          <h3 class="text-3xl">Viento</h3>
          <div class="flex flex-row gap-2">
            <h2>Aqui Logo</h2>
            <h3>
              Velocidad <span>{{ weatherInformation.windVelocity }} Nudos</span>
            </h3>
          </div>
          <div class="flex flex-row gap-2">
            <h2>Aqui Logo</h2>
            <h3>
              NO(<span>{{ weatherInformation.windDirection }}º) </span>
            </h3>
          </div>
          <div class="flex flex-row gap-2">
            <h2>Aqui Logo</h2>
            <h3>
              <span>{{ weatherInformation.weather }} </span>
            </h3>
          </div>
        </div>
        <div class="w-[50%] flex flex-col gap-8">
          <h3 class="text-3xl">Oleaje</h3>
          <div class="flex flex-row gap-2">
            <h2>Aqui Logo</h2>
            <h3>
              Altura <span>{{ weatherInformation.waveHeight }}</span>
            </h3>
          </div>
          <div class="flex flex-row gap-2">
            <h2>Aqui Logo</h2>
            <h3>
              NO(<span>{{ weatherInformation.waveDirection }}º) </span>
            </h3>
          </div>
          <div class="flex flex-row gap-2">
            <div class="flex flex-row gap-2">
              <h2>aqui logo</h2>
              <h2>{{ weatherInformation.seaTemperature }}</h2>
            </div>
            <div class="flex flex-row gap-2">
              <h2>aqui logo</h2>
              <h2>{{ weatherInformation.windTemperature }}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
