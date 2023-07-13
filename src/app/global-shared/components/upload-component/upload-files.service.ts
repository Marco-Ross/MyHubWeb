import { Injectable } from '@angular/core';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { UploadFilesComponent } from './upload-files/upload-files.component';
import { UploadImageCropComponent } from './upload-image-crop/upload-image-crop.component';
import { PopupService } from '../bootstrap-modal/popup.service';
import { UploadFileModule } from './upload-file/upload-file.module';
import { UploadFilesModule } from './upload-files/upload-files.module';
import { UploadImageCropModule } from './upload-image-crop/upload-image-crop.module';
import { uploadOptions } from './upload-options.class';
import { UploadGalleryImageComponent } from './upload-gallery-image/upload-gallery-image.component';
import { UploadGalleryImageModule } from './upload-gallery-image/upload-gallery-image.module';

@Injectable()
export class UploadService
{
    constructor(private popupService: PopupService) { }

    public UploadFile(uploadOptions: uploadOptions)
    {
        return this.popupService.open(UploadFileComponent, UploadFileModule, uploadOptions);
    }

    public RemoveFile(fileId: string)
    {
        //Remove EndPoint
    }

    public UploadFiles(uploadOptions: uploadOptions)
    {
        return this.popupService.open(UploadFilesComponent, UploadFilesModule, uploadOptions);
    }

    public UploadImageCrop(uploadOptions: uploadOptions)
    {
        return this.popupService.open(UploadGalleryImageComponent, UploadGalleryImageModule, uploadOptions);
    }

    public UploadProfileImageCrop(title: string)
    {
        let options = new uploadOptions(title);
        options.size = 'lg';
        options.data.useRound = true;
        options.data.resizeToWidth = 220;
        options.data.aspectRatio = 4/4;

        return this.popupService.open(UploadImageCropComponent, UploadImageCropModule, options);
    }
}