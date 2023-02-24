import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication-service/authentication.service';

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent {
  constructor(private authenticationService: AuthenticationService, private router: Router, private formBuilder: FormBuilder) { }

  loginFG!: FormGroup;
  invalidLoginError: string = "";
  loginFormSubmitted: boolean = false;

  ngOnInit() {
    this.loginFG = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required] //password validator
    });
  }

  //////

  onSubmit() {
    this.Login(this.loginFG.value);
  }

  //come up with a model structure?
  public Login({ email, password }: { email: string, password: string }) {
    this.loginFormSubmitted = true;

    if (this.loginFG.valid)
      this.authenticationService.Login(email, password).subscribe({
        next: _ => {
          this.router.navigate(['home']);
        },
        error: (response) => {
          this.invalidLoginError = response.error;
          this.loginFG.markAsPristine();
        }
      });
  }
}