import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/core/services/authentication-service/authentication.service';
import { LoginUser } from '../../models/loginUser.model';

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent
{
  constructor(private authenticationService: AuthenticationService, private router: Router, private formBuilder: FormBuilder) { }

  loginFG!: FormGroup;
  formSubmitErrors: string = "";
  loginFormSubmitted: boolean = false;
  submitSubscription!: Subscription;

  ngOnInit()
  {
    this.loginFG = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required] //password validator
    });
  }

  //////

  onSubmit()
  {
    this.Login(this.loginFG.value);
  }

  public Login(loginUser: LoginUser)
  {
    this.loginFormSubmitted = true;

    if (!this.loginFG.valid)
      return;

    this.submitSubscription = this.authenticationService.Login(loginUser).subscribe({
      next: _ =>
      {
        this.router.navigate(['home']);
      },
      error: (response) =>
      {
        this.formSubmitErrors = response.error;
      }
    });
  }
}