import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MentorProgressComponent } from './mentor-progress.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('MentorProgressComponent', () => {
  let component: MentorProgressComponent;
  let fixture: ComponentFixture<MentorProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MentorProgressComponent ],
      imports:[HttpClientTestingModule,RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MentorProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
