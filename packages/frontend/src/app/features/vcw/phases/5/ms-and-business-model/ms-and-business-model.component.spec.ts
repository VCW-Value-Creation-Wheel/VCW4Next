import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsAndBusinessModelComponent } from './ms-and-business-model.component';

describe('MsAndBusinessModelComponent', () => {
  let component: MsAndBusinessModelComponent;
  let fixture: ComponentFixture<MsAndBusinessModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MsAndBusinessModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MsAndBusinessModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
