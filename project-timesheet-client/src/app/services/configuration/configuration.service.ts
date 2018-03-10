import {Injectable} from '@angular/core';
import {Configuration} from '../../../assets/configuration';

@Injectable()
export class ConfigurationService {
  configs;
  constructor(private _config: Configuration) {
    this._config.getConfiguration()
      .subscribe(
      (res) => {
        this.configs = res;
      },
      (error) => console.log('error : ' + error),
    );
  }
}
