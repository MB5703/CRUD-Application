import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateCountryComponent } from './state-country.component';

describe('StateCountryComponent', () => {
  let component: StateCountryComponent;
  let fixture: ComponentFixture<StateCountryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StateCountryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StateCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
