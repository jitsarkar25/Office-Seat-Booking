public class SeatInformationCalloutRequestor {
    static Map<String,APIvsCalloutInformation__mdt> apiVsCalloutInformation = new Map<String,APIvsCalloutInformation__mdt>();
    static{
        for(APIvsCalloutInformation__mdt apiInfo: [select Label,DeveloperName,Endpoint_Name__c,Http_Method_Type__c from 
                                                      APIvsCalloutInformation__mdt]){
            apiVsCalloutInformation.put(apiInfo.DeveloperName,apiInfo);
        }
        
    }
    
    public static List<String> callSeatBookingAPI(Map<String,String> seatBookingData){
        List<String> responseList = new List<String>();
        Http http = new Http();
        HttpRequest request = getBasicRequestInfo('Booking',seatBookingData);
        String apiRequestBody = getBookingApiRequest(seatBookingData);
        request.setBody(apiRequestBody);
        HttpResponse response = http.send(request);
        System.debug('resp body ---->'+response.getBody());
        if (response.getStatusCode() == 200) {
            SeatInformationUtility.upsertBookedSeatInformation(response.getBody());
            responseList.add('Success');
            responseList.add(response.getBody());
        }
        else{
             responseList.add('Error');
             responseList.add('Something went wrong.. Please try again!!');
        }
        return responseList;
    }
    public static String callSeatOccupyAPI(Map<String,String> seatBookingData){
        Http http = new Http();
        HttpRequest request = getBasicRequestInfo('Occupy',seatBookingData);
        String apiRequestBody = getBookingApiRequest(seatBookingData);
        request.setBody(apiRequestBody);
        HttpResponse response = http.send(request);
        System.debug('resp body ---->'+response.getBody());
        if (response.getStatusCode() == 200) {
            
            return SeatInformationUtility.upsertBookedSeatInformation(response.getBody());
        }
        return 'Something went wrong.. Hold Tight!!';
    }
    public static String callSeatReturnAPI(Map<String,String> seatBookingData){
        Http http = new Http();
        HttpRequest request = getBasicRequestInfo('Return',seatBookingData);
        String apiRequestBody = getBookingApiRequest(seatBookingData);
        request.setBody(apiRequestBody);
        HttpResponse response = http.send(request);
        System.debug('resp body ---->'+response.getBody());
        if (response.getStatusCode() == 200) {
            
            return SeatInformationUtility.upsertBookedSeatInformation(response.getBody());
        }
        return 'Something went wrong.. Hold Tight!!';
    }
    
    
    public static List<String> callLoginAPI(Map<String,String> userDetails){
        List<String> responseList = new List<String>();
        Http http = new Http();
        HttpRequest request = getBasicRequestInfo('Login',userDetails);
        String apiRequestBody = getBookingApiRequest(userDetails);
        request.setBody(apiRequestBody);
        HttpResponse response = http.send(request);
        System.debug('resp body ---->'+response.getBody());
        if (response.getStatusCode() == 200) {
             responseList.add('Success');
             responseList.add(response.getBody());
        }else{
             responseList.add('Error');
             responseList.add('Invalid Employee Id');
        }
        return responseList;
    }
    
    private static HttpRequest getBasicRequestInfo(String apiName,Map<String,String> seatBookingData){
        APIvsCalloutInformation__mdt apiMetaInfo = apiVsCalloutInformation.get(apiName);
        HttpRequest request = new HttpRequest();
        String url = apiMetaInfo.Endpoint_Name__c;
        for(String key: seatBookingData.keySet()){
            url = url.replace('{'+key+'}', seatBookingData.get(key));
        }
		request.setEndpoint(url);
        System.debug('url ----> '+url);
		request.setMethod(apiMetaInfo.Http_Method_Type__c );
		request.setHeader('Content-Type', 'application/json;charset=UTF-8');
        return request;
    }
    
    private static String getBookingApiRequest(Map<String,String> seatBookingData){
        SeatInformationBookingWrapper seatBookWrapper = new SeatInformationBookingWrapper();
        return seatBookWrapper.getRequestBody(seatBookingData); 
    }
    

}