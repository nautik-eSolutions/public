<script setup>
import { useNotificationStore } from '@/stores/notificationStore.js'
const notificationStore = useNotificationStore()
</script>

<template>
  <div class="fixed top-5 right-5 z-[9999] flex flex-col gap-3 w-72">
    <TransitionGroup name="list">
      <div
        v-for="notif in notificationStore.notifications"
        :key="notif.id"
        :class="[
          'bg-white border-l-4 shadow-lg rounded-sm p-4 flex items-center justify-between transition-all',
          notif.type === 'info' ? 'border-blue-500' : '',
          notif.type === 'success' ? 'border-green-500' : '',
          notif.type === 'error' ? 'border-red-500' : '',
          notif.type === 'warning' ? 'border-yellow-500' : '',
        ]"
        class="notification-card bg-white border-l-4 border-principal-blue shadow-lg rounded-sm p-4 flex items-center justify-between">
        <div class="flex flex-col">
          <p class="text-gray-700 text-sm font-medium">{{ notif.text }}</p>
        </div>

        <button
          @click="notificationStore.removeNotification(notif.id)"
          class="text-gray-400 hover:text-principal-blue transition-colors ml-2"
        >
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.4s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateX(50px);
}

.list-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.notification-card {
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}
</style>
