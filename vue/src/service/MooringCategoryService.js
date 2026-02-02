import { MooringCategory } from '@/model/MooringCategory.js'
import axiosInstance from '@/plugins/axios.js'

export class MooringCategoryService {
  static async getMooringCategories(id, length, beam, startDate, endDate) {
    const { data } = await axiosInstance
      .get('ports/' + id + '/moorings/' + length + '/' + beam + '/' + startDate + '/' + endDate)
      .then((resp) => resp.data)

    return data[0].map((mc) => this.#fromJson(mc))
  }

  static #fromJson(rawData) {
    return new MooringCategory(rawData.id,rawData.zone.name,rawData.zone.description,rawData.price[0][0].min_price)
  }
}