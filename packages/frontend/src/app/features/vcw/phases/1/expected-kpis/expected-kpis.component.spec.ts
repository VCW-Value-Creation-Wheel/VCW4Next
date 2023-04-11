import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpectedKpisComponent } from './expected-kpis.component';

describe('ExpectedKpisComponent', () => {
  let component: ExpectedKpisComponent;
  let fixture: ComponentFixture<ExpectedKpisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpectedKpisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpectedKpisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
