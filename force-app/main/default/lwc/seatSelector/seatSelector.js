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
    floorPlan = {
        block :[
            {   id:1,
                cubicle : [
                    {
                    id:1,
                    entry: "topentry",
                    seat : [
                        {id : 123},
                        {id : 345},
                        {id : 678},
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
            },{
                id:6,
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
            },{
                id:6,
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

        getPreferenceValues()
        .then(data => {
            debugger;
            this.prefernceOptions = data;
            this.menuLoaded = true;
        })
        .catch(error => {
            this.displayError(error);
        });
        
        fetchConfiguration()
            .then(result => {
                var response = JSON.parse(result);
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
                
                /*for(var index in response.Preferences){
                    preference.push({
                        value: response.Preferences[index].preference,
                        label: response.Preferences[index].preference
                      });
                    this.prefernceOptions = preference;
                }*/
            })
            .catch(error => {
                this.error = error;
            });

        
        for(var obj in this.floorPlan.block){
            for(var cube in this.floorPlan.block[obj].cubicle){
                this.floorPlan.block[obj].cubicle[cube].class = this.floorPlan.block[obj].cubicle[cube].entry + ' cubicle';
            }
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

}