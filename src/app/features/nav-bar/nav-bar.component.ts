import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication-service/authentication.service';
import { ThemeRenderer } from 'src/app/global-shared/services/theme/theme.renderer';
import { FormBuilder, FormGroup } from '@angular/forms';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { LoggedInCookie } from 'src/app/global-shared/services/cookies/logged-in.cookie';
import { ThemeStorageService } from 'src/app/global-shared/services/theme/theme-storage.service';
import { NavLayoutService } from './nav-layout.service';

@Component({
    selector: 'nav-bar',
    templateUrl: 'nav-bar.component.html',
    styleUrls: ['nav-bar.component.scss']
})
export class NavBarComponent
{
    constructor(public router: Router, private authenticationService: AuthenticationService, private loggedInCookie: LoggedInCookie, private themeRenderer: ThemeRenderer,
        private formBuilder: FormBuilder, private themeStorage: ThemeStorageService,
        public navLayoutService: NavLayoutService) { }

    faCaretDown = faCaretDown;

    //

    navFG!: FormGroup;
    isCollapsed = true;
    open: boolean = false;

    ngOnInit()
    {
        this.navFG = this.formBuilder.group({});

        this.checkLoggedIn();
    }

    checkLoggedIn = () =>
    {
        let loginData = this.loggedInCookie.GetLoggedInCookie();

        if (loginData)
            this.navLayoutService.signIn(loginData);
        else
            this.navLayoutService.signOut();
    }

    isOpen(open: boolean)
    {
        this.open = open;
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

    Logout()
    {
        this.authenticationService.Logout().subscribe({
            next: _ =>
            {
                this.themeRenderer.SetSystemTheme();
                this.themeStorage.RemoveTheme();
                this.checkLoggedIn();
                this.router.navigate(['/']);
            },
            error: _ =>
            {
            }
        });
    }
}