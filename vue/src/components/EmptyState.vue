<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
defineProps({
  message: {
    type: String
  },
})
</script>

<template>
  <div class="text-center py-12">
    <h3 class="text-lg font-semibold text-gray-900 mb-2">
      {{ $t('search.noResults') }}
    </h3>
    <p class="text-gray-600">{{ message }}</p>
  </div>
</template>
