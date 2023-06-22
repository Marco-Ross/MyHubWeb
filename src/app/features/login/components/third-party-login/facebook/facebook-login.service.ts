import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FacebookAccessOptions } from './classes/facebook-access-options.class';

@Injectable()
export class FacebookAuthService
{
  ApiController: string = "FacebookAuth";

  constructor(private http: HttpClient) { }

  FacebookAccessToken(accessOptions: FacebookAccessOptions)
  {
    return this.http.post(this.ApiController + '/AccessToken', accessOptions);
  }
}