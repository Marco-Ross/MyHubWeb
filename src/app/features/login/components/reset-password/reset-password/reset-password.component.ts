import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/services/authentication-service/authentication.service';
import { ButtonService } from 'src/app/global-shared/services/load-button/load-button.service';
import { IResetPassword } from '../../../models/interfaces/IResetPassword.interface';

@Component({
  selector: 'reset-password',
  templateUrl: 'reset-password.component.html',
  styleUrls:['reset-password.component.scss']
})
export class ResetPasswordComponent
{
  constructor(private authenticationService: AuthenticationService, private formBuilder: FormBuilder, private buttonService: ButtonService) { }

  resetPasswordFG!: FormGroup;
  formSubmitErrors: string = "";
  verifyFormSubmitted: boolean = false;
  resetRequested: boolean = false;
  get isLoading(): boolean
  {
    return this.buttonService.loading;
  }

  ngOnInit()
  {
    this.resetPasswordFG = this.formBuilder.group({
      email: ['', Validators.required]
    });
  }

  //////

  onSubmit()
  {
    this.ResetPasswordVerify(this.resetPasswordFG.value);
  }

  public ResetPasswordVerify(resetPassword: IResetPassword)
  {
    this.verifyFormSubmitted = true;
    this.buttonService.StartLoading(150);

    if (!this.resetPasswordFG.valid)
    {
      this.buttonService.StopLoading();
      return;
    }

    this.authenticationService.ResetPassword(resetPassword).subscribe({
      next: _ =>
      {
        this.resetRequested = true;
        this.buttonService.StopLoading();
      },
      error: (response) =>
      {
        this.buttonService.StopLoading();
        this.formSubmitErrors = response.error;
      }
    });
  }
}