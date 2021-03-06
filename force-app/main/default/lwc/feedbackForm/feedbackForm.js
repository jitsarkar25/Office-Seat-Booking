import { LightningElement, api } from 'lwc';

export default class FeedbackForm extends LightningElement {
    @api bookingId;
    @api seatNumber;
    @api employeeNumber;

}