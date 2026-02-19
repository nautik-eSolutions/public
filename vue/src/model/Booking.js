export class Booking{
  constructor(PortName, startDate, endDate, totalCost, boatId) {
    this.PortName=PortName;
    this.startDate=startDate;
    this.endDate =endDate;
    this.totalCost = totalCost;
    this.boatId = boatId;
  }

  fromJson(json){

  }
}