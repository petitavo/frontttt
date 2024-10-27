import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WineDetailComponent } from './wine-detail.component';

describe('WineDetailComponent', () => {
  let component: WineDetailComponent;
  let fixture: ComponentFixture<WineDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WineDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WineDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
