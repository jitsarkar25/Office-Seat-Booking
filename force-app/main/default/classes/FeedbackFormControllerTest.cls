@isTest(seeAllData=true)
public class FeedbackFormControllerTest {

    @isTest 
    static void test_submitFeedback(){
        Map<String,String> dataMap = new Map<String,String>();
        
        dataMap.put('seatNumber','NGP_G_G1_B1_C2_S1');
        dataMap.put('feedbackRating','5');
        dataMap.put('feedbackComments','Good');
        dataMap.put('bookingId','NGP12345');
        dataMap.put('employeeNumber','1234');

        Test.startTest();
        FeedbackFormController feedbackController = new FeedbackFormController();
        FeedbackFormController.submitFeedback(dataMap);
        Test.stopTest();
    }
}