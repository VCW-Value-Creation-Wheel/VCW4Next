import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleItemInputComponent } from './simple-item-input.component';

describe('SimpleItemInputComponent', () => {
  let component: SimpleItemInputComponent;
  let fixture: ComponentFixture<SimpleItemInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimpleItemInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimpleItemInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
