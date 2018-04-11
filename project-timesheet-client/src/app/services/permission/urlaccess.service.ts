import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UrlAccess } from "app/model/urlAccess";
import { AuthService } from "app/services/authorization/auth.service";

@Injectable()
export class UrlAccessService implements CanActivate {

  constructor(private router: Router, private authService: AuthService) { }
  activeUser;
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.isLoggedIn()) {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/sign-in'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
