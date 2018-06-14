import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { AuthService } from '../shared'
import { User } from "../model";
import {
    FormGroup,
    FormBuilder,
    Validators,
    FormControl
} from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    user: User = new User();

    @Input()
    public alerts: Array<IAlert> = [];

    private backup: Array<IAlert>;

    constructor(public router: Router, public authService: AuthService, private fb: FormBuilder) {

    }

    public closeAlert(alert: IAlert) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }

    ngOnInit() {
        this.loginForm = this.fb.group({
            username: [null, [Validators.required, Validators.email]],
            password: [null, [Validators.required]]
        })
    }

    login() {
        this.authService.logIn(this.user)
            .subscribe(data => {
                localStorage.setItem('isLoggedin', 'true');
                this.router.navigate(['/dashboard']);
            }, err => {
                // this.errorMessage="Email or Password is incorrect";
                this.alerts.push({
                    id: 1,
                    type: 'danger',
                    message: 'Email or Password is incorrect!',
                });
                this.backup = this.alerts.map((alert: IAlert) => Object.assign({}, alert));
            }
            )
    }



}

export interface IAlert {
    id: number;
    type: string;
    message: string;
}
