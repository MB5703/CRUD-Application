import { Component } from '@angular/core';
import { StateService } from '../../services/state.service';
import { State } from '../../classes/state';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent {

constructor(private stateService: StateService, private route : ActivatedRoute,private fb: FormBuilder){}

updateForm!: FormGroup;
state: State[]=[];
sta?:State;
ngOnInit(){
  this.updateForm = this.fb.group({
    intStateID: ['', Validators.required],
    strStateName: ['', Validators.required],
    intCountryID: ['', Validators.required]
  });

  this.route.paramMap.subscribe((params) => {
    const stateId = Number(params.get('id'));
    this.getState(stateId);
  });
}

onSubmit(){
  // console.log(this.updateForm.value.intStateID)
  // console.log(this.updateForm.value.intCountryID)
  // console.log(this.updateForm.value.strStateName)
this.sta ={
  intStateID:this.updateForm.value.intStateID,
  intCountryID:this.updateForm.value.intCountryID,
  strStateName:this.updateForm.value.strStateName
}
this.updateState(this.sta)
}

getState(stateId: number): void {
  this.stateService.getState(stateId).subscribe(
    (state: any) => {
      this.state = state;
      this.updateForm.patchValue({
        intStateID: state[0].intStateID,
        strStateName: state[0].strStateName,
        intCountryID: state[0].intCountryID
      });
    },
    (error: any) => {
      console.error('Error fetching state:', error);
      // Handle error
    }
  );
}


updateState(state:State){
  this.stateService.updateState(state).subscribe((response:any)=>{
    console.log("State sucessfully Updated",response)
  },
  (error:any)=>{
    console.error("Error Occured while Updating ",error)
  }
  )
}
}
