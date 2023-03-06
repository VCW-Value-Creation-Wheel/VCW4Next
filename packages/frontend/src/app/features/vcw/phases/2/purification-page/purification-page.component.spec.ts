import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurificationPageComponent } from './purification-page.component';

describe('PurificationPageComponent', () => {
  let component: PurificationPageComponent;
  let fixture: ComponentFixture<PurificationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurificationPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurificationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
