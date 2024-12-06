import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartGraphicComponent } from './chart-graphic.component';

describe('ChartGraphicComponent', () => {
  let component: ChartGraphicComponent;
  let fixture: ComponentFixture<ChartGraphicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartGraphicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartGraphicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
