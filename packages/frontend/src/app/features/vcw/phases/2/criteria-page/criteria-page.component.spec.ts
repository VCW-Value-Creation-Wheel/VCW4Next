import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriteriaPageComponent } from './criteria-page.component';

describe('CriteriaPageComponent', () => {
  let component: CriteriaPageComponent;
  let fixture: ComponentFixture<CriteriaPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriteriaPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriteriaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
