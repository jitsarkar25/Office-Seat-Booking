//@RestResource(urlMapping='/SeatUpsert/*')
global class SeatCreationUpdationAPI {
    /*@HttpGet
    global static String getBasicSeatInformationInfo() {
        RestRequest request = RestContext.request;
        
        String s = '{"status" : "success","seat_information" : [ {"seatId" : "NGP_G_G1_1_1","totalTimesBooked" : 10,"totalTimesOccupied" : 10,"lastBookedDate" : "02/03/2021","speciality":"Window","averageRating":4.2}, {"seatId" : "NGP_M_M4_6_1","totalTimesBooked" : 10,"totalTimesOccupied" : 10,"lastBookedDate" : "02/03/2021","speciality":"AC","averageRating":4.0} ],}';
        //return JSON.createParser(s);
        return s;
    }
    @HttpPost
    global static String upsertSeats() {
         //Map<String, Object> requestBody = (Map<String, Object>) JSON.deserializeUntyped(RestContext.request.requestBody.toString());
    	String seatInfoResult = SeatInformationUtility.upsertSeatInformation(RestContext.request.requestBody.toString());
        return seatInfoResult;
    }*/
    

}