import axiosSpring from '@/plugins/axiosSpring.js'

export async function fetchBooking(mooringCategoryId, startDate,endDate,boatId ){

  const resp =  axiosSpring.post("bookings",{
    "mooringCategoryId":mooringCategoryId,
    "startDate":startDate,
    "endDate":endDate,
    "boatId":boatId
  })

  return resp
}
