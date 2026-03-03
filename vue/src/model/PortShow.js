import { MooringCategory } from '@/model/MooringCategory.js'

export class PortShow {
  constructor(
    id,
    name,
    city,
    zones,
    description = null,
    address = null,
    latitude = null,
    longitude = null,
    totalMoorings = null,
    maxLength = null,
    maxBeam = null,
    maxDraft = null,
    //images = [],
  ) {
    this.id = id
    this.name = name
    this.city = city?.name ?? city
    this.zones = zones?.[0] ?? zones
    this.description = description
    this.address = address
    this.latitude = latitude
    this.longitude = longitude
    this.totalMoorings = totalMoorings
    this.maxLength = maxLength
    this.maxBeam = maxBeam
    this.maxDraft = maxDraft
    // images: array de claves S3 o URLs completas
    // this.images = Array.isArray(images) ? images : []
  }

  /*
  get imageUrls() {

  }

   */

  get mooringCategories() {
    if (!this.zones) return []
    const zonesArr = Array.isArray(this.zones) ? this.zones : [this.zones]
    let result = []
    zonesArr.forEach((zone) => {
      const cats = zone.mooring_categories?.[0] ?? zone.mooring_categories ?? []
      cats.forEach((mc) => {
        result.push(new MooringCategory(mc.id, zone.name, null, mc.beam, mc.length))
      })
    })
    return result
  }
}
