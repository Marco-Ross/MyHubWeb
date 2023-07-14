import { Component, EventEmitter, Input, Output } from '@angular/core';
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

    @Output() popupForm = new EventEmitter<FormGroup>;
    @Output() uploadEvent = new EventEmitter<galleryImage>;
    @Input() options: any;

    uploadGalleryFG!: FormGroup;
    galleryImage: galleryImage = new galleryImage('', '');

    ngOnInit()
    {
        this.uploadGalleryFG = this.formBuilder.group({
            caption: ''
        });

        this.uploadGalleryFG.get('caption')?.valueChanges.pipe(debounce(() => timer(20))).subscribe({ next: (caption) => this.updateCaption(caption) });
        this.popupForm.emit(this.uploadGalleryFG);
    }

    //////

    onCroppedImageEvent(croppedImage: string)
    {
        this.galleryImage.image = croppedImage;
        this.updateGallery();
    }

    updateCaption(caption: string)
    {
        this.galleryImage.caption = caption;
        this.updateGallery();
    }

    updateGallery()
    {
        this.uploadEvent.emit(this.galleryImage);
    }
}