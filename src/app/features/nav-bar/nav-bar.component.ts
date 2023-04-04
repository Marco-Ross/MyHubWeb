import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication-service/authentication.service';
import { CookieService } from 'ngx-cookie-service';
import { ThemeConstants } from '../../global-shared/constants/theme.constants';
import { ThemeRenderer } from 'src/app/global-shared/services/theme/theme.renderer';

@Component({
    selector: 'nav-bar',
    templateUrl: 'nav-bar.component.html',
    styleUrls: ['nav-bar.component.scss']
})
export class NavBarComponent
{
    constructor(private router: Router, private authenticationService: AuthenticationService, private cookieService: CookieService, private themeRenderer: ThemeRenderer) { }

    Username: string = "";
    isCollapsed = true;
    ThemeConstants = ThemeConstants;

    ngOnInit()
    {
        let loginData = JSON.parse(this.cookieService.get('X-Logged-In') || 'null');
        this.Username = loginData.Username;
    }

    Dash()
    {
        this.router.navigate(['home/dashboard']);
    }

    SelectTheme(theme: string)
    {
        this.themeRenderer.ChangeTheme(theme);
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