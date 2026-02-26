import { MooringCategory } from '@/model/MooringCategory.js'
import axiosInstance from '@/plugins/axios.js'
import axiosSpring from '@/plugins/axiosSpring.js'
import { MooringCategoryPreBooking } from '@/model/MooringCategoryPreBooking.js'

export class MooringCategoryService {
  static async getMooringCategories(id, length, beam, draft,startDate, endDate) {
    const data = await axiosSpring
      .get('/availability/mooring-categories/port/' + id + '/dimensions/' + length + '/' + beam +'/'+draft+ '/dates/' + startDate + '/' + endDate)
      .then((resp) => resp.data)
    return data.map((mc) => this.#fromJson(mc))
  }

  static #fromJson(resp) {
    return new MooringCategoryPreBooking(
      resp.id,
      resp.zoneName,
      resp.zonePortName,
      resp.dimensionsMaxBeam,
      resp.dimensionsMaxLength,
      resp.startDate,
      resp.endDate,
      resp.basePrice,
      resp.tax,
      resp.totalPrice,
      resp.minPricePerDay)
  }
}

export async function getMooringCategory(mooringCategoryId, startDate, endDate){

  const resp = await axiosSpring
    .get('/availability/mooring-categories/' + mooringCategoryId + '/dates/' + startDate + '/' + endDate)

  return resp
}