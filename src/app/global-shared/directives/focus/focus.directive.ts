import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
    selector: '[setfocus]'
})
export class FocusDirective
{
    constructor(private el: ElementRef, private renderer: Renderer2) { }

    ngOnInit()
    {
        this.renderer.selectRootElement(this.el.nativeElement).focus();
    }
}