import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangeEmailComplete } from '../models/IChangeEmailComplete.class';
import { ChangeEmailService } from '../change-email.service';

@Component({
    selector: 'change-email-complete',
    templateUrl: 'change-email-complete.component.html',
    styleUrls: ['change-email-complete.component.scss']
})
export class ChangeEmailCompleteComponent
{
    constructor(private changeEmailService: ChangeEmailService, private router: Router, private route: ActivatedRoute) { }

    formSubmitErrors: string = '';
    emailChangeStatus!: boolean | undefined;

    ngOnInit()
    {
        let userId = this.route.snapshot.paramMap.get('UserId');
        let changeEmailToken = this.route.snapshot.paramMap.get('ChangeEmailToken');

        this.changeEmailService.ChangeEmailComplete(new ChangeEmailComplete(userId, changeEmailToken)).subscribe({
            next: _ =>
            {
                this.emailChangeStatus = true;
                setTimeout(() =>
                {
                    this.router.navigate(['']);
                }, 3000);
            },
            error: (response) =>
            {
                this.emailChangeStatus = false;
                this.formSubmitErrors = response.error;
            }
        });
    }
}