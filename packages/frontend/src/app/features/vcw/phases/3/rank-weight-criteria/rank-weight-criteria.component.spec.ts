import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankWeightCriteriaComponent } from './rank-weight-criteria.component';

describe('RankWeightCriteriaComponent', () => {
  let component: RankWeightCriteriaComponent;
  let fixture: ComponentFixture<RankWeightCriteriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RankWeightCriteriaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RankWeightCriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
