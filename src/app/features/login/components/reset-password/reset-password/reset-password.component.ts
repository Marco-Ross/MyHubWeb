import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/services/authentication-service/authentication.service';
import { IResetPassword } from '../../../models/interfaces/IResetPassword.interface';

@Component({
  selector: 'reset-password',
  templateUrl: 'reset-password.component.html',
  styleUrls:['reset-password.component.scss']
})
export class ResetPasswordComponent
{
  constructor(private authenticationService: AuthenticationService, private formBuilder: FormBuilder) { }

  resetPasswordFG!: FormGroup;
  formSubmitErrors: string = "";
  verifyFormSubmitted: boolean = false;
  resetRequested: boolean = false;
  isLoading: boolean = false;

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
    this.isLoading = true;

    if (!this.resetPasswordFG.valid)
    {
      this.isLoading = false;
      return;
    }

    this.authenticationService.ResetPassword(resetPassword).subscribe({
      next: _ =>
      {
        this.resetRequested = true;
        this.isLoading = false;
      },
      error: (response) =>
      {
        this.isLoading = false;
        this.formSubmitErrors = response.error;
      }
    });
  }
}