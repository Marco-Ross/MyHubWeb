import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication-service/authentication.service';
import { ThemeRenderer } from 'src/app/global-shared/services/theme/theme.renderer';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProfileImageService } from 'src/app/global-shared/services/profile/profile-image.service';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { DomSanitizer } from '@angular/platform-browser';
import { LoggedInCookie } from 'src/app/global-shared/services/cookies/logged-in.cookie';
import { ThemeStorageService } from 'src/app/global-shared/services/theme/theme-storage.service';
import { NavLayoutService } from './nav-layout.service';
import { NavDetails } from './class/nav-details.class';

@Component({
    selector: 'nav-bar',
    templateUrl: 'nav-bar.component.html',
    styleUrls: ['nav-bar.component.scss']
})
export class NavBarComponent
{
    constructor(private router: Router, private authenticationService: AuthenticationService, private loggedInCookie: LoggedInCookie, private themeRenderer: ThemeRenderer,
        private formBuilder: FormBuilder, private profileImageService: ProfileImageService, private domSanitizer: DomSanitizer, private themeStorage: ThemeStorageService,
        private navLayoutService: NavLayoutService) { }

    faCaretDown = faCaretDown;

    //

    navFG!: FormGroup;
    isCollapsed = true;
    open: boolean = false;
    defaultProfileImage = 'assets/icons/user-thin.png';
    navDetails: NavDetails = new NavDetails();

    ngOnInit()
    {
        this.navFG = this.formBuilder.group({});

        this.setNavDetails();
    }

    setNavDetails()
    {
        let loginData = this.loggedInCookie.GetLoggedInCookie();
        this.navDetails.username = loginData.Username;

        this.profileImageService.GetUserProfileImage().subscribe({
            next: (image) =>
            {
                if (!image || !image.size)
                {
                    this.navDetails.profileImage = this.defaultProfileImage;
                    return;
                }

                this.navDetails.profileImage = URL.createObjectURL(image);
            }
        });

        this.navLayoutService.setNavDetails(this.navDetails);
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
                this.themeStorage.RemoveTheme();
                this.router.navigate(['']);
            },
            error: _ =>
            {
            }
        });
    }
}