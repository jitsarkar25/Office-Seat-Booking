@isTest
public class SeatSelectorControllerTest{
    @testsetup static void init_Data(){
        Location__c location = new Location__c();
        location.Name__c = 'Nagpur';
        insert location;
        
        Buildings__c building = new Buildings__c();
        building.Name__c = 'Gargee';
        building.Location__c = location.id;
        insert building;
        
        Floors__c floor = new Floors__c();
        floor.Name__c = 'G0';
        floor.Building__c = building.id;
        floor.Columns__c = 3;
        insert floor;
        
        Blocks__c block = new Blocks__c();
        block.Block_Id__c = '12345';
        block.Floor__c = floor.id;
        block.isMeetingRoom__c = true;
        block.IsWindow__c = true;
        block.Meeting_Room__c = '';
        block.Window__c = 'left';
        insert block;
        
        Cubicles__c cubicle = new Cubicles__c();
        cubicle.Block__c = block.id;
        cubicle.Cubicle_Id__c = '12345';
        cubicle.entry__c = 'bottomentry';
        insert cubicle;
        
        Seats__c seat = new Seats__c();
        seat.Cubicle__c = cubicle.id;
        seat.IsCloseToAC__c = true;
        seat.isCloseToDoor__c = true;
        seat.isCloseToMeetingRoom__c = true;
        seat.isCloseToWIndow__c = true;
        seat.Seat_Id__c = '123';
        insert seat;
    }

    @isTest 
    static void test_fetchConfiguration(){
        List<Buildings__c> buildings = [select Name__c,Location__r.Name__c from Buildings__c];
        List<Floors__c> floors = [select Name__c,Building__r.Name__c,Columns__c from Floors__c];
        List<Blocks__c> blocks = [select Block_Id__c,Floor__r.Name__c,isMeetingRoom__c,IsWindow__c,
                                    Meeting_Room__c,Window__c from Blocks__c order by Block_Id__c];
        List<Cubicles__c> cubicles = [select Block__r.Block_Id__c,Cubicle_Id__c,entry__c from Cubicles__c order by Cubicle_Id__c];
        List<Seats__c> seats = [select Cubicle__r.Cubicle_Id__c,IsCloseToAC__c,isCloseToDoor__c,
                                isCloseToMeetingRoom__c,isCloseToWIndow__c,Seat_Id__c from Seats__c];
        
        Test.startTest();
            SeatSelectorController.fetchConfiguration();
        Test.stopTest();
    }
    
    @isTest 
    static void test_getPreferenceValues(){
        Test.startTest();
        	SeatSelectorController seat = new SeatSelectorController();
            SeatSelectorController.getPreferenceValues();
        Test.stopTest();
    }

}