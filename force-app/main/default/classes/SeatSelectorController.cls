public inherited sharing class SeatSelectorController {
    public SeatSelectorController() {

    }

    @AuraEnabled(cacheable=true)
    public static String fetchConfiguration() {
        ConfigWrapper configWrap = new ConfigWrapper();
        List<Locations__mdt> locations = [select label from Locations__mdt];
        List<Building__mdt> buildings = [select label,Location__r.DeveloperName from Building__mdt];
        List<Floor__mdt> floors = [select label,Building__r.DeveloperName from Floor__mdt];
        List<Preferences__mdt> preferences = [select label from Preferences__mdt];

        List<Block__mdt> blocks = [select label,Block_Id__c,Floor__r.DeveloperName from Block__mdt];
        List<Cubicle__mdt> cubicles = [select label,Block__r.DeveloperName,Cubicle_Id__c,entry__c from Cubicle__mdt];
        List<Seat__mdt> seats = [select label,Cubicle__r.DeveloperName,IsCloseToAC__c,isCloseToDoor__c,
                                isCloseToMeetingRoom__c,isCloseToWIndow__c,Seat_Id__c from Seat__mdt];

        configWrap.buildings = new List<ConfigWrapper.buildingWrapper>();
        for(Building__mdt building: buildings){
            ConfigWrapper.buildingWrapper buildingData = new ConfigWrapper.buildingWrapper();
            buildingData.building = building.label;
            buildingData.location = building.Location__r.DeveloperName;
            configWrap.buildings.add(buildingData);
        }

        configWrap.locations = new List<ConfigWrapper.locationWrapper>();
        for(Locations__mdt location: locations){
            ConfigWrapper.locationWrapper locationData = new ConfigWrapper.locationWrapper();
            locationData.location = location.label;
            configWrap.locations.add(locationData);
        }

        configWrap.floors = new List<ConfigWrapper.floorWrapper>();
        for(Floor__mdt floor: floors){
            ConfigWrapper.floorWrapper floorData = new ConfigWrapper.floorWrapper();
            floorData.floorName = floor.label;
            floorData.building = floor.Building__r.DeveloperName;
            configWrap.floors.add(floorData);
        }

        configWrap.Preferences = new List<ConfigWrapper.PreferenceWrapper>();
        for(Preferences__mdt preference: preferences){
            ConfigWrapper.PreferenceWrapper PreferenceData = new ConfigWrapper.PreferenceWrapper();
            PreferenceData.preference = preference.label;
            configWrap.Preferences.add(PreferenceData);
        }

        configWrap.blocks = new List<ConfigWrapper.blockWrapper>();
        for(Block__mdt block: blocks){
            ConfigWrapper.blockWrapper blockData = new ConfigWrapper.blockWrapper();
            blockData.blockName = block.label;
            blockData.blockId = block.Block_Id__c;
            blockData.floor = block.Floor__r.DeveloperName;
            configWrap.blocks.add(blockData);
        }

        configWrap.cubicles = new List<ConfigWrapper.cubicleWrapper>();
        for(Cubicle__mdt cubicle: cubicles){
            ConfigWrapper.cubicleWrapper cubicleData = new ConfigWrapper.cubicleWrapper();
            cubicleData.cubicleId = cubicle.Cubicle_Id__c;
            cubicleData.cubicleName = cubicle.label;
            cubicleData.block = cubicle.Block__r.DeveloperName;
            cubicleData.entry = cubicle.entry__c;
            configWrap.cubicles.add(cubicleData);
        }

        configWrap.seats = new List<ConfigWrapper.seatWrapper>();
        for(Seat__mdt seat: seats){
            ConfigWrapper.seatWrapper seatData = new ConfigWrapper.seatWrapper();
            seatData.seatId = seat.Seat_Id__c;
            seatData.seatName = seat.label;
            seatData.cubicle = seat.Cubicle__r.DeveloperName;
            seatData.isCloseToAC = seat.IsCloseToAC__c;
            seatData.isCloseToDoor = seat.isCloseToDoor__c;
            seatData.isCloseToMeetingRoom = seat.isCloseToMeetingRoom__c;
            seatData.isCloseToWindow = seat.isCloseToWIndow__c;
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
    
}