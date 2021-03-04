@RestResource(urlMapping='/SeatInformation/*')
global without sharing class SeatInformationAnalysis {
    
    @HttpGet
    global static String getBasicSeatInformationInfo() {
        RestRequest request = RestContext.request;
        // grab the caseId from the end of the URL
        String seatId = request.requestURI.substring(
          request.requestURI.lastIndexOf('/')+1);
        Seat_Information__c result =  [SELECT Id, Last_Booked_Date__c, Name 
                        FROM Seat_Information__c where Name=:seatId];
        
        return result.Last_Booked_Date__c == null ? null : String.valueOf(result.Last_Booked_Date__c);
    }

}