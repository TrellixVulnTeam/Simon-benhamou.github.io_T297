import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  hide = true;
  constructor(private authService: AuthServiceService, private router: Router) {}

  email = new FormControl('', [Validators.required, Validators.email]);
  error :any; 
  @ViewChild('emailInput', { static: false }) emailInput: ElementRef =
    null as any;
  @ViewChild('passwordInput', { static: false }) passwordInput: ElementRef =
    null as any;


  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  redirect() {
    this.router.navigate(['login']);
  }
  signUpHandler(){
    const email = this.emailInput.nativeElement.value;
    const password = this.passwordInput.nativeElement.value;
     this.authService.registerWithEmail(email,password).then(() => {
      this.router.navigate(['nft-list']);  
    }).catch((err: any) => {
      this.error = err
    })
  }

  ngOnInit(): void {
  }

}
