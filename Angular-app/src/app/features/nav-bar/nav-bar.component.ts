import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  @Input()
  public name: any = null;
  @Input()
  public photo: any = null;
  constructor(
    private router: Router,
    private authService: AuthServiceService
  ) {}

  ngOnInit(): void {}
  logOut() {
    this.authService.logOut();
  }
}
