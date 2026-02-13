<script>
export default {
  name: 'MooringCategoryCard',
}
</script>
<script setup>
const props = defineProps({
  id:'',
  portId:'',
  zoneName: '',
  maxBeam: '',
  maxLength: '',
  price: '',
})

const data = {
  id:props.id,
  portId:props.portId,
  zoneName: props.zoneName,
  maxBeam: props.maxBeam,
  maxLength: props.maxLength,
  price: props.price,
}


const emits = defineEmits(['click'],data)

function handleClick(){
  emits('click',props)
}
</script>
<template>
  <div class="flex flex-row bg-gray-100 w-[100%] rounded-2xl shadow">
    <div class="p-5 flex flex-col justify-around gap-2">
      <h2 class="text-3xl">{{ zoneName }}</h2>
      <h1 class="text-xl">Eslora {{ maxLength }} m</h1>
      <h1 class="text-xl">Manga {{ maxBeam }} m</h1>

      <h2 class="text-3xl">{{ price }} €</h2>
      <button @click="handleClick" class="bg-secondary-blue text-white h-8 rounded shadow">
        Reservar
      </button>
    </div>
  </div>
</template>

<style scoped></style>
