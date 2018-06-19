import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { UserService } from '../shared';
import { User } from '../model';
import { Router } from "@angular/router";
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl
} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  animations: [routerTransition()]
})
export class SignupComponent implements OnInit {
  user: User = new User();
  signUpForm: FormGroup;
  private _error = new Subject<string>();
  errorMessage: string;
  constructor(private userService: UserService, public router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    this.signUpForm = this.fb.group({
      fullName: [null, [Validators.required]],
      username: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]]
    }, {
        validator: PasswordValidation.MatchPassword // your validation method
      })

    this._error.subscribe((message) => this.errorMessage = message);
    this._error.pipe(
      debounceTime(1500)
    ).subscribe(() => this.errorMessage = null);
  }

  register() {
    this.user.role = "USER";
    this.userService.createAccount(this.user).subscribe(_data => {
      this.router.navigate(['/login']);
    }, err => {
      this._error.next(err.error.errorMessage);
    }
    )
  }
}

export class PasswordValidation {

  static MatchPassword(AC: AbstractControl) {
    let password = AC.get('password').value; // to get value in input tag
    let confirmPassword = AC.get('confirmPassword').value; // to get value in input tag
    if (password != null && confirmPassword != null && password != confirmPassword) {
      AC.get('confirmPassword').setErrors({ MatchPassword: true })
    } else {
      return null
    }
  }

}
