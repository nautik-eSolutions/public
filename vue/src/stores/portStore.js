import {defineStore } from 'pinia'
import { Port } from '@/model/Port.js'
import { getPort } from '@/service/PortService.js'
import { ref } from 'vue'



export const usePortStore = defineStore('portStore',{
  state: ()=>{
    return {
      Port:Port
    }
},
  actions:{
    async getPort(id){
      const resp = await getPort(id)
      const data = ref();
      if (resp.status !== 200){
        //
      }else{
        data.value = resp.data
      }
      return new Port(data.value.id,data.value.name, data.value.city,data.value.zones)
    }
  }
})