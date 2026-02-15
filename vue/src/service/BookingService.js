import axiosSpring from '@/plugins/axiosSpring.js'
import axiosInstance from '@/plugins/axios.js'

export async function fetchBooking(mooringCategoryId, startDate,endDate,boatId ){

  const resp =  await axiosSpring.post("bookings",{
    "mooringCategoryId":mooringCategoryId,
    "startDate":startDate,
    "endDate":endDate,
    "boatId":boatId
  })
  return resp
}

export async function getBookings(){
  const resp = axiosInstance.get("bookings");
  return resp
}

export async function getBookingByBoat(boatId){
  const resp = axiosInstance.get("bookings/boats/"+boatId);
  return resp
}