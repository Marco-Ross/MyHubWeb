import { NgModule } from "@angular/core";
import { UploadFileComponent } from "./upload-file.component";
import { FileDragDropModule } from "src/app/global-shared/directives/file-drag-drop/file-drag-drop.module";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

@NgModule({
    declarations: [UploadFileComponent],
    imports: [FileDragDropModule, FontAwesomeModule],
    exports: [UploadFileComponent]
})
export class UploadFileModule { }