import { defineStore } from 'pinia'
import { getPorts } from '@/service/PortService.js'
import { Port } from '@/model/Port.js'
import { fetchBooking } from '@/service/BookingService.js'
import { getMooringCategory } from '@/service/MooringCategoryService.js'
import { MooringCategory } from '@/model/MooringCategory.js'

export const useBookingStore = defineStore('bookingStore', {
  state: () => {
    return {
      Booking: [],
    }
  },
  actions: {
    async createBooking(mooringCategoryId, startDate, endDate, boatId) {
      const resp = await fetchBooking(mooringCategoryId, startDate, endDate, boatId)
      if (resp.data === true) {
        //
      } else {
        //
      }
    },
    async getMooringCategory(mooringCategoryId, startDate, endDate){
      const resp = await getMooringCategory(mooringCategoryId,startDate,endDate)
      if (resp.status == 200){

      }else{

      }
      return new MooringCategory(resp.data.id, resp.data.zoneName, resp.data.minPrice, resp.data.maxBeam, resp.data.maxLength)
    }
  },
})
