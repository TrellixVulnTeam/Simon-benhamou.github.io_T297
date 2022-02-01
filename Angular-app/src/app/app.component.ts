import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthServiceService } from './services/auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name: any = null;
  access: boolean = false
  img:any = null;
  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    private authService: AuthServiceService
  ) {
    this.afAuth.onAuthStateChanged((user) => {
      if (user) {
        this.authService.setCurrentUser(user);
        this.name = this.authService.getUserName();
        this.img = this.authService.getUserPhoto();
        console.log(this.img);

        this.access = true 

      } else {
        this.access = false
        this.router.navigate(['login']);
      }
    });
  }
  ngOnInit() {
  }
  
}
