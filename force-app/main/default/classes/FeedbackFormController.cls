public without sharing class FeedbackFormController {
    public FeedbackFormController() {}

    @AuraEnabled
    public static void submitFeedback(Map<String, String> dataMap) {
        //List to store feedback records
        List<Feedback__c> feedbackList = new List<Feedback__c>();

        //create feedback object to store single record
        if(dataMap != null){
            Feedback__c feedback = new Feedback__c();
            feedback.Seat_Number__c = dataMap.get('seatNumber');
            feedback.Seat_Information__c = dataMap.get('seatNumber');
            feedback.Rating__c = Integer.valueof(dataMap.get('feedbackRating'));
            feedback.Comments__c = dataMap.get('feedbackComments');
            feedbackList.add(feedback);
        }

        if(feedbackList.size()>0){
            insert feedbackList;
        }  
    }
}