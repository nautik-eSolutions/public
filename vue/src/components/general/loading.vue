<script setup>
import { useLoadingStore } from '@/stores/loadingStore'

const loadingStore = useLoadingStore()
</script>

<template>
  <Transition name="fade">
    <div
      v-if="loadingStore.isLoading"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
    >
      <div class="relative">
        <svg
          class="animate-spin-slow h-24 w-24 text-white"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="2"
            class="opacity-25"
          />
          <path
            d="M12 2 L12 6 M12 18 L12 22 M2 12 L6 12 M18 12 L22 12 M4.5 4.5 L7.5 7.5 M16.5 16.5 L19.5 19.5 M4.5 19.5 L7.5 16.5 M16.5 7.5 L19.5 4.5"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            class="opacity-75"
          />
        </svg>
        <div class="sr-only">Cargando...</div>
      </div>
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

.animate-spin-slow {
  animation: spin 1.5s linear infinite;
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