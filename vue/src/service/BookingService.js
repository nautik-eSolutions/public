import axiosSpring from '@/plugins/axiosSpring.js'
import { post } from 'axios'

export async function fetchBooking(mooringCategoryId, startDate,endDate,boatId ){

  const resp =  axiosSpring.post("bookings",{
    "mooringCategoryId":mooringCategoryId,
    "startDate":startDate,
    "endDate":endDate,
    "boatId":boatId
  })

  return resp
}
