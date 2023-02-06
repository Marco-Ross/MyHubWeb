import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class LoginService {
  Base: string = "Authentication";

  constructor(private http: HttpClient) { }

  Login(username: string, password: string): Observable<any> {
    var loginDetails = { Username: username, Password: password };

    return this.http.post(this.Base + '/Authenticate', loginDetails);
  }
}