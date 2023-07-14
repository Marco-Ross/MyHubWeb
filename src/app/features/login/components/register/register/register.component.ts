import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/services/authentication-service/authentication.service';
import { PasswordValidator } from 'src/app/features/login/components/register/password-matching.validator';
import { IRegisterUser } from '../../../models/interfaces/IRegisterUser.interface';
import { UploadService } from 'src/app/global-shared/components/upload-component/upload-files.service';
import { ThemeConstants } from 'src/app/global-shared/constants/theme.constants';
import { uploadCroppedOptions } from 'src/app/global-shared/components/upload-component/upload-cropped-options.class';
import { uploadOptions } from 'src/app/global-shared/components/upload-component/upload-options.class';

@Component({
  selector: 'register',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.scss']
})
export class RegisterComponent
{
  constructor(private authenticationService: AuthenticationService, private formBuilder: FormBuilder, private uploadService: UploadService) { }

  registerFG!: FormGroup;
  formSubmitErrors: string = "";
  registerFormSubmitted: boolean = false;
  registerRequested: boolean = false;
  showPassword: boolean = false;
  isLoading: boolean = false;
  profileImage: string = '';

  ngOnInit()
  {
    this.registerFG = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8), PasswordValidator.Strength]],
      confirmPassword: ['', Validators.required]
    }, { validators: PasswordValidator.Matching });
  }

  //////

  onSubmit(): void
  {
    this.Register(this.registerFG.value);
  }

  uploadImage()
  {
    this.uploadService.UploadProfileImageCrop('Upload A Profile Image').then((result) =>
    {
      this.profileImage = result.croppedImageEvent;
    }, () => { });
  }

  public Register(registerUser: IRegisterUser): void
  {
    this.registerFormSubmitted = true;
    this.isLoading = true;

    if (!this.registerFG.valid)
    {
      this.isLoading = false;
      return;
    }

    registerUser.profileImage = this.profileImage;
    registerUser.theme = ThemeConstants.SystemTheme;

    this.authenticationService.Register(registerUser).subscribe({
      next: _ =>
      {
        this.registerRequested = true;
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