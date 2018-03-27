import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/authorization/auth.service";
import {User} from "../model/user";
import {Router} from "@angular/router";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  currentUser: User;
  isSuccess;
  errorMessage;
  constructor(public authService: AuthService, public router: Router) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }
  ngOnInit() {
 }
 // login out from the app
   logOut() {
     this.isSuccess = this.authService.logOut();
     if(this.isSuccess){
          this.router.navigate(['/sign-in'])
     }else{
         this.errorMessage = "Failed to logout!";
     }
  ;
   }
}
