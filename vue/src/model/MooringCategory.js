export class MooringCategory {
  constructor(id, zoneName, portName,price, maxBeam, maxLength) {
    this.id = id
    this.zoneName = zoneName,
    this.portName = portName
    this.minPricePerDay = price
    this.maxBeam = maxBeam;
    this.maxLength = maxLength;
  }
}
