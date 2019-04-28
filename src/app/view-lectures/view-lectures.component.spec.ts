import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLecturesComponent } from './view-lectures.component';

describe('ViewLecturesComponent', () => {
  let component: ViewLecturesComponent;
  let fixture: ComponentFixture<ViewLecturesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewLecturesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewLecturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
