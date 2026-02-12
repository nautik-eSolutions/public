import {defineStore} from 'pinia'
import { getPorts } from '@/service/PortService.js'
import { Port } from '@/model/Port.js' 



export const useBookingStore = defineStore('bookingStore', {
  state: () => {
    return {
      Booking: [],
    }
  },
  actions: {
    async createFunction(){

    },
    fromJson(rawData) {
      return new Port(rawData.id, rawData.name, rawData.city, rawData.zones)
    },
  },
})
