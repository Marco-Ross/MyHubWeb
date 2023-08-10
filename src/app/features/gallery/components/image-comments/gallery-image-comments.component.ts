import { Component, Input } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICommentingUser, IImage, IImageForPopup } from '../gallery/models/gallery-image.interface';
import { ProfileImageService } from 'src/app/global-shared/services/profile/profile-image.service';
import { GalleryImagesService } from '../gallery/gallery-service/gallery.service';
import { faHeart as faFullHeart, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { HubToastService } from 'src/app/global-shared/services/hub-toastr/hub-toastr.service';
import { InputValidator } from 'src/app/global-shared/validators/empty-input.validator';

@Component({
    selector: 'gallery-image-comments',
    templateUrl: 'gallery-image-comments.component.html',
    styleUrls: ['gallery-image-comments.component.scss']
})
export class GalleryImageCommentsComponent
{
    constructor(private formBuilder: FormBuilder, private profileImageService: ProfileImageService, private galleryImagesService: GalleryImagesService,
        private hubToast: HubToastService) { }

    @Input() options: any;

    faHeart = faHeart;
    faFullHeart = faFullHeart;
    faCalendar = faCalendar;

    //

    galleryImageCommentsFG!: FormGroup;
    defaultProfileImage = 'assets/icons/user-thin.png';

    ngOnInit()
    {
        this.galleryImageCommentsFG = this.formBuilder.group({
            comment: ['', [Validators.required, InputValidator.whiteSpace]]
        });

        this.galleryImagesService.getImagePopupData(this.options.data.id).subscribe({
            next: (imagePopupData: IImageForPopup) =>
            {
                this.options.data.commentsCount = imagePopupData.commentsCount;
                this.options.data.comments = imagePopupData.galleryImageComments;
                this.options.data.likedUsers = imagePopupData.likedUsers;
                this.options.data.likesCount = imagePopupData.likesCount;
            },
            error: (error) =>
            {
                this.hubToast.error("The image may have been removed. Actions limited.", error);
            }
        });
    }

    //////

    getProfileImage(comment: ICommentingUser)
    {
        return this.profileImageService.GetUserProfileImageById(comment.userId).subscribe({
            next: (image) =>
            {
                comment.profileImage = URL.createObjectURL(image);
            }
        });
    }

    postComment()
    {
        if (!this.galleryImageCommentsFG.get('comment')?.valid)
            return;

        this.galleryImagesService.postComment(this.options.data, this.galleryImageCommentsFG.get('comment') as AbstractControl);
    }

    like(image: IImage)
    {
        this.galleryImagesService.like(image);
    }

    unlike(image: IImage)
    {
        this.galleryImagesService.unlike(image);
    }

    onClose = () =>
    {
        return new Promise((resolve, reject) =>
        {
            resolve(undefined);
        });
    }
}