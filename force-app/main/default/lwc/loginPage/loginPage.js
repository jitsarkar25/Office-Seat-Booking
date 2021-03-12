import { LightningElement,api } from 'lwc';
import loginUser from '@salesforce/apex/SeatSelectorController.loginUser';

export default class LoginPage extends LightningElement {
    empId;
    @api userDetails;
    isLoading = false;
    @api loggedIn =false;
    loginPage=true;
    seatSelector=false;
    isModalOpen=false;
    showToastBar = false;
    autoCloseTime = 5000;
  

    //capture username from form
    captureempId(event) {
        this.empId = event.target.value;
    }

    continueUser(){
        this.isLoading = true;
        loginUser({empId: this.empId}).then((resp)=>{
            if(resp[0] == 'Success'){
            var loginObj = JSON.parse(resp[1]);
            if(loginObj.status == 200){
                this.userDetails=loginObj.object;
                this.userDetails.Name = loginObj.object.firstName+' '+loginObj.object.lastName;
                this.userDetails.baseLocation =this.titleCase(loginObj.object.baseLocation);
                this.loggedIn=true;
                
            }
            else{
                alert("Incorrect Employee Id");
            }
        }else{
            alert(resp[1]);
        }
        this.isLoading = false;
        });
    }

    bookASeat(){
        const bookSeat = new CustomEvent('bookseat', { detail: this.userDetails});
        this.dispatchEvent(bookSeat);
    }

    myBookings(){
        const mybookings = new CustomEvent('mybookings', { detail: this.userDetails});
        this.dispatchEvent(mybookings);
    }


 titleCase(str){
    str = str.toLowerCase();
    str = str.charAt(0).toUpperCase() + str.slice(1); 
    return str;
 }

 rateus(){
     this.isModalOpen=true;
 }
 closeModal(){
     this.isModalOpen=false;
 }

 submitFeedback(){
     this.closeModal();
     this.showToast('Thank you for your feedback','success');
 }

 showToast(message,type){
    this.type = type,
    this.message = message;
    this.showToastBar = true;
    setTimeout(() =>{
        this.showToastBar = false;
    }, this.autoCloseTime);
}
}