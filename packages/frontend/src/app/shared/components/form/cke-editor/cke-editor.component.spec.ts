import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CkeEditorComponent } from './cke-editor.component';

describe('CkeEditorComponent', () => {
  let component: CkeEditorComponent;
  let fixture: ComponentFixture<CkeEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CkeEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CkeEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
