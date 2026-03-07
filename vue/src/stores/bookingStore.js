import { defineStore } from 'pinia'
import * as BookingService from '@/service/BookingService.js'
import { fetchBooking, getBookingByBoat, getBookings } from '@/service/BookingService.js'
import { getMooringCategory } from '@/service/MooringCategoryService.js'
import { MooringCategoryPreBooking } from '@/model/MooringCategoryPreBooking.js'
import { Booking } from '@/model/Booking.js'
import axiosSpring from '@/plugins/axiosSpring.js'
import { useBoatStore } from '@/stores/boatStore.js'


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
      console.log(resp)
      if (resp.status == 200){

      }else{

      }
      return new MooringCategoryPreBooking(
        resp.data.id,
        resp.data.zoneName,
        resp.data.zonePortName,
        resp.data.dimensionsMaxBeam,
        resp.data.dimensionsMaxLength,
        resp.data.startDate,
        resp.data.endDate,
        resp.data.basePrice,
        resp.data.tax,
        resp.data.totalPrice,
        resp.data.minPricePerDay,
        resp.data.zone)
    },
    async getBookingsByBoat(boatId){
      const resp =  await getBookingByBoat(boatId);
      return resp.data.data


    },
    async getAllBookings(){
      const resp = await getBookings()

    },
    async getAllBookingsByUser(){
      const boatStore = useBoatStore()

      const resp = await getBookings()
      return resp.data.data.map(booking => Booking.fromJson(booking));

    },

    async initPayment(mooringCategoryId, startDate, endDate, boatId,billingAddress,city,country) {
      const resp = await axiosSpring.post('payments/init', {
        mooringCategoryId,
        startDate,
        endDate,
        boatId,
        billingAddress,
        city,
        country
      })
      return resp.data
    },
    async getBookingByOrder(order){
      const boatStore = useBoatStore()

      console.log(order)
      const resp = await BookingService.getBookingById(order)
      console.log(resp.data.data[0].boat_id)
      const boat = await boatStore.getBoat(resp.data.data[0].boat_id)
      console.log(boat)

      return Booking.fromJson(resp.data.data[0], boat.name)
    },

    async getInvoice(order){
      return await BookingService.getInvoice(order)
    },

  },

})
