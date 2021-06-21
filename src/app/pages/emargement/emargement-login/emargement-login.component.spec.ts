import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmargementLoginComponent } from './emargement-login.component';

describe('EmargementLoginComponent', () => {
  let component: EmargementLoginComponent;
  let fixture: ComponentFixture<EmargementLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmargementLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmargementLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
