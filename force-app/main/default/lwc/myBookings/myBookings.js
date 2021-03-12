import { LightningElement,api } from 'lwc';
import getMyBookings from '@salesforce/apex/SeatSelectorController.getMyBookedSeats';
import occupySeat from '@salesforce/apex/SeatSelectorController.occupySeat';
import returnSeat from '@salesforce/apex/SeatSelectorController.returnSeat';
import getFeedback from '@salesforce/apex/SeatSelectorController.getFeedback';

export default class MyBookings extends LightningElement {

    selectedBookId='';
    selectedSeatId='';
    isModalOpen=false;
    value="all";
    
    
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

        const promises = [
            getMyBookings({userDetails: userDets}),
            getFeedback({empId: this.userdetails.id})
        ]; 
        Promise.all(promises)
        .then(responseArr => {
            debugger;
            this.parseGetBookings(responseArr[0],responseArr[1]);

        });
        /*getMyBookings({userDetails: userDets}).then((resp)=>{
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
        });*/
    }

    parseGetBookings(resp,resp2){
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

                resp2.forEach((feedback)=>{
                    if(feedback.Booking_Id__c == item.bookingId)
                    {
                        item.rating = feedback.Rating__c;
                        item.isFeedBackBtn=false;
                        item.isFeedbackGiven=true;
                    }
                })

           }) ;
           this.mybookings.reverse();
           this.isLoading=false;
        }
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
                    setTimeout(() =>{
                        this.getBookData();
                    }, 2000);
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
        setTimeout(() =>{
            this.getBookData();
        }, 2000);
    }

    closeModal(){
        this.isModalOpen = false;
    }

    goback(){
        const goback = new CustomEvent('back', { detail: this.userdetails});
        this.dispatchEvent(goback);
    }

}