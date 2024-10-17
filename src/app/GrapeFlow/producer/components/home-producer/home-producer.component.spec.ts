import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeProducerComponent } from './home-producer.component';

describe('HomeProducerComponent', () => {
  let component: HomeProducerComponent;
  let fixture: ComponentFixture<HomeProducerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeProducerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeProducerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
