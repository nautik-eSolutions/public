import { defineStore } from 'pinia'
import { createFixedMooringRequest } from '@/service/FixedMooringService.js'
import { FixedMooring } from '@/model/FixedMooring.js'
import { useNotificationStore } from '@/stores/notificationStore.js'

const isOk = (resp) => resp?.status >= 200 && resp?.status < 300

export const useFixedMooringStore = defineStore('fixedMooringStoreq', {

  state: () => {
    return {
      fixedMoorings: [],
    }
  },
  actions: {

    async createFixedMooringRequest (data){
      const notificationStore = useNotificationStore();
      try {
        const resp = await createFixedMooringRequest()
        if (!isOk(resp)) {
          throw new Error
        }
      } catch (error) {
        let message = 'Error al enviar la peticion'
        if (error.response && error.response.data) {
          message = error.response.data.detail || error.response.data.message || message
        } else if (error.message) {
          message = error.message
        }
        notificationStore.showNotification(message, 'error')
      }

    },
    async getFixedMooringsRequests (){
      const notificationStore = useNotificationStore();
      try {
        const resp = await getFixedMooringsRequests()
        this.fixedMoorings = resp.data.map((fixedMooring) => new FixedMooring(fixedMooring))
        if (!isOk(resp)) {
          throw new Error
        }
      } catch (error) {
        let message = 'Error al obtener las peticiones'
        if (error.response && error.response.data) {
          message = error.response.data.detail || error.response.data.message || message
        } else if (error.message) {
          message = error.message
        }
        notificationStore.showNotification(message, 'error')
      }

    }
  },
})
