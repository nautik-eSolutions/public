import { defineStore } from 'pinia'

export const useNotificationStore = defineStore('notificationStore', {
  state: () => ({
    notifications: [],
  }),

  actions: {
    showNotification(text, type = 'info') {
      const id = Date.now()
      this.notifications.unshift({ id, text, type })

      setTimeout(() => {
        this.removeNotification(id)
      }, 4000)
    },

    removeNotification(id) {
      this.notifications = this.notifications.filter((n) => n.id !== id)
    },
  },
})
