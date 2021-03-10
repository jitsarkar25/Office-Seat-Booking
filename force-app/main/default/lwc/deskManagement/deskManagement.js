import { LightningElement } from 'lwc';

export default class DeskManagement extends LightningElement {
    loginPage =true;
    seatSelector=false;
    mybookings=false;
    userDetails={};

    navigateToBookASeat(event){
        debugger;
        this.userDetails = event.detail;
        this.loginPage=false;
        this.seatSelector=true;
        this.mybookings=false;
    }

    navigateToMyBookings(event){
        this.userDetails = event.detail;
        this.loginPage=false;
        this.seatSelector=false;
        this.mybookings=true;
    }

    booksuccess(event){
        this.userDetails = event.detail;
        this.loginPage=false;
        this.seatSelector=false;
        this.mybookings=true;
    }
}