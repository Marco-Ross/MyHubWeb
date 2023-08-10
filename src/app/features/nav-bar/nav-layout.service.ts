import { Injectable } from '@angular/core';
import { NavDetails } from './class/nav-details.class';
import { ProfileImageService } from 'src/app/global-shared/services/profile/profile-image.service';

@Injectable({ providedIn: 'root' })
export class NavLayoutService
{
    constructor(private profileImageService: ProfileImageService) { }

    private defaultProfileImage = 'assets/icons/user-thin.png';
    private navDetails: NavDetails = new NavDetails();

    getNavDetails(): NavDetails
    {
        return this.navDetails;
    }

    signIn(loginData: any)
    {
        this.navDetails.isLoggedIn = true;
        this.navDetails.username = loginData.Username;

        this.profileImageService.GetUserProfileImage().subscribe({
            next: (image) =>
            {
                if (!image || !image.size)
                {
                    this.navDetails.profileImage = this.defaultProfileImage;
                    return;
                }

                this.navDetails.profileImage = URL.createObjectURL(image);
            }
        });
    }

    signOut()
    {
        this.navDetails.isLoggedIn = false;
        this.navDetails.username = '';
        URL.revokeObjectURL(this.navDetails.profileImage);
        this.navDetails.profileImage = '';
    }
}