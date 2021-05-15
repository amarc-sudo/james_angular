import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmargementCoursComponent } from './emargement-cours.component';

describe('EmargementCoursComponent', () => {
  let component: EmargementCoursComponent;
  let fixture: ComponentFixture<EmargementCoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmargementCoursComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmargementCoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
