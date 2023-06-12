import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GoogleAccessOptions } from './classes/google-access-options.class';
import { GoogleAuthService } from './google-access-token.service';

@Component({
  selector: 'google-access-token',
  templateUrl: 'google-access-token.component.html',
  styleUrls: ['google-access-token.component.scss']
})
export class GoogleAccessTokenComponent
{
  constructor(private googleAuthService: GoogleAuthService, private router: Router, private route: ActivatedRoute) { }

  formSubmitErrors: string = '';
  loginStatus!: boolean | undefined;

  ngOnInit()
  {
    let googleAccessOptions = new GoogleAccessOptions(
      this.route.snapshot.queryParams['authuser'], this.route.snapshot.queryParams['code'],
      this.route.snapshot.queryParams['prompt'], this.route.snapshot.queryParams['scope'],
      this.route.snapshot.queryParams['state']
    );

    this.googleAuthService.GoogleAccessToken(googleAccessOptions).subscribe({
      next: _ =>
      {
        this.loginStatus = true;
        // setTimeout(() =>
        // {
        //   this.router.navigate(['']);
        // }, 3000);

        this.router.navigate(['home']);
      },
      error: (response) =>
      {
        this.loginStatus = false;
        this.formSubmitErrors = response.error;
      }
    });
  }
}