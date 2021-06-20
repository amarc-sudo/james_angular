import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutSecretaireComponent } from './ajout-secretaire.component';

describe('AjoutSecretaireComponent', () => {
  let component: AjoutSecretaireComponent;
  let fixture: ComponentFixture<AjoutSecretaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutSecretaireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutSecretaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
