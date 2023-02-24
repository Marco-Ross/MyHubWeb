import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterUser } from 'src/app/features/login/models/registerUser.model';

@Injectable()
export class AuthenticationService {
  ApiController: string = "Authentication";

  constructor(private http: HttpClient) { }

  Register(user: RegisterUser): Observable<any> {
    return this.http.post(this.ApiController + '/Register', user);
  }

  Login(email: string, password: string): Observable<any> {
    var loginDetails = { Email: email, Password: password };

    return this.http.post(this.ApiController + '/Login', loginDetails);
  }

  Logout(): Observable<any> {
    return this.http.post(this.ApiController + '/Revoke', '');
  }

  RefreshToken(): Observable<any> {
    return this.http.post(this.ApiController + '/Refresh', '');
  }
}