import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VcwPageComponent } from './vcw-page.component';

describe('VcwPageComponent', () => {
  let component: VcwPageComponent;
  let fixture: ComponentFixture<VcwPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VcwPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VcwPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
