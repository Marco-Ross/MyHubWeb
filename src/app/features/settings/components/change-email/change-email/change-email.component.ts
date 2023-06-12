import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { ChangeEmailService } from '../change-email.service';
import { ChangeEmail } from '../models/IChangeEmail.class';

@Component({
  selector: 'change-email',
  templateUrl: 'change-email.component.html',
  styleUrls: ['change-email.component.scss']
})
export class ChangeEmailComponent
{
  constructor(private changeEmailService: ChangeEmailService, private formBuilder: FormBuilder) { }

  faEye = faEye;
  faEyeSlash = faEyeSlash;

  //

  changeEmailFG!: FormGroup;
  formSubmitErrors: string = "";
  isLoading: boolean = false;
  hasValidated: boolean = false;
  changeEmailRequested: boolean = false;
  changeEmailFromSubmitted: boolean = false;
  idToken: string = "";

  ngOnInit()
  {
    this.changeEmailFG = this.formBuilder.group({
      email: ['', Validators.required]
    });
  }

  //////

  onLoginSubmit(idToken: string)
  {
    if (!idToken)
      return;

    this.hasValidated = true;
    this.idToken = idToken;
  }

  onSubmit()
  {
    this.changeEmailFromSubmitted = true;
    this.isLoading = true;

    if (!this.changeEmailFG.valid)
    {
      this.isLoading = false;
      return;
    }

    this.changeEmailService.ChangeEmail(new ChangeEmail(this.changeEmailFG.value.email, this.idToken)).subscribe({
      next: () =>
      {
        this.changeEmailRequested = true;
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