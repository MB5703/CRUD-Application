import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StateService } from '../../services/state.service';
import { Router } from '@angular/router';
import { Register } from '../../classes/register';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm!: FormGroup;
  constructor(private fb:FormBuilder,private stateService:StateService,public router: Router){}
  register!:Register
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(){
    if (this.registerForm.valid) {
      const { name, username, password, email } = this.registerForm.value;
      const register: Register = { name, username, password, email };
  
      this.stateService.postUser(register).subscribe(
        (response: any) => {
          console.log(response);
        },
        (error: any) => {
          console.error(error);
        }
      );
  
      console.log('Registration successful:', this.registerForm.value);
      alert('Registered Successfully');
      this.router.navigate(['login']);
    }
  }
}
