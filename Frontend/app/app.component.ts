import { Component, OnInit } from '@angular/core';
import { StateService } from './services/state.service';
import { State } from './classes/state';
import { Routes, RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CRUD2';
  
}
