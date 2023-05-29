import { Injectable } from '@angular/core';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { UploadFilesComponent } from './upload-files/upload-files.component';
import { UploadImageCropComponent } from './upload-image-crop/upload-image-crop.component';
import { PopupService } from '../bootstrap-modal/popup.service';
import { UploadFileModule } from './upload-file/upload-file.module';
import { UploadFilesModule } from './upload-files/upload-files.module';
import { UploadImageCropModule } from './upload-image-crop/upload-image-crop.module';

@Injectable()
export class UploadService
{
    constructor(private popupService: PopupService) { }

    public UploadFile(options: { title: string })
    {
        return this.popupService.open(UploadFileComponent, UploadFileModule, { title: options.title });
    }

    public RemoveFile(fileId: string)
    {
        //Remove EndPoint
    }

    public UploadFiles(options: { title: string })
    {
        return this.popupService.open(UploadFilesComponent, UploadFilesModule, { title: options.title });
    }

    public UploadImageCrop(options: { title: string })
    {
        return this.popupService.open(UploadImageCropComponent, UploadImageCropModule, { size: 'lg', title: options.title });
    }
}