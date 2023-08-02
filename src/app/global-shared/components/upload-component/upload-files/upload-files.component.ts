import { Component, EventEmitter, Input, Output } from '@angular/core';
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

    @Input() fileTypes: string = '';
    uploadedFiles!: Array<File>;

    ngOnInit()
    {
    }

    //////


    onFileDrag(files: Array<File>)
    {
        this.uploadedFiles = files;
    }

    onFileUpload(event: Event)
    {
        let inputEvent = (event.target as HTMLInputElement);

        const valid_files = Array.from(inputEvent.files || []);

        this.uploadedFiles = valid_files;
    }

    onClose = () =>
    {
        return new Promise((resolve, reject) =>
        {
            resolve(this.uploadedFiles);
        });
    }
}