import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';
import { WindowRefService } from '../../services/window/window-ref.service';

@Directive({
    selector: '[inputPosition]'
})
export class InputPositionDirective
{
    constructor(private el: ElementRef<HTMLInputElement>, private window: WindowRefService) { }

    @Output() inputPosition = new EventEmitter<HTMLInputElement>();

    ngOnInit()
    {
        setTimeout(() =>
        {
            const inputElement = this.el.nativeElement;
            this.inputPosition.emit(inputElement);
        });
    }

    @HostListener('mousedown', ['$event'])
    onDown(event: MouseEvent)
    {
        this.window.nativeWindow.document.addEventListener('mouseup', this.handleMouseUp)
    }

    handleMouseUp = (event: any) =>
    {
        const inputElement = this.el.nativeElement;

        this.inputPosition.emit(inputElement);

        this.window.nativeWindow.document.removeEventListener('mouseup', this.handleMouseUp);
    }

    @HostListener('keyup', ['$event'])
    onKeyup(event: KeyboardEvent)
    {
        const inputElement = this.el.nativeElement;
        this.inputPosition.emit(inputElement);
    }
}