import { NgModule } from "@angular/core";
import { ImageCropperModule } from "ngx-image-cropper";
import { UploadImageCropComponent } from "./upload-image-crop.component";
import { UploadFileModule } from "../upload-file/upload-file.module";
import { PopupModule } from "../../bootstrap-modal/popup.module";
import { ComponentsModule } from "src/app/global-shared/modules/components.module";

@NgModule({
    declarations: [UploadImageCropComponent],
    imports: [ComponentsModule, ImageCropperModule, UploadFileModule, PopupModule],
    exports: [UploadImageCropComponent]
})
export class UploadImageCropModule { }