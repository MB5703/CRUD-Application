import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReadComponent } from './components/read/read.component';
import { GetStateComponent } from './components/get-state/get-state.component';
import { HomeComponent } from './components/home/home.component';
import { InsertComponent } from './components/insert/insert.component';
import { UpdateComponent } from './components/update/update.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { StateCountryComponent } from './components/state-country/state-country.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
{path:'read',component:ReadComponent,canActivate: [AuthGuard]},  
{path:'getstate',component:GetStateComponent , canActivate: [AuthGuard]},
{path:'home',component:HomeComponent, canActivate: [AuthGuard]},
{path:'insert',component:InsertComponent, canActivate: [AuthGuard]},
{path:'update/:id',component:UpdateComponent, canActivate: [AuthGuard]},
{path:'login',component:LoginComponent},
{path:'register',component:RegisterComponent},
{path:'page-not-found',component:PageNotFoundComponent},
{path:'state-country',component:StateCountryComponent, canActivate: [AuthGuard]},
{path: '', redirectTo: '/login', pathMatch: 'full'},
{path:'**',redirectTo:'/page-not-found',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
