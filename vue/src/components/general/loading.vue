<script setup>
import { useLoadingStore } from '@/stores/loadingStore'

const loadingStore = useLoadingStore()
</script>

<template>
  <Transition name="fade">
    <div
      v-if="loadingStore.isLoading"
      class="fixed inset-0 z-50 flex items-center justify-center"
      style="background-color: rgba(5, 32, 61, 0.75)"
    >
      <div class="spinner"></div>
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.spinner {
  width: 48px;
  height: 48px;
  border: 4px solid rgba(5, 32, 61, 0.2);
  border-top-color: #05203d;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
