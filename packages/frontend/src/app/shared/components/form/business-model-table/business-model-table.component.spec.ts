import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessModelTableComponent } from './business-model-table.component';

describe('BusinessModelTableComponent', () => {
  let component: BusinessModelTableComponent;
  let fixture: ComponentFixture<BusinessModelTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessModelTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessModelTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
