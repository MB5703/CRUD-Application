import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StateService } from '../../services/state.service';
import { State } from '../../classes/state';

@Component({
  selector: 'app-get-state',
  templateUrl: './get-state.component.html',
  styleUrl: './get-state.component.css'
})
export class GetStateComponent {
  state:State[] =[];
  private id:any;
  submit=false;
  check = false;
  constructor(private stateService:StateService){
  }

  getStateForm = new FormGroup({
    stateId:new FormControl(0,[Validators.required])
  });

  onSubmit(){
    console.log(this.getStateForm.value.stateId);
     this.id =this.getStateForm.value.stateId
     this.getStateId(this.id)
     if(this.state.length===0){
      this.check=true;
      console.log(this.check)
     }
     this.submit=true;
  }

  getStateId(id:number):void{
    this.stateService.getState(id).subscribe(
      (response:any)=>{
      this.state = response;
      console.log(this.state);

    },
    (error:any)=>{
      console.error('Error Fetching State',error);
    }
    
    )
  }
}
