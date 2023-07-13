import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GalleryImageCommentsService } from './gallery-image-comments.service';
import { ICommentingUser, IImage, IImageForPopup } from '../gallery/models/gallery-image.interface';
import { ProfileImageService } from 'src/app/global-shared/services/profile/profile-image.service';
import { GalleryImagesService } from '../gallery/gallery-service/gallery.service';
import { faHeart as faFullHeart, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { likedUser } from '../gallery/models/liked-user.class';

@Component({
    selector: 'gallery-image-comments',
    templateUrl: 'gallery-image-comments.component.html',
    styleUrls: ['gallery-image-comments.component.scss']
})
export class GalleryImageCommentsComponent
{
    constructor(private formBuilder: FormBuilder, private galleryImageCommentsService: GalleryImageCommentsService,
        private profileImageService: ProfileImageService, private galleryImagesService: GalleryImagesService) { }

    @Output() popupForm = new EventEmitter<FormGroup>;
    @Input() options: any;

    faHeart = faHeart;
    faFullHeart = faFullHeart;
    faCalendar = faCalendar;

    //

    galleryImageCommentsFG!: FormGroup;
    defaultProfileImage = 'assets/icons/user-thin.png';
    userProfilePictures: Record<string, string> = {};

    ngOnInit()
    {
        this.galleryImageCommentsFG = this.formBuilder.group({
            comment: ''
        });

        this.popupForm.emit(this.galleryImageCommentsFG);

        this.galleryImagesService.getImagePopupData(this.options.data.id).subscribe({
            next: (imagePopupData: IImageForPopup) =>
            {
                this.options.data.commentsCount = imagePopupData.commentsCount;
                this.options.data.comments = imagePopupData.galleryImageComments;
                this.options.data.likedUsers = imagePopupData.likedUsers;
                this.options.data.likesCount = imagePopupData.likesCount;
            }
        });
    }

    //////

    getProfileImage(comment: ICommentingUser)
    {
        if (this.userProfilePictures[comment.userId])
            return comment.profileImage = this.userProfilePictures[comment.userId];

        return this.profileImageService.GetUserProfileImageById(comment.userId).subscribe({
            next: (image) =>
            {
                comment.profileImage = URL.createObjectURL(image);
                this.userProfilePictures[comment.userId] = comment.profileImage;
            }
        });
    }

    isCommentEmpty(): boolean
    {
        let comment = this.galleryImageCommentsFG.get('comment')?.value;

        if (!comment)
            return true;

        return comment.trim().length === 0;
    }

    postComment()
    {
        if (this.isCommentEmpty())
            return;

        this.galleryImagesService.postComment(this.options.data);
    }

    like(image: IImage)
    {
        image.likesCount++;
        image.isLiked = true;
        image.likedUsers.unshift(new likedUser('', 'You'));
        this.galleryImagesService.likeImage(image.id).subscribe({
            next: _ =>
            {

            }
        });
    }

    unlike(image: IImage)
    {
        image.likesCount--;
        image.isLiked = false;
        image.filters.isLiked = false;
        image.likedUsers.splice(0, 1);
        this.galleryImagesService.unlikeImage(image.id).subscribe({
            next: _ =>
            {

            }
        });
    }

    //share some services
}