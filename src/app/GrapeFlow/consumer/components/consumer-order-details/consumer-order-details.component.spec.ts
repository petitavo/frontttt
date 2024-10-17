import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerOrderDetailsComponent } from './consumer-order-details.component';

describe('ConsumerOrderDetailsComponent', () => {
  let component: ConsumerOrderDetailsComponent;
  let fixture: ComponentFixture<ConsumerOrderDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsumerOrderDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsumerOrderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
