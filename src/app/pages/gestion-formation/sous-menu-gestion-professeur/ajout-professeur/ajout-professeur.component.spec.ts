import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutProfesseurComponent } from './ajout-professeur.component';

describe('AjoutProfesseurComponent', () => {
  let component: AjoutProfesseurComponent;
  let fixture: ComponentFixture<AjoutProfesseurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutProfesseurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutProfesseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
