import { Injectable } from '@angular/core';
import { ConfigurationService } from '../configuration/configuration.service';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { User } from "../../model/user";
import { AppComponent } from '../../app.component';
import { AuthService } from "app/services/authorization/auth.service";
import { Observable } from "rxjs/Observable";


@Injectable()
export class UserService {
  api;
  private headers = new Headers({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.authService.getToken()
  });
  constructor(private http: Http, private authService: AuthService, private _configService: ConfigurationService) {
    this.api = _configService;
  }

  createAccount(user: User) {
    return this.http.post(this.api.configs.register, user)
      .map(resp => resp.json());
  }

  getUserInfo(user: User){
    return this.http.get(this.api.configs.getUser, {headers: this.headers, params : "email=" + user})
      .map(res => res.json());
  }
}
