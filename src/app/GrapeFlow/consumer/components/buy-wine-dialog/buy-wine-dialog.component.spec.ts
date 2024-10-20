import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyWineDialogComponent } from './buy-wine-dialog.component';

describe('BuyWineDialogComponent', () => {
  let component: BuyWineDialogComponent;
  let fixture: ComponentFixture<BuyWineDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyWineDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyWineDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
