import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'upload-file',
    templateUrl: 'upload-file.component.html',
    styleUrls: ['upload-file.component.scss']
})
export class UploadFileComponent
{
    constructor() { }

    faUpload = faUpload;

    //

    @Output() uploadFilesEvent = new EventEmitter<File>;
    @Input() fileTypes: string = '';
    uploadedFile!: File;

    ngOnInit()
    {
    }

    //////

    onFileDrag(files: Array<File>)
    {
        this.uploadedFile = files[0];
        this.uploadFilesEvent.emit(this.uploadedFile);
    }

    onFileUpload(event: Event)
    {
        let inputEvent = (event.target as HTMLInputElement);

        const valid_files = Array.from(inputEvent.files || []);

        this.uploadedFile = valid_files[0];
        this.uploadFilesEvent.emit(this.uploadedFile);
    }
}