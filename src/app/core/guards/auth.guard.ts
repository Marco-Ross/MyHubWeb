import { Injectable } from '@angular/core';
import { Router, CanMatch, Route, UrlSegment } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthGuard implements CanMatch {

    constructor(private router: Router, private cookieService: CookieService) { }

    canMatch(route: Route, segments: UrlSegment[]): boolean {

        if(segments.length > 0 && segments[0].path == 'register')
            return  true;

        let isLoggedIn = this.cookieService.get('X-Logged-In');

        if (isLoggedIn && segments.length == 0) {
            this.router.navigate(['home']);
            return false;
        }
        
        if (!isLoggedIn && segments.length > 0) {
            this.router.navigate(['']);
            return false;
        }

        return true;
    }
}