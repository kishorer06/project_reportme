import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UrlAccess } from "app/model/urlAccess";

@Injectable()
export class UrlAccessService implements CanActivate {

  constructor(private router: Router) { }
  activeUser;
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('currentUser')) {
      // logged in so return true
      this.activeUser = new UrlAccess(JSON.parse(localStorage.getItem('currentUser')));
      if(this.activeUser.id == "" || this.activeUser.username =="" || this.activeUser.role == "" || this.activeUser.fullName == ""){
        localStorage.removeItem('currentUser');
      this.router.navigate(['/sign-in'], { queryParams: { returnUrl: state.url }});
      return false;
    }
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/sign-in'], { queryParams: { returnUrl: state.url }});
    return false;
  }
}
