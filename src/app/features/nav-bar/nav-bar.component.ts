import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication-service/authentication.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'nav-bar',
    templateUrl: 'nav-bar.component.html',
    styleUrls: ['nav-bar.component.scss'],
    providers: []
})
export class NavBarComponent
{
    constructor(private router: Router, private authenticationService: AuthenticationService, private cookieService: CookieService) { }

    Username: string = "";

    ngOnInit(){
        let loginData = JSON.parse(this.cookieService.get('X-Logged-In') || 'null');
        this.Username = loginData.Username;
    }

    Dash()
    {
        this.router.navigate(['home/dashboard']);
    }

    Logout()
    {
        this.authenticationService.Logout().subscribe({
            next: _ =>
            {
                this.router.navigate(['']);
            },
            error: _ =>
            {
            }
        });
    }
}