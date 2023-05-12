import { Injectable } from '@angular/core';
import { Router, Route, UrlSegment } from '@angular/router';
import { LoggedInCookie } from 'src/app/global-shared/services/cookies/logged-in.cookie';

@Injectable()
export class AuthGuard
{
    constructor(private router: Router, private loggedInCookie: LoggedInCookie) {}

    canMatch(route: Route, segments: UrlSegment[]): boolean
    {
        let loginDetails = this.loggedInCookie.GetLoggedInCookie();

        if (loginDetails?.IsLoggedIn && segments.length == 0)
        {
            this.router.navigate(['home']);
            return false;
        }

        if (!loginDetails?.IsLoggedIn && segments.length > 0)
        {
            this.router.navigate(['']);
            return false;
        }

        return true;
    }
}