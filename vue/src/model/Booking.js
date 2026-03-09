export class Booking {
  constructor(
    id,
    PortName,
    startDate,
    endDate,
    totalCost,
    boatId,
    boatName,
    mooring_number,
    zoneName,
    zoneDescription,
  ) {
    this.id = id
    this.portName = PortName
    this.startDate = startDate
    this.endDate = endDate
    this.totalCost = totalCost
    this.boatId = boatId
    this.boatName = boatName
    this.mooringNumber = mooring_number
    this.zoneName = zoneName
    this.zoneDescription = zoneDescription
    const now = new Date()
    const start = new Date(startDate)
    const end = new Date(endDate)

    if (start > now) {
      this.status = 'future'
    } else if (end < now) {
      this.status = 'past';
    } else {
      this.status = 'active'
    }
  }

  static fromJson(json) {
    return new Booking(
      json.id,
      json.port_name,
      json.start_date,
      json.end_date,
      json.total_cost,
      json.boat_id,
      json.boat_name,
      json.mooring_name,
      json.zone_name,
      json.zone_description,
    )
  }
}
