import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifFicheComponent } from './modif-fiche.component';

describe('ModifFicheComponent', () => {
  let component: ModifFicheComponent;
  let fixture: ComponentFixture<ModifFicheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifFicheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifFicheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
