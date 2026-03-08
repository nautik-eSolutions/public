<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps({
  message: {
    type: String,
    default: null,
  },
})

const displayMessage = computed(() => props.message || t('search.filterPanel.noResultsMessage'))
</script>

<template>
  <div class="text-center py-12">
    <i class="pi pi-inbox text-6xl text-gray-400 mb-4"></i>
    <h3 class="text-lg font-semibold text-gray-900 mb-2">
      {{ $t('search.noResults') }}
    </h3>
    <p class="text-gray-600">{{ displayMessage }}</p>
  </div>
</template>
