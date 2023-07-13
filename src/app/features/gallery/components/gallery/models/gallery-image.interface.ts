import { AbstractControl } from "@angular/forms";

export interface IImageResponse
{
    images: IImage[];
}

export interface IImage
{
    id: string;
    userCreatedId: string;
    likesCount: number;
    likedUsers: ILikedUser[];
    isLiked: boolean;
    commentsCount: number;
    caption: string;
    dateUploaded: Date;
    imageUrl: string;
    isPostingComment: boolean;
    filters: IImageFilters;
    formControl: AbstractControl;
}

export interface IImageFilters
{
    isLiked: boolean;
}

export interface IImageForPopup
{
    id: string;
    likesCount: number;
    likedUsers: ILikedUser[];
    commentsCount: number;
    galleryImageComments: ICommentingUser[];
    imageUrl: string;
    isPostingComment: boolean;
}

export interface ILikedUser
{
    id: string;
    username: string;
}

export interface ICommentingUser
{
    id: string;
    userId: string;
    username: string;
    comment: string;
    commentDate: Date;
    profileImage: string;
}