import {Configuration} from '../assets/configuration';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClientXsrfModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {AppComponent} from './app.component';

import {ConfigurationService} from './services/configuration/configuration.service';
import {UserService} from './services/user/user.service';
import {AuthService} from './services/authorization/auth.service';
import {SignUpComponent} from './sign-up/sign-up.component';
import {SignInComponent} from './sign-in/sign-in.component';
import {WelcomeComponent} from './welcome/welcome.component';
import {UrlAccessService} from './services/permission/urlaccess.service';
import { CustomMaterialModule } from './material-module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent, canActivate: [UrlAccessService]},
  { path: 'sign-in', component: SignInComponent},
  { path: 'sign-up', component: SignUpComponent},
  { path: '**', redirectTo: '/sign-in'},
];

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    WelcomeComponent,
    SignInComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    HttpClientModule,
    CustomMaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [Configuration, UserService, AuthService, UrlAccessService, ConfigurationService],
  bootstrap: [AppComponent]
})

export class AppModule {}
