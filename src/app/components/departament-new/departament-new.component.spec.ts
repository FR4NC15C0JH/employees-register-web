import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartamentNewComponent } from './departament-new.component';

describe('DepartamentNewComponent', () => {
  let component: DepartamentNewComponent;
  let fixture: ComponentFixture<DepartamentNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartamentNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartamentNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
