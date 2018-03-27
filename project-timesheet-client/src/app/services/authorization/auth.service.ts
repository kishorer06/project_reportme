
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions,Response} from '@angular/http';
import {User} from '../../model/user';
import 'rxjs/add/operator/map';
import { AppComponent } from '../../app.component';
import { ConfigurationService } from "../../services/configuration/configuration.service";

@Injectable()
export class AuthService {
  api;
  tokenInfo;
  constructor(public http: Http, private _configs : ConfigurationService) {
    this.api = _configs;
  }

  public logIn(user: User){
    console.log('this.api.login',this.api.configs.login);

      let headers = new Headers();
      headers.append('Accept', 'application/json')
      // creating base64 encoded String from user name and password
      var base64Credential: string = btoa( user.username+ ':' + user.password);
      headers.append("Authorization", "Basic " + base64Credential);

      let options = new RequestOptions();
      options.headers=headers;

      return this.http.get(this.api.configs.login ,   options)
        .map((response: Response) => {
        // login successful if there's a jwt token in the response
        let user = response.json().principal;// the returned user object is a principal object
        if (user) {
          // store user details  in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
      });
  }

  logOut(): boolean {
    // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        return true
  }
}
