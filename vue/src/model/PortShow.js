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
    this.city = city?.name ?? city // acepta objeto {name} o string
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

  /**
   * Genera URLs públicas desde S3.
   * Configura en .env: VITE_S3_BASE_URL=https://tu-bucket.s3.eu-west-1.amazonaws.com
   */
  /*
  get imageUrls() {
    const base = import.meta.env.VITE_S3_BASE_URL?.replace(/\/$/, '') ?? ''
    return this.images.map((img) => (img.startsWith('http') ? img : `${base}/${img}`))
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
