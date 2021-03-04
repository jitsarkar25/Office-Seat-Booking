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