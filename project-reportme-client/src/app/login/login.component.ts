import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { AuthService } from '../shared'
import { User } from "../model";
import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  user: User = new User();
  private _error = new Subject<string>();
  errorMessage: string;
  constructor(public router: Router, public authService: AuthService, private fb: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    })
    this._error.subscribe((message) => this.errorMessage = message);
    this._error.pipe(
      debounceTime(1500)
    ).subscribe(() => this.errorMessage = null);
  }

  login() {
    this.authService.logIn(this.user)
      .subscribe(_data => {
        this.router.navigate(['/dashboard']);
      }, _err => {
        let error = JSON.parse(_err._body);
        this._error.next(error.message);
      }
      )
  }

}
