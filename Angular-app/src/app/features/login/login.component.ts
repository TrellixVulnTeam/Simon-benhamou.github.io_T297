import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';

import { faGoogle ,faGithub,faFacebook} from '@fortawesome/free-brands-svg-icons';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  google = faGoogle;
  github = faGithub;
  facebook = faFacebook;
  email = new FormControl('', [Validators.required, Validators.email]);
  hide = true;
  error: any;
  @ViewChild('emailInput', { static: false }) emailInput: ElementRef =
    null as any;
  @ViewChild('passwordInput', { static: false }) passwordInput: ElementRef =
    null as any;

  constructor(
    private authService: AuthServiceService,
    private router: Router
  ) {}
  redirect() {
    this.router.navigate(['signup']);
  }
  loginHandler() {
    const email = this.emailInput.nativeElement.value;
    const password = this.passwordInput.nativeElement.value;
    this.authService
      .loginWithEmail(email, password)
      .then(() => {
        this.router.navigate(['nft-list']);
      })
      .catch((err: any) => {
        this.error = err;
      });
  }
  signInWithGitHub() {
    this.authService
      .githubLogin()
      .then(() => {
        this.router.navigate(['nft-list']);
      })
      .catch((err: any) => {
        this.error = err;
      });
  }
  signInWithFacebook() {
    this.authService
      .facebookLogin()
      .then(() => {
        this.router.navigate(['nft-list']);
      })
      .catch((err: any) => {
        this.error = err;
      });
  }
  signInWithGoogle() {
    this.authService
      .googleLogin()
      .then(() => {
        this.router.navigate(['nft-list']);
      })
      .catch((err: any) => {
        this.error = err;
      });
  }
  ngOnInit(): void {}
}
