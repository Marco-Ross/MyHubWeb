import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PopupService } from 'src/app/global-shared/components/bootstrap-modal/popup.service';
import { DeleteAccountSettingsComponent } from './delete-account-settings/delete-account-settings.component';
import { DeleteAccountSettingsModule } from './delete-account-settings/delete-account-settings.module';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication-service/authentication.service';
import { uploadOptions } from 'src/app/global-shared/components/upload-component/upload-options.class';
import { HubToastService } from 'src/app/global-shared/services/hub-toastr/hub-toastr.service';

@Injectable()
export class AccountSettingsService
{
    private readonly ApiUsersController: string = "Users";

    constructor(private http: HttpClient, private popupService: PopupService, private router: Router, private authenticationService: AuthenticationService, private hubToastr: HubToastService) { }

    deleteAccount()
    {
        let options = new uploadOptions('Delete Account');
        options.buttonText = 'Delete Account';
        this.popupService.open(DeleteAccountSettingsComponent, DeleteAccountSettingsModule, options).then((value: any) =>
        {
            this.authenticationService.DeleteUser().subscribe({
                next: () =>
                {
                    this.hubToastr.success('Account deleted');
                    this.router.navigate(['']);
                }
            });

        }, () => { });
    }

    getUserDetails(): Observable<any>
    {
        return this.http.get(this.ApiUsersController);
    }

    updateAccount(accountInfo: any): Observable<any>
    {
        return this.http.put(this.ApiUsersController, accountInfo);
    }
}