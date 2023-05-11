import { NgModule } from "@angular/core";
import { UploadFilesComponent } from "./upload-files.component";
import { FileDragDropModule } from "src/app/global-shared/directives/file-drag-drop/file-drag-drop.module";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

@NgModule({
    declarations: [UploadFilesComponent],
    imports: [FileDragDropModule, FontAwesomeModule],
    exports: [UploadFilesComponent]
})
export class UploadFilesModule { }