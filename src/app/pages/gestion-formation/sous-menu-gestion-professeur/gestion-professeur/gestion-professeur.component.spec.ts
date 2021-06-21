import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionProfesseurComponent } from './gestion-professeur.component';

describe('GestionProfesseurComponent', () => {
  let component: GestionProfesseurComponent;
  let fixture: ComponentFixture<GestionProfesseurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionProfesseurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionProfesseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
