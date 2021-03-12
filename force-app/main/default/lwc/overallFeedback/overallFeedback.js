import { LightningElement, api } from 'lwc';
import submitOverAll from '@salesforce/apex/FeedbackFormController.submitOverAll';

export default class FeedbackForm extends LightningElement {
    @api bookingId;
    @api seatNumber;
    @api employeeNumber;
    @api employeeName;

    
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

    submitFeedback() {
            submitOverAll({rating: this.feedbackRating, comment: this.feedbackComments, employeeId: this.employeeNumber, employeeName: this.employeeName})
            .then(result => {
                const goback = new CustomEvent('submit', { detail: result});
                this.dispatchEvent(goback);
            })
            .catch(error => {
                this.error = error;
            });
    }
}