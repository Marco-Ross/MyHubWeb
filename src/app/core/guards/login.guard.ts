import { Injectable } from '@angular/core';
import { Router, UrlTree, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class LoginGuard implements CanActivate {

    constructor(private router: Router, private cookieService: CookieService) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let isLoggedIn = this.cookieService.get('X-Logged-In');

        if (isLoggedIn && state.url == '/') {
            this.router.navigateByUrl('home');
            return false;
        }
        
        if (!isLoggedIn && state.url != '/') {
            this.router.navigateByUrl('');
            return false;
        }

        return true;
    }
}