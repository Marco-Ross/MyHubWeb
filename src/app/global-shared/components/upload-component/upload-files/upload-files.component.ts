import { Component, EventEmitter, Output } from '@angular/core';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'upload-files',
    templateUrl: 'upload-files.component.html',
    styleUrls: ['upload-files.component.scss']
})
export class UploadFilesComponent
{
    constructor() { }

    faUpload = faUpload;

    //

    @Output() uploadFilesEvent = new EventEmitter<Array<File>>;
    uploadedFiles!: Array<File>;

    ngOnInit()
    {
    }

    //////


    onFileDrag(files: Array<File>)
    {
        this.uploadedFiles = files;
        this.uploadFilesEvent.emit(this.uploadedFiles);
    }

    onFileUpload(event: Event)
    {
        let inputEvent = (event.target as HTMLInputElement);

        const valid_files = Array.from(inputEvent.files || []);

        this.uploadedFiles = valid_files;
        this.uploadFilesEvent.emit(this.uploadedFiles);
    }
}