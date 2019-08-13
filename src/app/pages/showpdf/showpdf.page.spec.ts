import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowpdfPage } from './showpdf.page';

describe('ShowpdfPage', () => {
  let component: ShowpdfPage;
  let fixture: ComponentFixture<ShowpdfPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowpdfPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowpdfPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
