
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { User } from '../../model/index';
import 'rxjs/add/operator/map';
import { ApiConstants } from '../../../assets/api.constants';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthService {
  apiUrl = environment.apiUrl;
  headers: any;
  constructor(public http: Http) {
  }
  logIn(user: User) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json')
    // creating base64 encoded String from user name and password
    var base64Credential: string = btoa(user.username + ':' + user.password);
    headers.append("Authorization", "Basic " + base64Credential);
    let options = new RequestOptions();
    options.headers = headers;

    return this.http.post(this.apiUrl + ApiConstants.token, JSON.stringify({ username: user.username, password: user.password }), options)
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        let token = response.json() && response.json().token;
        if (token) {
          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('ACCESSID', JSON.stringify({ username: user.username, TID: token }));
          // return true to indicate successful login
          return true;
        } else {
          // return false to indicate failed login
          return false;
        }
      });
  }

  getToken(): String {
    var currentUser = JSON.parse(localStorage.getItem('ACCESSID'));
    var token = currentUser && currentUser.TID;
    return token ? token : "";
  }

  deleteToken() {
    localStorage.removeItem('ACCESSID');
  }

  getUsername(): String {
    var currentUser = JSON.parse(localStorage.getItem('ACCESSID'));
    var username = currentUser && currentUser.username;
    return username ? username : "";
  }
  isLoggedIn() {
    var token: String = this.getToken();
    if (token && token.length > 0)
      return true;
    else
      return false;
  }

}
