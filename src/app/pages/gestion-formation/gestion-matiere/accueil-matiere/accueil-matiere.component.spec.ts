import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccueilMatiereComponent } from './accueil-matiere.component';

describe('AccueilMatiereComponent', () => {
  let component: AccueilMatiereComponent;
  let fixture: ComponentFixture<AccueilMatiereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccueilMatiereComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccueilMatiereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
