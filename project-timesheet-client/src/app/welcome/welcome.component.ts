import { Component, OnInit } from '@angular/core';
import { AuthService } from "../services/authorization/auth.service";
import { User } from "../model/user";
import { Router } from "@angular/router";
import { UserService } from "app/services/user/user.service";
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  currentUser: User;
  isSuccess;
  errorMessage;
  constructor(private authService: AuthService, private router: Router, private userService: UserService) {
    this.currentUser = JSON.parse(localStorage.getItem('ACCESSID'));
  }
  ngOnInit() {
  }
  // login out from the app
  logOut() {
    this.isSuccess = this.authService.logOut();
    if (this.isSuccess) {
      this.router.navigate(['/sign-in'])
    } else {
      this.errorMessage = "Failed to logout!";
    }
  }

  getUser(username): void {
    this.userService.getUserInfo(username)
      .subscribe(
        user => this.currentUser = user,
        error => {
          localStorage.removeItem('ACCESSID');
          this.router.navigate(['login']);
          console.error('An error occurred in welcome component, navigating to login: ', error);
        }
      );
  }
}
