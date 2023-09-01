import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ThemeRenderer } from 'src/app/global-shared/services/theme/theme.renderer';
import { LocalStorageOAuthStorage } from 'src/app/global-shared/services/localStorage/services/oauth-local-storage';
import { GithubAuthService } from './github-login.service';
import { GithubAccessOptions } from './classes/github-access-options.class';

@Component({
    selector: 'github-access-token',
    templateUrl: 'github-access-token.component.html',
    styleUrls: ['github-access-token.component.scss']
})
export class GithubAccessTokenComponent
{
    constructor(private githubAuthService: GithubAuthService, private router: Router, private route: ActivatedRoute,
        private themeRenderer: ThemeRenderer, private localStorageOAuthStorage: LocalStorageOAuthStorage) { }

    formSubmitErrors: string = '';
    loginStatus!: boolean | undefined;

    ngOnInit()
    {
        let nonce = this.localStorageOAuthStorage.getItem('nonce');

        let githubAccessOptions = new GithubAccessOptions(this.route.snapshot.queryParams['code'], this.route.snapshot.queryParams['state']);

        if (!nonce || nonce !== githubAccessOptions.state)
        {
            this.loginStatus = false;
            this.formSubmitErrors = "Your login state comes from an invalid source. Cannot continue.";
            return;
        }

        this.localStorageOAuthStorage.removeItem('nonce');

        this.githubAuthService.GithubAccessToken(githubAccessOptions).subscribe({
            next: _ =>
            {
                this.loginStatus = true;
                this.router.navigate(['/']).then(() => { this.themeRenderer.setCurrentThemeLogin(); }, () => { });
            },
            error: (response) =>
            {
                this.loginStatus = false;
                this.formSubmitErrors = response.error;
            }
        });
    }
}