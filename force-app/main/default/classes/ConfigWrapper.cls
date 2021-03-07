public inherited sharing class ConfigWrapper {
    public ConfigWrapper() {

    }

    @AuraEnabled
    public List<locationWrapper> locations;
    @AuraEnabled
    public List<buildingWrapper> buildings;
    @AuraEnabled
    public List<floorWrapper> floors;
    @AuraEnabled
    public List<PreferenceWrapper> Preferences;
    @AuraEnabled
    public List<seatWrapper> seats;
    @AuraEnabled
    public List<cubicleWrapper> cubicles;
    @AuraEnabled
    public List<blockWrapper> blocks;

    public class buildingWrapper{
        @AuraEnabled
        public String building;
        @AuraEnabled
        public String location;
    }

    public class locationWrapper{
        @AuraEnabled
        public String location;
    }

    public class floorWrapper{
        @AuraEnabled
        public String floorName;
        @AuraEnabled
        public String building;
        @AuraEnabled
        public Decimal columns;
    }
    
    public class PreferenceWrapper{
        @AuraEnabled
        public String preference;
    }

    public class seatWrapper{
        @AuraEnabled
        public String seatId;
        @AuraEnabled
        public String seatName;
        @AuraEnabled
        public String cubicle;
        @AuraEnabled
        public Boolean isCloseToAC;
        @AuraEnabled
        public Boolean isCloseToDoor;
        @AuraEnabled
        public Boolean isCloseToMeetingRoom;
        @AuraEnabled
        public Boolean isCloseToWindow;
    }

    public class cubicleWrapper{
        @AuraEnabled
        public String cubicleId;
        @AuraEnabled
        public String cubicleName;
        @AuraEnabled
        public String block;
        @AuraEnabled
        public String entry;
    }

    public class blockWrapper{
        @AuraEnabled
        public String blockId;
        @AuraEnabled
        public String blockName;
        @AuraEnabled
        public String floor;
        @AuraEnabled
        public Boolean isMeetingRoom;
        @AuraEnabled
        public Boolean isWindow;
        @AuraEnabled
        public String meetingRoom;
        @AuraEnabled
        public String window;
    }
    
}