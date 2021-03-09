public class SeatInformationUtility {
    
    public static String upsertSeatInformation(String seat_informations){
        
        SeatInformationWrapper seatInformationList = (SeatInformationWrapper)JSON.deserialize(seat_informations, SeatInformationWrapper.class);
        List<Seat_Information__c> seatsToUpsert = new List<Seat_Information__c>();
        for(SeatInformationWrapper.Seat_information seatInfo: seatInformationList.seat_information){
            seatsToUpsert.add(seatInfo.getObject());
        }
        try{
            upsert seatsToUpsert Name;
        }catch(Exception e){
            return e.getMessage();
        }
        
        return 'Successfully updated';
    }
    
    public static String upsertBookedSeatInformation(String seat_information){
        
        try{
            seat_information = seat_information.replace('"object"', '"object_Z"');
            SeatBookingResponseWrapper seatInformation = (SeatBookingResponseWrapper)JSON.deserialize(seat_information, SeatBookingResponseWrapper.class);
            List<Seat_Information__c> seatsToUpsert = new List<Seat_Information__c>();
            System.debug('seatInformation: '+seatInformation);
            //for(SeatInformationWrapper.Seat_information seatInfo: seatInformationList.seat_information){
            if(seatInformation.object_Z.status == 'BOOKED')
                seatsToUpsert.add(seatInformation.Object_Z.getObject());
            else
                return 'Seat Already Booked';
            //}
            
            upsert seatsToUpsert Name;
        }catch(Exception e){
            return e.getMessage();
        }
        
        return 'Successfully Booked';
    }
    
    public String returnTrendingSeats(Map<String,String> keyFilters){
        String city = keyFilters.get('city') != null ? keyFilters.get('city') : '';
        
        List <Report> reportList = [SELECT Id,DeveloperName FROM Report where 
                                    DeveloperName = 'Report_Trend_Analysis_iqZ'];
        String reportId = (String)reportList.get(0).get('Id');
        
        // Run a report synchronously
        Reports.reportResults results = Reports.ReportManager.runReport(reportId, true);
        // Get the first down-grouping in the report
        Reports.Dimension dim = results.getGroupingsDown();
        Reports.GroupingValue groupingVal;
        for (Reports.GroupingValue groupingValItem : dim.getGroupings()) {
            if(groupingValItem .getLabel() == city)
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
        Integer i=5;
        List<String> trendingSeatNos = new List<String>();
        for(Reports.ReportDetailRow detailRow : factDetails.getRows()){
            --i;
            trendingSeatNos.add(detailRow.getDataCells()[0].getLabel());
            if(i==0)
                break;
        }
        return JSON.serialize(trendingSeatNos);
    }
}