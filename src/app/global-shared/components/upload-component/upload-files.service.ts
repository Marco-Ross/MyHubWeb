import { Injectable } from '@angular/core';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { UploadFilesComponent } from './upload-files/upload-files.component';
import { UploadImageCropComponent } from './upload-image-crop/upload-image-crop.component';
import { PopupService } from '../bootstrap-modal/popup.service';

@Injectable()
export class UploadService
{
    constructor(private popupService: PopupService) { }

    public UploadFile()
    {
        return this.popupService.UploadFile(UploadFileComponent, { title: 'Upload File' });
    }

    public UploadFiles()
    {
        return this.popupService.UploadFile(UploadFilesComponent, { title: 'Upload Files' });
    }

    public UploadImageCrop()
    {
        return this.popupService.UploadFile(UploadImageCropComponent, { size: 'lg', title: 'Upload A Profile Image' });
    }
}