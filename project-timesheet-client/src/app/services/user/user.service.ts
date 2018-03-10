import {Injectable} from '@angular/core';
import {ConfigurationService} from '../configuration/configuration.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class UserService {
  api;
  constructor(private _configService: ConfigurationService) {
    this.api = _configService;
  }
  getUser() {
    console.log(this.api.configs.getUser);
  }
}
