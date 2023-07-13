import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { galleryImage } from '../models/gallery-image.class';
import { Observable } from 'rxjs';
import { IImage, IImageForPopup, IImageResponse } from '../models/gallery-image.interface';

@Injectable()
export class GalleryImagesService
{
    private readonly ApiController: string = 'Gallery';

    constructor(private http: HttpClient) { }

    getIsAdmin(): Observable<any>
    {
        return this.http.get(this.ApiController + "/IsAdmin");
    }

    uploadImage(gallery: galleryImage): Observable<IImage>
    {
        return this.http.post<IImage>(this.ApiController, gallery);
    }

    getImageIds(): Observable<IImageResponse>
    {
        return this.http.get<IImageResponse>(this.ApiController);
    }

    getImagePopupData(imageId: string): Observable<IImageForPopup>
    {
        return this.http.get<IImageForPopup>(this.ApiController + '/ImageData/' + imageId);
    }

    getImage(imageId: string): Observable<Blob>
    {
        return this.http.get(this.ApiController + '/' + imageId, { responseType: 'blob' });
    }

    removeImage(imageId: string): Observable<any>
    {
        return this.http.delete(this.ApiController + '/' + imageId);
    }

    likeImage(imageId: string): Observable<any>
    {
        return this.http.post(this.ApiController + '/Like', { imageId: imageId });
    }

    unlikeImage(imageId: string): Observable<any>
    {
        return this.http.post(this.ApiController + '/Unlike', { imageId: imageId });
    }

    private postCommentApi(imageId: string, comment: string): Observable<any>
    {
        return this.http.post(this.ApiController + '/Comment', { imageId: imageId, comment: comment });
    }

    postComment(image: IImage)
    {
        image.isPostingComment = true;

        this.postCommentApi(image.id, image.formControl.value).subscribe({
            next: _ =>
            {
                image.formControl.setValue(undefined);
                image.commentsCount++;
                image.isPostingComment = false;
            },
            error: _ =>
            {
                image.formControl.setValue(undefined);
                image.isPostingComment = false;
            }
        });
    }
}