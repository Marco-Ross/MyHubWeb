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
    selectedImageUrl: string;
    isPostingComment: boolean;
    filters: IImageFilters;
    formControl: AbstractControl;
    comments: IComment[]
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
    galleryImageComments: IComment[];
    imageUrl: string;
    isPostingComment: boolean;
}

export interface ILikedUser
{
    id: string;
    username: string;
}

export interface IComment
{
    id: string;
    userId: string;
    username: string;
    comment: string;
    commentDate: Date;
    pinned: boolean;
    pinnedDate: Date;
    profileImage: string;
}