import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { skills } from '../home/skills';
import { Observable, Subject } from 'rxjs';
import { Technology } from '../home/Technology';
import { Training } from '../approval/Training';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MentorDetailsService {
  filter = new Subject();
  private subject = new Subject<skills[]>();
  constructor(private httpClient: HttpClient) { }

  getAllmentorDetails(): Observable<any> {
    return this.httpClient.get<skills[]>(environment.mentorUrl + 'search-service/details');
  }
  getSubject(): Subject<skills[]> {
    return this.subject;
  }
  getMentorDetail(username: String): Observable<any> {
    return this.httpClient.get<skills[]>(environment.mentorUrl + 'search-service/details/mentor/' + username);
  }
  book(studentName: String, mentoName: String, technologyName: number) {
    return this.httpClient.post(environment.mentorUrl + 'user-service/proposal/' + studentName + "/" + mentoName + "/" + technologyName, null);
  }

  getMentorRequests(mentorName: String, status: String): Observable<any> {
    return this.httpClient.get(environment.mentorUrl + 'user-service/proposal/mentor/' + mentorName + "/" + status)
  }

  update(id: number, status: String) {
    return this.httpClient.put(environment.mentorUrl + 'user-service/proposal/' + id + "/" + status, null);
  }

  getStudentRequests(studentName: String): Observable<any> {
    return this.httpClient.get(environment.mentorUrl + 'user-service/proposal/student/' + studentName)
  }

  getCurrentCourses(username: String): Observable<any> {
    return this.httpClient.get<Training[]>(environment.mentorUrl + 'training-service/training/student/current/' + username);
  }
  getCurrentMentorCourses(username: String): Observable<any> {
    return this.httpClient.get<Training[]>(environment.mentorUrl + 'training-service/training/mentor/current/' + username);
  }
  getTableOfContents(username: String, status: String): Observable<any> {
    return this.httpClient.get<String[]>(environment.mentorUrl + 'training-service/training/contents/' + username + "/" + status);
  }
  updateProgress(username: String, status: String): Observable<any> {
    return this.httpClient.put(environment.mentorUrl + 'training-service/training/progress/' + username + "/" + status, null);
  }
  updateRating(trainingId: number, rating: number): Observable<any> {
    return this.httpClient.put(environment.mentorUrl + 'training-service/training/student/rating/' + trainingId + "/" + rating, null);
  }
}
