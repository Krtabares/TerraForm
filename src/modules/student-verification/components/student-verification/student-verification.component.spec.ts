import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentVerificationComponent } from './student-verification.component';

describe('StudentVerificationComponent', () => {
  let component: StudentVerificationComponent;
  let fixture: ComponentFixture<StudentVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentVerificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
