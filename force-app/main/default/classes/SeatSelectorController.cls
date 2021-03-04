public inherited sharing class SeatSelectorController {
    public SeatSelectorController() {

    }

    @AuraEnabled(cacheable=true)
    public static String fetchConfiguration() {
        ConfigWrapper configWrap = new ConfigWrapper();
        List<Locations__mdt> locations = [select label from Locations__mdt];
        List<Building__mdt> buildings = [select label,Location__r.DeveloperName from Building__mdt];
        List<Floor__mdt> floors = [select label,Building__r.DeveloperName from Floor__mdt];

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

        return JSON.serialize(configWrap);
    }

}