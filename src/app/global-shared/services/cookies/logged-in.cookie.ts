import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
    providedIn: 'root'
})
export class LoggedInCookie
{
    private readonly Key: string = 'X-Logged-In';

    constructor(private cookieService: CookieService) { }

    GetLoggedInCookie()
    {
        return JSON.parse(this.cookieService.get(this.Key) || 'null');
    }
}