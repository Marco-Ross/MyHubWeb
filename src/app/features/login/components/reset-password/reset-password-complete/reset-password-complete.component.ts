import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication-service/authentication.service';
import { PasswordValidator } from 'src/app/features/validators/login/password-matching.validator';
import { ButtonService } from 'src/app/global-shared/services/load-button/load-button.service';
import { IResetPasswordComplete } from '../../../models/interfaces/IResetPasswordComplete.interface';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { faEyeSlash } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'reset-password',
  templateUrl: 'reset-password-complete.component.html',
  styleUrls: ['reset-password-complete.component.scss']
})
export class ResetPasswordCompleteComponent
{
  constructor(private authenticationService: AuthenticationService, private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder, private buttonService: ButtonService) { }

  faEye = faEye;
  faEyeSlash = faEyeSlash;

  //

  resetPasswordCompleteFG!: FormGroup;
  formSubmitErrors: string = '';
  resetPasswordFormSubmitted: boolean = false;
  userId: string | null = '';
  resetPasswordToken: string | null = '';
  resetStatus!: boolean | undefined;
  showPassword: boolean = false;
  get isLoading(): boolean
  {
    return this.buttonService.loading;
  }

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
    this.buttonService.StartLoading(150);

    if (!this.resetPasswordCompleteFG.valid)
    {
      this.buttonService.StopLoading();
      return;
    }

    resetPasswordComplete.UserId = this.userId;
    resetPasswordComplete.ResetPasswordToken = this.resetPasswordToken;

    this.authenticationService.ResetPasswordComplete(resetPasswordComplete).subscribe({
      next: _ =>
      {
        this.buttonService.StopLoading();
        this.resetStatus = true;
        setTimeout(() =>
        {
          this.router.navigate(['']);
        }, 3000);
      },
      error: (response) =>
      {
        this.buttonService.StopLoading();
        this.formSubmitErrors = response.error;
      }
    });
  }
}