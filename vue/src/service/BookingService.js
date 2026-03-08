import axiosSpring from '@/plugins/axiosSpring.js'
import axiosInstance from '@/plugins/axios.js'
import { auth } from '@/main.js'
import axios from 'axios'

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

export async function getBookingById(id){
  const resp = await axiosInstance.get("bookings/"+id);
  console.log(resp)
  return resp
}

export async function getInvoice(orderNumber){
  const token = auth.springToken

  return await axios.get(`http://localhost:8085/api/bookings/invoice/${orderNumber}`, {
    responseType: 'blob',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}