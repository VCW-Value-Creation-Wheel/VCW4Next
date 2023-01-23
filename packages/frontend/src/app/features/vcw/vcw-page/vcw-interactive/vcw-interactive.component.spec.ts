import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VcwInteractiveComponent } from './vcw-interactive.component';

describe('VcwInteractiveComponent', () => {
  let component: VcwInteractiveComponent;
  let fixture: ComponentFixture<VcwInteractiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VcwInteractiveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VcwInteractiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
