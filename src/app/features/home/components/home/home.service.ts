import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HomeService
{
  ApiController: string = "AzureDevOps";

  constructor(private http: HttpClient) { }

  GetAllWorkItems(): Observable<any>
  {
    return this.http.get(this.ApiController);
  }
}