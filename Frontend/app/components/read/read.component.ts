import { Component } from '@angular/core';
import { StateService } from '../../services/state.service';
import { State } from '../../classes/state';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrl: './read.component.css'
})
export class ReadComponent {
  states :State[]=[]
  constructor(private stateService:StateService){}

  ngOnInit() {
    this.getStates()
  }

  deleteState(id:number| undefined){
    this.delete(id)
  }


  delete(id:number| undefined){
    this.stateService.deleteState(id).subscribe((response:any)=>{
      console.log("State Deleted Succesfully",response)
    },
    (error:any)=>{
      console.error("Error Occured while deleting a state",error)

    }
    
    )
  }




  getStates(){
    this.stateService.getAllStates().subscribe((response:State[])=>
    {
      this.states=response;
      console.log(this.states)
    });
  }
}
