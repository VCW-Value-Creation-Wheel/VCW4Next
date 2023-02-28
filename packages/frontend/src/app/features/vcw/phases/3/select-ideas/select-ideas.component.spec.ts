import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectIdeasComponent } from './select-ideas.component';

describe('SelectIdeasComponent', () => {
  let component: SelectIdeasComponent;
  let fixture: ComponentFixture<SelectIdeasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectIdeasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectIdeasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
