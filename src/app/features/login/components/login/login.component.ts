import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication-service/authentication.service';
import { ILoginUser } from '../../models/interfaces/ILoginUser.interface';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { ThemeRenderer } from 'src/app/global-shared/services/theme/theme.renderer';
import { OAuthService } from 'angular-oauth2-oidc';
import { gitHubAuthConfig, googleAuthConfig } from 'src/app/global-shared/constants/oauth.config';
import { WindowRefService } from 'src/app/global-shared/services/window/window-ref.service';
import { v4 as uuidv4 } from 'uuid';
import { LocalStorageOAuthStorage } from 'src/app/global-shared/services/localStorage/services/oauth-local-storage';

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent
{
  constructor(private authenticationService: AuthenticationService, private router: Router,
    private formBuilder: FormBuilder, private themeRenderer: ThemeRenderer, private oauthService: OAuthService,
    private windowRefService: WindowRefService, private localStorageOAuthStorage: LocalStorageOAuthStorage) { }

  faEye = faEye;
  faEyeSlash = faEyeSlash;

  //

  loginFG!: FormGroup;
  formSubmitErrors: string = "";
  loginFormSubmitted: boolean = false;
  showPassword: boolean = false;
  isLoading: boolean = false;

  ngOnInit()
  {
    this.loginFG = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required,]
    });
  }

  //////

  onSubmit()
  {
    this.Login(this.loginFG.value);
  }

  public Login(loginUser: ILoginUser)
  {
    this.loginFormSubmitted = true;
    this.isLoading = true;

    if (!this.loginFG.valid)
    {
      this.isLoading = false;
      return;
    }

    this.authenticationService.Login(loginUser).subscribe({
      next: _ =>
      {
        this.isLoading = false;
        this.router.navigate(['home']).then(() => { this.themeRenderer.SetCurrentThemeLogin(); }, () => { });
      },
      error: (response) =>
      {
        this.isLoading = false;
        this.loginFG.get('email')?.markAsPristine();
        this.loginFG.get('password')?.markAsPristine();
        this.formSubmitErrors = response.error;
      }
    });
  }

  googleLogin()
  {
    this.oauthService.configure(googleAuthConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();

    this.oauthService.initCodeFlow(undefined, {
      'access_type': 'offline',
      'prompt': 'consent'
    });
  }

  githubLogin()
  {
    let nonce = uuidv4();
    this.localStorageOAuthStorage.setItem('nonce', nonce);
    
    this.windowRefService.nativeWindow.location.href =
      `https://github.com/login/oauth/authorize?client_id=${gitHubAuthConfig.clientId}&redirect_uri=${gitHubAuthConfig.redirectUri}&state=${nonce}&scope=${gitHubAuthConfig.scope}`;
  }
}