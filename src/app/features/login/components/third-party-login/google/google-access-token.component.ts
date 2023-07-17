import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GoogleAccessOptions } from './classes/google-access-options.class';
import { GoogleAuthService } from './google-access-token.service';
import { ThemeRenderer } from 'src/app/global-shared/services/theme/theme.renderer';
import { LocalStorageOAuthStorage } from 'src/app/global-shared/services/localStorage/services/oauth-local-storage';

@Component({
  selector: 'google-access-token',
  templateUrl: 'google-access-token.component.html',
  styleUrls: ['google-access-token.component.scss']
})
export class GoogleAccessTokenComponent
{
  constructor(private googleAuthService: GoogleAuthService, private router: Router, private route: ActivatedRoute,
    private themeRenderer: ThemeRenderer, private localStorageOAuthStorage: LocalStorageOAuthStorage) { }

  formSubmitErrors: string = '';
  loginStatus!: boolean | undefined;

  ngOnInit()
  {
    let nonce = this.localStorageOAuthStorage.getItem('nonce');

    let googleAccessOptions = new GoogleAccessOptions(
      this.route.snapshot.queryParams['authuser'], this.route.snapshot.queryParams['code'],
      this.route.snapshot.queryParams['prompt'], this.route.snapshot.queryParams['scope'],
      this.route.snapshot.queryParams['state'], nonce
    );

    if (!nonce || nonce !== googleAccessOptions.state)
    {
      this.loginStatus = false;
      this.formSubmitErrors = "Your login state comes from an invalid source. Cannot continue.";
      return;
    }

    this.localStorageOAuthStorage.removeItem('nonce');

    this.googleAuthService.GoogleAccessToken(googleAccessOptions).subscribe({
      next: _ =>
      {
        this.loginStatus = true;
        this.router.navigate(['/']).then(() => { this.themeRenderer.SetCurrentThemeLogin(); }, () => { });
      },
      error: (response) =>
      {
        this.loginStatus = false;
        this.formSubmitErrors = response.error;
      }
    });
  }
}