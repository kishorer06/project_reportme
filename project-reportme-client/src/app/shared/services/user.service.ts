import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { User } from "../../model/index";
import { AppComponent } from '../../app.component';
import { AuthService } from "../services/auth.service";
import { Observable } from "rxjs/Observable";
import { ApiConstants } from '../../../assets/api.constants'
import { environment } from '../../../environments/environment'


@Injectable()
export class UserService {
    apiUrl = environment.apiUrl;
    private headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.authService.getToken()
    });
    constructor(private http: Http, private authService: AuthService) {
    }

    createAccount(user: User) {
        return this.http.post(this.apiUrl + ApiConstants.register, user)
            .map(resp => resp.json());
    }

    getUserInfo(user: User) {
        return this.http.get(this.apiUrl + ApiConstants.getUser, { headers: this.headers, params: "email=" + user })
            .map(res => res.json());
    }
}
