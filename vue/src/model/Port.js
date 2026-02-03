export class Port {
  constructor(id, name,city,zones) {
    this.id = id
    this.name = name
    this.city = city.name
    this.zones = zones[0]
  }
}