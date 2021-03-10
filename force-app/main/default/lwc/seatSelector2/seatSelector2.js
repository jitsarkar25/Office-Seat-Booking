import { LightningElement,track,api } from 'lwc';
import fetchConfiguration from '@salesforce/apex/SeatSelectorController.fetchConfiguration';
import getPreferenceValues from '@salesforce/apex/SeatSelectorController.getPreferenceValues';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import bookSeat from '@salesforce/apex/SeatSelectorController.bookSeat';

export default class SeatSelector extends LightningElement {

    /*get prefernceOptions () {
        return [{'key':'AC','value':'AC'},
                       {'key':'Meeting Room','value':'Meeting Room'},
                       {'key':'Pantry','value':'Pantry'},
                       {'key':'Door','value':'Door'}];
    }*/
    menuLoaded = false;
    lastRow = []; //rasika
    floorPlan = {};
    columns='';
    acRow=[];
    showConfirmationModal = false;
    bookBtnDisabled=true;
    startDate='';
    endDate='';
  
    locations = [];
    cityOptions = [];
    buildingList = [];
    floorList = [];
    prefernceOptions = [];
    error;
    //rasika
    blockList = [];
    cubicleList = [];
    seatList = [];
    blockListForFloorPlan = [];
    cubicleListForFloorPlan = [];
    seatListForFloorPlan = [];
    floor;
    selectedSeatId='';
    location;
    building;

    @api userdetails={};

    connectedCallback(){

        const promises = [
            getPreferenceValues(),
            fetchConfiguration()
        ];

        Promise.all(promises)
        .then(responseArr => {
            this.prefernceOptions = responseArr[0];
            this.parseConfigResponse(responseArr[1]);
            this.menuLoaded = true;
            this.handleLocationChange('',this.userdetails.baseLocation);
        });
        debugger;
    }

    buildingOptions = [];
    handleLocationChange(event,loc) {
        this.location = loc || event.detail.value; 
        var building = [];   
        for(var key in this.buildingList){
            if(this.buildingList[key].location.includes(this.location)){
                building.push({
                    value: this.buildingList[key].building,
                    label: this.buildingList[key].building
                  });
                this.buildingOptions = building;
            }  
        }   
    }

    floorOptions = [];
    handleBuildingChange(event) {
        this.building = event.detail.value;
        var floor = [];   
        for(var key in this.floorList){
            if(this.floorList[key].label.includes(this.building)){
                floor.push({
                    value: this.floorList[key].value,
                    label: this.floorList[key].value
                  });
            }
            this.floorOptions = floor;  
        }
    }

    //rasika
    generateFloorPlan() {
        var floorPlan = {};
      var blockArray = [];
      var innerblock = {};
      var cubicleArray = [];
      var cubicleBlock = {};
      var seatArray = [];
      var underSeatIds = {};

      for (var obj in this.blockListForFloorPlan) {
        cubicleArray = [];

        //rasika---
        var meetingRoomArr = [];
        var windowArr = [];
        innerblock.window = [];
        innerblock.meetingRoom = [];

        for (var cube in this.cubicleListForFloorPlan) {
          if (this.cubicleListForFloorPlan[cube].block.includes(this.blockListForFloorPlan[obj].blockId)) {
            cubicleBlock.id = this.cubicleListForFloorPlan[cube].cubicleId;
            cubicleBlock.entry = this.cubicleListForFloorPlan[cube].entry; //cubicleBlock.seat = this.cubicleListForFloorPlan;
  
            seatArray = [];

            for (var seat in this.seatListForFloorPlan) {
              if (this.cubicleListForFloorPlan[cube].cubicleId.includes(this.seatListForFloorPlan[seat].cubicle)) {
                underSeatIds.Id = this.seatListForFloorPlan[seat].seatId;
                underSeatIds.isCloseToAC = this.seatListForFloorPlan[seat].isCloseToAC;
                underSeatIds.isCloseToDoor = this.seatListForFloorPlan[seat].isCloseToDoor;
                underSeatIds.isCloseToMeetingRoom = this.seatListForFloorPlan[seat].isCloseToMeetingRoom;
                underSeatIds.isCloseToWindow = this.seatListForFloorPlan[seat].isCloseToWindow;
                underSeatIds.title="Seat Id: "+this.seatListForFloorPlan[seat].seatId;
                seatArray.push(JSON.parse(JSON.stringify(underSeatIds)));
              }
            }
        
            cubicleBlock.seat = seatArray;
            cubicleArray.push(JSON.parse(JSON.stringify(cubicleBlock)));
            
          }
        }

        innerblock.id = this.blockListForFloorPlan[obj].blockId;
        //rasika
        /*if(this.blockListForFloorPlan[obj].window != null){
            var windowArr = [];
            windowArr.push(this.blockListForFloorPlan[obj].window);
            innerblock.window = windowArr;
        }else{
            innerblock.window = [];
        }

        if(this.blockListForFloorPlan[obj].meetingRoom != null){
            var meetingRoomArr = [];
            meetingRoomArr.push(this.blockListForFloorPlan[obj].meetingRoom);
            innerblock.meetingRoom = meetingRoomArr;
        }else{
            innerblock.meetingRoom = [];
        }*/
        
        if(this.blockListForFloorPlan[obj].window != null){
            
            var res = [] ;
            res = (this.blockListForFloorPlan[obj].window).split(',');
            for(var i in res){
              windowArr.push(res[i]);
            }
            innerblock.window = windowArr;
          }else {
            innerblock.window = [];
          }
          
          if(this.blockListForFloorPlan[obj].meetingRoom != null){
            
            var res = [] ;
            res = (this.blockListForFloorPlan[obj].meetingRoom).split(',');
            for(var i in res){
              meetingRoomArr.push(res[i]);
            }
            innerblock.meetingRoom = meetingRoomArr;
          }else {
            innerblock.meetingRoom = [];
          }

          
        innerblock.isWindow = this.blockListForFloorPlan[obj].isWindow;
        innerblock.isMeetingRoom = this.blockListForFloorPlan[obj].isMeetingRoom;
        
        innerblock.cubicle = cubicleArray;
        blockArray.push(JSON.parse(JSON.stringify(innerblock)));
      }
      /*underSeatIds.Id = 123;
       seatArray.push(underSeatIds);
       cubicleBlock.id = 1;
      cubicleBlock.entry = 'topentry';
      cubicleBlock.seat = seatArray;
       cubicleArray.push(cubicleBlock);
       innerblock.id = 1;
      innerblock.cubicle = cubicleArray;
         blockArray.push(innerblock);
      blockArray.push(innerblock);*/
      debugger;
      var floorSel = this.floorList.filter((flr)=>{
            return flr.value == this.floor;
      })
      floorPlan.columns = floorSel[0].column;
      floorPlan.block = blockArray;
      return floorPlan;
    
    }

    handleFloorChange(event) {
        this.floor = event.detail.value;
    }

    //rasika
    handleSearch(event) {
        if(this.location == undefined || this.building == undefined || this.floor == undefined
            || this.startDate == "" || this.endDate == ""){
            this.showToast('Please provide all the details to generate floor plan','error');
            //alert('Please provide all the details to generate floor plan');
            return;
        }

       if(this.totalHrsForSeatBooked > 9){
            this.showToast('Booking time should not be more than 9 hours','error');
            //reset the floor plan
            this.floorPlan = {};
            this.lastRow = [];;
            return;
       }

        var block = [];
        var cubicle = [];
        var seat = [];

       for(var key in this.blockList){
        if(this.blockList[key].floor.includes(this.floor)){
            block.push({
                floor: this.blockList[key].floor,
                blockId: this.blockList[key].blockId,
                isMeetingRoom: this.blockList[key].isMeetingRoom,
                isWindow: this.blockList[key].isWindow,
                meetingRoom: this.blockList[key].meetingRoom,
                window: this.blockList[key].window
              });
        }
        this.blockListForFloorPlan = block;  
        }

        for(var index in this.cubicleList){
            for(var key in this.blockListForFloorPlan){
                if(this.blockListForFloorPlan[key].blockId.includes(this.cubicleList[index].block)){
                    cubicle.push({
                        block: this.cubicleList[index].block,
                        cubicleId: this.cubicleList[index].cubicleId,
                        entry: this.cubicleList[index].entry
                    });
                }
                this.cubicleListForFloorPlan = cubicle;  
            }
        }

        for(var key in this.seatList){
            for(var index in this.cubicleListForFloorPlan){
                if(this.cubicleListForFloorPlan[index]!=undefined && this.cubicleListForFloorPlan[index].cubicleId.includes(this.seatList[key].cubicle)){
                    seat.push({
                        cubicle: this.seatList[key].cubicle,
                        seatId: this.seatList[key].seatId,
                        isCloseToAC: this.seatList[key].isCloseToAC,
                        isCloseToDoor: this.seatList[key].isCloseToDoor,
                        isCloseToMeetingRoom: this.seatList[key].isCloseToMeetingRoom,
                        isCloseToWindow: this.seatList[key].isCloseToWindow,
                        title:"Close To Window " + this.seatList[key].isCloseToWindow
                    });
                }
                this.seatListForFloorPlan = seat;
            }
        }

        this.floorPlan = this.generateFloorPlan();
        /*for(var obj in this.floorPlan.block){
            for(var cube in this.floorPlan.block[obj].cubicle){
                this.floorPlan.block[obj].cubicle[cube].class = this.floorPlan.block[obj].cubicle[cube].entry + ' cubicle';
            }
        }*/

        var columns = this.floorPlan.columns;
        var rows = this.floorPlan.block.length / columns;    
        
        var blocks =[];
        var bottomRow =[];
        this.floorPlan.row=[];
        this.lastRow=[];
        this.acRow=[];

        if(columns == 3)
        {
            this.acRow.push({id: 1,class: "slds-col slds-size_4-of-12 slds-align_absolute-center leftAC"});
            this.acRow.push({id: 2,class: "slds-col slds-size_4-of-12 slds-align_absolute-center rightAC"});
        }
        else if(columns == 2 ){
            this.acRow.push({id: 1,class: "slds-col slds-size_4-of-12 slds-align_absolute-center"});
        }
        

        this.floorPlan.block.forEach((item,index) =>{
            blocks.push(item);
           
            if((index+1) % columns == 0 ){
                rows--;
                blocks.id = index;
                if(rows == 0){
                    blocks.isAC = false;
                }
                else{
                    blocks.isAC = true;
                }
                this.floorPlan.row.push(blocks);
                blocks = [];
            }

           

            if(item.window.length > 0){
                if(item.window.includes('left')){
                    item.isLeftWindow = true;
                }
                if(item.window.includes('right')){
                    item.isRightWindow = true;
                }
                if(item.window.includes('top')){
                    item.isTopWindow = true;
                }
                if(item.window.includes('bottom')){
                    this.lastRow.push({id: 1,isBottomWindow:true});
                }
            }

            if(item.meetingRoom.length > 0){
                if(item.meetingRoom.includes('left')){
                    item.isLeftMeeting= true;
                }
                if(item.meetingRoom.includes('right')){
                    item.isRightMeeting = true;
                }
                if(item.meetingRoom.includes('top')){
                    item.isTopMeeting = true;
                }
                if(item.meetingRoom.includes('bottom')){
                    this.lastRow.push({id: 2,isBottomMeeting:true});
                }
            }

            
            item.cubicle.forEach((cube) =>{
                cube.class = cube.entry + ' cubicle';
            });
        });

        if(bottomRow.length > 0){
            this.floorPlan.row.push(bottomRow);
        }
    }
    

    parseConfigResponse(resp){
        var response = JSON.parse(resp);
                var city = [];
                var floor = [];
                var preference = [];
                //rasika
                var block = [];
                var cubicle = [];
                var seat = [];

                for(var index in response.locations){
                    this.locations.push(response.locations[index].location);
                    city.push({
                        value: response.locations[index].location,
                        label: response.locations[index].location
                      });  
                }
                this.cityOptions = city;
                for(var key in response.buildings){
                    this.buildingList.push(response.buildings[key]);  
                }

                for(var index in response.floors){
                    floor.push({
                        value: response.floors[index].floorName,
                        label: response.floors[index].building,
                        column: response.floors[index].columns
                      });  
                }
                this.floorList = floor;
                
                //rasika
                for(var index in response.blocks){
                    block.push({
                        floor: response.blocks[index].floor,
                        blockId: response.blocks[index].blockId,
                        isMeetingRoom: response.blocks[index].isMeetingRoom,
                        isWindow: response.blocks[index].isWindow,
                        meetingRoom: response.blocks[index].meetingRoom,
                        window: response.blocks[index].window
                      });  
                }
                this.blockList = block;

                for(var index in response.cubicles){
                    cubicle.push({
                        block: response.cubicles[index].block,
                        cubicleId: response.cubicles[index].cubicleId,
                        entry: response.cubicles[index].entry
                      });  
                this.cubicleList = cubicle;
                }

                for(var index in response.seats){
                    seat.push({
                        cubicle: response.seats[index].cubicle,
                        seatId: response.seats[index].seatId,
                        isCloseToAC: response.seats[index].isCloseToAC,
                        isCloseToDoor: response.seats[index].isCloseToDoor,
                        isCloseToMeetingRoom: response.seats[index].isCloseToMeetingRoom,
                        isCloseToWindow: response.seats[index].isCloseToWindow,
                      });  
                }
                this.seatList = seat;

}

seatclick(evt){
    debugger;
    if(!evt.target.classList.contains('bookedSeat')){
       

        this.template.querySelectorAll('.circle').forEach((cir)=>{
            if(cir.classList.contains('selectedSeat')){
                cir.classList.remove('selectedSeat');
                cir.classList.add('availableSeat');
            }
        });
        evt.target.classList.remove('availableSeat');
        evt.target.classList.add('selectedSeat');
        this.selectedSeatId = evt.target.dataset.seatid;
        this.bookBtnDisabled=false;
    }
    
}

bookSeatModal(evt){
    this.showConfirmationModal = true;
}

closeConfirmation(){
    this.showConfirmationModal = false;
}

fromTime;
toTime;
totalHrsForSeatBooked;
startTimeChange(evt){
    debugger;
    var startTime = evt.target.value;
    var d = new Date(startTime);
    this.fromTime = new Date(startTime);
    var minutes = d.getMinutes() == 0 ? '00' : d.getMinutes();
    var hour = d.getHours() == 0 ? '12' : d.getHours() > 12 ? d.getHours() - 12 : d.getHours();
    var ampm = d.getHours() >= 12 ? 'PM' : 'AM';
    var month = d.getMonth()+1;
    this.startDate = hour +':'+minutes+' '+ampm+' '+d.getDate()+'/'+month+'/'+d.getFullYear();
}

endTimeChange(evt){
    debugger;
    var endTime = evt.target.value;
    var d = new Date(endTime);
    this.toTime = new Date(endTime);
    var minutes = d.getMinutes() == 0 ? '00' : d.getMinutes();
    var hour = d.getHours() == 0 ? '12' : d.getHours() > 12 ? d.getHours() - 12 : d.getHours();
    var ampm = d.getHours() >= 12 ? 'PM' : 'AM';
    var month = d.getMonth()+1;
    this.endDate = hour +':'+minutes+' '+ampm+' '+d.getDate()+'/'+month+'/'+d.getFullYear();

    var milliseconds = (this.toTime-this.fromTime);
    var seconds = milliseconds / 1000;
    var minutes = seconds / 60;
    this.totalHrsForSeatBooked = minutes / 60;
}

    //custom toast implementation
    message;
    showToastBar = false;
    autoCloseTime = 5000;
 
    showToast(message,type){
        this.type = type,
        this.message = message;
        this.showToastBar = true;
        setTimeout(() =>{
            this.closeModel();
        }, this.autoCloseTime);
    }

    closeModel(){
        this.showToastBar = false;
        this.type = '';
        this.message = '';
	}
 
    get getIconName(){
        return 'utility:' + this.type;
    }
 
    get innerClass(){
        return 'slds-icon_container slds-icon-utility-' + this.type + ' slds-icon-utility-success slds-m-right_small slds-no-flex slds-align-top';
    }
 
    get outerClass(){
        return 'slds-notify slds-notify_toast slds-theme_' + this.type;
    }

    bookSeatConf(evt){
        var bookDetails={};
        bookDetails['empId']=this.userdetails.id;
        bookDetails['seatNo']=this.selectedSeatId;
        bookDetails['fromTime']=this.fromTime.toISOString().replaceAll(':','%3A').slice(0, -5);;
        bookDetails['toTime']=this.toTime.toISOString().replaceAll(':','%3A').slice(0, -5);;

        bookSeat({bookingDetails: bookDetails}).then((resp) =>{
           if(resp[0] == 'Success'){
               var obj = JSON.parse(resp[1]);
               if(obj.status == 200){
                this.showToast('Seat Booked Successfully','success');
                this.markSeatBooked(this.selectedSeatId);
                this.closeConfirmation();
               }
               else if(obj.statusText){
                this.showToast(obj.statusText,'error');
               }
               else{
                this.showToast('Something went wrong. Please try later','error');
               }
           }
           else{
            this.showToast('Something went wrong. Please try later','error');
           }
        });
    }

    markSeatBooked(seatId){
        this.floorPlan.row.forEach((arow)=>{
            arow.forEach((ablock)=>{
                ablock.cubicle.forEach((acubicle)=>{
                    acubicle.seat.forEach((aSeat)=>{
                        if(aSeat.Id == seatId)
                        {
                            aSeat.isBooked=true;
                        }
                    })
                })
            })
        });
    }

}