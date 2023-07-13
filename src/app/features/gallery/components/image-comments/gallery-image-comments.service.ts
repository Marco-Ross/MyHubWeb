import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class GalleryImageCommentsService
{
    private readonly ApiController: string = 'Gallery';

    constructor(private http: HttpClient) { }

    getImageComments(imageId: string): Observable<any>
    {
        return this.http.get(this.ApiController + "/Comments/" + imageId);
    }
}