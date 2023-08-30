import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faEllipsisH, faHeart as faFullHeart, faCalendar, faCaretDown, faCaretUp, faGrinAlt } from '@fortawesome/free-solid-svg-icons';
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
import { InputValidator } from 'src/app/global-shared/validators/empty-input.validator';
import { HubToastService } from 'src/app/global-shared/services/hub-toastr/hub-toastr.service';

@Component({
    selector: 'gallery',
    templateUrl: 'gallery.component.html',
    styleUrls: ['gallery.component.scss']
})
export class GalleryComponent
{
    constructor(private formBuilder: FormBuilder, private uploadService: UploadService, private galleryImagesService: GalleryImagesService,
        private popupService: PopupService, private authenticationService: AuthenticationService, private hubToastr: HubToastService) { }

    faHeart = faHeart;
    faFullHeart = faFullHeart;
    faEllipsisH = faEllipsisH;
    faCalendar = faCalendar;
    faCaretDown = faCaretDown;
    faCaretUp = faCaretUp;
    faGrinAlt = faGrinAlt;

    //

    images: IImage[] = [];
    galleryFG!: FormGroup;
    isAdmin: boolean = false;
    loadingImages: boolean | undefined = false;
    filterOptions: IImageFiltersOptions = {
        filters: {
            isLiked: false,
        },
        sorting: {
            dateAscending: false
        }
    };

    inputElement!: HTMLInputElement;

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

    componentLoaded: boolean = false;

    ngAfterViewChecked()
    {
        this.componentLoaded = true;
    }

    //////

    addImage()
    {
        if (Object.keys(this.filterOptions.sorting).some(x => this.filterOptions.sorting[x as keyof IImageSortFilters] === true)
            || Object.keys(this.filterOptions.filters).some(x => this.filterOptions.filters[x as keyof IImageFilter] === true))
            return;

        let options = new uploadOptions('Upload An Image');
        options.size = 'lg';
        options.data = { resizeToWidth: 500, useRound: false, aspectRatio: 6 / 5 };

        this.uploadService.UploadImageCrop(options).then((result) =>
        {
            this.galleryImagesService.uploadImage(new galleryImage(result.image, result.caption)).subscribe({
                next: (image) =>
                {
                    image.imageUrl = result.image;
                    image.filters = {} as IImageFilters;
                    this.images.unshift(image);
                    this.addImageForm(image);
                    this.hubToastr.success('Image added.');
                },
                error: (error) =>
                {
                    this.images.splice(0, 1);
                    this.hubToastr.error('Failed to add image.', error);
                }
            });
        }, () => { });
    }

    getImages()
    {
        this.loadingImages = undefined;
        let loadingTimeout = setTimeout(() => this.loadingImages = true, 180);

        return this.galleryImagesService.getImageIds().subscribe({
            next: (response) =>
            {
                this.images = response.images;
                clearTimeout(loadingTimeout);
                this.loadingImages = false;

                setTimeout(() =>
                {
                    this.images.forEach((image) =>
                    {
                        image.filters = {} as IImageFilters;
                        return this.addImageForm(image);
                    });
                });
            }
        });
    }

    addImageForm(image: IImage)
    {
        image.formControl = new FormControl('', [Validators.required, InputValidator.whiteSpace]);
        this.galleryFG.addControl(image.id, image.formControl);
    }

    removeImage(image: IImage)
    {
        this.galleryImagesService.removeImage(image.id).subscribe({
            next: _ =>
            {
                this.removeImageByIndex(image);
                this.hubToastr.success('Image removed.');
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

    postComment(image: IImage)
    {
        if (!image.formControl?.valid)
            return;

        this.galleryImagesService.postComment(image, image.formControl);
    }

    viewComments(image: IImage)
    {
        //Image blobs are left behind if (opened and closed) twice and then refresh.
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