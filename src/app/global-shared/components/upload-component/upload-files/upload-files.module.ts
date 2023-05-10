import { NgModule } from "@angular/core";
import { UploadFilesComponent } from "./upload-files.component";
import { FileDragDropModule } from "src/app/global-shared/directives/file-drag-drop/file-drag-drop.module";

@NgModule({
    declarations: [UploadFilesComponent],
    imports: [FileDragDropModule],
    exports: [UploadFilesComponent]
})
export class UploadFilesModule { }