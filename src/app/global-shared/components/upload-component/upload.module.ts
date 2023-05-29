import { NgModule } from "@angular/core";
import { UploadFileModule } from "./upload-file/upload-file.module";
import { UploadFilesModule } from "./upload-files/upload-files.module";
import { UploadImageCropModule } from "./upload-image-crop/upload-image-crop.module";
import { UploadService } from "./upload-files.service";

@NgModule({
    declarations: [],
    providers:[UploadService],
    imports: [UploadFileModule, UploadFilesModule, UploadImageCropModule],
    exports: []
})
export class UploadModule { }