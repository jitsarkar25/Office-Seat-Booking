import { LightningElement,track } from 'lwc';
import fetchConfiguration from '@salesforce/apex/SeatSelectorController.fetchConfiguration';
import getPreferenceValues from '@salesforce/apex/SeatSelectorController.getPreferenceValues';

export default class SeatSelector extends LightningElement {

    /*get prefernceOptions () {
        return [{'key':'AC','value':'AC'},
                       {'key':'Meeting Room','value':'Meeting Room'},
                       {'key':'Pantry','value':'Pantry'},
                       {'key':'Door','value':'Door'}];
    }*/
    menuLoaded = false;
    bookBtnDisabled=true;
    lastRow = [];
    floorPlan = {
        columns:3,
        block :[
            {
                id:1,
                window: ['left'],
                meetingRoom: [],
                isWindow: true,
                isMeetingRoom: false,
                cubicle : [
                    {
                    id:1,
                    entry: "topentry",
                    seat : [
                        {id : 123,isBooked:true},
                        {id : 345},
                        {id : 678,isBooked:true},
                        {id : 890},
                    ]
                },
                {
                    id:2,
                    entry: "topentry",
                    seat : [
                        {id : 123},
                        {id : 345},
                        {id : 678},
                        {id : 890},
                    ]
                },
                {
                    id:3,
                    entry: "bottomentry",
                    seat : [
                        {id : 123},
                        {id : 345},
                        {id : 678},
                        {id : 890},
                    ]
                },
                {
                    id:4,
                    entry: "bottomentry",
                    seat : [
                        {id : 123},
                        {id : 345},
                        {id : 678},
                        {id : 890},
                    ]
                },

            ]
            },
            {
                id:2,
                window: [],
                meetingRoom: [],
                isWindow: false,
                isMeetingRoom: false,
                cubicle : [
                    {
                    id:5,
                    entry: "leftentry",
                    seat : [
                        {id : 123},
                        {id : 345},
                        {id : 678},
                        {id : 890},
                    ]
                },
                {
                    id:6,
                    entry: "rightentry",
                    seat : [
                        {id : 123},
                        {id : 345},
                        {id : 678},
                        {id : 890},
                    ]
                },
                {
                    id:7,
                    entry: "leftentry",
                    seat : [
                        {id : 123},
                        {id : 345},
                        {id : 678},
                        {id : 890},
                    ]
                },
                {
                    id:8,
                    entry: "rightentry",
                    seat : [
                        {id : 123},
                        {id : 345},
                        {id : 678},
                        {id : 890},
                    ]
                },

            ]
            },
            {
                id:3,
                window: [],
                meetingRoom: ['right'],
                isWindow: false,
                isMeetingRoom: true,
                cubicle : [{
                    id:9,
                    entry: "leftentry",
                    seat : [
                        {id : 123},
                        {id : 345},
                        {id : 678},
                        {id : 890},
                    ]
                },
                {
                    id:9,
                    entry: "rightentry",
                    seat : [
                        {id : 123},
                        {id : 345},
                        {id : 678},
                        {id : 890},
                    ]
                },
                {
                    id:10,
                    entry: "leftentry",
                    seat : [
                        {id : 123},
                        {id : 345},
                        {id : 678},
                        {id : 890},
                    ]
                },
                {
                    id:11,
                    entry: "rightentry",
                    seat : [
                        {id : 123},
                        {id : 345},
                        {id : 678},
                        {id : 890},
                    ]
                },

            ]
            },
            {
                id:4,
                window: ['left'],
                meetingRoom: [],
                isWindow: true,
                isMeetingRoom: false,
                cubicle : [{
                    id:9,
                    entry: "leftentry",
                    seat : [
                        {id : 123},
                        {id : 345},
                        {id : 678},
                        {id : 890},
                    ]
                },
                {
                    id:9,
                    entry: "rightentry",
                    seat : [
                        {id : 123},
                        {id : 345},
                        {id : 678},
                        {id : 890},
                    ]
                },
                {
                    id:10,
                    entry: "leftentry",
                    seat : [
                        {id : 123},
                        {id : 345},
                        {id : 678},
                        {id : 890},
                    ]
                },
                {
                    id:11,
                    entry: "rightentry",
                    seat : [
                        {id : 123},
                        {id : 345},
                        {id : 678},
                        {id : 890},
                    ]
                },

            ]
            },
            {
                id:5,
                window: [],
                meetingRoom: [],
                isWindow: false,
                isMeetingRoom: false,
                cubicle : [{
                    id:9,
                    entry: "leftentry",
                    seat : [
                        {id : 123},
                        {id : 345},
                        {id : 678},
                        {id : 890},
                    ]
                },
                {
                    id:9,
                    entry: "rightentry",
                    seat : [
                        {id : 123},
                        {id : 345},
                        {id : 678},
                        {id : 890},
                    ]
                },
                {
                    id:10,
                    entry: "leftentry",
                    seat : [
                        {id : 123},
                        {id : 345},
                        {id : 678},
                        {id : 890},
                    ]
                },
                {
                    id:11,
                    entry: "rightentry",
                    seat : [
                        {id : 123},
                        {id : 345},
                        {id : 678},
                        {id : 890},
                    ]
                },

            ]
            },
            {
                id:6,
                window: [],
                meetingRoom: ['right'],
                isWindow: false,
                isMeetingRoom: true,
                cubicle : [{
                    id:9,
                    entry: "leftentry",
                    seat : [
                        {id : 123},
                        {id : 345},
                        {id : 678},
                        {id : 890},
                    ]
                },
                {
                    id:9,
                    entry: "rightentry",
                    seat : [
                        {id : 123},
                        {id : 345},
                        {id : 678},
                        {id : 890},
                    ]
                },
                {
                    id:10,
                    entry: "leftentry",
                    seat : [
                        {id : 123},
                        {id : 345},
                        {id : 678},
                        {id : 890},
                    ]
                },
                {
                    id:11,
                    entry: "rightentry",
                    seat : [
                        {id : 123},
                        {id : 345},
                        {id : 678},
                        {id : 890},
                    ]
                },

            ]
            },
            {
                id:7,
                window: [],
                meetingRoom: ['left','bottom'],
                isWindow: true,
                isMeetingRoom: false,
                cubicle : [{
                    id:9,
                    entry: "leftentry",
                    seat : [
                        {id : 123},
                        {id : 345},
                        {id : 678},
                        {id : 890},
                    ]
                },
                {
                    id:9,
                    entry: "rightentry",
                    seat : [
                        {id : 123},
                        {id : 345},
                        {id : 678},
                        {id : 890},
                    ]
                },
                {
                    id:10,
                    entry: "leftentry",
                    seat : [
                        {id : 123},
                        {id : 345},
                        {id : 678},
                        {id : 890},
                    ]
                },
                {
                    id:11,
                    entry: "rightentry",
                    seat : [
                        {id : 123,isBooked:true},
                        {id : 345,isBooked:true},
                        {id : 678,isBooked:true},
                        {id : 890,isBooked:true},
                    ]
                },

            ]
            },
            {
                id:8,
                window: [],
                meetingRoom: ['bottom'],
                isWindow: false,
                isMeetingRoom: false,
                cubicle : [{
                    id:9,
                    entry: "leftentry",
                    seat : [
                        {id : 123},
                        {id : 345},
                        {id : 678},
                        {id : 890},
                    ]
                },
                {
                    id:9,
                    entry: "rightentry",
                    seat : [
                        {id : 123},
                        {id : 345},
                        {id : 678},
                        {id : 890},
                    ]
                },
                {
                    id:10,
                    entry: "leftentry",
                    seat : [
                        {id : 123},
                        {id : 345},
                        {id : 678},
                        {id : 890},
                    ]
                },
                {
                    id:11,
                    entry: "rightentry",
                    seat : [
                        {id : 123},
                        {id : 345},
                        {id : 678},
                        {id : 890},
                    ]
                },

            ]
            },
            {
                id:9,
                window: ['right','bottom'],
                meetingRoom: [],
                isWindow: false,
                isMeetingRoom: true,
                cubicle : [{
                    id:9,
                    entry: "leftentry",
                    seat : [
                        {id : 123,isBooked:true},
                        {id : 345},
                        {id : 678},
                        {id : 890},
                    ]
                },
                {
                    id:9,
                    entry: "rightentry",
                    seat : [
                        {id : 123},
                        {id : 345,isBooked:true},
                        {id : 678,isBooked:true},
                        {id : 890},
                    ]
                },
                {
                    id:10,
                    entry: "leftentry",
                    seat : [
                        {id : 123},
                        {id : 345},
                        {id : 678},
                        {id : 890},
                    ]
                },
                {
                    id:11,
                    entry: "rightentry",
                    seat : [
                        {id : 123},
                        {id : 345},
                        {id : 678},
                        {id : 890},
                    ]
                },

            ]
            }
            
        ]

    };

    locations = [];
    cityOptions = [];
    buildingList = [];
    floorList = [];
    prefernceOptions = [];
    error;
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
        });

    
        var columns = this.floorPlan.columns;
        var rows = this.floorPlan.block.length / columns;    
        /*for(var obj in this.floorPlan.block){
            for(var cube in this.floorPlan.block[obj].cubicle){
                this.floorPlan.block[obj].cubicle[cube].class = this.floorPlan.block[obj].cubicle[cube].entry + ' cubicle';
            }
        }*/
        var blocks =[];
        var bottomRow =[];
        this.floorPlan.row=[];

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

        debugger;
    }


    buildingOptions = [];
    handleLocationChange(event) {
        this.location = event.detail.value; 
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

    parseConfigResponse(resp){
        var response = JSON.parse(resp);
                var city = [];
                var floor = [];
                var preference = [];
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
                        label: response.floors[index].building
                      });  
                }
                this.floorList = floor;
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
            this.bookBtnDisabled=false;
        }
        
    }
}

