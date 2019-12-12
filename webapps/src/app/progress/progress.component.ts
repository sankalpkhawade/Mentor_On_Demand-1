import { Component, OnInit } from '@angular/core';
import { MentorDetailsService } from '../services/mentor-details.service';
import { AuthenticationService } from '../services/authentication.service';
import { Training } from '../approval/Training';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit {

  constructor(private mentoDetailService:MentorDetailsService,private authService:AuthenticationService) { }
  training:Training[]
  ngOnInit() {
    this.mentoDetailService.getCurrentCourses(this.authService.username).subscribe((data)=>{
      console.log(data);
      this.training=data;
    });
  }
  onSubmit(form:NgForm,id:number){
    const rating=form.value.rating;
    console.log(rating+"  "+id);
    this.mentoDetailService.updateRating(id,rating).subscribe((data)=>{
      console.log(data);
    })
  }

}
