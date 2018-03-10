import {Configuration} from '../assets/configuration';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AppComponent} from './app.component';

import {ConfigurationService} from './services/configuration/configuration.service';
import {UserService} from './services/user/user.service';
import {SignUpComponent} from './sign-up/sign-up.component';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    NgbModule.forRoot()
  ],
  providers: [Configuration, UserService, ConfigurationService],
  bootstrap: [AppComponent]
})

export class AppModule {}
