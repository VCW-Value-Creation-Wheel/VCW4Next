import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConceptAndValuePropositionComponent } from './concept-and-value-proposition.component';

describe('ConceptAndValuePropositionComponent', () => {
  let component: ConceptAndValuePropositionComponent;
  let fixture: ComponentFixture<ConceptAndValuePropositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConceptAndValuePropositionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConceptAndValuePropositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
