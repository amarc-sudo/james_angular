import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccueilGestionFormationComponent } from './accueil-gestion-formation.component';

describe('AccueilGestionFormationComponent', () => {
  let component: AccueilGestionFormationComponent;
  let fixture: ComponentFixture<AccueilGestionFormationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccueilGestionFormationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccueilGestionFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
