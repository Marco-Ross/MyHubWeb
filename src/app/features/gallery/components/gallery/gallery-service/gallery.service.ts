import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { galleryImage } from '../models/gallery-image.class';
import { Observable } from 'rxjs';
import { IComment, IImage, IImageForPopup, IImageResponse } from '../models/gallery-image.interface';
import { likedUser } from '../models/liked-user.class';
import { AbstractControl } from '@angular/forms';
import { HubToastService } from 'src/app/global-shared/services/hub-toastr/hub-toastr.service';

@Injectable()
export class GalleryImagesService
{
    private readonly ApiController: string = 'Gallery';

    constructor(private http: HttpClient, private hubToast: HubToastService) { }

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

    pinComment(commentId: string): Observable<any>
    {
        return this.http.post(this.ApiController + '/Comment/Pin', { commentId: commentId });
    }

    unpinComment(commentId: string): Observable<any>
    {
        return this.http.post(this.ApiController + '/Comment/Unpin', { commentId: commentId });
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
        this.likeImageApi(image.id).subscribe({
            next: _ =>
            {
                image.likesCount++;
                image.isLiked = true;
                image.likedUsers.unshift(new likedUser('', 'You'));
            },
            error: (error) =>
            {
                this.hubToast.error("The image may have been removed. Actions limited.", error);
            }
        });
    }

    unlike(image: IImage)
    {
        this.unlikeImageApi(image.id).subscribe({
            next: _ =>
            {
                image.likesCount--;
                image.isLiked = false;
                image.filters.isLiked = false;
                image.likedUsers.splice(0, 1);
            },
            error: (error) =>
            {
                this.hubToast.error("The image may have been removed. Actions limited.", error);
            }
        });
    }

    postComment(image: IImage, formControl: AbstractControl)
    {
        if (image.isPostingComment)
            return;

        let timeout = setTimeout(() => image.isPostingComment = true, 100);

        this.postCommentApi(image.id, formControl.value).subscribe({
            next: (comment) =>
            {
                clearTimeout(timeout);
                formControl.setValue('');
                image.commentsCount++;
                image.isPostingComment = false;

                if (!image.comments.length)
                {
                    (image.comments ||= []).unshift(comment);
                    return;
                }

                let indexToInsert = image.comments.findIndex(x => !x.pinned);

                if (indexToInsert === -1)
                    image.comments.push(comment);
                else
                    image.comments.splice(indexToInsert, 0, comment);
            },
            error: (error) =>
            {
                formControl.setValue('');
                image.isPostingComment = false;
                this.hubToast.error("The image may have been removed. Actions limited.", error);
            }
        });
    }

    deleteComment(commentId: string)
    {
        return this.http.delete(this.ApiController + '/Comments/' + commentId);
    }
}