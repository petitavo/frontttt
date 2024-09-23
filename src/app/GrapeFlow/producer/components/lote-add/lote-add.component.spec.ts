import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoteAddComponent } from './lote-add.component';

describe('LoteAddComponent', () => {
  let component: LoteAddComponent;
  let fixture: ComponentFixture<LoteAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoteAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoteAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
