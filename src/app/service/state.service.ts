import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { State } from '../classes/state';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor(private http : HttpClient) { }

  private url ='https://localhost:7010/api/State';

  getAllStates():Observable<State[]>{
    return this.http.get<State[]>(this.url);
  }

  getStatebyId(id:number):Observable<State>{
    return this.http.get<State>(this.url+"/"+id)
  }

  insertState(state:State):Observable<State>{
    return this.http.post<State>(this.url+"/InsertState",state)
  }

  // updateState(id:number,state:string,CountryID:number):Observable<void>{
  //   return this.http.put<void> (this.url+"/"+id,state)
  // }
  updateState(state:State):Observable<State>{
    return this.http.put<State> (this.url+"/UpdateState",state)
  }
  
  deleteState(id:number):Observable<void>{
    return this.http.delete<void>(this.url+"/"+id);
  }
}

// https://localhost:7010/api/State/CountryID?StateName=Himachal&CountryID=6