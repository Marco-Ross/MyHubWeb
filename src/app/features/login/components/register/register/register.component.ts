import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication-service/authentication.service';
import { PasswordValidator } from 'src/app/features/validators/login/password-matching.validator';
import { ButtonService } from 'src/app/global-shared/services/load-button/load-button.service';
import { IRegisterUser } from '../../../models/interfaces/IRegisterUser.interface';

@Component({
  selector: 'register',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.scss']
})
export class RegisterComponent
{
  constructor(private authenticationService: AuthenticationService, private router: Router, private formBuilder: FormBuilder, public buttonService: ButtonService) { }

  registerFG!: FormGroup;
  formSubmitErrors: string = "";
  registerFormSubmitted: boolean = false;
  registerRequested: boolean = false;
  showPassword: boolean = false;
  get isLoading(): boolean
  {
    return this.buttonService.loading;
  }

  ngOnInit()
  {
    this.registerFG = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8), PasswordValidator.Strength]],
      confirmPassword: ['', Validators.required]
    }, { validators: PasswordValidator.Matching });
  }

  //////

  onSubmit(): void
  {
    this.Register(this.registerFG.value);
  }

  public Register(registerUser: IRegisterUser): void
  {
    this.registerFormSubmitted = true;
    this.buttonService.StartLoading(150);

    if (!this.registerFG.valid)
    {
      this.buttonService.StopLoading();
      return;
    }

    this.authenticationService.Register(registerUser).subscribe({
      next: _ =>
      {
        this.registerRequested = true;
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