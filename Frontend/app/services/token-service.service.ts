import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from '../classes/login';
import { Observable, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TokenServiceService {
  private url ='https://localhost:7010/api/State/authenticate';
  private token !: string;
  constructor(private http:HttpClient) { }

  getToken(login:Login){
   return this.http.post<any>(this.url,login).pipe(
      tap((response:any)=>{
        this.token =response.token;
        this.setToken(this.token);
      })
    );
  }


  getBearerToken():string | null{
    return localStorage.getItem('token')
  }

  setToken(token:string){
    localStorage.setItem('token',token);
  }

  isLoggedIn():boolean{
    console.log(!!localStorage.getItem('token'))
    return !!localStorage.getItem('token');
  }
}
