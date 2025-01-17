import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegistrationService } from 'src/app/services/registration.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-registration',
  templateUrl: './student-registration.component.html',
  styleUrls: ['./student-registration.component.css']
})
export class StudentRegistrationComponent implements OnInit {
  signupForm: FormGroup;
  signUp:boolean=false;
  constructor(private registrationService:RegistrationService,private router:Router) { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      'userName': new FormControl(null, [Validators.required, Validators.maxLength(20)]),
      'firstName': new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z]+$'), Validators.maxLength(20)]),
      'lastName': new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z]+$'), Validators.maxLength(20)]),
      'password': new FormControl(null, [Validators.required]),
      'confirmpassword': new FormControl(null, [Validators.required, this.matchConfirmPassword.bind(this)]),
      'email': new FormControl(null, [Validators.required,Validators.email]),
      'contact': new FormControl(null, [Validators.required, Validators.min(1000000000), Validators.max(9999999999), Validators.pattern('^[0-9]+$')]),
      'image':new FormControl(null, [Validators.required]),
    });
  }
  matchConfirmPassword(formControl: FormControl): { [s: string]: boolean } {
    if (this.signupForm) {
      if (formControl.value && formControl.value.length > 0 && formControl.value !== this.signupForm.get('password').value) {
        return { 'nomatch': true };
      }
    }
    return null;
  }
  onSubmitSignUp(){
    console.log(this.signupForm.value);
    this.registrationService.addStudentDetails(this.signupForm.value).subscribe((data)=>{
      console.log(data);
      this.signUp=data;
    })
  }
  loggedIn(){
    if(this.signUp){
      this.router.navigate(['/login']);}
    }
  }


