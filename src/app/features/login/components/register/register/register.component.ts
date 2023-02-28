import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication-service/authentication.service';
import { RegisterUser } from '../../../models/registerUser.model';

@Component({
  selector: 'register',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.scss']
})
export class RegisterComponent {
  constructor(private authenticationService: AuthenticationService, private router: Router, private formBuilder: FormBuilder) { }

  registerFG!: FormGroup;
  formSubmitErrors: string = "";
  registerFormSubmitted: boolean = false;
  registerLoading: boolean = false;

  ngOnInit() {
    this.registerFG = this.formBuilder.group({
      email: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required], //password validator
      passwordReEnter: ['', Validators.required]
    });
  }

  //////

  onSubmit() {
    this.Register(this.registerFG.value);
  }

  public Register(registerUser: RegisterUser) {
    this.registerFormSubmitted = true;

    if (!this.registerFG.valid)
      return;

    let loadingTimeout = setTimeout(() => {
      this.registerLoading = true;
    }, 200);

    this.authenticationService.Register(registerUser).subscribe({
      next: _ => {
        this.router.navigate(['register/validate-email']);
      },
      error: (response) => {
        this.formSubmitErrors = response.error;
      }
    }).add(() => {
      clearTimeout(loadingTimeout);
      this.registerLoading = false;
    });
  }
}