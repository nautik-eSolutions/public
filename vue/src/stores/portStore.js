import { defineStore } from 'pinia'
import { getPort } from '@/service/PortService.js'
import { ref } from 'vue'
import { PortShow } from '@/model/PortShow.js'

export const usePortStore = defineStore('portStore', {
  state: () => ({
    Port: PortShow,
  }),
  actions: {
    async getPort(id) {
      const resp = await getPort(id)
      console.log(resp)
      const data = ref()
      if (resp.status !== 200) {
        console.error(resp)
      } else {
        data.value = resp.data.data
      }
      console.log(data)

      this.Port = new PortShow(
        data.value.id,
        data.value.name,
        data.value.city,
        data.value.zones,
        data.value.description ?? null,
        data.value.address ?? null,
        data.value.email ?? null,
        data.value.phoneNumber ?? null,
        data.value.vhf_channel ?? null,
        data.value.opening_hours ?? null,
        data.value.gas_station ?? null,
        data.value.travel_lift ?? null,
        data.value.latitude ?? null,
        data.value.longitude ?? null,
        data.value.total_moorings ?? null,
        data.value.max_length ?? null,
        data.value.max_beam ?? null,
        data.value.max_draft ?? null,
        data.value.images,
      )
      return this.Port
    },
  },
})
