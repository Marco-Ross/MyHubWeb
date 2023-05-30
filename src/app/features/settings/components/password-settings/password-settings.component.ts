import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from 'src/app/core/services/authentication-service/authentication.service';
import { PasswordValidator } from 'src/app/features/login/components/register/password-matching.validator';

@Component({
    selector: 'password-settings',
    templateUrl: 'password-settings.component.html',
    styleUrls: ['password-settings.component.scss']
})
export class PasswordSettingsComponent
{
    constructor(private formBuilder: FormBuilder, private authenticationService: AuthenticationService) { }

    faPencil = faPencil;

    //

    passwordSettingsFG!: FormGroup;
    passwordSettingsSubmitted: boolean = false;
    isLoading: boolean = false;
    formSubmitErrors: string = '';
    success = false;

    //////

    ngOnInit()
    {
        this.passwordSettingsFG = this.formBuilder.group({
            oldPassword: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(8), PasswordValidator.Strength]],
            confirmPassword: ['', Validators.required]
        }, { validators: PasswordValidator.Matching });
    }

    onSubmit()
    {
        this.passwordSettingsSubmitted = true;
        this.isLoading = true;

        if (!this.passwordSettingsFG.valid)
        {
            this.isLoading = false;
            return;
        }

        this.authenticationService.ResetPasswordLoggedIn(this.passwordSettingsFG.value).subscribe({
            next: _ =>
            {
                this.isLoading = false;
                this.success = true;
                this.formSubmitErrors = '';
                this.passwordSettingsSubmitted = false;
                this.passwordSettingsFG.reset();

                setTimeout(() =>
                {
                    this.success = false;
                }, 3000);
            },
            error: (response) =>
            {
                this.isLoading = false;
                this.formSubmitErrors = response.error;
            }
        });
    }
}