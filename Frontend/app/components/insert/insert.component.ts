import { Component } from '@angular/core';
import { State } from '../../classes/state';
import { StateService } from '../../services/state.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-insert',
  templateUrl: './insert.component.html',
  styleUrl: './insert.component.css'
})
export class InsertComponent {

  constructor(private stateService : StateService){
  }

  state:State= new State()

  insertStateForm = new FormGroup(
  {
    stateName:new FormControl('',[Validators.required]),
    countryId:new FormControl(0,[Validators.required])
  }
  );

  onSubmit(){
    console.log(this.insertStateForm.value)
    this.state={
      intCountryID:this.insertStateForm.value.countryId,
      strStateName:this.insertStateForm.value.stateName
    }
    this.postState(this.state)
  }

  postState(state:State){
   this.stateService.postState(state).subscribe((response:any)=>{
      console.log('State added Succesfully',response)
   },
   (error:any)=>{
     console.log('Error Occured when adding a state',error)
   }
   );
  }
}
