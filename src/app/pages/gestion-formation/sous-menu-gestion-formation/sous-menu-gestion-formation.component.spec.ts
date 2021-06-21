import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SousMenuGestionFormationComponent } from './sous-menu-gestion-formation.component';

describe('SousMenuGestionFormationComponent', () => {
  let component: SousMenuGestionFormationComponent;
  let fixture: ComponentFixture<SousMenuGestionFormationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SousMenuGestionFormationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SousMenuGestionFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
