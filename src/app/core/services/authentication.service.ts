import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticationService {
  ApiController: string = "Authentication";

  constructor(private http: HttpClient) { }

  RefreshToken(): Observable<any> {
    return this.http.get(this.ApiController + '/Refresh');
  }
}