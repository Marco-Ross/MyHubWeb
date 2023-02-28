import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterUser } from 'src/app/features/login/models/registerUser.model';
import { LoginUser } from 'src/app/features/login/models/loginUser.model';

@Injectable()
export class AuthenticationService
{
  ApiController: string = "Authentication";

  constructor(private http: HttpClient) { }

  Register(user: RegisterUser): Observable<any>
  {
    return this.http.post(this.ApiController + '/Register', user);
  }

  Login(user: LoginUser): Observable<any>
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
}