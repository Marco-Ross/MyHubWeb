import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountSettingsService } from './account-settings.service';
import { NavLayoutService } from 'src/app/features/nav-bar/nav-layout.service';
import { faPencil, faExternalLink } from '@fortawesome/free-solid-svg-icons';
import { UploadService } from 'src/app/global-shared/components/upload-component/upload-files.service';
import { ProfileImageService } from 'src/app/global-shared/services/profile/profile-image.service';

@Component({
  selector: 'account-settings',
  templateUrl: 'account-settings.component.html',
  styleUrls: ['account-settings.component.scss']
})
export class AccountSettingsComponent
{
  constructor(private formBuilder: FormBuilder, private accountSettingsService: AccountSettingsService, private navLayoutService: NavLayoutService,
    private uploadService: UploadService, private profileImageService: ProfileImageService) { }

  faPencil = faPencil;
  faExternalLink = faExternalLink;

  //

  @Output() onUpdate = new EventEmitter<any>();
  @Input() disabled: boolean = false;

  accountSettingsFG!: FormGroup;
  defaultProfileImage = 'assets/icons/user-thin.png';
  profileImage: string = '';
  email: string = '';
  imageUploaded = false;
  accountUpdateSubmitted = false;
  isLoading = false;
  success = false;
  formSubmitErrors: string = '';

  ngOnInit()
  {
    this.accountSettingsService.getUserDetails().subscribe({
      next: (userDetails) =>
      {
        this.email = userDetails.email;
        this.accountSettingsFG = this.formBuilder.group({
          username: [userDetails.username, Validators.required],
          name: [userDetails.name, Validators.required],
          surname: [userDetails.surname, Validators.required],
        });
      }
    });

    this.profileImageService.GetUserProfileImage().subscribe({
      next: (image) =>
      {
        if (!image || !image.size)
        {
          this.profileImage = this.defaultProfileImage;
          return;
        }

        this.profileImage = URL.createObjectURL(image);
      }
    });
  }

  //////

  onSubmit()
  {
    this.accountUpdateSubmitted = true;

    this.isLoading = true;

    if (!this.accountSettingsFG.valid)
    {
      this.isLoading = false;
      return;
    }

    this.accountSettingsService.updateAccount(this.accountSettingsFG.value).subscribe({
      next: () =>
      {
        this.onUpdate.emit(this.accountSettingsFG.value);
        
        this.isLoading = false;
        this.success = true;
        this.formSubmitErrors = '';
        this.accountUpdateSubmitted = false;

        setTimeout(() =>
        {
          this.success = false;
        }, 3000);

        this.navLayoutService.getNavDetails().username = this.accountSettingsFG.value.username;
      },
      error: (response) =>
      {
        this.isLoading = false;
        this.formSubmitErrors = response.error;
      }
    });

    if (this.imageUploaded)
      this.profileImageService.UploadProfileImage(this.profileImage).subscribe({
        next: () =>
        {
          this.navLayoutService.getNavDetails().profileImage = this.profileImage;
        }
      });
  }

  deleteAccount()
  {
    this.accountSettingsService.deleteAccount();
  }

  uploadImage()
  {
    this.uploadService.UploadProfileImageCrop('Upload A New Profile Image').then((image) =>
    {
      this.profileImage = image;
      this.imageUploaded = true;
    }, () => { });
  }

  removeImage()
  {
    this.profileImageService.RemoveProfileImage().subscribe({
      next: () =>
      {
        this.profileImage = this.defaultProfileImage;
        this.navLayoutService.getNavDetails().profileImage = this.profileImage;
      }
    });
  }

  ngOnDestroy()
  {
    URL.revokeObjectURL(this.profileImage);
  }
}