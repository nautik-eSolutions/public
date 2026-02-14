import { MooringCategory } from '@/model/MooringCategory.js'

export class Port {
  constructor(id, name,city,zones) {
    this.id = id
    this.name = name
    this.city = city.name
    this.zones = zones[0]

  }
  get mooringCategories(){
    let mooringCategories = []
    this.zones.forEach((zone) => {
      zone.mooring_categories[0].forEach((mc) => {
        mooringCategories.push(new MooringCategory(mc.id,zone.name, null, mc.beam, mc.length))
      })
    })
    return mooringCategories

  }
}