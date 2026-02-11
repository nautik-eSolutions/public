import { Port } from '@/model/Port.js'
import axiosInstance from '@/plugins/axios.js'


  export  async function getPorts() {
    const resp = await axiosInstance.get("ports");
    return resp
  }

  function #fromJson(rawData){
    return new Port(
      rawData.id,
      rawData.name,
      rawData.city,
      rawData.zones
    );



}
