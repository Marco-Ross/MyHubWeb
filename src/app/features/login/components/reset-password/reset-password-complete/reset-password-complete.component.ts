import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication-service/authentication.service';
import { PasswordValidator } from 'src/app/features/validators/login/password-matching.validator';
import { IResetPasswordComplete } from '../../../models/interfaces/IResetPasswordComplete.interface';

@Component({
  selector: 'reset-password',
  templateUrl: 'reset-password-complete.component.html',
  styleUrls: ['reset-password-complete.component.scss']
})
export class ResetPasswordCompleteComponent
{
  constructor(private authenticationService: AuthenticationService, private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder) { }

  resetPasswordCompleteFG!: FormGroup;
  formSubmitErrors: string = '';
  resetPasswordFormSubmitted: boolean = false;
  userId: string | null = '';
  resetPasswordToken: string | null = '';
  resetStatus!: boolean | undefined;
  showPassword: boolean = false;
  isLoading: boolean = false;

  ngOnInit()
  {
    this.userId = this.route.snapshot.paramMap.get('UserId');
    this.resetPasswordToken = this.route.snapshot.paramMap.get('ResetPasswordToken');

    this.resetPasswordCompleteFG = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(8), PasswordValidator.Strength]],
      confirmPassword: ['', Validators.required]
    }, { validators: PasswordValidator.Matching });
  }

  //////

  onSubmit()
  {
    this.ResetPasswordComplete(this.resetPasswordCompleteFG.value);
  }

  public ResetPasswordComplete(resetPasswordComplete: IResetPasswordComplete)
  {
    this.resetPasswordFormSubmitted = true;
    this.isLoading = true;

    if (!this.resetPasswordCompleteFG.valid)
    {
      this.isLoading = false;
      return;
    }

    resetPasswordComplete.UserId = this.userId;
    resetPasswordComplete.ResetPasswordToken = this.resetPasswordToken;

    this.authenticationService.ResetPasswordComplete(resetPasswordComplete).subscribe({
      next: _ =>
      {
        this.isLoading = false;
        this.resetStatus = true;
        setTimeout(() =>
        {
          this.router.navigate(['']);
        }, 3000);
      },
      error: (response) =>
      {
        this.isLoading = false;
        this.formSubmitErrors = response.error;
      }
    });
  }
}