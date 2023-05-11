import { NgModule } from "@angular/core";
import { UploadFileModule } from "./upload-file/upload-file.module";
import { UploadFilesModule } from "./upload-files/upload-files.module";
import { UploadImageCropModule } from "./upload-image-crop/upload-image-crop.module";

@NgModule({
    declarations: [],
    imports: [UploadFileModule, UploadFilesModule, UploadImageCropModule],
    exports: []
})
export class UploadModule { }