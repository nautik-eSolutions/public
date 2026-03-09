<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  tabs: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['select'])

const selectTab = (tab) => {
  emit('select', tab)
}
</script>

<template>
  <section class="max-w-6xl mx-auto px-4 mb-6">
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-2">
      <div class="flex items-center gap-2 overflow-x-auto">
        <button
          v-for="tab in tabs"
          :key="tab.label"
          @click="selectTab(tab)"
          :class="[
            'flex flex-col items-center px-4 py-3 rounded-lg transition-all duration-200 whitespace-nowrap',
            tab.active ? 'bg-principal-blue text-white' : 'bg-white text-gray-700 hover:bg-gray-50',
          ]"
        >
          <span class="text-sm font-medium">{{ tab.label }}</span>
          <span :class="['text-lg font-bold mt-1', tab.active ? 'text-white' : 'text-gray-900']">
            {{ tab.price }}€
          </span>
        </button>
      </div>
    </div>
  </section>
</template>
