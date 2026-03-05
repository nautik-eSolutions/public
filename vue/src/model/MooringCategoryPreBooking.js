export class MooringCategoryPreBooking {
  constructor(id, zoneName, portName, maxBeam, maxLength,startDate, endDate, basePrice, tax, totalPrice,minPricePerDay,zone ) {
    this.id = id;
    this.zoneName = zoneName
    this.portName = portName
    this.maxBeam =  maxBeam
    this.maxLength = maxLength
    this.startDate = startDate
    this.endDate = endDate
    this.basePrice = basePrice
    this.tax = tax
    this.totalPrice =totalPrice
    this.minPricePerDay= minPricePerDay
    this.services= zone.services
    this.description = zone.description
  }
}
