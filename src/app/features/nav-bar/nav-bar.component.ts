import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication-service/authentication.service';
import { CookieService } from 'ngx-cookie-service';
import { ThemeRenderer } from 'src/app/global-shared/services/theme/theme.renderer';
import { FormBuilder, FormGroup } from '@angular/forms';
import { timeout } from 'rxjs';

@Component({
    selector: 'nav-bar',
    templateUrl: 'nav-bar.component.html',
    styleUrls: ['nav-bar.component.scss']
})
export class NavBarComponent
{
    constructor(private router: Router, private authenticationService: AuthenticationService, private cookieService: CookieService, private themeRenderer: ThemeRenderer, private formBuilder: FormBuilder) { }

    navFG!: FormGroup;
    Username: string = "";
    isCollapsed = true;


    ngOnInit()
    {
        this.navFG = this.formBuilder.group({});

        let loginData = JSON.parse(this.cookieService.get('X-Logged-In') || 'null');
        this.Username = loginData.Username;
    }

    onCollapseClick(event: any)
    {
        this.isCollapsed = !this.isCollapsed;

        setTimeout(() =>
        {
            if (this.isCollapsed)
                event.target.blur();
        });
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
                this.themeRenderer.SetSystemTheme();
                this.router.navigate(['']);
            },
            error: _ =>
            {
            }
        });
    }
}