import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VCWMethodComponent } from './vcw-method.component';

describe('VCWMethodComponent', () => {
  let component: VCWMethodComponent;
  let fixture: ComponentFixture<VCWMethodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VCWMethodComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VCWMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
