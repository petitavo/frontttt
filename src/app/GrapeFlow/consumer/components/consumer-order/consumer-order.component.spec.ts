import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerOrderComponent } from './consumer-order.component';

describe('ConsumerOrderComponent', () => {
  let component: ConsumerOrderComponent;
  let fixture: ComponentFixture<ConsumerOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsumerOrderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsumerOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
