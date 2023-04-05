import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication-service/authentication.service';
import { ButtonService } from 'src/app/global-shared/services/load-button/load-button.service';
import { ILoginUser } from '../../models/interfaces/ILoginUser.interface';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { faEyeSlash } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent
{
  constructor(private authenticationService: AuthenticationService, private router: Router, private formBuilder: FormBuilder, private buttonService: ButtonService) { }

  faEye = faEye;
  faEyeSlash = faEyeSlash;

  //

  loginFG!: FormGroup;
  formSubmitErrors: string = "";
  loginFormSubmitted: boolean = false;
  showPassword: boolean = false;
  get isLoading(): boolean
  {
    return this.buttonService.loading;
  }

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
    this.buttonService.StartLoading(150);

    if (!this.loginFG.valid)
    {
      this.buttonService.StopLoading();
      return;
    }

    this.authenticationService.Login(loginUser).subscribe({
      next: _ =>
      {
        this.buttonService.StopLoading();
        this.router.navigate(['home']);
      },
      error: (response) =>
      {
        this.buttonService.StopLoading();
        this.loginFG.get('email')?.markAsPristine();
        this.loginFG.get('password')?.markAsPristine();
        this.formSubmitErrors = response.error;
      }
    });
  }


}