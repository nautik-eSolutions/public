import axiosInstance from '@/plugins/axios.js'


export  async function getPorts() {
    const resp = await axiosInstance.get("ports").catch(function (error){
      return []
    });
    return resp
  }


  export async function getPort(id){

  return await axiosInstance.get(`ports/${id}`)
  }
