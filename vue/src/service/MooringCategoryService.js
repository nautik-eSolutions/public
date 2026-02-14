import { MooringCategory } from '@/model/MooringCategory.js'
import axiosInstance from '@/plugins/axios.js'
import axiosSpring from '@/plugins/axiosSpring.js'

export class MooringCategoryService {
  static async getMooringCategories(id, length, beam, startDate, endDate) {
    const data = await axiosSpring
      .get('/availability/mooring-categories/port/' + id + '/dimensions/' + length + '/' + beam + '/dates/' + startDate + '/' + endDate)
      .then((resp) => resp.data)


    return data.map((mc) => this.#fromJson(mc))
  }

  static #fromJson(rawData) {
    return new MooringCategory(rawData.id,rawData.ZoneName,rawData.minPrice,rawData.dimensionsMaxBeam, rawData.dimensionsMaxLength)
  }
}

export async function getMooringCategory(mooringCategoryId, startDate, endDate){

  const resp = await axiosSpring
    .post('/availability/mooring-categories/port/' + id + '/dates/' + startDate + '/' + endDate)

  return resp
}