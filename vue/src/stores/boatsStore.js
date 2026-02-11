import { defineStore } from 'pinia'
import { getBoats } from '@/service/BoatService.js'
import { Boat } from '@/model/Boat.js'

export const useBoatsStore = defineStore('boatsStore', {
  state: () => {
    return {
      Boats: [],
    }
  },
  actions: {
    async getBoats() {
      const resp = await getBoats()
      if (!resp.data) {
        console.log('no boats')
      }

      return resp.data.map((rawBoat) => this.fromJson(rawBoat))
    },

    fromJson(json) {
      return new Boat(json.name, json.registry_number, json.length, json.beam, json.draft)
    },
  },
})
