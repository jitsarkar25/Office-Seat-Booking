import { LightningElement,api } from 'lwc';
import getMyBookings from '@salesforce/apex/SeatSelectorController.getMyBookedSeats';
import occupySeat from '@salesforce/apex/SeatSelectorController.occupySeat';
import returnSeat from '@salesforce/apex/SeatSelectorController.returnSeat';


export default class MyBookings extends LightningElement {

    selectedBookId='';
    selectedSeatId='';
    isModalOpen=false;
    
    @api userdetails={};

    mybookings=[];
    isLoading=false;

    connectedCallback(){
        this.getBookData();
    }

    getBookData()
    {
        this.isLoading=true;
        this.mybookings=[];
        var userDets = {};
        userDets.empId = this.userdetails.id;
        getMyBookings({userDetails: userDets}).then((resp)=>{
            if(resp[0] == 'Success'){
                this.mybookings = JSON.parse(resp[1]);
                this.mybookings.forEach((item)=>{
                    if(item.status == 'OCCUPIED'){
                        item.isReturnBtn = true;
                    }else if(item.status == 'BOOKED'){
                        item.isOccupyBtn = true;
                    }else if(item.status == 'RETURNED' && !item.isFeedbackGiven){
                        item.isFeedBackBtn = true;
                    }

                    if(item.bookedFrom){
                        var d = new Date(item.bookedFrom+'.0000Z');
                        var minutes = d.getMinutes() <10 ? '0'+d.getMinutes() : d.getMinutes();
                        var hour = d.getHours() == 0 ? '12' : d.getHours() > 12 ? d.getHours() - 12 : d.getHours();
                        var ampm = d.getHours() >= 12 ? 'PM' : 'AM';
                        var month = d.getMonth()+1;
                        item.booked_from = hour +':'+minutes+' '+ampm+' '+d.getDate()+'/'+month+'/'+d.getFullYear();
                    }
                    if(item.bookedTo){
                        var d = new Date(item.bookedTo+'.0000Z');
                        var minutes = d.getMinutes() <10 ? '0'+d.getMinutes() : d.getMinutes();
                        var hour = d.getHours() == 0 ? '12' : d.getHours() > 12 ? d.getHours() - 12 : d.getHours();
                        var ampm = d.getHours() >= 12 ? 'PM' : 'AM';
                        var month = d.getMonth()+1;
                        item.booked_to = hour +':'+minutes+' '+ampm+' '+d.getDate()+'/'+month+'/'+d.getFullYear();
                    }
               }) ;

               this.isLoading=false;
            }
        });
    }

    occupySeat(evt){
        var bookId = evt.target.dataset.bookid;
        this.selectedBookId = bookId;
        var bookDet={};
        bookDet.bookingId = bookId;
        this.isLoading=true;
        occupySeat({bookingDetails: bookDet}).then((resp) =>{
            if(resp[0] == 'Success'){
                var obj = JSON.parse(resp[1]);
                if(obj.status == 200)
                {
                    this.getBookData();
                }
            }
        });
    }
    giveFeedback(evt){
        debugger;
        var bookId = evt.target.dataset.bookid;
        var seatId = evt.target.dataset.seatid;
        this.selectedBookId = bookId;
        this.selectedSeatId=seatId;
        this.isModalOpen=true;
    }
    returnSeat(evt){
        var bookId = evt.target.dataset.bookid;
        var seatId = evt.target.dataset.seatid;
        this.selectedBookId = bookId;
        this.selectedSeatId=seatId;
        var bookDet={};
        bookDet.bookingId = bookId;
        this.isLoading=true;
        returnSeat({bookingDetails: bookDet}).then((resp) =>{
            if(resp[0] == 'Success'){
                var obj = JSON.parse(resp[1]);
                if(obj.status == 200)
                {
                    this.isModalOpen=true;
                    this.isLoading=false;
                }
            }
        });
    }

    submitFeedback(){
        this.isModalOpen=false;
        this.template.querySelector('c-feedback-form').submitFeedback();
        this.getBookData();
    }

    closeModal(){
        this.isModalOpen = false;
    }
}