import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRegisterUser } from 'src/app/features/login/models/interfaces/IRegisterUser.interface';
import { ILoginUser } from 'src/app/features/login/models/interfaces/ILoginUser.interface';
import { IResetPassword } from 'src/app/features/login/models/interfaces/IResetPassword.interface';
import { IRegisterUserComplete } from 'src/app/features/login/models/interfaces/IRegisterUserComplete.interface';
import { IResetPasswordComplete } from 'src/app/features/login/models/interfaces/IResetPasswordComplete.interface';
import { IResetPasswordLoggedIn } from 'src/app/features/settings/components/password-settings/interfaces/IResetPasswordLoggedIn.interface';

@Injectable()
export class AuthenticationService
{
  ApiController: string = "Authentication";

  constructor(private http: HttpClient) { }

  getIsAdmin(): Observable<any>
  {
    return this.http.get(this.ApiController + "/IsAdmin");
  }

  Login(user: ILoginUser): Observable<any>
  {
    return this.http.post(this.ApiController + '/Login', user);
  }

  LoginToContinue(user: ILoginUser): Observable<any>
  {
    return this.http.post(this.ApiController + '/LoginToContinue', user);
  }

  DeleteUser(): Observable<any>
  {
    return this.http.delete(this.ApiController);
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

  ResetPasswordLoggedIn(resetPassword: IResetPasswordLoggedIn): Observable<any>
  {
    return this.http.post(this.ApiController + '/ResetPasswordLoggedIn', resetPassword);
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