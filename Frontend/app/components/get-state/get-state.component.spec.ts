import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetStateComponent } from './get-state.component';

describe('GetStateComponent', () => {
  let component: GetStateComponent;
  let fixture: ComponentFixture<GetStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GetStateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
