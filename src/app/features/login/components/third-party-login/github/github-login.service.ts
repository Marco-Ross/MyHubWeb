import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GithubAccessOptions } from './classes/github-access-options.class';

@Injectable()
export class GithubAuthService
{
  ApiController: string = "GithubAuth";

  constructor(private http: HttpClient) { }

  GithubAccessToken(accessOptions: GithubAccessOptions)
  {
    return this.http.post(this.ApiController + '/AccessToken', accessOptions);
  }
}