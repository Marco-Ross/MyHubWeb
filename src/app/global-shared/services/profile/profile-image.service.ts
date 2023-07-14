import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProfileImageService
{
    ApiController: string = "Users";

    constructor(private http: HttpClient) { }

    UploadProfileImage(image: string | SafeUrl): Observable<any>
    {
        return this.http.put(this.ApiController + '/ProfileImage', { image: image });
    }

    GetUserProfileImage(): Observable<Blob>
    {
        return this.http.get(this.ApiController + '/ProfileImage', { responseType: 'blob' });
    }

    GetUserProfileImageById(userId: string): Observable<Blob>
    {
        return this.http.get(this.ApiController + '/ProfileImage/' + userId, { responseType: 'blob' });
    }

    RemoveProfileImage(): Observable<any>
    {
        return this.http.delete(this.ApiController + '/ProfileImage');
    }
}