import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WineEditComponent } from './wine-edit.component';

describe('WineEditComponent', () => {
  let component: WineEditComponent;
  let fixture: ComponentFixture<WineEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WineEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WineEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
