import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProfileImageService
{
    ApiController: string = "Users";

    constructor(private http: HttpClient) { }

    GetUserProfileImage(): Observable<Blob>
    {
        return this.http.get(this.ApiController + '/ProfileImage', { responseType: 'blob' });
    }
}