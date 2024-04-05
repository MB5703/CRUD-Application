import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Login } from '../../classes/login';
import { TokenServiceService } from '../../services/token-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup;
  login!:Login;
  constructor(private fb:FormBuilder,private tokenService:TokenServiceService,private router:Router){}

  ngOnInit(): void {
    this.loginForm= this.fb.group({
      username : ['',Validators.required],
      password:['',Validators.required]
    }
    );
    
  }

  onSubmit(){
    if(this.loginForm.valid){
      this.login={
        username:this.loginForm.value.username,
        password:this.loginForm.value.password
      };
      this.tokenService.getToken(this.login).subscribe(
        ()=>{
          const token = this.tokenService.getBearerToken();
          console.log('Token:',token);
          alert('Login Successful')
          this.router.navigate(['home']);
        },
        (error:any)=>{
          alert('Login Failed')
          console.error('Wrong Username and Password',error)
        }
        )
    }

  }
}
