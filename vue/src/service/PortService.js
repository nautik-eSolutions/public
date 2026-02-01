import { Port } from '@/model/Port.js'
import axiosInstance from '@/plugins/axios.js'

export class PortService {
  static async getPorts() {
    const {data}= await axiosInstance.get("ports").then(resp => resp.data)

    return data.ports.map(port =>this.#fromJson(port))



  }





  static #fromJson(rawData){
    return new Port(
      rawData.id,
      rawData.name,
      rawData.city,
      rawData.zones
    );
  }


}
