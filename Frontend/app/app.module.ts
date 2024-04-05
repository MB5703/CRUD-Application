import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms'
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InsertComponent } from './components/insert/insert.component';
import { ReadComponent } from './components/read/read.component';
import { UpdateComponent } from './components/update/update.component';
import { DeleteComponent } from './components/delete/delete.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { GetStateComponent } from './components/get-state/get-state.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { StateCountryComponent } from './components/state-country/state-country.component';
import { AuthInterceptor } from './services/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    InsertComponent,
    ReadComponent,
    UpdateComponent,
    DeleteComponent,
    HomeComponent,
    GetStateComponent,
    LoginComponent,
    RegisterComponent,
    PageNotFoundComponent,
    StateCountryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
  ],
  providers: [ {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
}],
  bootstrap: [AppComponent]
})
export class AppModule { }
