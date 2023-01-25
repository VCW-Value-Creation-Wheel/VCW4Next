import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VcwSprintComponent } from './vcw-sprint.component';

describe('VcwSprintComponent', () => {
  let component: VcwSprintComponent;
  let fixture: ComponentFixture<VcwSprintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VcwSprintComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VcwSprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
