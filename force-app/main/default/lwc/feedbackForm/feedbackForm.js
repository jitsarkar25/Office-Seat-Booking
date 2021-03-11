import { LightningElement, api } from 'lwc';
import submitFeedback from '@salesforce/apex/FeedbackFormController.submitFeedback';

export default class FeedbackForm extends LightningElement {
    @api bookingId;
    @api seatNumber;
    @api employeeNumber;
    feedbackRating;
    feedbackComments;
    status;
    error;
    dataMap = [];

    //capture rating from form
    rating(event) {
        if (event.target.name === "feedbackRating") {
        this.feedbackRating = event.target.value;
        }
    }

    //capture comments from form
    handleComments(event) {
        this.feedbackComments = event.detail.value;
    }

    //take action on feedback submit
    @api
    submitFeedback() {
        this.dataMap = {'feedbackRating' : this.feedbackRating,
                        'feedbackComments' : this.feedbackComments,
                        'seatNumber': this.seatNumber,
                        'bookingId': this.bookingId,
                        'employeeNumber': this.employeeNumber}; 
        var dataMap = this.dataMap;
        submitFeedback({dataMap})
            .then(result => {
                this.status = result;
            })
            .catch(error => {
                this.error = error;
            });
    }
}