import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImplementationControlComponent } from './implementation-control.component';

describe('ImplementationControlComponent', () => {
  let component: ImplementationControlComponent;
  let fixture: ComponentFixture<ImplementationControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImplementationControlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImplementationControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
