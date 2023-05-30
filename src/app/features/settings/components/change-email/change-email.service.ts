import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ILoginUser } from 'src/app/features/login/models/interfaces/ILoginUser.interface';
import { ChangeEmailComplete } from './models/IChangeEmailComplete.class';
import { ChangeEmail } from './models/IChangeEmail.class';

@Injectable()
export class ChangeEmailService
{
  private ApiController: string = "Authentication";

  constructor(private http: HttpClient) { }

  ChangeEmailLogin(user: ILoginUser): Observable<any>
  {
    return this.http.post(this.ApiController + '/ChangeEmail', user);
  }

  ChangeEmail(resetPassword: ChangeEmail): Observable<any>
  {
    return this.http.post(this.ApiController + '/ChangeEmail', resetPassword);
  }

  ChangeEmailComplete(resetPasswordComplete: ChangeEmailComplete): Observable<any>
  {
    return this.http.post(this.ApiController + '/ChangeEmail/Complete', resetPasswordComplete);
  }
}