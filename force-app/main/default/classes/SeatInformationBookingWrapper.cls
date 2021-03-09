public class SeatInformationBookingWrapper {
    public String employeeId{get;set;} 
    public String seatNumber{get;set;} 
    public String fromTime{get;set;} 
    public String toTime{get;set;} 
    //dt.format('yyyy/MM/dd hh:mm:ss')
    public String getRequestBody(Map<String,String> apiBasicData){
        this.employeeId = apiBasicData.get('employeeId');
        this.seatNumber = apiBasicData.get('seatNumber');
        this.fromTime = apiBasicData.get('fromTime');
        this.toTime = apiBasicData.get('toTime');
        return JSON.serialize(this);
    }

}