import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalVcwReportComponent } from './final-vcw-report.component';

describe('FinalVcwReportComponent', () => {
  let component: FinalVcwReportComponent;
  let fixture: ComponentFixture<FinalVcwReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinalVcwReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinalVcwReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
