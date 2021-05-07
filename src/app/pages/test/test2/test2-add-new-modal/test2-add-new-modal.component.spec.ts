import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Test2AddNewModalComponent } from './test2-add-new-modal.component';

describe('Test2AddNewModalComponent', () => {
  let component: Test2AddNewModalComponent;
  let fixture: ComponentFixture<Test2AddNewModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Test2AddNewModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Test2AddNewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
