import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounce, timer } from 'rxjs';
import { galleryImage } from 'src/app/features/gallery/components/gallery/models/gallery-image.class';

@Component({
    selector: 'upload-gallery-image',
    templateUrl: 'upload-gallery-image.component.html',
    styleUrls: ['upload-gallery-image.component.scss']
})
export class UploadGalleryImageComponent
{
    constructor(private formBuilder: FormBuilder) { }

    @Input() options: any;

    uploadGalleryFG!: FormGroup;
    galleryImage: galleryImage = new galleryImage('', '');

    ngOnInit()
    {
        this.uploadGalleryFG = this.formBuilder.group({
            caption: ''
        });

        this.uploadGalleryFG.get('caption')?.valueChanges.pipe(debounce(() => timer(20))).subscribe({ next: (caption) => this.updateCaption(caption) });
    }

    //////

    onCroppedImageEvent(croppedImage: string)
    {
        this.galleryImage.image = croppedImage;
    }

    updateCaption(caption: string)
    {
        this.galleryImage.caption = caption;
    }

    onClose = () =>
    {
        return new Promise((resolve, reject) =>
        {
            resolve(this.galleryImage);
        });
    }
}