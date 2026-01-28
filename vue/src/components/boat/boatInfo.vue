<script>
export default {
  name: 'boatInfo',
}
</script>

<script setup>
defineProps({
  name: String,
  registerNumber: String,
  length: Number,
  bream: Number,
  draft: Number,
})
</script>

<template>
    <div class="grid grid-cols-6 gap-4 items-center bg-gray-50 rounded-lg p-3">
      <div class="text-sm font-medium text-gray-900 text-center">{{ name }}</div>
      <div class="text-sm font-medium text-gray-900 text-center">{{ registerNumber }}</div>
      <div class="flex justify-center">
        <div class="w-8 h-5 rounded overflow-hidden">
          <div class="h-1/4 bg-red-600"></div>
          <div class="h-1/2 bg-yellow-400"></div>
          <div class="h-1/4 bg-red-600"></div>

        </div>
      </div>
      <div class="text-sm font-medium text-gray-900 text-center">{{ length }} m</div>
      <div class="text-sm font-medium text-gray-900 text-center">{{ bream }} m</div>
      <div class="text-sm font-medium text-gray-900 text-center">{{ draft }} m</div>
    </div>
</template>