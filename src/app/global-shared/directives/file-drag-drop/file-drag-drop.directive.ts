import { Directive, EventEmitter, HostBinding, HostListener, Output } from "@angular/core";

@Directive({
    selector: '[fileDragDrop]'
})

export class FileDragDropDirective
{
    @Output() private filesChangeEmiter: EventEmitter<File[]> = new EventEmitter();

    @HostBinding('style.background') private background = '#eee';
    @HostBinding('style.border') private borderStyle = '2px dashed';
    @HostBinding('style.border-color') private borderColor = '#696D7D';
    @HostBinding('style.border-radius') private borderRadius = '5px';

    constructor() { }

    @HostListener('dragover', ['$event']) public onDragOver(evt: DragEvent)
    {
        evt.preventDefault();
        evt.stopPropagation();
        this.background = 'lightgray';
        this.borderColor = 'cadetblue';
        this.borderStyle = '3px solid';
    }

    @HostListener('dragleave', ['$event']) public onDragLeave(evt: DragEvent)
    {
        evt.preventDefault();
        evt.stopPropagation();
        this.background = '#eee';
        this.borderColor = '#696D7D';
        this.borderStyle = '2px dashed';
    }

    @HostListener('drop', ['$event']) public onDrop(evt: DragEvent)
    {
        evt.preventDefault();
        evt.stopPropagation();
        this.background = '#eee';
        this.borderColor = '#696D7D';
        this.borderStyle = '2px dashed';

        if (evt.dataTransfer == undefined)
            return;
            
        const  valid_files = Array.from(evt.dataTransfer.files || []);
        this.filesChangeEmiter.emit(valid_files);
    }
}