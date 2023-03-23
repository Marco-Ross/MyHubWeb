import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRegisterUser } from 'src/app/features/login/models/interfaces/IRegisterUser.interface';
import { ILoginUser } from 'src/app/features/login/models/interfaces/ILoginUser.interface';
import { IResetPassword } from 'src/app/features/login/models/interfaces/IResetPassword.interface';
import { IRegisterUserComplete } from 'src/app/features/login/models/interfaces/IRegisterUserComplete.interface';
import { IResetPasswordComplete } from 'src/app/features/login/models/interfaces/IResetPasswordComplete.interface';

@Injectable()
export class AuthenticationService
{
  ApiController: string = "Authentication";

  constructor(private http: HttpClient) { }

  Login(user: ILoginUser): Observable<any>
  {
    return this.http.post(this.ApiController + '/Login', user);
  }

  Logout(): Observable<any>
  {
    return this.http.post(this.ApiController + '/Revoke', '');
  }

  RefreshToken(): Observable<any>
  {
    return this.http.post(this.ApiController + '/Refresh', '');
  }

  Register(user: IRegisterUser): Observable<any>
  {
    return this.http.post(this.ApiController + '/Register', user);
  }

  RegisterComplete(registerUserComplete: IRegisterUserComplete): Observable<any>
  {
    return this.http.post(this.ApiController + '/Register/Complete', registerUserComplete);
  }

  ResetPassword(resetPassword: IResetPassword): Observable<any>
  {
    return this.http.post(this.ApiController + '/ResetPassword', resetPassword);
  }

  ResetPasswordComplete(resetPasswordComplete: IResetPasswordComplete): Observable<any>
  {
    return this.http.post(this.ApiController + '/ResetPassword/Complete', resetPasswordComplete);
  }
}