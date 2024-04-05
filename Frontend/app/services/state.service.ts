import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { State } from '../classes/state';
import { Country } from '../classes/country';
import { Register } from '../classes/register';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor(private http:HttpClient) { }

  private url ='https://localhost:7010/api/State';
  private url2='https://localhost:7010/api/State/register';

  getAllStates():Observable<State[]>{
    return this.http.get<State[]>(this.url);
  }

  getState(id:number):Observable<State>{
    return this.http.get<State>(this.url+"/"+id);
  }

  postState(state:State):Observable<State>{
    return this.http.post<State>(this.url+"/InsertState",state);
  }

  updateState(state:State):Observable<State>{
    return this.http.put<State>(this.url+"/UpdateState",state)
  }
  deleteState(id:number | undefined):Observable<any>{
    return this.http.delete<void>(this.url + "/"+id)
  }

  getAllCountries():Observable<Country>{
    return this.http.get<Country>(this.url+"/GetCountries")
  }


  getStateByCountry(name:string):Observable<State>{
    return this.http.get<State>(this.url+"/StateByCountry?countryName="+name)
  }

  postUser(obj:Register):Observable<any>{
    return this.http.post<any>(this.url2,obj);
  }
}
