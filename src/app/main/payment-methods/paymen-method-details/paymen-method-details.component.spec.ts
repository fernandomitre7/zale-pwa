import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymenMethodDetailsComponent } from './paymen-method-details.component';

describe('PaymenMethodDetailsComponent', () => {
  let component: PaymenMethodDetailsComponent;
  let fixture: ComponentFixture<PaymenMethodDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymenMethodDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymenMethodDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
