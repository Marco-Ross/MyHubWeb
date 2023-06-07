import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[algorithmComponentAnchor]',
})
export class AlgorithmComponentAnchorDirective
{
    constructor(public viewContainerRef: ViewContainerRef) { }
}