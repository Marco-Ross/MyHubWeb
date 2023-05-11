import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[popupBodyAnchor]',
})
export class PopupAnchorDirective
{
    constructor(public viewContainerRef: ViewContainerRef) { }
}