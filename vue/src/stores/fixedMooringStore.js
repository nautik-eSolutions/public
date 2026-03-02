import { defineStore } from 'pinia'
import { getPorts } from '@/service/PortService.js'
import { Port } from '@/model/Port.js'
import { fetchBooking, getBookingByBoat, getBookings } from '@/service/BookingService.js'
import { getMooringCategory } from '@/service/MooringCategoryService.js'
import { MooringCategory } from '@/model/MooringCategory.js'
import { MooringCategoryPreBooking } from '@/model/MooringCategoryPreBooking.js'
import { Booking } from '@/model/Booking.js'
import axiosSpring from '@/plugins/axiosSpring.js'
import { createFixedMooringRequest } from '@/service/FixedMooringService.js'
import { loginUserSpring } from '@/service/AuthService.js'
import User from '@/model/User.js'
import router from '@/router/index.js'
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

    }
  },
})
