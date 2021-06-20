import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MyToast} from './my-toast.component';

describe('ErrorToastComponent', () => {
  let component: MyToast;
  let fixture: ComponentFixture<MyToast>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyToast]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyToast);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
