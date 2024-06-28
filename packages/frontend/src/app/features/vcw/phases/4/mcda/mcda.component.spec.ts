import { ComponentFixture, TestBed } from '@angular/core/testing';

import { McdaComponent } from './mcda.component';

describe('McdaComponent', () => {
  let component: McdaComponent;
  let fixture: ComponentFixture<McdaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ McdaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(McdaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
