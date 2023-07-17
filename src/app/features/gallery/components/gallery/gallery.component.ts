import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faEllipsisH, faHeart as faFullHeart, faCalendar, faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { UploadService } from 'src/app/global-shared/components/upload-component/upload-files.service';
import { GalleryImagesService } from './gallery-service/gallery.service';
import { galleryImage } from './models/gallery-image.class';
import { IImage, IImageFilters } from './models/gallery-image.interface';
import { PopupService } from 'src/app/global-shared/components/bootstrap-modal/popup.service';
import { GalleryImageCommentsComponent } from '../image-comments/gallery-image-comments.component';
import { GalleryImageCommentsModule } from '../image-comments/gallery-image-comments.module';
import { uploadOptions } from 'src/app/global-shared/components/upload-component/upload-options.class';
import { IImageFilter, IImageFiltersOptions, IImageSortFilters } from './models/filters.interface';
import { AuthenticationService } from 'src/app/core/services/authentication-service/authentication.service';

@Component({
    selector: 'gallery',
    templateUrl: 'gallery.component.html',
    styleUrls: ['gallery.component.scss']
})
export class GalleryComponent
{
    constructor(private formBuilder: FormBuilder, private uploadService: UploadService, private galleryImagesService: GalleryImagesService,
        private popupService: PopupService, private authenticationService: AuthenticationService) { }

    faHeart = faHeart;
    faFullHeart = faFullHeart;
    faEllipsisH = faEllipsisH;
    faCalendar = faCalendar;
    faCaretDown = faCaretDown;
    faCaretUp = faCaretUp;

    //

    images: IImage[] = [];
    galleryFG!: FormGroup;
    isAdmin: boolean = false;
    filterOptions: IImageFiltersOptions = {
        filters: {
            isLiked: false,
        },
        sorting: {
            dateAscending: false
        }
    };

    ngOnInit()
    {
        this.galleryFG = this.formBuilder.group({});

        this.authenticationService.getIsAdmin().subscribe({
            next: (response) =>
            {
                this.isAdmin = response.isAdmin;
            }
        });

        this.getImages();
    }

    //////

    addImage()
    {
        if (Object.keys(this.filterOptions.sorting).some(x => this.filterOptions.sorting[x as keyof IImageSortFilters] === true)
            || Object.keys(this.filterOptions.filters).some(x => this.filterOptions.filters[x as keyof IImageFilter] === true))
            return;

        let options = new uploadOptions('Upload An Image');
        options.size = 'lg';
        options.data = { resizeToWidth: 300, useRound: false, aspectRatio: 6 / 5 };

        this.uploadService.UploadImageCrop(options).then((result) =>
        {
            this.galleryImagesService.uploadImage(new galleryImage(result.uploadEvent.image, result.uploadEvent.caption)).subscribe({
                next: (image) =>
                {
                    image.imageUrl = result.uploadEvent.image;
                    image.filters = {} as IImageFilters;
                    this.images.unshift(image);
                    this.addImageForm(image);
                },
                error: () =>
                {
                    this.images.splice(0, 1);
                }
            });
        }, () => { });
    }

    getImages()
    {
        return this.galleryImagesService.getImageIds().subscribe({
            next: (response) =>
            {
                this.images = response.images;

                this.images.forEach((image) =>
                {
                    image.filters = {} as IImageFilters;
                    return this.addImageForm(image);
                });
            }
        });
    }

    addImageForm(image: IImage) 
    {
        image.formControl = new FormControl();
        this.galleryFG.addControl(image.id, image.formControl);
    }

    removeImage(image: IImage)
    {
        this.galleryImagesService.removeImage(image.id).subscribe({
            next: _ =>
            {
                this.removeImageByIndex(image);
            }
        });
    }

    removeImageByIndex(image: IImage)
    {
        let index = this.images.findIndex(x => x.id === image.id);
        this.images.splice(index, 1);
    }

    like(image: IImage)
    {
        this.galleryImagesService.like(image);
    }

    unlike(image: IImage)
    {
        this.galleryImagesService.unlike(image);
    }

    isValueEmpty(comment: string | null)
    {
        if (!comment)
            return true;

        return comment.trim().length === 0;
    }

    postComment(image: IImage)
    {
        if (this.isValueEmpty(image.formControl.value) || image.isPostingComment)
            return;

        this.galleryImagesService.postComment(image, image.formControl);
    }

    viewComments(image: IImage)
    {
        let options = new uploadOptions('Comments');
        options.buttonText = 'Close';
        options.buttonType = 'Button';
        options.size = 'lg';
        options.data = image;

        this.popupService.open(GalleryImageCommentsComponent, GalleryImageCommentsModule, options).then((result: any) =>
        {
        }, () =>
        {
        });
    }

    loadImage(image: IImage)
    {
        if (!image.id)
            return;

        this.galleryImagesService.getImage(image.id).subscribe({
            next: (imageBlob) =>
            {
                image.imageUrl = URL.createObjectURL(imageBlob);
                image.selectedImageUrl = URL.createObjectURL(imageBlob);
            }
        });
    }

    viewLiked()
    {
        this.filterOptions.filters.isLiked = !this.filterOptions.filters.isLiked;

        this.images.forEach(x =>
        {
            if (x.isLiked)
                return (x.filters || {}).isLiked = true;

            else
                return (x.filters || {}).isLiked = false;
        });
    }

    sortByDate()
    {
        this.filterOptions.sorting.dateAscending = !this.filterOptions.sorting.dateAscending;

        if (this.filterOptions.sorting.dateAscending == true)
            this.images = this.images.sort((x: any, y: any) => new Date(x.dateUploaded).getTime() - new Date(y.dateUploaded).getTime());

        else if (this.filterOptions.sorting.dateAscending == false)
            this.images = this.images.sort((x: any, y: any) => new Date(y.dateUploaded).getTime() - new Date(x.dateUploaded).getTime());
    }

    filteredItems(image: IImage)
    {
        let isFilteredItem = false;

        if (this.filterOptions.filters.isLiked)
        {
            if (image.filters.isLiked)
                isFilteredItem = true;

            else
                isFilteredItem = false;
        }
        else
            isFilteredItem = true;

        return isFilteredItem;
    }
}