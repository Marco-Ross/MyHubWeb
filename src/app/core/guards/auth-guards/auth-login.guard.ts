import { Injectable } from '@angular/core';
import { Router, Route, UrlSegment } from '@angular/router';
import { LoggedInCookie } from 'src/app/global-shared/services/cookies/logged-in.cookie';

@Injectable()
export class AuthLoginGuard
{
    constructor(private router: Router, private loggedInCookie: LoggedInCookie) { }

    canMatch(route: Route, segments: UrlSegment[]): boolean
    {
        let loginDetails = this.loggedInCookie.GetLoggedInCookie();

        if (loginDetails?.IsLoggedIn)
        {
            if (segments[0].path === 'login' || segments[0].path === 'register' || segments[0].path === 'github' || segments[0].path === 'google')
            {
                this.router.navigate(['/']);
                return false;
            }
        }

        return true;
    }
}