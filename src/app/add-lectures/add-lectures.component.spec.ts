import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLecturesComponent } from './add-lectures.component';

describe('AddLecturesComponent', () => {
  let component: AddLecturesComponent;
  let fixture: ComponentFixture<AddLecturesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLecturesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLecturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
