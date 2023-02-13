import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
  otpForm !: FormGroup;
  showOTPInput = false;
  constructor(private formBuilder: FormBuilder) { }
  ngOnInit() {
    this.otpValidation()
  }
  otpValidation(){
    this.otpForm = this.formBuilder.group({
      mobileNumber: ['', Validators.required],
      otp: ['']
    });
  }
  generateOTP(){
    const generatedOTP = Math.floor(1000 + Math.random() * 9000);
    this.showOTPInput = true;
    this.otpForm.controls['otp'].setValue(generatedOTP);
    alert(generatedOTP)
  }
  }




      // or, send a request to a server to generate the OTP
      // this.http.post('/api/generate-otp', { mobileNumber, otp }).subscribe();
