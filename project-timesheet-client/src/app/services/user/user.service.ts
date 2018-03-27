import {Injectable} from '@angular/core';
import {ConfigurationService} from '../configuration/configuration.service';
import {Observable} from 'rxjs/Observable';
import { Http, Headers, RequestOptions,Response} from '@angular/http';
import { User } from "../../model/user";
import { AppComponent } from '../../app.component';


@Injectable()
export class UserService {
  api;
  constructor(private http: Http, private _configService: ConfigurationService) {
    this.api = _configService;
  }
  
  createAccount(user:User){
    return this.http.post(this.api.configs.register,user)
      .map(resp=>resp.json());
  }
}
