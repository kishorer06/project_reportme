import { Component, OnInit} from '@angular/core';
import { UserService } from "app/services/user/user.service";
import { Router } from "@angular/router";
import { User } from "app/model/user";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  user: User = new User();
  errorMessage: string;
  constructor(public userService: UserService, public router: Router) {
 }

  ngOnInit() {
  }

  register() {
    this.userService.createAccount(this.user).subscribe(data => {
        this.router.navigate(['/login']);
      }, err => {
        let error = JSON.parse(err._body);
        console.log(error.errorMessage);
        this.errorMessage = error.errorMessage;
      }
    )
  }
}
