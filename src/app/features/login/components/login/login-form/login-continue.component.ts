import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { AuthenticationService } from 'src/app/core/services/authentication-service/authentication.service';

@Component({
  selector: 'login-continue',
  templateUrl: 'login-continue.component.html',
  styleUrls: ['login-continue.component.scss']
})
export class LoginContinueComponent
{
  constructor(private formBuilder: FormBuilder, private authenticationService: AuthenticationService) { }

  faEye = faEye;
  faEyeSlash = faEyeSlash;

  //

  @Input() title: string = 'Login to continue';
  @Output() onFromSubmit = new EventEmitter<any>();

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
    this.loginFormSubmitted = true;
    this.isLoading = true;

    if (!this.loginFG.valid)
    {
      this.isLoading = false;
      this.onFromSubmit.emit(false);
      return;
    }

    this.authenticationService.LoginToContinue(this.loginFG.value).subscribe({
      next: (response: any) =>
      {
        this.isLoading = false;
        this.onFromSubmit.emit(response.accessToken);
      },
      error: (response: any) =>
      {
        this.isLoading = false;
        this.loginFG.get('email')?.markAsPristine();
        this.loginFG.get('password')?.markAsPristine();
        this.formSubmitErrors = response.error;
        this.onFromSubmit.emit(false);
      }
    });
  }
}