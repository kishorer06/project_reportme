import { Injectable } from '@angular/core';
import { User } from "../../model/index";
import { AppComponent } from '../../app.component';
import { Observable } from "rxjs/Observable";
import { ApiConstants } from '../../../assets/api.constants'
import { environment } from '../../../environments/environment'
import { HttpClient, HttpErrorResponse } from '@angular/common/http';


@Injectable()
export class UserService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {
  }

  createAccount(user: User) {
    return this.http.post(this.apiUrl + ApiConstants.register, user);
  }

  getUserInfo(username: String) {
    return this.http.get(this.apiUrl + ApiConstants.getUser + "?email=" + username);
  }
}
