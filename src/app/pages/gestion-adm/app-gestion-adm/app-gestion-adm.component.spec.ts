import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppGestionAdmComponent } from './app-gestion-adm.component';

describe('AppGestionAdmComponent', () => {
  let component: AppGestionAdmComponent;
  let fixture: ComponentFixture<AppGestionAdmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppGestionAdmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppGestionAdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
