import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationEleveComponent } from './consultation-eleve.component';

describe('ConsultationEleveComponent', () => {
  let component: ConsultationEleveComponent;
  let fixture: ComponentFixture<ConsultationEleveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultationEleveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultationEleveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
