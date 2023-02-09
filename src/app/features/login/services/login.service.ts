import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class LoginService {
  ApiController: string = "Authentication";

  constructor(private http: HttpClient) { }

  Login(username: string, password: string): Observable<any> {
    var loginDetails = { Username: username, Password: password };

    return this.http.post(this.ApiController + '/Login', loginDetails);
  }

  Test(): Observable<any> {
    return this.http.get(this.ApiController + '/Test');
  }
}