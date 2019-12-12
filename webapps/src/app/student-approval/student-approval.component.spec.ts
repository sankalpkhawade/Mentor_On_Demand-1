import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { StudentApprovalComponent } from './student-approval.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('StudentApprovalComponent', () => {
  let component: StudentApprovalComponent;
  let fixture: ComponentFixture<StudentApprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentApprovalComponent ],
      imports:[HttpClientTestingModule,RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
