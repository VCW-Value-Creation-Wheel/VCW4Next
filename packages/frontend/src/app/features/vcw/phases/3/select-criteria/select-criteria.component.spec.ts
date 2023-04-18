import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCriteriaComponent } from './select-criteria.component';

describe('SelectCriteriaComponent', () => {
  let component: SelectCriteriaComponent;
  let fixture: ComponentFixture<SelectCriteriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectCriteriaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectCriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
