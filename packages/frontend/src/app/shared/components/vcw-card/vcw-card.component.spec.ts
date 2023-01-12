import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VcwCardComponent } from './vcw-card.component';

describe('VcwCardComponent', () => {
  let component: VcwCardComponent;
  let fixture: ComponentFixture<VcwCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VcwCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VcwCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
