import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SousMenuGestionProfesseurComponent } from './sous-menu-gestion-professeur.component';

describe('SousMenuGestionProfesseurComponent', () => {
  let component: SousMenuGestionProfesseurComponent;
  let fixture: ComponentFixture<SousMenuGestionProfesseurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SousMenuGestionProfesseurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SousMenuGestionProfesseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
