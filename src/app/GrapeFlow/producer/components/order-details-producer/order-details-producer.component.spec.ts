import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDetailsProducerComponent } from './order-details-producer.component';

describe('OrderDetailsProducerComponent', () => {
  let component: OrderDetailsProducerComponent;
  let fixture: ComponentFixture<OrderDetailsProducerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderDetailsProducerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderDetailsProducerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
