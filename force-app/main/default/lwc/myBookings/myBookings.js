import { LightningElement } from 'lwc';

export default class MyBookings extends LightningElement {

    selectedBookId='';
    selectedSeatId='';
    isModalOpen=false;
    

    mybookings =[
        {
            booking_id:"NGP/024439/11",
            seat_id: "NGP_G_G1_B1_C1_S1",
            booked_from: "15/02/2021 9:00AM",
            booked_to: "15/02/2021 5:00PM",
            rating:"",
            status:"occupied",
            isFeedbackGiven:false
        },
        {
            booking_id:"NGP/024439/10",
            seat_id: "NGP_G_G1_B1_C1_S2",
            booked_from: "14/02/2021 9:00AM",
            booked_to: "14/02/2021 5:00PM",
            rating:"",
            status:"booked",
            isFeedbackGiven:false
        },
        {
            booking_id:"NGP/024439/10",
            seat_id: "NGP_G_G1_B1_C2_S1",
            booked_from: "13/02/2021 9:00AM",
            booked_to: "13/02/2021 5:00PM",
            rating:"",
            status:"returned",
            isFeedbackGiven:false
        },
        {
            booking_id:"NGP/024439/09",
            seat_id: "NGP_G_G1_B1_C3_S1",
            booked_from: "12/02/2021 9:00AM",
            booked_to: "12/02/2021 5:00PM",
            rating:"4",
            status:"returned",
            isFeedbackGiven:true
        }, 
        {
            booking_id:"NGP/024439/08",
            seat_id: "NGP_G_G1_B1_C1_S4",
            booked_from: "11/02/2021 9:00AM",
            booked_to: "11/02/2021 5:00PM",
            rating:"3",
            status:"returned",
            isFeedbackGiven:true
        }, 
        {
            booking_id:"NGP/024439/11",
            seat_id: "NGP_G_G1_B1_C1_S5",
            booked_from: "10/02/2021 9:00AM",
            booked_to: "10/02/2021 5:00PM",
            rating:"4",
            status:"returned",
            isFeedbackGiven:true
        }
    ];

    connectedCallback(){

       this.mybookings.forEach((item)=>{
            if(item.status == 'occupied'){
                item.isReturnBtn = true;
            }else if(item.status == 'booked'){
                item.isOccupyBtn = true;
            }else if(item.status == 'returned' && !item.isFeedbackGiven){
                item.isFeedBackBtn = true;
            }
       }) ;
    }

    occpuySeat(evt){
        var bookId = evt.target.dataset.bookid;
        this.selectedBookId = bookId;
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
        this.selectedBookId = bookId;
    }

    submitFeedback(){
        this.isModalOpen=false;
    }
}