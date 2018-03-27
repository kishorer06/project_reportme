import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User} from "../model/user";
import {Router} from "@angular/router";
import { AuthService } from "app/services/authorization/auth.service";


@Component({
  selector: 'app-login',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']

})
export class SignInComponent implements OnInit {
  user: User = new User();
  errorMessage:string;
  constructor(private router: Router, private authService :AuthService) { }

  ngOnInit(){
  }

  login(){
      this.authService.logIn(this.user)
        .subscribe(data=>{
          this.router.navigate(['/welcome']);
          },err=>{
          this.errorMessage="Email or Password is incorrect";
          }
        )
    }
}
