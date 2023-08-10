import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { faRefresh } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'upload-image-crop',
    templateUrl: 'upload-image-crop.component.html',
    styleUrls: ['upload-image-crop.component.scss']
})
export class UploadImageCropComponent
{
    constructor() { }

    faRefresh = faRefresh;

    //

    @Output() croppedImageEvent = new EventEmitter<string>;
    @Input() options: any;
    croppedImage: any = '';
    imageChangedEvent: any = '';
    hideCropper: boolean = true;
    incorrectFile: boolean = false;
    isUploading: boolean = false;
    isInvalid: boolean = false;

    ngOnInit()
    {
    }

    //////

    onImageUpload(file: File)
    {
        this.isUploading = true;
        if (!file.type.includes('image'))
        {
            this.incorrectFile = true;
            return;
        }

        this.imageChangedEvent = { target: { files: [file] } };
    }

    retry()
    {
        this.croppedImage = undefined;
        this.hideCropper = true;
        this.imageChangedEvent = { target: { files: [] } };

        this.croppedImageEvent.emit(undefined);
    }

    imageCropped(event: ImageCroppedEvent)
    {
        this.croppedImage = event.base64;

        this.croppedImageEvent.emit(this.croppedImage);
    }

    imageLoaded()
    {
        setTimeout(() =>
        {
            this.hideCropper = false;
            this.isUploading = false;
            this.isInvalid = false;
        });
    }
    cropperReady()
    {
        /* cropper ready */
    }
    loadImageFailed()
    {
        /* show message */
    }

    onClose = () =>
    {
        return new Promise((resolve, reject) =>
        {
            if (!this.croppedImage)
            {
                this.isInvalid = true;
                reject();
            }

            resolve(this.croppedImage);
        });
    }
}