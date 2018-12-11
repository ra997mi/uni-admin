import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAboutComponent } from './add-about.component';

describe('AddAboutComponent', () => {
  let component: AddAboutComponent;
  let fixture: ComponentFixture<AddAboutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAboutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
