import { LightningElement } from 'lwc';
import loginUser from '@salesforce/apex/SeatSelectorController.loginUser';

export default class LoginPage extends LightningElement {
    empId;
    userDetails;
    isLoading = false;
    loggedIn =false;
    loginPage=true;
    seatSelector=false;
  

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
        this.loginPage=false;
        this.seatSelector=true;
    }


 titleCase(str){
    str = str.toLowerCase();
    str = str.charAt(0).toUpperCase() + str.slice(1); 
    return str;
 }

}