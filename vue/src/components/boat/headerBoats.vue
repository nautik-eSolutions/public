<script>
export default {
  name: 'headerBoat',
}
</script>

<script setup></script>

<template>
  <div class="grid grid-cols-8 gap-4 mb-3">
    <div class="text-xs font-semibold text-gray-600 text-center">
      {{ $t('boats.tableHeaders.name') }}
    </div>
    <div class="text-xs font-semibold text-gray-600 text-center">
      {{ $t('boats.tableHeaders.registry') }}
    </div>
    <div class="text-xs font-semibold text-gray-600 text-center">
      {{ $t('boats.tableHeaders.length') }}
    </div>
    <div class="text-xs font-semibold text-gray-600 text-center">
      {{ $t('boats.tableHeaders.beam') }}
    </div>
    <div class="text-xs font-semibold text-gray-600 text-center">
      {{ $t('boats.tableHeaders.draft') }}
    </div>
    <div class="text-xs font-semibold text-gray-600 text-center">
      {{ $t('boats.tableHeaders.viewBoat') }}
    </div>
    <div class="text-xs font-semibold text-gray-600 text-center">
      {{ $t('boats.tableHeaders.deleteBoat') }}
    </div>
  </div>
</template>

<style scoped></style>
