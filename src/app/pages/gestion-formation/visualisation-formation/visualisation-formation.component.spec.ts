import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualisationFormationComponent } from './visualisation-formation.component';

describe('VisualisationFormationComponent', () => {
  let component: VisualisationFormationComponent;
  let fixture: ComponentFixture<VisualisationFormationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualisationFormationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualisationFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
