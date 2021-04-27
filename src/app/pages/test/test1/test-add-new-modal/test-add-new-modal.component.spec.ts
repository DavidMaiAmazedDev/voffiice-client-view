import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestAddNewModalComponent } from './test-add-new-modal.component';

describe('TestAddNewModalComponent', () => {
  let component: TestAddNewModalComponent;
  let fixture: ComponentFixture<TestAddNewModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestAddNewModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestAddNewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
