
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { User } from '../../model/user';
import 'rxjs/add/operator/map';
import { AppComponent } from '../../app.component';
import { ConfigurationService } from "../../services/configuration/configuration.service";
import { Observable } from "rxjs/Observable";
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthService {
  api;
  tokenInfo;
  constructor(public http: Http, private _configs: ConfigurationService) {
    this.api = _configs;
  }
  public logIn(user: User): Observable<boolean> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json')
    // creating base64 encoded String from user name and password
    var base64Credential: string = btoa(user.username + ':' + user.password);
    headers.append("Authorization", "Basic " + base64Credential);
    let options = new RequestOptions();
    options.headers = headers;

    return this.http.post(this.api.configs.token, JSON.stringify({ username: user.username, password: user.password }), options)
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        let token = response.json() && response.json().token;
        if (token) {
          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('ACCESSID', JSON.stringify({username: user.username, TID: token}));
          // return true to indicate successful login
          return true;
        } else {
          // return false to indicate failed login
          return false;
        }
      }).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getToken(): String {
    var currentUser = JSON.parse(localStorage.getItem('ACCESSID'));
    var token = currentUser && currentUser.TID;
    return token ? token : "";
  }

  isLoggedIn(): boolean {
    var token: String = this.getToken();
    return token && token.length > 0;
  }

  logOut(): boolean {
    // remove user from local storage to log user out
    localStorage.removeItem('ACCESSID');
    return true
  }
}
