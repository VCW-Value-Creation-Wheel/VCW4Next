import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewVcwComponent } from './new-vcw.component';

describe('NewVcwComponent', () => {
  let component: NewVcwComponent;
  let fixture: ComponentFixture<NewVcwComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewVcwComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewVcwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
