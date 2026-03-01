export class Booking{
  constructor(PortName, startDate, endDate, totalCost, boatName, mooringName) {
    this.portName=PortName;
    this.startDate=startDate;
    this.endDate =endDate;
    this.totalCost = totalCost;
    this.boatName = boatName;
    this.mooringName = mooringName;
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start > now) {
      this.status = 'future';
    } else if (end < now) {
      this.status = 'past';
    } else {
      this.status = 'active';
    }
  }

   static fromJson(json, boat_name){
    return new Booking(
        json.port_name,
        json.start_date,
        json.end_date,
        json.total_cost,
        boat_name,
        json.mooring_name
    );

  }
}