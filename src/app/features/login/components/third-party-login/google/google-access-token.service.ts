import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GoogleAccessOptions } from 'src/app/features/login/components/third-party-login/google/classes/google-access-options.class';

@Injectable()
export class GoogleAuthService
{
  ApiController: string = "GoogleAuth";

  constructor(private http: HttpClient) { }

  GoogleAccessToken(accessOptions: GoogleAccessOptions)
  {
    return this.http.post(this.ApiController + '/AccessToken', accessOptions);
  }
}