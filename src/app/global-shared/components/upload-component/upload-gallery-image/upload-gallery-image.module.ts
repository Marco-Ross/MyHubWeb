import { NgModule } from "@angular/core";
import { ImageCropperModule } from "ngx-image-cropper";
import { UploadFileModule } from "../upload-file/upload-file.module";
import { PopupModule } from "../../bootstrap-modal/popup.module";
import { ComponentsModule } from "src/app/global-shared/modules/components.module";
import { UploadGalleryImageComponent } from "./upload-gallery-image.component";
import { UploadImageCropModule } from "../upload-image-crop/upload-image-crop.module";

@NgModule({
    declarations: [UploadGalleryImageComponent],
    imports: [ComponentsModule, ImageCropperModule, UploadFileModule, PopupModule, UploadImageCropModule],
    exports: [UploadGalleryImageComponent]
})
export class UploadGalleryImageModule { }