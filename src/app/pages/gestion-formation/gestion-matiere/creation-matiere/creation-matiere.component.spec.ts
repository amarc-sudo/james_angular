import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationMatiereComponent } from './creation-matiere.component';

describe('CreationMatiereComponent', () => {
  let component: CreationMatiereComponent;
  let fixture: ComponentFixture<CreationMatiereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreationMatiereComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreationMatiereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
