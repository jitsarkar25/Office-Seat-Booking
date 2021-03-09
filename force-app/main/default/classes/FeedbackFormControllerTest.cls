@isTest
public class FeedbackFormControllerTest {

    @isTest 
    static void test_submitFeedback(){
        Map<String,String> dataMap = new Map<String,String>();
        dataMap.put('seatNumber','12345');
        dataMap.put('feedbackRating','5');
        dataMap.put('feedbackComments','Good');

        Test.startTest();
        FeedbackFormController feedbackController = new FeedbackFormController();
        FeedbackFormController.submitFeedback(dataMap);
        Test.stopTest();
    }
}