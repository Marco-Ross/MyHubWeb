import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication-service/authentication.service';
import { RegisterUserComplete } from '../../../models/classes/RegisterUserComplete.class';

@Component({
  selector: 'register-complete',
  templateUrl: 'register-complete.component.html',
  styleUrls: ['register-complete.component.scss']
})
export class RegisterCompleteComponent
{
  constructor(private authenticationService: AuthenticationService, private router: Router, private route : ActivatedRoute) { }

  formSubmitErrors: string = '';
  registrationStatus!: boolean | undefined;

  ngOnInit()
  {
    let userId = this.route.snapshot.paramMap.get('UserId');
    let registerToken = this.route.snapshot.paramMap.get('RegisterToken');

    this.authenticationService.RegisterComplete(new RegisterUserComplete(userId, registerToken)).subscribe({
      next: _ =>
      {
        this.registrationStatus = true;
        setTimeout(() =>
        {
          this.router.navigate(['']);
        }, 3000);
      },
      error: (response) =>
      {
        this.registrationStatus = false;
        this.formSubmitErrors = response.error;
      }
    });
  }
}