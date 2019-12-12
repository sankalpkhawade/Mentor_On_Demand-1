import { Component, OnInit } from '@angular/core';
import { Training } from '../approval/Training';
import { MentorDetailsService } from '../services/mentor-details.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-mentor-progress',
  templateUrl: './mentor-progress.component.html',
  styleUrls: ['./mentor-progress.component.css']
})
export class MentorProgressComponent implements OnInit {
  training: Training[]
  contents: String[]
  isButton = false
  status = false
  getStatus: String;
  constructor(private mentoDetailService: MentorDetailsService, private authService: AuthenticationService) { }

  ngOnInit() {
    this.fetchData();
  }
  submit() {
    this.mentoDetailService.updateProgress(this.authService.username, 'A').subscribe((data) => {
      console.log(data);
      this.fetchData();
    });
  }
  fetchData() {
    this.mentoDetailService.getCurrentMentorCourses(this.authService.username).subscribe((data) => {
      console.log(data);
      this.training = data;
      for (let p of this.training) {
        if (p.status == 'C' && p.status != 'A') {
          this.status = false
          console.log(this.status);
        }
        if(p.status == 'A' || p.status == 'P') {
          this.getStatus = p.status;
          this.status = true
        }
      }
      if (this.training != [] && this.status) {
        this.isButton = true
        this.mentoDetailService.getTableOfContents(this.authService.username, this.getStatus).subscribe((data) => {
          console.log(data)
          this.contents = data
        });
      }
      for (let p of this.training) {
        if (p.status == 'C' || p.status == 'P') {
          this.isButton = false;
          this.status = true
          console.log(this.isButton);
        }
        if (p.status == 'A') {
          this.isButton = true;
          this.status = true
          console.log(this.isButton);
        }
      }

    });

  }

}
