public class SeatInformationCalloutRequestor {
    static Map<String,APIvsCalloutInformation__mdt> apiVsCalloutInformation = new Map<String,APIvsCalloutInformation__mdt>();
    static{
        for(APIvsCalloutInformation__mdt apiInfo: [select Label,DeveloperName,Endpoint_Name__c,Http_Method_Type__c from 
                                                      APIvsCalloutInformation__mdt]){
            apiVsCalloutInformation.put(apiInfo.DeveloperName,apiInfo);
        }
        
    }
    
    public static String callSeatBookingAPI(Map<String,String> seatBookingData){
        Http http = new Http();
        HttpRequest request = getBasicRequestInfo('Booking',seatBookingData);
        String apiRequestBody = getBookingApiRequest(seatBookingData);
        request.setBody(apiRequestBody);
        HttpResponse response = http.send(request);
        System.debug('resp body ---->'+response.getBody());
        if (response.getStatusCode() == 200) {
            
            return SeatInformationUtility.upsertBookedSeatInformation(RestContext.request.requestBody.toString());
        }
        return 'Something went wrong.. Hold Tight!!';
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
		request.setMethod('POST');
		request.setHeader('Content-Type', 'application/json;charset=UTF-8');
        return request;
    }
    
    private static String getBookingApiRequest(Map<String,String> seatBookingData){
        SeatInformationBookingWrapper seatBookWrapper = new SeatInformationBookingWrapper();
        return seatBookWrapper.getRequestBody(seatBookingData); 
    }

}