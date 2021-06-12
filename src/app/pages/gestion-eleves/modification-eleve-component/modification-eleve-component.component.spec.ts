import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificationEleveComponentComponent } from './modification-eleve-component.component';

describe('ModificationEleveComponentComponent', () => {
  let component: ModificationEleveComponentComponent;
  let fixture: ComponentFixture<ModificationEleveComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificationEleveComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificationEleveComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
