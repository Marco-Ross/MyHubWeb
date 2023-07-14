import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { galleryImage } from '../models/gallery-image.class';
import { Observable } from 'rxjs';
import { IImage, IImageForPopup, IImageResponse } from '../models/gallery-image.interface';
import { ToastrService } from 'ngx-toastr';
import { likedUser } from '../models/liked-user.class';
import { AbstractControl, FormControl } from '@angular/forms';

@Injectable()
export class GalleryImagesService
{
    private readonly ApiController: string = 'Gallery';

    constructor(private http: HttpClient, private toastr: ToastrService) { }

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

    private likeImageApi(imageId: string): Observable<any>
    {
        return this.http.post(this.ApiController + '/Like', { imageId: imageId });
    }

    private unlikeImageApi(imageId: string): Observable<any>
    {
        return this.http.post(this.ApiController + '/Unlike', { imageId: imageId });
    }

    private postCommentApi(imageId: string, comment: string): Observable<any>
    {
        return this.http.post(this.ApiController + '/Comment', { imageId: imageId, comment: comment });
    }

    like(image: IImage)
    {
        image.likesCount++;
        image.isLiked = true;
        image.likedUsers.unshift(new likedUser('', 'You'));
        this.likeImageApi(image.id).subscribe({
            next: _ =>
            {
            },
            error: _ =>
            {
                this.toastr.error("The image may have been removed. Actions limited.");
            }
        });
    }

    unlike(image: IImage)
    {
        image.likesCount--;
        image.isLiked = false;
        image.filters.isLiked = false;
        image.likedUsers.splice(0, 1);
        this.unlikeImageApi(image.id).subscribe({
            next: _ =>
            {

            },
            error: _ =>
            {
                this.toastr.error("The image may have been removed. Actions limited.");
            }
        });
    }

    postComment(image: IImage, formControl: AbstractControl)
    {
        image.isPostingComment = true;

        this.postCommentApi(image.id, formControl.value).subscribe({
            next: (comment) =>
            {
                formControl.setValue(undefined);
                image.commentsCount++;
                image.isPostingComment = false;
                image.comments.unshift(comment);
            },
            error: _ =>
            {
                formControl.setValue(undefined);
                image.isPostingComment = false;
                this.toastr.error("The image may have been removed. Actions limited.");
            }
        });
    }
}