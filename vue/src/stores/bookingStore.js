import {defineStore} from 'pinia'
import { getPorts } from '@/service/PortService.js'
import { Port } from '@/model/Port.js'
import { fetchBooking } from '@/service/BookingService.js'



export const useBookingStore = defineStore('bookingStore', {
  state: () => {
    return {
      Booking: [],
    }
  },
  actions: {
    async createBooking(mooringCategoryId, startDate, endDate, boatId){
      const resp =  await fetchBooking(mooringCategoryId,startDate,endDate,boatId)
      if (resp.data === true){
        //
      }else{
        //
      }

    },
    fromJson(rawData) {
      return new Port(rawData.id, rawData.name, rawData.city, rawData.zones)
    },
  },
})
