public class SeatInformationCalloutClass {
    public static HttpResponse connectionCalloutBasic(String accessToken) {
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        String seatId = 'NGP_G_M4_1_1';
        String baseURL = 'https://psl-6c-dev-ed.lightning.force.com/services/apexrest/SeatInformation/';
        request.setEndpoint(baseURL+seatId);
         request.setHeader('Content-Type','application/json');
         request.setHeader('Authorization','OAuth '+accessToken);
        request.setMethod('GET');
        System.debug(request);
        HttpResponse  response= http.send(request);
        System.debug(response);
                /*while (response.getStatusCode() == 302) {
            request.setEndpoint(response.getHeader('Location'));
            response = new Http().send(request);
          System.debug(response);          
        }*/
        // If the request is successful, parse the JSON response.
        if (response.getStatusCode() == 200) {
            // Deserializes the JSON string into collections of primitive data types.
            Map<String, Object> results = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());
            System.debug(results);
            
        }
        return response;
    }
    public static HttpResponse makePostCallout() {
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint('https://login.salesforce.com/services/oauth2/token');
        request.setMethod('POST');
        request.setHeader('Content-Type','application/x-www-form-urlencoded');
        //request.setBody('{"username":"vangaurdgrp1@psl.com","password":"Grp@1234EVz6TMyTB31KmBSU5R0gemA8d","grant_type":"password","client_id:"3MVG9fe4g9fhX0E4Y1JzGZWpQG_NgMHi0Zw6jvwjm.NjmtSK10GgapI4_AJRjPs5Vcvq.sB7kCT3MEAcjUx5_","client_secret:"F06E2D580ACFD903E64F799B37AE8FD3854204EA88F7AE5EA6B2A029638D48DA"}');
        request.setBody('grant_type=password' +'&client_id=3MVG9fe4g9fhX0E4Y1JzGZWpQG_NgMHi0Zw6jvwjm.NjmtSK10GgapI4_AJRjPs5Vcvq.sB7kCT3MEAcjUx5_' + '&client_secret=F06E2D580ACFD903E64F799B37AE8FD3854204EA88F7AE5EA6B2A029638D48DA' + '&username=vangaurdgrp1@psl.com' + '&password=Grp@1234EVz6TMyTB31KmBSU5R0gemA8d'
		);
        HttpResponse response = http.send(request);
        Map<String, Object> results = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());
        System.debug(results);
        String accessToken = (String)results.get('access_token');
        connectionCalloutBasic(accessToken);
        // Parse the JSON response
        /*if (response.getStatusCode() != 201) {
            System.debug('The status code returned was not expected: ' +
                response.getStatusCode() + ' ' + response.getStatus());
        } else {
            System.debug(response.getBody());
        }*/
        return response;
    }   
    
     public static HttpResponse getSeatsToUpdate() {
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint('https://psl-6c-dev-ed.lightning.force.com/services/apexrest/SeatUpsert/');
        request.setMethod('GET');
       // request.setHeader('Content-Type','application/x-www-form-urlencoded');
         request.setHeader('Content-Type','application/json');
        //request.setBody('{"username":"vangaurdgrp1@psl.com","password":"Grp@1234EVz6TMyTB31KmBSU5R0gemA8d","grant_type":"password","client_id:"3MVG9fe4g9fhX0E4Y1JzGZWpQG_NgMHi0Zw6jvwjm.NjmtSK10GgapI4_AJRjPs5Vcvq.sB7kCT3MEAcjUx5_","client_secret:"F06E2D580ACFD903E64F799B37AE8FD3854204EA88F7AE5EA6B2A029638D48DA"}');
        HttpResponse response = http.send(request);
        Map<String, Object> results = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());
        System.debug(results);
        String accessToken = (String)results.get('status');
        //connectionCalloutBasic(accessToken);
        // Parse the JSON response
        /*if (response.getStatusCode() != 201) {
            System.debug('The status code returned was not expected: ' +
                response.getStatusCode() + ' ' + response.getStatus());
        } else {
            System.debug(response.getBody());
        }*/
        return response;
    }
}