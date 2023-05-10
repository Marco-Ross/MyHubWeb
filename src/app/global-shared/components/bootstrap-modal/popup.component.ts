import { Component, EventEmitter, Input, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PopupAnchorDirective } from './popup-anchor.directive';

@Component({
    selector: 'popup',
    templateUrl: 'popup.component.html'
})
export class PopupComponent
{
    constructor(private activeModal: NgbActiveModal) { }

    @Input() component: any;
    @Input() options: any;

    @ViewChild(PopupAnchorDirective, { static: true }) popupBodyAnchor!: PopupAnchorDirective;
    result: any = {};

    //////

    ngOnInit()
    {
        this.loadComponent();
    }

    loadComponent()
    {
        const viewContainerRef = this.popupBodyAnchor.viewContainerRef;
        viewContainerRef.clear();

        const componentRef = viewContainerRef.createComponent<typeof this.component>(this.component);

        Object.keys(componentRef.instance).forEach(key =>
        {
            if (!(componentRef.instance[key] instanceof EventEmitter))
                return;

            componentRef.instance[key].subscribe({
                next: (value: any) =>
                {
                    this.result[key] = value;
                }
            });
        });
    }

    dismiss()
    {
        this.activeModal.dismiss();
    }

    close()
    {
        this.activeModal.close(this.result);
    }
}