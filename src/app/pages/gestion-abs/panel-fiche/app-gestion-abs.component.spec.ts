import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppGestionAbsComponent } from './app-gestion-abs.component';

describe('AppGestionAbsComponent', () => {
  let component: AppGestionAbsComponent;
  let fixture: ComponentFixture<AppGestionAbsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppGestionAbsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppGestionAbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
