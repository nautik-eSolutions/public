import { defineStore } from 'pinia'
import router from '@/router/index.js'
import { getPorts } from '@/service/PortService.js'
import { Port } from '@/model/Port.js'

export const usePortsStore = defineStore('portStore', {
  state: () => {
    return {
      Ports:[]
    }
  },
  actions: {
    async getPorts(){
      const resp =  await getPorts()
      if (resp!== 200){
        return  [];
      } else {
        return resp.data.ports.map(port=> this.fromJson(port))
      }
    },
    fromJson(rawData){
      return new Port(
        rawData.id,
        rawData.name,
        rawData.city,
        rawData.zones
      );
    }
  },
})
