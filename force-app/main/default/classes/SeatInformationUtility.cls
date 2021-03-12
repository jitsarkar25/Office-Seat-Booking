public without sharing class SeatInformationUtility {
    public Map<String,String> cityVsshortCode = new Map<String,String>{
        'NGP' => 'NGP',
            'NAGPUR' => 'NGP',
            'Nagpur' => 'NGP'
    };
    public static String upsertBookedSeatInformation(String seat_information){
        //OCCUPIED
        //RETURNED
        try{
            seat_information = seat_information.replace('"object":""', '"object_Z":null');
            seat_information = seat_information.replace('"object"', '"object_Z"');
            System.debug('seat_information: '+seat_information);
            SeatBookingResponseWrapper seatInformation = (SeatBookingResponseWrapper)JSON.deserialize(seat_information, SeatBookingResponseWrapper.class);
            List<Seats__C> seatsToUpsert = new List<Seats__C>();
            System.debug('seatInformation: '+seatInformation); 
            if(seatInformation.status == 200){
                if(seatInformation.object_Z.status == 'BOOKED'){
                   seatsToUpsert.add(seatInformation.Object_Z.getObject(seatInformation.object_Z.status)); 
                }else if(seatInformation.object_Z.status == 'OCCUPIED'){
                    seatsToUpsert.add(seatInformation.Object_Z.getObject(seatInformation.object_Z.status));
                }else if(seatInformation.object_Z.status == 'RETURNED'){
                  seatsToUpsert.add(seatInformation.Object_Z.getObject(seatInformation.object_Z.status));  
                }    
            }else{
                return String.isBlank(seatInformation.statusText)?'Something went wrong':seatInformation.statusText;
            }
            upsert seatsToUpsert Seat_id__c;
        }catch(Exception e){
            System.debug(e.getStackTraceString());
            return e.getMessage();
        }
        
        return 'Success';
    }

     public static String getBookingHistory(String seatInformation){
        //OCCUPIED
        //RETURNED
        try{
            seatInformation = seatInformation.replace('"object"', '"object_Z"');
            System.debug('seat_information: '+seatInformation);
            SeatBookingHistoryWrapper bookedSeatInformation = (SeatBookingHistoryWrapper)JSON.deserialize(seatInformation, SeatBookingHistoryWrapper.class);
            //List<SeatBookingHistoryWrapper.object_Z> bookedSeatWrapper = new List<Seat_Information__c>();
            System.debug('seatInformation: '+bookedSeatInformation);
            if(bookedSeatInformation.status == 200){
                System.debug('object_Z: '+bookedSeatInformation.object_Z);
                if(bookedSeatInformation.object_Z != null && bookedSeatInformation.object_Z.size()>0){
                    return JSON.serialize(bookedSeatInformation.object_Z);
                } else{
                    return 'No Booking History';
                 }   
            }else{
                return String.isBlank(bookedSeatInformation.statusText)?'Something went wrong':bookedSeatInformation.statusText;
            }
            
        }catch(Exception e){
            System.debug(e.getStackTraceString());
            return e.getMessage();
        }
        
        //return 'Success';
    }
    
    public List<String> returnTrendingSeats(Map<String,String> keyFilters){
        String city = keyFilters.get('city') != null ? keyFilters.get('city') : '';
        city = cityVsshortCode.get(city) != null ? cityVsshortCode.get(city) : city;
        String building = keyFilters.get('building') != null ? keyFilters.get('building') : '';
        String floor = keyFilters.get('floor') != null ? keyFilters.get('floor') : '';
        String n_top_result = keyFilters.get('n_top_result') != null ? keyFilters.get('n_top_result') : '3';
        String cityBuildingFloorKey = city+' - '+floor+' - '+building;
        List <Report> reportList = [SELECT Id,DeveloperName FROM Report where 
                                    DeveloperName = 'Seat_Booking_Analysis_Report_L2f'];
        String reportId = (String)reportList.get(0).get('Id');
        
        // Run a report synchronously
        Reports.reportResults results = Reports.ReportManager.runReport(reportId, true);
        // Get the first down-grouping in the report
        Reports.Dimension dim = results.getGroupingsDown();
        Reports.GroupingValue groupingVal;
        for (Reports.GroupingValue groupingValItem : dim.getGroupings()) {
            if(groupingValItem.getLabel() == cityBuildingFloorKey)
                groupingVal = groupingValItem; 
            
        }
        
        // Construct a fact map key, using the grouping key value
        String factMapKey = groupingVal.getKey() + '!T';
        
        // Get the fact map from the report results
        Reports.ReportFactWithDetails factDetails =
            (Reports.ReportFactWithDetails)results.getFactMap().get(factMapKey);
        
        // Get the first summary amount from the fact map
        Reports.SummaryValue sumVal = factDetails.getAggregates()[0];
        // Get the field value from the first data cell of the first row of the report
        //Reports.ReportDetailRow detailRow = factDetails.getRows()[0];
        
        System.debug('Top Trending seats of '+ city+ ' are: ');
        Integer i= Integer.valueOf(n_top_result);
        List<String> trendingSeatNos = new List<String>();
        for(Reports.ReportDetailRow detailRow : factDetails.getRows()){
            --i;
            String seatNo = detailRow.getDataCells()[0].getLabel();
            //System.debug('seatNo:'+seatNo+ ' key: '+city_building_floor_key);
            //if(seatNo.startsWithIgnoreCase(cityBuildingFloorKey))
            trendingSeatNos.add(detailRow.getDataCells()[0].getLabel());
            if(i==0)
              break;
        }
        System.debug(JSON.serialize(trendingSeatNos));
        return trendingSeatNos;
    }
}