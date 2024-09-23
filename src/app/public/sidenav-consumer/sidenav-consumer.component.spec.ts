import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavConsumerComponent } from './sidenav-consumer.component';

describe('SidenavConsumerComponent', () => {
  let component: SidenavConsumerComponent;
  let fixture: ComponentFixture<SidenavConsumerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidenavConsumerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidenavConsumerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
