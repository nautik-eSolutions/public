import { Port } from '@/model/Port.js'
import axiosInstance from '@/plugins/axios.js'


  export  async function getPorts() {
    const resp = await axiosInstance.get("ports").catch(function (error){
      return []
    });
    return resp
  }


  export async function getPort(id){
  const resp = await axiosInstance.get(`ports/${id}`).catch(function(error){
    return []
  });
  return resp
  }
