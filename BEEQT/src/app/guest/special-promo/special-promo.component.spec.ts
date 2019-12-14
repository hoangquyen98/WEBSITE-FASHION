import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialPromoComponent } from './special-promo.component';

describe('SpecialPromoComponent', () => {
  let component: SpecialPromoComponent;
  let fixture: ComponentFixture<SpecialPromoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialPromoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialPromoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
