import { defineStore } from 'pinia'
import { Boat } from '@/model/Boat.js'
import { createBoat, getBoat, getBoats } from '@/service/BoatService.js'
import router from '@/router/index.js'

export const useBoatStore = defineStore('boatStore', {
  state: () => {
    return {
      Boat: Boat,
    }
  },
  actions: {
    async saveBoat(name, registry_number, length, beam, draft, boat_type) {
      const resp = await createBoat(name, registry_number, length, beam, draft, boat_type)
      if (resp.status === 200 || resp.status === 201) {
      }
    },
    async getBoat(id){
      const resp = await getBoat(id)

      if (resp.status === 200){
        return this.fromJSON(resp.data)
      }
    },
    fromJson(json){
      return new Boat(json.name, json.registry_number, json.length, json.beam, json.draft, json.id)

    }
  },
})
