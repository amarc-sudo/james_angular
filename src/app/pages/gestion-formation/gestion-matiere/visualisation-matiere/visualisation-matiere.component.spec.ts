import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualisationMatiereComponent } from './visualisation-matiere.component';

describe('VisualisationMatiereComponent', () => {
  let component: VisualisationMatiereComponent;
  let fixture: ComponentFixture<VisualisationMatiereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualisationMatiereComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualisationMatiereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
