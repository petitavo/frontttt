import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoteDetailsComponent } from './lote-details.component';

describe('LoteDetailsComponent', () => {
  let component: LoteDetailsComponent;
  let fixture: ComponentFixture<LoteDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoteDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoteDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
