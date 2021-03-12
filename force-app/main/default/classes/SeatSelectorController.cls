public without sharing class SeatSelectorController {
    public SeatSelectorController() {
        
    } 
    
    @AuraEnabled
    public static String fetchConfiguration() {
        ConfigWrapper configWrap = new ConfigWrapper();
        List<Location__c> locations = [select Name__c from Location__c];
        List<Buildings__c> buildings = [select Name__c,Location__r.Name__c from Buildings__c];
        List<Floors__c> floors = [select Name__c,Building__r.Name__c,Columns__c from Floors__c order by Name__c];
        List<Preferences__mdt> preferences = [select label from Preferences__mdt];
        
        List<Blocks__c> blocks = [select Block_Id__c,Floor__r.Name__c,isMeetingRoom__c,IsWindow__c,
                                  Meeting_Room__c,Window__c from Blocks__c order by Block_Id__c];
        List<Cubicles__c> cubicles = [select Block__r.Block_Id__c,Cubicle_Id__c,entry__c from Cubicles__c order by Cubicle_Id__c];
        List<Seats__c> seats = [select Cubicle__r.Cubicle_Id__c,IsCloseToAC__c,isCloseToDoor__c,
                                isCloseToMeetingRoom__c,isCloseToWIndow__c,Seat_Id__c,Average_Rating__c from Seats__c order by seat_id__c];
        
        configWrap.buildings = new List<ConfigWrapper.buildingWrapper>();
        for(Buildings__c building: buildings){
            ConfigWrapper.buildingWrapper buildingData = new ConfigWrapper.buildingWrapper();
            buildingData.building = building.Name__c;
            buildingData.location = building.Location__r.Name__c;
            configWrap.buildings.add(buildingData);
        }
        
        configWrap.locations = new List<ConfigWrapper.locationWrapper>();
        for(Location__c location: locations){
            ConfigWrapper.locationWrapper locationData = new ConfigWrapper.locationWrapper();
            locationData.location = location.Name__c;
            configWrap.locations.add(locationData);
        }
        
        configWrap.floors = new List<ConfigWrapper.floorWrapper>();
        for(Floors__c floor: floors){
            ConfigWrapper.floorWrapper floorData = new ConfigWrapper.floorWrapper();
            floorData.floorName = floor.Name__c;
            floorData.building = floor.Building__r.Name__c;
            floorData.columns = floor.Columns__c;
            configWrap.floors.add(floorData);
        }
        
        configWrap.Preferences = new List<ConfigWrapper.PreferenceWrapper>();
        for(Preferences__mdt preference: preferences){
            ConfigWrapper.PreferenceWrapper PreferenceData = new ConfigWrapper.PreferenceWrapper();
            PreferenceData.preference = preference.label;
            configWrap.Preferences.add(PreferenceData);
        }
        
        configWrap.blocks = new List<ConfigWrapper.blockWrapper>();
        for(Blocks__c block: blocks){
            ConfigWrapper.blockWrapper blockData = new ConfigWrapper.blockWrapper();
            blockData.blockName = block.Block_Id__c;
            blockData.blockId = block.Block_Id__c;
            blockData.floor = block.Floor__r.Name__c;
            blockData.isMeetingRoom = block.isMeetingRoom__c;
            blockData.isWindow = block.IsWindow__c;
            blockData.meetingRoom = block.Meeting_Room__c;
            blockData.window = block.Window__c;
            configWrap.blocks.add(blockData);
        }
        
        configWrap.cubicles = new List<ConfigWrapper.cubicleWrapper>();
        for(Cubicles__c cubicle: cubicles){
            ConfigWrapper.cubicleWrapper cubicleData = new ConfigWrapper.cubicleWrapper();
            cubicleData.cubicleId = cubicle.Cubicle_Id__c;
            cubicleData.cubicleName = cubicle.Cubicle_Id__c;
            cubicleData.block = cubicle.Block__r.Block_Id__c;
            cubicleData.entry = cubicle.entry__c;
            configWrap.cubicles.add(cubicleData);
        }
        
        configWrap.seats = new List<ConfigWrapper.seatWrapper>();
        for(Seats__c seat: seats){
            ConfigWrapper.seatWrapper seatData = new ConfigWrapper.seatWrapper();
            seatData.seatId = seat.Seat_Id__c;
            seatData.seatName = seat.Seat_Id__c;
            seatData.cubicle = seat.Cubicle__r.Cubicle_Id__c;
            seatData.isCloseToAC = seat.IsCloseToAC__c;
            seatData.isCloseToDoor = seat.isCloseToDoor__c;
            seatData.isCloseToMeetingRoom = seat.isCloseToMeetingRoom__c;
            seatData.isCloseToWindow = seat.isCloseToWIndow__c;
            seatData.averageRating = seat.Average_Rating__c;
            configWrap.seats.add(seatData);
        }
        
        return JSON.serialize(configWrap);
    }
    
    @AuraEnabled
    public static List < Map < String, String >> getPreferenceValues(){
        List<Preferences__mdt> preferences = [select label from Preferences__mdt];
        List < Map < String, String >> options = new List < Map < String, String >> ();
        for(Preferences__mdt preference: preferences){
            Map < String, String > values = new Map < String, String > {
                'key' => preference.label,
                    'value' => preference.label
                    };
                        options.add(values);
        }
        return options;
    }
    
    @AuraEnabled
    public static List<String> loginUser(String empId){
        Map<String,String> aMap = new Map<String,String>();
        
        aMap.put('empId',empId);
        
        return SeatInformationCalloutRequestor.callLoginAPI(aMap);
    }
    
    @AuraEnabled
    public static List<String> bookSeat(Map<String,String> bookingDetails){
        System.debug('bookingDetails. ----> '+bookingDetails);
        
        return SeatInformationCalloutRequestor.callSeatBookingAPI(bookingDetails);
    }
    
    @AuraEnabled
    public static List<String> returnSeat(Map<String,String> bookingDetails){
        System.debug('bookingDetails. ----> '+bookingDetails);
        
        return SeatInformationCalloutRequestor.callSeatReturnAPI(bookingDetails);
    }
    
    @AuraEnabled
    public static List<String> occupySeat(Map<String,String> bookingDetails){
        System.debug('bookingDetails. ----> '+bookingDetails);
        
        return SeatInformationCalloutRequestor.callSeatOccupyAPI(bookingDetails);
    }
    
    @AuraEnabled
    public static List<String> getAllBookedSeats(Map<String,String> timeDetails){
        return SeatInformationCalloutRequestor.callGetAllBookedSeatsAPI(timeDetails);
    }
    
    @AuraEnabled
    public static List<String> getMyBookedSeats(Map<String,String> userDetails){
        return SeatInformationCalloutRequestor.callMyBookingsAPI(userDetails);
    }
    
    @AuraEnabled
    public static List<Feedback__c> getFeedback(String empId){
        return [Select id, Employee_Number__c, Booking_Id__c , Rating__c  from Feedback__c where Employee_Number__c=:empId and Booking_Id__c!=null ];
    }
    
    @AuraEnabled
    public static List<String> getTrendingSeats(Map<String,String> currentVal){
        SeatInformationUtility utiClass = new SeatInformationUtility();
		return utiClass.returnTrendingSeats(currentVal);
    }
    
    
}