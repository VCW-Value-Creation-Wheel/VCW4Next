import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefineDiagonosticsComponent } from './define-diagonostics.component';

describe('DefineDiagonosticsComponent', () => {
  let component: DefineDiagonosticsComponent;
  let fixture: ComponentFixture<DefineDiagonosticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefineDiagonosticsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefineDiagonosticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
