import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestFilterModalComponent } from './test-filter-modal.component';

describe('TestFilterModalComponent', () => {
  let component: TestFilterModalComponent;
  let fixture: ComponentFixture<TestFilterModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestFilterModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestFilterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
