import { Configuration } from '../../configuration';
import { Injectable } from '@angular/core';

@Injectable()
export class UserService {
configs;
   constructor(private _ConfigurationService: Configuration) {
        console.log('Reading _ConfigurationService');
         this._ConfigurationService.getConfiguration()
            .subscribe(
            (res) => {
                this.configs = res;
            },
            (error) => console.log('error : ' + error),
        );
    }
}
