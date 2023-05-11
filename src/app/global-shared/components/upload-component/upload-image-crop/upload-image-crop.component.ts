import { Component, EventEmitter, Output } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
    selector: 'upload-image-crop',
    templateUrl: 'upload-image-crop.component.html',
    styleUrls: ['upload-image-crop.component.scss']
})
export class UploadImageCropComponent
{
    constructor() { }

    @Output() croppedImageEvent = new EventEmitter<string>;
    croppedImage: any = '';
    imageChangedEvent: any = '';
    hideCropper: boolean = true;
    incorrectFile: boolean = false;

    ngOnInit()
    {
    }

    //////

    onImageUpload(file: File)
    {
        if (!file.type.includes('image'))
        {
            this.incorrectFile = true;
            return;
        }

        this.imageChangedEvent = { target: { files: [file] } };
    }

    imageCropped(event: ImageCroppedEvent)
    {
        this.croppedImage = event.base64;

        this.croppedImageEvent.emit(this.croppedImage);
    }
    imageLoaded()
    {
        this.hideCropper = false;
    }
    cropperReady()
    {
        /* cropper ready */
    }
    loadImageFailed()
    {
        /* show message */
    }
}