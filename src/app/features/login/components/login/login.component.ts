import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication-service/authentication.service';
import { ILoginUser } from '../../models/interfaces/ILoginUser.interface';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { ThemeRenderer } from 'src/app/global-shared/services/theme/theme.renderer';

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent
{
  constructor(private authenticationService: AuthenticationService, private router: Router, private formBuilder: FormBuilder, private themeRenderer: ThemeRenderer) { }

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
      password: ['', Validators.required, ]
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
        this.themeRenderer.SetCurrentThemeLogin();

        this.isLoading = false;
        this.router.navigate(['home']);
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
}