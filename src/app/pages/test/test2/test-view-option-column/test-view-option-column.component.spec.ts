import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestViewOptionColumnComponent } from './test-view-option-column.component';

describe('TestViewOptionColumnComponent', () => {
  let component: TestViewOptionColumnComponent;
  let fixture: ComponentFixture<TestViewOptionColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestViewOptionColumnComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestViewOptionColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
