import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VcwJourneyComponent } from './vcw-journey.component';

describe('VcwJourneyComponent', () => {
  let component: VcwJourneyComponent;
  let fixture: ComponentFixture<VcwJourneyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VcwJourneyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VcwJourneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
