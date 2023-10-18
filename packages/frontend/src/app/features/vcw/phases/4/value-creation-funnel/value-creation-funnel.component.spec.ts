import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValueCreationFunnelComponent } from './value-creation-funnel.component';

describe('ValueCreationFunnelComponent', () => {
  let component: ValueCreationFunnelComponent;
  let fixture: ComponentFixture<ValueCreationFunnelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValueCreationFunnelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValueCreationFunnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
