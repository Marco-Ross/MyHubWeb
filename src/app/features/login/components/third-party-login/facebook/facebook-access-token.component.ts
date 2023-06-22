import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ThemeRenderer } from 'src/app/global-shared/services/theme/theme.renderer';
import { LocalStorageOAuthStorage } from 'src/app/global-shared/services/localStorage/services/oauth-local-storage';
import { FacebookAuthService } from './facebook-login.service';
import { FacebookAccessOptions } from './classes/facebook-access-options.class';

@Component({
    selector: 'facebook-access-token',
    templateUrl: 'facebook-access-token.component.html',
    styleUrls: ['facebook-access-token.component.scss']
})
export class FacebookAccessTokenComponent
{
    constructor(private facebookAuthService: FacebookAuthService, private router: Router, private route: ActivatedRoute,
        private themeRenderer: ThemeRenderer, private localStorageOAuthStorage: LocalStorageOAuthStorage) { }

    formSubmitErrors: string = '';
    loginStatus!: boolean | undefined;

    ngOnInit()
    {
        let nonce = this.localStorageOAuthStorage.getItem('nonce');

        let facebookAccessOptions = new FacebookAccessOptions(this.route.snapshot.queryParams['code'], this.route.snapshot.queryParams['state']);

        if (!nonce || nonce !== facebookAccessOptions.state)
        {
            this.loginStatus = false;
            this.formSubmitErrors = "Your login state comes from an invalid source. Cannot continue.";
            return;
        }

        this.localStorageOAuthStorage.removeItem('nonce');

        this.facebookAuthService.FacebookAccessToken(facebookAccessOptions).subscribe({
            next: _ =>
            {
                this.loginStatus = true;
                this.router.navigate(['home']).then(() => { this.themeRenderer.SetCurrentThemeLogin(); }, () => { });
            },
            error: (response) =>
            {
                this.loginStatus = false;
                this.formSubmitErrors = response.error;
            }
        });
    }
}