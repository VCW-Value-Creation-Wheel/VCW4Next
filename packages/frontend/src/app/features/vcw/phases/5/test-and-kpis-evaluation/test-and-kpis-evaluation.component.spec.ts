import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestAndKpisEvaluationComponent } from './test-and-kpis-evaluation.component';

describe('TestAndKpisEvaluationComponent', () => {
  let component: TestAndKpisEvaluationComponent;
  let fixture: ComponentFixture<TestAndKpisEvaluationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestAndKpisEvaluationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestAndKpisEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
