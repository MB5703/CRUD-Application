import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StateService } from '../../services/state.service';
import { State } from '../../classes/state';
import { Country } from '../../classes/country';

@Component({
  selector: 'app-state-country',
  templateUrl: './state-country.component.html',
  styleUrl: './state-country.component.css'
})
export class StateCountryComponent {
  stateForm !:FormGroup;
  states:State[]=[];
  countries:Country[]=[];
  // cs :State[]=[];
  

  constructor(private fb : FormBuilder, private stateService : StateService){   
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getCountries();
    this.getStates();
    // this.getStateByCountry('India');
    this.stateForm = this.fb.group({
      country:['',Validators.required],
      state:['',Validators.required]
    })
  }
  getCountries(){
    this.stateService.getAllCountries().subscribe((reponse:any)=>{
      this.countries=reponse;
      console.log(this.countries);
    },
    (error:any)=>{
      console.error(error);
    }
    )
  }

  getStates(){
    this.stateService.getAllStates().subscribe((response:any)=>{
      this.states = response
      console.log(this.states);
    },
    (error:any)=>{
      console.error(error);
    }
    
    )
  }

  onChange(){
    // console.log(this.stateForm.value["country.strCountryName"])
    const name =this.stateForm.value["country"];
   this.getStateByCountry(name);
  }
  
  getStateByCountry(name:string){
    // const name = this.stateForm.value["country"];
    // console.log(name);
    this.stateService.getStateByCountry(name).subscribe((response:any)=>{
      this.states = response;
      console.log(response);
    },
    (error:any)=>{
      console.error(error);
    }
    )
  }
}
