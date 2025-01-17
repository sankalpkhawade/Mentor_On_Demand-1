import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MentorDetails } from '../authentication/MentorDetails';
import { MentorSkills } from '../authentication/MentorSkills';
import { StudentDetails } from '../authentication/StudentDetails';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private httpClient: HttpClient) { }

  addMentorDetails(mentorDetails: MentorDetails): Observable<any> {
    return this.httpClient.post(environment.mentorUrl + 'registration-service/registration/mentor', mentorDetails);
  }

  addMentorSkills(mentorSkills: MentorSkills, mentorName: String, technologyName: String): Observable<any> {
    return this.httpClient.post(environment.mentorUrl + 'registration-service/registration/mentor/skills/' + mentorName + '/' + technologyName, mentorSkills);
  }

  addStudentDetails(studentDetails: StudentDetails): Observable<any> {
    return this.httpClient.post(environment.mentorUrl + 'registration-service/registration/student', studentDetails);
  }
}
