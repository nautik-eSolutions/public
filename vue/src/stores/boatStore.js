import { defineStore } from 'pinia'
import { Boat } from '@/model/Boat.js'
import { createBoat, getBoat, getBoats, updateBoat } from '@/service/BoatService.js'
import router from '@/router/index.js'
import { ref } from 'vue'

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
    async getBoat(id) {
      const resp = await getBoat(id)
      if (resp.status === 200) {
        this.Boat = this.fromJson(resp.data[0])
        return this.Boat
      }
    },
    async editBoat(id, name, registry_number, length, beam, draft) {
      const resp = await updateBoat(id, name, registry_number, length, beam, draft)
      if (resp.status === 200 || resp.status === 201) {
        this.Boat = this.fromJson(resp.data)
        return this.Boat
      }
    },
    fromJson(json) {
      return new Boat(json.name, json.registry_number, json.length, json.beam, json.draft, json.id)
    },
  },
})
