import { Component, OnInit } from '@angular/core';
import { State } from './classes/state';
import { StateService } from './service/state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  states : State[] = []; 
  state:State[] = [];

  insert:State={
    intCountryID:6,
    strStateName:"Himachal Pradesh"
  }

  update:State={
    intStateID :47,
    strStateName:"HP",
    intCountryID:6
  }
  constructor(private stateService: StateService) {}

  ngOnInit(): void {
    // this.getStates();
    // this.getState(5);
    // this.postState(this.insert);
    this.updateState(this.update)
    // this.deleteState(51)
    // this.updateState(47,'UP',6)
  }

  getStates() {
    this.stateService.getAllStates().subscribe((sta:any) => {
      this.states = sta;
      console.log(this.states)
    });
  }

  getState(id:number){
    this.stateService.getStatebyId(id).subscribe((sta:any)=>{
      this.state = sta
      console.log(this.state)
    });
  }
  
  updateState(update:State){
    this.stateService.updateState(update).subscribe((response:any) =>{
      console.log("State updated Successfully",response)
    },
    (error:any) =>{
      console.log("Error Occured when updating a state",error);
    }
      
    )
  }
  // updateState(id:number,state:string,cid:number){
  //   this.stateService.updateState(id,state,cid).subscribe((response:any) =>{
  //     console.log("State updated Successfully",response)
  //   },
  //   (error:any) =>{
  //     console.log("Error Occured when updating a state",error);
  //   }
      
  //   )
  // }

  postState(insert:State){
    this.stateService.insertState(insert).subscribe((response:any) =>{
      console.log("State added Successfully",response)
    },
    (error:any) =>{
      console.log("Error Occured when adding a state",error);
    }
      
    )
  }

  deleteState(id:number){
    this.stateService.deleteState(id).subscribe((response:any)=>
    {
      console.log("State Deleted Succesfully",response)
    },
    (error:any) =>{
      console.log("Error Occured while deleting a file", error)
    }
    
    )
  }
  
}
